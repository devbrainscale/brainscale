/* eslint-disable @typescript-eslint/no-explicit-any */
export const FB_PIXEL_ID = '1510756840668655';

/**
 * Safe wrapper for Meta Pixel events.
 * No-ops during SSR or when the pixel hasn't loaded yet.
 */
export function trackFbq(
  event: string,
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;
  const fbq = (window as any).fbq;
  if (typeof fbq !== 'function') return;
  if (params !== undefined) {
    fbq(event, name, params);
  } else {
    fbq(event, name);
  }
}
