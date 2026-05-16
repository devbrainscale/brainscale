import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: NextRequest) {
  try {
    const { score, correct, total, email, lang, tier } = await request.json();
    const isPremium = tier === 'premium';
    const isFr      = lang === 'fr';

    // Currency & prices: EUR for FR, USD for EN
    // €13.99 / €22.99  |  $14.99 / $24.99
    const currency     = isFr ? 'eur' : 'usd';
    const priceBasic   = isFr ? 1399 : 1499;
    const pricePremium = isFr ? 2299 : 2499;

    const productName = isPremium
      ? (isFr ? 'Rapport Cognitif — Premium'   : 'Cognitive Report — Premium')
      : (isFr ? 'Rapport Cognitif — Essentiel' : 'Cognitive Report — Essential');

    const productDesc = isPremium
      ? (isFr
          ? 'Rapport cognitif 8 pages + protocole d\'entraînement cognitif 30 jours.'
          : '8-page cognitive report + personalized 30-day cognitive training protocol.')
      : (isFr
          ? 'Rapport cognitif 8 pages avec insights personnalisés et certificat PDF imprimable.'
          : '8-page cognitive report with personalized insights and printable PDF certificate.');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: productName, description: productDesc },
            unit_amount: isPremium ? pricePremium : priceBasic,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&score=${score}&tier=${tier}&lang=${lang ?? 'en'}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}${isFr ? '/fr' : ''}/results?score=${score}`,
      customer_email: email || undefined,
      metadata: {
        iq_score: String(score),
        correct:  String(correct ?? 20),
        total:    String(total   ?? 40),
        lang:     String(lang    ?? 'en'),
        tier:     String(tier    ?? 'basic'),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
