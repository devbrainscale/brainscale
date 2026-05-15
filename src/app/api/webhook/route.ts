import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL!;
const PDF_API_KEY     = process.env.PDF_API_KEY!;
const BREVO_API_KEY   = process.env.BREVO_API_KEY!;
const WEBHOOK_SECRET  = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig  = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email   = session.customer_email || session.customer_details?.email;
  const score   = parseInt(session.metadata?.iq_score  ?? '100');
  const correct = parseInt(session.metadata?.correct   ?? '20');
  const total   = parseInt(session.metadata?.total     ?? '40');

  if (!email) {
    console.error('No email in session', session.id);
    return NextResponse.json({ error: 'No email' }, { status: 400 });
  }

  // 1. Generate PDF
  let pdfBase64: string;
  try {
    const pdfRes = await fetch(`${PDF_SERVICE_URL}/generate-pdf`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': PDF_API_KEY },
      body:    JSON.stringify({ score, correct, total }),
    });
    if (!pdfRes.ok) throw new Error(`PDF service error: ${pdfRes.status}`);
    const pdfData = await pdfRes.json();
    pdfBase64 = pdfData.pdf_base64;
  } catch (err) {
    console.error('PDF generation failed:', err);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }

  // 2. Send email via Brevo
  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'api-key':       BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender:  { name: 'BrainScale', email: 'noreply@brainscale.app' },
        to:      [{ email }],
        subject: 'Your BrainScale Cognitive Report',
        htmlContent: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
            <h2 style="font-size:22px;color:#14121F;margin-bottom:8px">Your report is ready.</h2>
            <p style="color:#475569;line-height:1.6;margin-bottom:24px">
              Thank you for completing the BrainScale assessment.
              Your full cognitive report is attached to this email.
            </p>
            <p style="color:#475569;line-height:1.6">
              Your IQ Score: <strong style="color:#4F46E5">${score}</strong>
            </p>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0"/>
            <p style="font-size:12px;color:#94A3B8">
              BrainScale · brainscale.app · Not a clinical or medical assessment
            </p>
          </div>
        `,
        attachment: [{
          content: pdfBase64,
          name:    'BrainScale_Cognitive_Report.pdf',
        }],
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      throw new Error(`Brevo error: ${brevoRes.status} ${errText}`);
    }
  } catch (err) {
    console.error('Email sending failed:', err);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }

  console.log(`✓ Report sent to ${email} (score: ${score})`);
  return NextResponse.json({ success: true });
}
