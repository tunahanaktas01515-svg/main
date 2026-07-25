import type { Localized } from '../types';
import type { TranslationKey } from '../i18n/dictionary';

/** Borsa sayfasının üst sırasındaki özet kartları */
export interface MarketKpi {
  id: string;
  symbol: string;
  name: Localized;
  value: string;
  changePercent: number;
  series: number[];
}

export const marketKpis: MarketKpi[] = [
  {
    id: 'xu100',
    symbol: 'XU100',
    name: { tr: 'BIST 100', en: 'BIST 100' },
    value: '10.842',
    changePercent: 1.24,
    series: [40, 42, 41, 45, 44, 48, 50, 49, 53, 55, 54, 58],
  },
  {
    id: 'usdtry',
    symbol: 'USD/TRY',
    name: { tr: 'Amerikan Doları', en: 'US Dollar' },
    value: '32,8640',
    changePercent: 0.62,
    series: [20, 22, 24, 23, 26, 28, 27, 30, 32, 34, 33, 36],
  },
  {
    id: 'xautry',
    symbol: 'XAU/TRY',
    name: { tr: 'Gram Altın', en: 'Gram Gold' },
    value: '2.518,40',
    changePercent: -0.28,
    series: [58, 57, 59, 56, 55, 57, 54, 53, 55, 52, 51, 50],
  },
  {
    id: 'brent',
    symbol: 'BRENT',
    name: { tr: 'Brent Petrol', en: 'Brent Crude' },
    value: '82,44 $',
    changePercent: 0.94,
    series: [34, 36, 35, 38, 40, 39, 43, 45, 44, 48, 50, 52],
  },
];

/** Trend grafiğinde çizilen üç seri ve zaman etiketleri */
export const trendLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export const trendSeries: { id: string; nameKey: TranslationKey; color: string; data: number[] }[] = [
  { id: 'index', nameKey: 'market.series.index', color: '#38bdf8', data: [88, 92, 90, 96, 101, 99, 105, 108, 104, 112] },
  { id: 'currency', nameKey: 'market.series.currency', color: '#818cf8', data: [72, 74, 78, 76, 80, 84, 82, 86, 90, 88] },
  { id: 'gold', nameKey: 'market.series.gold', color: '#f472b6', data: [104, 101, 103, 98, 95, 97, 92, 94, 90, 87] },
];

/** Haftalık işlem hacmi (milyar ₺) */
export const weeklyVolume: { labelKey: TranslationKey; value: number }[] = [
  { labelKey: 'day.mon', value: 96 },
  { labelKey: 'day.tue', value: 128 },
  { labelKey: 'day.wed', value: 84 },
  { labelKey: 'day.thu', value: 142 },
  { labelKey: 'day.fri', value: 118 },
  { labelKey: 'day.sat', value: 42 },
];

/** Sektör bazlı günlük göreli güç */
export const sectorPerformance: { labelKey: TranslationKey; value: number }[] = [
  { labelKey: 'sector.bank', value: 38 },
  { labelKey: 'sector.industry', value: 62 },
  { labelKey: 'sector.tech', value: 74 },
  { labelKey: 'sector.energy', value: 51 },
  { labelKey: 'sector.retail', value: 29 },
  { labelKey: 'sector.transport', value: 66 },
];

/** Yapay zekanın piyasa yorumu */
export const marketInsight: {
  headline: Localized;
  body: Localized;
  signals: { labelKey: TranslationKey; value: Localized; tone: 'up' | 'down' | 'flat' }[];
} = {
  headline: { tr: 'Endekste yukarı yönlü baskı sürüyor', en: 'Upward pressure continues on the index' },
  body: {
    tr: 'BIST 100 gün içinde %1,24 primlenirken bankacılık endeksi negatif ayrıştı. Dolar/TL’de 32,90 direnci test edildi; gram altın ons tarafındaki geri çekilmeyi takip ediyor. Hacmin haftalık ortalamanın %12 üzerinde olması yükselişi destekliyor.',
    en: 'BIST 100 gained 1.24% intraday while the banking index diverged negatively. USD/TRY tested the 32.90 resistance and gram gold is tracking the pullback in the ounce. Volume running 12% above the weekly average supports the move.',
  },
  signals: [
    { labelKey: 'market.signal.trend', value: { tr: 'Yükseliş', en: 'Bullish' }, tone: 'up' },
    { labelKey: 'market.signal.volatility', value: { tr: 'Orta', en: 'Medium' }, tone: 'flat' },
    { labelKey: 'market.signal.volume', value: { tr: 'Ortalama üstü', en: 'Above average' }, tone: 'up' },
  ],
};
