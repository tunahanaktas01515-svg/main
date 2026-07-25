import type { Localized, WatchTerm } from '../types';

/** Deep Web arama motorunun tür "eklentileri" */
export interface SearchMode {
  id: string;
  label: Localized;
  icon: string;
  hint: Localized;
}

export const searchModes: SearchMode[] = [
  {
    id: 'web',
    label: { tr: 'Web Ara', en: 'Web Search' },
    icon: 'Globe2',
    hint: { tr: 'Kapalı ağ + yüzey web', en: 'Closed network + surface web' },
  },
  {
    id: 'gorsel',
    label: { tr: 'Görsel Ara', en: 'Image Search' },
    icon: 'Image',
    hint: { tr: 'Marka ve ürün görselleri', en: 'Brand and product imagery' },
  },
  {
    id: 'bilgi',
    label: { tr: 'Bilgi Ara', en: 'Knowledge' },
    icon: 'BookOpen',
    hint: { tr: 'Mevzuat ve kaynak özeti', en: 'Regulation and source digest' },
  },
  {
    id: 'belge',
    label: { tr: 'Belge Ara', en: 'Documents' },
    icon: 'FileText',
    hint: { tr: 'PDF, XML, ekstre', en: 'PDF, XML, statements' },
  },
  {
    id: 'sizinti',
    label: { tr: 'Sızıntı Ara', en: 'Leak Search' },
    icon: 'ShieldAlert',
    hint: { tr: 'Veri sızıntı arşivleri', en: 'Data leak archives' },
  },
  {
    id: 'pazar',
    label: { tr: 'Pazar Yeri', en: 'Marketplaces' },
    icon: 'Store',
    hint: { tr: 'Kapalı pazar listeleri', en: 'Closed marketplace listings' },
  },
  {
    id: 'forum',
    label: { tr: 'Forum & Kanal', en: 'Forums & Channels' },
    icon: 'MessagesSquare',
    hint: { tr: 'Onion forum, kanal', en: 'Onion forums and channels' },
  },
];

/** Borsa takip bloğu sekmeleri */
export type MarketTab = 'borsa' | 'doviz' | 'capraz';

export interface TrackerRow {
  id: string;
  symbol: string;
  name: Localized;
  value: string;
  changePercent: number;
  extra: Localized;
  series: number[];
}

