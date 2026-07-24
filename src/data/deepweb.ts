/** Deep Web arama motorunun tür "eklentileri" */
export interface SearchMode {
  id: string;
  label: string;
  icon: string;
  hint: string;
}

export const searchModes: SearchMode[] = [
  { id: 'web', label: 'Web Ara', icon: 'Globe2', hint: 'Kapalı ağ + yüzey web' },
  { id: 'gorsel', label: 'Görsel Ara', icon: 'Image', hint: 'Marka ve ürün görselleri' },
  { id: 'bilgi', label: 'Bilgi Ara', icon: 'BookOpen', hint: 'Mevzuat ve kaynak özeti' },
  { id: 'belge', label: 'Belge Ara', icon: 'FileText', hint: 'PDF, XML, ekstre' },
  { id: 'sizinti', label: 'Sızıntı Ara', icon: 'ShieldAlert', hint: 'Veri sızıntı arşivleri' },
  { id: 'pazar', label: 'Pazar Yeri', icon: 'Store', hint: 'Kapalı pazar listeleri' },
  { id: 'forum', label: 'Forum & Kanal', icon: 'MessagesSquare', hint: 'Onion forum, kanal' },
];

/** Borsa takip bloğu sekmeleri */
export type MarketTab = 'borsa' | 'doviz' | 'capraz';

export interface TrackerRow {
  id: string;
  symbol: string;
  name: string;
  value: string;
  changePercent: number;
  extra: string;
  series: number[];
}

export const marketTracker: Record<MarketTab, TrackerRow[]> = {
  borsa: [
    { id: 'xu100', symbol: 'XU100', name: 'BIST 100', value: '10.842', changePercent: 1.24, extra: 'Hacim 128 mlr ₺', series: [40, 42, 41, 45, 44, 48, 50, 49, 53, 55, 54, 58] },
    { id: 'xu030', symbol: 'XU030', name: 'BIST 30', value: '11.964', changePercent: 0.86, extra: 'Hacim 74 mlr ₺', series: [32, 34, 33, 36, 38, 37, 40, 42, 41, 44, 46, 45] },
    { id: 'xbank', symbol: 'XBANK', name: 'BIST Banka', value: '14.208', changePercent: -0.42, extra: 'Hacim 21 mlr ₺', series: [56, 55, 57, 54, 53, 55, 52, 51, 53, 50, 49, 48] },
    { id: 'thyao', symbol: 'THYAO', name: 'Türk Hava Yolları', value: '312,50 ₺', changePercent: 2.1, extra: 'F/K 4,2', series: [30, 33, 32, 36, 38, 41, 40, 44, 46, 48, 47, 52] },
    { id: 'aselsan', symbol: 'ASELS', name: 'Aselsan', value: '74,85 ₺', changePercent: 0.64, extra: 'F/K 12,6', series: [42, 43, 45, 44, 46, 48, 47, 49, 51, 50, 52, 54] },
  ],
  doviz: [
    { id: 'usdtry', symbol: 'USD/TRY', name: 'Amerikan Doları', value: '32,8640', changePercent: 0.62, extra: 'Alış 32,84 · Satış 32,89', series: [20, 22, 24, 23, 26, 28, 27, 30, 32, 34, 33, 36] },
    { id: 'eurtry', symbol: 'EUR/TRY', name: 'Euro', value: '35,4120', changePercent: 0.21, extra: 'Alış 35,38 · Satış 35,44', series: [26, 27, 26, 28, 29, 28, 30, 31, 30, 32, 33, 33] },
    { id: 'gbptry', symbol: 'GBP/TRY', name: 'İngiliz Sterlini', value: '41,7350', changePercent: -0.18, extra: 'Alış 41,68 · Satış 41,79', series: [48, 47, 49, 46, 47, 45, 44, 46, 43, 44, 42, 43] },
    { id: 'chftry', symbol: 'CHF/TRY', name: 'İsviçre Frangı', value: '36,1180', changePercent: 0.34, extra: 'Alış 36,06 · Satış 36,18', series: [30, 31, 33, 32, 34, 33, 35, 36, 35, 37, 38, 39] },
    { id: 'xautry', symbol: 'XAU/TRY', name: 'Gram Altın', value: '2.518,40 ₺', changePercent: -0.28, extra: 'Ons 2.384 $', series: [58, 57, 59, 56, 55, 57, 54, 53, 55, 52, 51, 50] },
  ],
  capraz: [
    { id: 'eurusd', symbol: 'EUR/USD', name: 'Euro / Dolar', value: '1,0776', changePercent: -0.14, extra: 'Gün içi 1,0742 – 1,0801', series: [50, 49, 51, 48, 47, 49, 46, 45, 47, 44, 45, 43] },
    { id: 'gbpusd', symbol: 'GBP/USD', name: 'Sterlin / Dolar', value: '1,2704', changePercent: 0.22, extra: 'Gün içi 1,2666 – 1,2731', series: [40, 41, 40, 42, 44, 43, 45, 46, 45, 47, 48, 49] },
    { id: 'usdjpy', symbol: 'USD/JPY', name: 'Dolar / Yen', value: '156,42', changePercent: 0.41, extra: 'Gün içi 155,80 – 156,74', series: [34, 36, 35, 38, 40, 39, 42, 44, 43, 46, 48, 49] },
    { id: 'usdchf', symbol: 'USD/CHF', name: 'Dolar / Frank', value: '0,9098', changePercent: -0.26, extra: 'Gün içi 0,9072 – 0,9131', series: [46, 45, 47, 44, 43, 45, 42, 41, 43, 40, 41, 39] },
    { id: 'eurgbp', symbol: 'EUR/GBP', name: 'Euro / Sterlin', value: '0,8482', changePercent: 0.09, extra: 'Gün içi 0,8461 – 0,8497', series: [42, 43, 42, 44, 43, 45, 44, 46, 45, 47, 46, 48] },
  ],
};

export const marketTabs: { id: MarketTab; label: string }[] = [
  { id: 'borsa', label: 'Borsa' },
  { id: 'doviz', label: 'Dövizler' },
  { id: 'capraz', label: 'Çapraz Kurlar' },
];
