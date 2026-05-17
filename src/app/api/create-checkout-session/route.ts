import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brainscale.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, lang } = body;

    // Validate and sanitize inputs
    const score   = parseInt(body.score,   10);
    const correct = parseInt(body.correct, 10);
    const total   = parseInt(body.total,   10);

    if (isNaN(score)   || score < 75  || score > 145)       return NextResponse.json({ error: 'Invalid score' },   { status: 400 });
    if (isNaN(total)   || total < 10  || total > 60)         return NextResponse.json({ error: 'Invalid total' },   { status: 400 });
    if (isNaN(correct) || correct < 0 || correct > total)    return NextResponse.json({ error: 'Invalid correct' }, { status: 400 });
    if (lang !== undefined && lang !== 'en' && lang !== 'fr') return NextResponse.json({ error: 'Invalid lang' },   { status: 400 });
    if (email !== undefined && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const isFr = lang === 'fr';

    // Single offer — $5 USD / €5 EUR
    const currency   = isFr ? 'eur' : 'usd';
    const unitAmount = 500; // 5.00

    const productName = isFr
      ? 'Rapport Cognitif BrainScale'
      : 'BrainScale Cognitive Report';

    const productDesc = isFr
      ? 'Rapport cognitif complet : score détaillé, architecture cognitive, profil, forces et protocole de développement.'
      : 'Full cognitive report: detailed score, cognitive architecture, profile, strengths and development protocol.';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: productName, description: productDesc },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&score=${score}&correct=${correct}&total=${total}&lang=${lang ?? 'en'}`,
      cancel_url:  `${BASE_URL}${isFr ? '/fr' : ''}/results?score=${score}`,
      customer_email: email || undefined,
      metadata: {
        iq_score: String(score),
        correct:  String(correct),
        total:    String(total),
        lang:     String(lang ?? 'en'),
        tier:     'premium',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