export const marketTracker: Record<MarketTab, TrackerRow[]> = {
  borsa: [
    { id: 'xu100', symbol: 'XU100', name: { tr: 'BIST 100', en: 'BIST 100' }, value: '10.842', changePercent: 1.24, extra: { tr: 'Hacim 128 mlr ₺', en: 'Volume ₺128bn' }, series: [40, 42, 41, 45, 44, 48, 50, 49, 53, 55, 54, 58] },
    { id: 'xu030', symbol: 'XU030', name: { tr: 'BIST 30', en: 'BIST 30' }, value: '11.964', changePercent: 0.86, extra: { tr: 'Hacim 74 mlr ₺', en: 'Volume ₺74bn' }, series: [32, 34, 33, 36, 38, 37, 40, 42, 41, 44, 46, 45] },
    { id: 'xbank', symbol: 'XBANK', name: { tr: 'BIST Banka', en: 'BIST Banking' }, value: '14.208', changePercent: -0.42, extra: { tr: 'Hacim 21 mlr ₺', en: 'Volume ₺21bn' }, series: [56, 55, 57, 54, 53, 55, 52, 51, 53, 50, 49, 48] },
    { id: 'thyao', symbol: 'THYAO', name: { tr: 'Türk Hava Yolları', en: 'Turkish Airlines' }, value: '312,50 ₺', changePercent: 2.1, extra: { tr: 'F/K 4,2', en: 'P/E 4.2' }, series: [30, 33, 32, 36, 38, 41, 40, 44, 46, 48, 47, 52] },
    { id: 'aselsan', symbol: 'ASELS', name: { tr: 'Aselsan', en: 'Aselsan' }, value: '74,85 ₺', changePercent: 0.64, extra: { tr: 'F/K 12,6', en: 'P/E 12.6' }, series: [42, 43, 45, 44, 46, 48, 47, 49, 51, 50, 52, 54] },
  ],
  doviz: [
    { id: 'usdtry', symbol: 'USD/TRY', name: { tr: 'Amerikan Doları', en: 'US Dollar' }, value: '32,8640', changePercent: 0.62, extra: { tr: 'Alış 32,84 · Satış 32,89', en: 'Bid 32.84 · Ask 32.89' }, series: [20, 22, 24, 23, 26, 28, 27, 30, 32, 34, 33, 36] },
    { id: 'eurtry', symbol: 'EUR/TRY', name: { tr: 'Euro', en: 'Euro' }, value: '35,4120', changePercent: 0.21, extra: { tr: 'Alış 35,38 · Satış 35,44', en: 'Bid 35.38 · Ask 35.44' }, series: [26, 27, 26, 28, 29, 28, 30, 31, 30, 32, 33, 33] },
    { id: 'gbptry', symbol: 'GBP/TRY', name: { tr: 'İngiliz Sterlini', en: 'British Pound' }, value: '41,7350', changePercent: -0.18, extra: { tr: 'Alış 41,68 · Satış 41,79', en: 'Bid 41.68 · Ask 41.79' }, series: [48, 47, 49, 46, 47, 45, 44, 46, 43, 44, 42, 43] },
    { id: 'chftry', symbol: 'CHF/TRY', name: { tr: 'İsviçre Frangı', en: 'Swiss Franc' }, value: '36,1180', changePercent: 0.34, extra: { tr: 'Alış 36,06 · Satış 36,18', en: 'Bid 36.06 · Ask 36.18' }, series: [30, 31, 33, 32, 34, 33, 35, 36, 35, 37, 38, 39] },
    { id: 'xautry', symbol: 'XAU/TRY', name: { tr: 'Gram Altın', en: 'Gram Gold' }, value: '2.518,40 ₺', changePercent: -0.28, extra: { tr: 'Ons 2.384 $', en: 'Ounce $2,384' }, series: [58, 57, 59, 56, 55, 57, 54, 53, 55, 52, 51, 50] },
  ],
  capraz: [
    { id: 'eurusd', symbol: 'EUR/USD', name: { tr: 'Euro / Dolar', en: 'Euro / Dollar' }, value: '1,0776', changePercent: -0.14, extra: { tr: 'Gün içi 1,0742 – 1,0801', en: 'Day range 1.0742 – 1.0801' }, series: [50, 49, 51, 48, 47, 49, 46, 45, 47, 44, 45, 43] },
    { id: 'gbpusd', symbol: 'GBP/USD', name: { tr: 'Sterlin / Dolar', en: 'Pound / Dollar' }, value: '1,2704', changePercent: 0.22, extra: { tr: 'Gün içi 1,2666 – 1,2731', en: 'Day range 1.2666 – 1.2731' }, series: [40, 41, 40, 42, 44, 43, 45, 46, 45, 47, 48, 49] },
    { id: 'usdjpy', symbol: 'USD/JPY', name: { tr: 'Dolar / Yen', en: 'Dollar / Yen' }, value: '156,42', changePercent: 0.41, extra: { tr: 'Gün içi 155,80 – 156,74', en: 'Day range 155.80 – 156.74' }, series: [34, 36, 35, 38, 40, 39, 42, 44, 43, 46, 48, 49] },
    { id: 'usdchf', symbol: 'USD/CHF', name: { tr: 'Dolar / Frank', en: 'Dollar / Franc' }, value: '0,9098', changePercent: -0.26, extra: { tr: 'Gün içi 0,9072 – 0,9131', en: 'Day range 0.9072 – 0.9131' }, series: [46, 45, 47, 44, 43, 45, 42, 41, 43, 40, 41, 39] },
    { id: 'eurgbp', symbol: 'EUR/GBP', name: { tr: 'Euro / Sterlin', en: 'Euro / Pound' }, value: '0,8482', changePercent: 0.09, extra: { tr: 'Gün içi 0,8461 – 0,8497', en: 'Day range 0.8461 – 0.8497' }, series: [42, 43, 42, 44, 43, 45, 44, 46, 45, 47, 46, 48] },
  ],
};

export const marketTabs: { id: MarketTab; labelKey: 'market.tab.borsa' | 'market.tab.doviz' | 'market.tab.capraz' }[] = [
  { id: 'borsa', labelKey: 'market.tab.borsa' },
  { id: 'doviz', labelKey: 'market.tab.doviz' },
  { id: 'capraz', labelKey: 'market.tab.capraz' },
];

/**
 * "Tüm piyasalar" açıldığında listelenen ek kur ve endeksler.
 * Sekmedeki 5 satırın devamı olarak, kapalı hâlde gizlenir.
 */
