import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createReportToken } from '@/lib/report-token';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const BREVO_API_KEY  = process.env.BREVO_API_KEY!;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const APP_URL        = process.env.NEXT_PUBLIC_APP_URL || 'https://www.brainscale.app';

async function sendBrevoEmail(payload: object) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Brevo error: ${res.status} ${errText}`);
  }
}

async function removeFromDripList(email: string, isFr: boolean) {
  // Remove buyer from drip list (5=EN, 6=FR) to stop the automation
  const listId = isFr ? 6 : 5;
  try {
    await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/remove`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
      body:    JSON.stringify({ emails: [email] }),
    });
  } catch (err) {
    console.error('Failed to remove contact from drip list:', err);
  }
}

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
  const score   = parseInt(session.metadata?.iq_score ?? '100');
  const correct = parseInt(session.metadata?.correct  ?? '20');
  const total   = parseInt(session.metadata?.total    ?? '40');
  const lang    = session.metadata?.lang ?? 'en';
  const isFr    = lang === 'fr';

  if (!email) {
    console.error('No email in session', session.id);
    return NextResponse.json({ error: 'No email' }, { status: 400 });
  }

  // 1. Generate signed report link (stateless — no DB needed)
  const reportToken = createReportToken({
    score,
    correct,
    total,
    lang: isFr ? 'fr' : 'en',
    tier: 'premium',
  });
  const reportPath = isFr ? '/fr/report/' : '/report/';
  const reportUrl  = `${APP_URL}${reportPath}${reportToken}`;

  // 2. Send report link email
  try {
    await sendBrevoEmail({
      sender:  { name: 'BrainScale', email: 'noreply@brainscale.app' },
      to:      [{ email }],
      subject: isFr
        ? 'Votre rapport cognitif BrainScale'
        : 'Your BrainScale Cognitive Report',
      htmlContent: isFr ? `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FAF8F5">
          <div style="background:#1A1916;border-radius:4px;padding:32px;text-align:center;margin-bottom:32px">
            <div style="font-family:serif;font-size:64px;color:#C96442;line-height:1;margin-bottom:8px">${score}</div>
            <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:4px">Score QI</div>
          </div>
          <h2 style="font-size:20px;color:#1A1916;margin:0 0 12px;font-weight:600">Votre rapport cognitif est prêt.</h2>
          <p style="color:#5A5650;line-height:1.7;margin-bottom:24px;font-size:14px">
            Merci d&apos;avoir complété l&apos;évaluation BrainScale. Votre rapport complet est disponible en ligne — conservez ce lien, il est permanent.
          </p>
          <a href="${reportUrl}" style="display:block;background:#C96442;color:#fff;text-align:center;padding:14px 24px;border-radius:2px;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:24px">
            Voir mon rapport →
          </a>
          <p style="font-size:11px;color:#B0ABA5;word-break:break-all">
            Ou copiez ce lien : ${reportUrl}
          </p>
          <hr style="border:none;border-top:1px solid #E8E5DF;margin:24px 0"/>
          <p style="font-size:11px;color:#B0ABA5">
            BrainScale &middot; brainscale.app &middot; Ceci n&apos;est pas une &eacute;valuation clinique ou m&eacute;dicale
          </p>
        </div>
      ` : `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#FAF8F5">
          <div style="background:#1A1916;border-radius:4px;padding:32px;text-align:center;margin-bottom:32px">
            <div style="font-family:serif;font-size:64px;color:#C96442;line-height:1;margin-bottom:8px">${score}</div>
            <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:4px">IQ Score</div>
          </div>
          <h2 style="font-size:20px;color:#1A1916;margin:0 0 12px;font-weight:600">Your cognitive report is ready.</h2>
          <p style="color:#5A5650;line-height:1.7;margin-bottom:24px;font-size:14px">
            Thank you for completing the BrainScale assessment. Your full report is available online — save this link, it&apos;s permanent.
          </p>
          <a href="${reportUrl}" style="display:block;background:#C96442;color:#fff;text-align:center;padding:14px 24px;border-radius:2px;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:24px">
            View my report →
          </a>
          <p style="font-size:11px;color:#B0ABA5;word-break:break-all">
            Or copy this link: ${reportUrl}
          </p>
          <hr style="border:none;border-top:1px solid #E8E5DF;margin:24px 0"/>
          <p style="font-size:11px;color:#B0ABA5">
            BrainScale &middot; brainscale.app &middot; Not a clinical or medical assessment
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Report email failed:', err);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }

  // 3. Remove buyer from drip list (stops the automation)
  await removeFromDripList(email, isFr);

  console.log(`✓ Report email sent to ${email} (score: ${score}, reportUrl: ${reportUrl})`);
  return NextResponse.json({ success: true });
}
