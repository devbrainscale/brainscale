import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: NextRequest) {
  try {
    const { score, correct, total, email, lang, tier } = await request.json();
    const isPremium = tier === 'premium';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isPremium ? 'Cognitive Report — Premium' : 'Cognitive Report — Essential',
              description: isPremium
                ? '8-page cognitive report + 30-day training protocol + LinkedIn badge.'
                : '8-page cognitive report with personalized insights and printable PDF certificate.',
            },
            unit_amount: isPremium ? 2499 : 1499, // $24.99 or $14.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&score=${score}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/results?score=${score}`,
      customer_email: email || undefined,
      metadata: {
        iq_score:   String(score),
        correct:    String(correct ?? 20),
        total:      String(total   ?? 40),
        lang:       String(lang ?? "en"),
        tier:       String(tier ?? "basic"),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
