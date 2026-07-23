import type { Lang } from './i18n';

export type LangText = Record<Lang, string>;

export type Market = {
  symbol: string;
  name: LangText;
  price: string;
  change: number; // percent
  series: number[];
};

export const markets: Market[] = [
  {
    symbol: 'USD/TRY',
    name: { tr: 'Amerikan Doları', en: 'US Dollar' },
    price: '41,28',
    change: 0.42,
    series: [40.1, 40.4, 40.3, 40.7, 41.0, 40.9, 41.28],
  },
  {
    symbol: 'EUR/TRY',
    name: { tr: 'Euro', en: 'Euro' },
    price: '44,90',
    change: -0.18,
    series: [45.2, 45.0, 45.1, 44.8, 44.95, 44.85, 44.9],
  },
  {
    symbol: 'GBP/TRY',
    name: { tr: 'İngiliz Sterlini', en: 'British Pound' },
    price: '52,64',
    change: 0.71,
    series: [51.6, 51.9, 52.0, 52.2, 52.4, 52.5, 52.64],
  },
  {
    symbol: 'XAU',
    name: { tr: 'Gram Altın', en: 'Gram Gold' },
    price: '3.184',
    change: 1.24,
    series: [3080, 3110, 3095, 3130, 3160, 3150, 3184],
  },
];

export type ActivityKind = 'invoice' | 'export' | 'payment' | 'report';

export type Activity = {
  time: string;
  label: LangText;
  kind: ActivityKind;
};

// "O gün yapılan işlerin akışı" — today's work timeline.
export const todayActivities: Activity[] = [
  { time: '08:40', label: { tr: 'E-Fatura kesildi · #2026-0412', en: 'E-invoice issued · #2026-0412' }, kind: 'invoice' },
  { time: '10:15', label: { tr: 'İhracat beyannamesi onaylandı', en: 'Export declaration approved' }, kind: 'export' },
  { time: '11:30', label: { tr: 'Tedarikçi ödemesi · 12.400 ₺', en: 'Supplier payment · ₺12,400' }, kind: 'payment' },
  { time: '13:05', label: { tr: 'KDV raporu oluşturuldu', en: 'VAT report generated' }, kind: 'report' },
  { time: '15:20', label: { tr: 'Gümrük çıkış işlemi tamamlandı', en: 'Customs clearance completed' }, kind: 'export' },
  { time: '16:45', label: { tr: 'Otonom ödeme · iyzico', en: 'Autonomous payment · iyzico' }, kind: 'payment' },
];

export type StatementRow = {
  title: LangText;
  meta: LangText;
  amount: string;
  positive: boolean;
};

export const statements: StatementRow[] = [
  {
    title: { tr: 'Ekstre · Nisan 2026', en: 'Statement · Apr 2026' },
    meta: { tr: 'Aylık hesap ekstresi', en: 'Monthly account statement' },
    amount: '128.400 ₺',
    positive: true,
  },
  {
    title: { tr: 'Otonom Ödeme', en: 'Autonomous Payment' },
    meta: { tr: 'Kira · her ayın 1’i', en: 'Rent · 1st of each month' },
    amount: '-9.500 ₺',
    positive: false,
  },
  {
    title: { tr: 'İhracat Tahsilatı', en: 'Export Collection' },
    meta: { tr: 'Wire · ABD', en: 'Wire · USA' },
    amount: '+21.750 $',
    positive: true,
  },
];

export type Agent = {
  name: LangText;
  role: LangText;
  status: 'active' | 'pending';
};

export const agents: Agent[] = [
  { name: { tr: 'Fatura Ajanı', en: 'Invoice Agent' }, role: { tr: 'E-fatura kesim & takip', en: 'E-invoice issue & tracking' }, status: 'active' },
  { name: { tr: 'İhracat Ajanı', en: 'Export Agent' }, role: { tr: 'Gümrük & beyanname', en: 'Customs & declarations' }, status: 'active' },
  { name: { tr: 'Ödeme Ajanı', en: 'Payment Agent' }, role: { tr: 'Otonom ödemeler · iyzico', en: 'Autonomous payments · iyzico' }, status: 'active' },
  { name: { tr: 'Rapor Ajanı', en: 'Report Agent' }, role: { tr: 'KDV & aylık ekstre', en: 'VAT & monthly statement' }, status: 'pending' },
];

export type QuickStat = {
  label: LangText;
  value: string;
  delta: string;
  accent: 'blue' | 'amber' | 'green' | 'violet';
};

export const quickStats: QuickStat[] = [
  { label: { tr: 'Kesilen Fatura', en: 'Invoices Issued' }, value: '12', delta: '+3', accent: 'blue' },
  { label: { tr: 'İhracat İşlemi', en: 'Export Ops' }, value: '5', delta: '+1', accent: 'amber' },
  { label: { tr: 'Tahsilat', en: 'Collections' }, value: '48.9K ₺', delta: '+12%', accent: 'green' },
  { label: { tr: 'Aktif Ajan', en: 'Active Agents', }, value: '3', delta: '/4', accent: 'violet' },
];
