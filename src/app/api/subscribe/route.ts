import { NextRequest, NextResponse } from 'next/server';

function getIqLabel(score: number, lang: string): string {
  const labels = {
    en: score >= 130 ? 'Gifted'        : score >= 120 ? 'Superior'     : score >= 110 ? 'Above Average' : score >= 90 ? 'Average' : 'Below Average',
    fr: score >= 130 ? 'Surdoué'       : score >= 120 ? 'Supérieur'    : score >= 110 ? 'Au-dessus de la moyenne' : score >= 90 ? 'Moyenne' : 'Sous la moyenne',
  };
  return labels[lang as 'en' | 'fr'] ?? labels.en;
}

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= maxRequests) return true;
  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { email, score, lang } = await request.json();
    const language = lang === 'fr' ? 'fr' : 'en';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }

    // Validate score is a reasonable IQ value
    const numericScore = Number(score);
    if (isNaN(numericScore) || numericScore < 40 || numericScore > 200) {
      return NextResponse.json({ success: false, error: 'Invalid score' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          IQ_SCORE: numericScore,
          LANG:     language,
          IQ_LABEL: getIqLabel(numericScore, language),
        },
        listIds: [5],
        updateEnabled: true,
      }),
    });

    // 201 = created, 204 = updated
    if (response.status === 201 || response.status === 204) {
      return NextResponse.json({ success: true });
    }

    const errorData = await response.json();

    // Contact already exists — still a success for us
    if (errorData.code === 'duplicate_parameter') {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: errorData.message }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
