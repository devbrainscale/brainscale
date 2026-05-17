import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: NextRequest) {
  try {
    const { score, correct, total, email, lang } = await request.json();
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&score=${score}&correct=${correct ?? 20}&total=${total ?? 40}&lang=${lang ?? 'en'}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}${isFr ? '/fr' : ''}/results?score=${score}`,
      customer_email: email || undefined,
      metadata: {
        iq_score: String(score),
        correct:  String(correct ?? 20),
        total:    String(total   ?? 40),
        lang:     String(lang    ?? 'en'),
        tier:     'premium',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
