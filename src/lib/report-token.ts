import { createHmac } from 'crypto';

export interface ReportPayload {
  score:   number;
  correct: number;
  total:   number;
  lang:    'en' | 'fr';
  tier:    'basic' | 'premium';
  exp:     number; // unix timestamp
}

function b64url(str: string): string {
  return Buffer.from(str).toString('base64url');
}

function fromB64url(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf8');
}

function getSecret(): string {
  const s = process.env.REPORT_SECRET || process.env.SCORE_SECRET;
  // In production this must be set. In local dev, fall back to a fixed string.
  if (!s && process.env.NODE_ENV === 'production') {
    throw new Error('REPORT_SECRET / SCORE_SECRET env var not set');
  }
  return s ?? 'dev-local-secret-do-not-use-in-prod';
}

/** Create a signed, self-contained report token (no database needed). */
export function createReportToken(payload: Omit<ReportPayload, 'exp'>): string {
  const data: ReportPayload = {
    ...payload,
    // 2-year expiry — long-lived shareable links
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 2,
  };
  const encoded = b64url(JSON.stringify(data));
  const sig = createHmac('sha256', getSecret()).update(encoded).digest('hex').slice(0, 32);
  return `${encoded}.${sig}`;
}

/** Verify token and return payload, or null if invalid / expired. */
export function verifyReportToken(token: string): ReportPayload | null {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return null;

    const encoded = token.slice(0, dot);
    const sig     = token.slice(dot + 1);

    const expectedSig = createHmac('sha256', getSecret()).update(encoded).digest('hex').slice(0, 32);
    if (sig !== expectedSig) return null;

    const data: ReportPayload = JSON.parse(fromB64url(encoded));

    if (!data.score || !data.lang || !data.tier) return null;
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null;

    return data;
  } catch {
    return null;
  }
}