export const extendedMarkets: TrackerRow[] = [
  { id: 'jpytry', symbol: 'JPY/TRY', name: { tr: 'Japon Yeni', en: 'Japanese Yen' }, value: '0,2101', changePercent: -0.31, extra: { tr: 'Alış 0,2098 · Satış 0,2104', en: 'Bid 0.2098 · Ask 0.2104' }, series: [44, 43, 45, 42, 41, 43, 40, 39, 41, 38, 39, 37] },
  { id: 'cadtry', symbol: 'CAD/TRY', name: { tr: 'Kanada Doları', en: 'Canadian Dollar' }, value: '24,0180', changePercent: 0.44, extra: { tr: 'Alış 23,98 · Satış 24,05', en: 'Bid 23.98 · Ask 24.05' }, series: [30, 32, 31, 34, 33, 36, 35, 38, 37, 40, 41, 43] },
  { id: 'audtry', symbol: 'AUD/TRY', name: { tr: 'Avustralya Doları', en: 'Australian Dollar' }, value: '21,7420', changePercent: 0.18, extra: { tr: 'Alış 21,71 · Satış 21,77', en: 'Bid 21.71 · Ask 21.77' }, series: [36, 37, 36, 38, 39, 38, 40, 41, 40, 42, 43, 44] },
  { id: 'sektry', symbol: 'SEK/TRY', name: { tr: 'İsveç Kronu', en: 'Swedish Krona' }, value: '3,0640', changePercent: -0.09, extra: { tr: 'Alış 3,061 · Satış 3,068', en: 'Bid 3.061 · Ask 3.068' }, series: [40, 39, 41, 38, 39, 37, 38, 36, 37, 35, 36, 35] },
  { id: 'noktry', symbol: 'NOK/TRY', name: { tr: 'Norveç Kronu', en: 'Norwegian Krone' }, value: '3,0182', changePercent: 0.27, extra: { tr: 'Alış 3,014 · Satış 3,022', en: 'Bid 3.014 · Ask 3.022' }, series: [32, 33, 35, 34, 36, 35, 37, 38, 37, 39, 40, 41] },
  { id: 'dkktry', symbol: 'DKK/TRY', name: { tr: 'Danimarka Kronu', en: 'Danish Krone' }, value: '4,7480', changePercent: 0.19, extra: { tr: 'Alış 4,744 · Satış 4,752', en: 'Bid 4.744 · Ask 4.752' }, series: [34, 35, 34, 36, 37, 36, 38, 39, 38, 40, 41, 41] },
  { id: 'rubtry', symbol: 'RUB/TRY', name: { tr: 'Rus Rublesi', en: 'Russian Rouble' }, value: '0,3568', changePercent: -0.62, extra: { tr: 'Alış 0,3561 · Satış 0,3575', en: 'Bid 0.3561 · Ask 0.3575' }, series: [52, 51, 53, 50, 49, 51, 48, 47, 49, 46, 45, 44] },
  { id: 'cnytry', symbol: 'CNY/TRY', name: { tr: 'Çin Yuanı', en: 'Chinese Yuan' }, value: '4,5312', changePercent: 0.36, extra: { tr: 'Alış 4,527 · Satış 4,536', en: 'Bid 4.527 · Ask 4.536' }, series: [30, 31, 33, 32, 34, 36, 35, 37, 39, 38, 40, 42] },
  { id: 'aedtry', symbol: 'AED/TRY', name: { tr: 'BAE Dirhemi', en: 'UAE Dirham' }, value: '8,9480', changePercent: 0.61, extra: { tr: 'Alış 8,942 · Satış 8,954', en: 'Bid 8.942 · Ask 8.954' }, series: [28, 30, 29, 32, 34, 33, 36, 38, 37, 40, 42, 43] },
  { id: 'sartry', symbol: 'SAR/TRY', name: { tr: 'Suudi Riyali', en: 'Saudi Riyal' }, value: '8,7620', changePercent: 0.58, extra: { tr: 'Alış 8,756 · Satış 8,768', en: 'Bid 8.756 · Ask 8.768' }, series: [29, 31, 30, 33, 35, 34, 37, 39, 38, 41, 43, 44] },
  { id: 'xagtry', symbol: 'XAG/TRY', name: { tr: 'Gram Gümüş', en: 'Gram Silver' }, value: '30,84 ₺', changePercent: 1.42, extra: { tr: 'Ons 29,18 $', en: 'Ounce $29.18' }, series: [26, 28, 27, 31, 33, 32, 36, 38, 37, 41, 43, 46] },
  { id: 'xptry', symbol: 'XPT/TRY', name: { tr: 'Gram Platin', en: 'Gram Platinum' }, value: '1.021,60 ₺', changePercent: -0.44, extra: { tr: 'Ons 967 $', en: 'Ounce $967' }, series: [48, 47, 49, 46, 45, 47, 44, 43, 45, 42, 41, 40] },
  { id: 'ceyrek', symbol: 'ÇEYREK', name: { tr: 'Çeyrek Altın', en: 'Quarter Gold Coin' }, value: '4.180,00 ₺', changePercent: -0.21, extra: { tr: 'Alış 4.096 · Satış 4.180', en: 'Bid 4,096 · Ask 4,180' }, series: [50, 49, 51, 48, 47, 49, 46, 47, 45, 46, 44, 45] },
  { id: 'brent', symbol: 'BRENT', name: { tr: 'Brent Petrol', en: 'Brent Crude' }, value: '82,44 $', changePercent: 0.94, extra: { tr: 'Varil · ICE', en: 'Per barrel · ICE' }, series: [34, 36, 35, 38, 40, 39, 43, 45, 44, 48, 50, 52] },
  { id: 'ngas', symbol: 'NGAS', name: { tr: 'Doğal Gaz', en: 'Natural Gas' }, value: '2,684 $', changePercent: -1.16, extra: { tr: 'MMBtu · NYMEX', en: 'MMBtu · NYMEX' }, series: [56, 54, 55, 52, 50, 51, 48, 46, 47, 44, 42, 41] },
  { id: 'sp500', symbol: 'S&P 500', name: { tr: 'ABD Endeksi', en: 'US Index' }, value: '5.284', changePercent: 0.38, extra: { tr: 'Vadeli · CME', en: 'Futures · CME' }, series: [38, 39, 41, 40, 42, 44, 43, 46, 47, 46, 49, 50] },
  { id: 'dax', symbol: 'DAX', name: { tr: 'Almanya Endeksi', en: 'German Index' }, value: '18.412', changePercent: 0.16, extra: { tr: 'Xetra', en: 'Xetra' }, series: [40, 41, 40, 43, 42, 44, 45, 44, 46, 47, 46, 48] },
  { id: 'btcusd', symbol: 'BTC/USD', name: { tr: 'Bitcoin', en: 'Bitcoin' }, value: '67.240 $', changePercent: 2.41, extra: { tr: '24s hacim 28 mlr $', en: '24h volume $28bn' }, series: [30, 33, 32, 37, 39, 38, 43, 46, 45, 50, 53, 56] },
];

