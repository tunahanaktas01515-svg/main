export type Market = {
  symbol: string;
  name: string;
  price: string;
  change: number; // percent
  series: number[];
};

export const markets: Market[] = [
  {
    symbol: 'USD/TRY',
    name: 'Amerikan Doları',
    price: '41,28',
    change: 0.42,
    series: [40.1, 40.4, 40.3, 40.7, 41.0, 40.9, 41.28],
  },
  {
    symbol: 'EUR/TRY',
    name: 'Euro',
    price: '44,90',
    change: -0.18,
    series: [45.2, 45.0, 45.1, 44.8, 44.95, 44.85, 44.9],
  },
  {
    symbol: 'GBP/TRY',
    name: 'İngiliz Sterlini',
    price: '52,64',
    change: 0.71,
    series: [51.6, 51.9, 52.0, 52.2, 52.4, 52.5, 52.64],
  },
  {
    symbol: 'XAU',
    name: 'Gram Altın',
    price: '3.184',
    change: 1.24,
    series: [3080, 3110, 3095, 3130, 3160, 3150, 3184],
  },
];

export type Activity = {
  time: string;
  label: string;
  kind: 'invoice' | 'export' | 'payment' | 'report';
};

// "O gün yapılan işlerin geçmişi" — today's work history for the timeline.
export const todayActivities: Activity[] = [
  { time: '08:40', label: 'E-Fatura kesildi · #2026-0412', kind: 'invoice' },
  { time: '10:15', label: 'İhracat beyannamesi onaylandı', kind: 'export' },
  { time: '11:30', label: 'Tedarikçi ödemesi · 12.400 ₺', kind: 'payment' },
  { time: '13:05', label: 'KDV raporu oluşturuldu', kind: 'report' },
  { time: '15:20', label: 'Gümrük çıkış işlemi tamamlandı', kind: 'export' },
  { time: '16:45', label: 'Otonom ödeme · iyzico', kind: 'payment' },
];

export type StatementRow = {
  title: string;
  meta: string;
  amount: string;
  positive: boolean;
};

export const statements: StatementRow[] = [
  { title: 'Ekstre · Nisan 2026', meta: 'Aylık hesap ekstresi', amount: '128.400 ₺', positive: true },
  { title: 'Otonom Ödeme', meta: 'Kira · her ayın 1’i', amount: '-9.500 ₺', positive: false },
  { title: 'İhracat Tahsilatı', meta: 'Wire · ABD', amount: '+21.750 $', positive: true },
];

export type Agent = {
  name: string;
  role: string;
  status: 'Aktif' | 'Beklemede';
};

export const agents: Agent[] = [
  { name: 'Fatura Ajanı', role: 'E-fatura kesim & takip', status: 'Aktif' },
  { name: 'İhracat Ajanı', role: 'Gümrük & beyanname', status: 'Aktif' },
  { name: 'Ödeme Ajanı', role: 'Otonom ödemeler · iyzico', status: 'Aktif' },
  { name: 'Rapor Ajanı', role: 'KDV & aylık ekstre', status: 'Beklemede' },
];
