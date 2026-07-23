import type { Lang } from './i18n';

export type RangeId = '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | 'all';

export const RANGE_IDS: RangeId[] = ['1d', '1w', '1m', '3m', '6m', '1y', 'all'];

const POINTS: Record<RangeId, number> = {
  '1d': 24,
  '1w': 28,
  '1m': 30,
  '3m': 36,
  '6m': 40,
  '1y': 52,
  all: 60,
};

// Deterministic pseudo-random series so charts are stable across renders.
export function buildSeries(seed: number, range: RangeId, endValue: number, changePct: number): number[] {
  const points = POINTS[range];
  let s = (seed * 9301 + 49297) % 233280;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const startValue = endValue / (1 + changePct / 100);
  const volatility = range === '1d' ? 0.006 : range === '1w' ? 0.012 : 0.03;
  const arr: number[] = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const trend = startValue + (endValue - startValue) * t;
    const wave = Math.sin(t * Math.PI * 6 + seed) * endValue * (volatility * 0.6);
    const noise = (rnd() - 0.5) * endValue * volatility;
    arr.push(trend + wave + noise);
  }
  arr[arr.length - 1] = endValue;
  return arr;
}

// Dates from oldest -> now, spacing depends on the range.
export function buildDates(range: RangeId, count: number): Date[] {
  const now = new Date('2026-07-23T11:00:00');
  const stepMinutes: Record<RangeId, number> = {
    '1d': 60,
    '1w': 60 * 6,
    '1m': 60 * 24,
    '3m': 60 * 24 * 2.5,
    '6m': 60 * 24 * 4.5,
    '1y': 60 * 24 * 7,
    all: 60 * 24 * 18,
  };
  const step = stepMinutes[range];
  const dates: Date[] = [];
  for (let i = count - 1; i >= 0; i--) {
    dates.push(new Date(now.getTime() - i * step * 60 * 1000));
  }
  return dates;
}

export function formatAxisDate(d: Date, range: RangeId, lang: Lang): string {
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  if (range === '1d') {
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

export function formatTooltipDate(d: Date, range: RangeId, lang: Lang): string {
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  if (range === '1d') {
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
}