/** İzleme listesinin başlangıç terimleri */
export const initialWatchTerms: WatchTerm[] = [
  { id: 'w1', term: 'firma unvanı', hits: 4, risk: 'low', status: 'done' },
  { id: 'w2', term: 'VKN / vergi numarası', hits: 0, risk: 'low', status: 'idle' },
  { id: 'w3', term: 'marka adı + replika', hits: 7, risk: 'high', status: 'done' },
  { id: 'w4', term: 'ihracat konşimento no', hits: 2, risk: 'medium', status: 'done' },
];

/** Deep Web sayfasındaki örnek bulgular */
export const findings: {
  id: string;
  title: Localized;
  source: Localized;
  severity: 'critical' | 'warning';
  time: Localized;
}[] = [
  {
    id: 'f1',
    title: {
      tr: 'Marka adınızla sahte ürün listesi tespit edildi',
      en: 'Counterfeit product listing found under your brand name',
    },
    source: { tr: 'Kapalı pazar yeri · TOR', en: 'Closed marketplace · TOR' },
    severity: 'critical',
    time: { tr: '18 dk önce', en: '18 min ago' },
  },
  {
    id: 'f2',
    title: {
      tr: 'Kurumsal e-posta adresi sızıntı veri setinde görüldü',
      en: 'Corporate email address seen in a leak data set',
    },
    source: { tr: 'Sızıntı arşivi · 2,4 GB dump', en: 'Leak archive · 2.4 GB dump' },
    severity: 'warning',
    time: { tr: '3 sa önce', en: '3 h ago' },
  },
  {
    id: 'f3',
    title: {
      tr: 'Konşimento numarası forum gönderisinde paylaşılmış',
      en: 'Bill of lading number shared in a forum post',
    },
    source: { tr: 'Lojistik forumu · onion', en: 'Logistics forum · onion' },
    severity: 'warning',
    time: { tr: '1 gün önce', en: '1 day ago' },
  },
];
