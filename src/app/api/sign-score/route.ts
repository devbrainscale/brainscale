import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

function calculateIQ(correct: number, total: number): number {
  const pct = correct / total;
  if (pct >= 0.96) return 145;
  if (pct >= 0.92) return 140;
  if (pct >= 0.88) return 135;
  if (pct >= 0.84) return 130;
  if (pct >= 0.76) return 125;
  if (pct >= 0.68) return 120;
  if (pct >= 0.60) return 115;
  if (pct >= 0.52) return 110;
  if (pct >= 0.44) return 105;
  if (pct >= 0.36) return 100;
  if (pct >= 0.28) return 95;
  if (pct >= 0.20) return 90;
  if (pct >= 0.14) return 85;
  if (pct >= 0.08) return 80;
  return 75;
}

export async function POST(request: NextRequest) {
  try {
    const { correct, total } = await request.json();

    if (
      typeof correct !== 'number' ||
      typeof total !== 'number' ||
      correct < 0 ||
      total <= 0 ||
      correct > total
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const score = calculateIQ(correct, total);
    const secret = process.env.SCORE_SECRET;
    if (!secret) {
      console.error('SCORE_SECRET env var not set');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }
    const payload = `${score}:${correct}:${total}`;
    const sig = createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16);

    return NextResponse.json({ score, correct, total, sig });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
