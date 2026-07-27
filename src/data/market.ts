import type { AlertItem, KpiCard, Localized, MarketAsset, Opportunity } from '../types';

/**
 * Dashboard üstündeki özet KPI kartları (mock veri).
 */
export const kpiCards: KpiCard[] = [
  {
    id: 'kpi-1',
    label: { tr: 'Bu Dönem İhracat', en: 'Exports This Period' },
    value: '$1.284.500',
    changeLabel: { tr: '+8,4% / çeyrek', en: '+8.4% / quarter' },
    trend: 'up',
    icon: 'Ship',
  },
  {
    id: 'kpi-2',
    label: { tr: 'Devreden KDV', en: 'Carried-Forward VAT' },
    value: '₺342.180',
    changeLabel: { tr: '-2,1% / ay', en: '-2.1% / month' },
    trend: 'down',
    icon: 'Receipt',
  },
  {
    id: 'kpi-3',
    label: { tr: 'İşlenen Fatura', en: 'Invoices Processed' },
    value: '2.147',
    changeLabel: { tr: '+312 bu ay', en: '+312 this month' },
    trend: 'up',
    icon: 'FileCheck2',
  },
  {
    id: 'kpi-4',
    label: { tr: 'Açık Mutabakat', en: 'Open Reconciliations' },
    value: '18',
    changeLabel: { tr: '6 kritik', en: '6 critical' },
    trend: 'flat',
    icon: 'Scale',
  },
];

/**
 * Borsa özeti verileri. `series` alanı mini sparkline grafiği için kullanılır.
 */
export const marketAssets: MarketAsset[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: { tr: 'Bitcoin', en: 'Bitcoin' },
    value: '$67.240',
    changePercent: 2.4,
    series: [42, 44, 43, 48, 47, 52, 55, 53, 58, 61, 60, 65],
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: { tr: 'Ethereum', en: 'Ethereum' },
    value: '$3.512',
    changePercent: 1.1,
    series: [30, 32, 31, 34, 36, 35, 38, 37, 40, 39, 42, 44],
  },
  {
    id: 'xau',
    symbol: 'XAU',
    name: { tr: 'Altın / Ons', en: 'Gold / Ounce' },
    value: '$2.384',
    changePercent: -0.3,
    series: [58, 57, 59, 56, 55, 57, 54, 53, 55, 52, 51, 50],
  },
  {
    id: 'usdtry',
    symbol: 'USD/TRY',
    name: { tr: 'Dolar', en: 'US Dollar' },
    value: '32,86',
    changePercent: 0.6,
    series: [20, 22, 24, 23, 26, 28, 27, 30, 32, 34, 33, 36],
  },
  {
    id: 'eurtry',
    symbol: 'EUR/TRY',
    name: { tr: 'Euro', en: 'Euro' },
    value: '35,41',
    changePercent: 0.2,
    series: [26, 27, 26, 28, 29, 28, 30, 31, 30, 32, 33, 33],
  },
];

/**
 * Yapay zekanın tespit ettiği ihracat / muhasebe fırsatları.
 */
export const opportunities: Opportunity[] = [
  {
    id: 'op-1',
    title: { tr: 'Almanya · Makine ihracatı', en: 'Germany · Machinery export' },
    subtitle: { tr: 'Gümrük vergisi avantajı tespit edildi', en: 'Customs duty advantage detected' },
    score: 87,
    accent: 'from-indigo-400 to-violet-500',
  },
  {
    id: 'op-2',
    title: { tr: 'KDV iadesi hızlandırma', en: 'Speeding up the VAT refund' },
    subtitle: {
      tr: '3 dönemde eksik belge tamamlanabilir',
      en: 'Missing documents can be completed across 3 periods',
    },
    score: 74,
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'op-3',
    title: { tr: 'BAE · Tekstil kotası', en: 'UAE · Textile quota' },
    subtitle: { tr: 'Tercihli tarife kapsamı genişledi', en: 'Preferential tariff coverage widened' },
    score: 68,
    accent: 'from-violet-400 to-fuchsia-500',
  },
];

/**
 * Son uyarılar akışı.
 */
export const alerts: AlertItem[] = [
  {
    id: 'al-1',
    title: {
      tr: 'Fatura #2024-8871 tevkifat oranı hatalı',
      en: 'Invoice #2024-8871 has a wrong deduction rate',
    },
    meta: { tr: '12 dk önce · Fatura Analizi', en: '12 min ago · Invoice Analysis' },
    severity: 'critical',
  },
  {
    id: 'al-2',
    title: {
      tr: 'Banka ekstresinde 3 eşleşmeyen işlem',
      en: '3 unmatched transactions in the bank statement',
    },
    meta: { tr: '38 dk önce · Mutabakat', en: '38 min ago · Reconciliation' },
    severity: 'warning',
  },
  {
    id: 'al-3',
    title: { tr: 'GTIP kodu güncellemesi yayınlandı', en: 'HS code update published' },
    meta: { tr: '1 sa önce · Mevzuat', en: '1 h ago · Regulation' },
    severity: 'info',
  },
  {
    id: 'al-4',
    title: { tr: 'Nisan dönemi KDV beyanı hazır', en: 'April VAT return is ready' },
    meta: { tr: '2 sa önce · KDV Hesabı', en: '2 h ago · VAT Calculation' },
    severity: 'info',
  },
];

/**
 * AI özet panelinde gösterilen metin ve etiketler.
 */
export const aiSummary: { updatedAt: Localized; text: Localized; detections: Localized } = {
  updatedAt: { tr: '4 dk önce güncellendi', en: 'Updated 4 min ago' },
  text: {
    tr:
      'Bu ay işlenen 2.147 faturanın 27’sinde tevkifat oranı sapması var; toplam risk tutarı ₺186.400. ' +
      'İhracat kayıtlarında Almanya hattı %8,4 büyürken navlun maliyetleri %3,1 geriledi — marj iyileşmesi ' +
      'için fiyat revizyonu penceresi açık. Devreden KDV’nin ₺112.000’lik kısmı iade talebine uygun görünüyor.',
    en:
      '27 of the 2,147 invoices processed this month show a deduction-rate deviation, putting ₺186,400 at risk. ' +
      'On the export side the Germany lane grew 8.4% while freight costs fell 3.1% — the window for a price ' +
      'revision that improves margin is open. About ₺112,000 of the carried-forward VAT looks eligible for a refund claim.',
  },
  detections: { tr: '3 fırsat · 2 risk tespit edildi', en: '3 opportunities · 2 risks detected' },
};
