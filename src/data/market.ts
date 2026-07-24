import type { AlertItem, KpiCard, MarketAsset, Opportunity } from '../types';

/**
 * Dashboard üstündeki özet KPI kartları (mock veri).
 */
export const kpiCards: KpiCard[] = [
  {
    id: 'kpi-1',
    label: 'Bu Dönem İhracat',
    value: '$1.284.500',
    changeLabel: '+8,4% / çeyrek',
    trend: 'up',
    icon: 'Ship',
  },
  {
    id: 'kpi-2',
    label: 'Devreden KDV',
    value: '₺342.180',
    changeLabel: '-2,1% / ay',
    trend: 'down',
    icon: 'Receipt',
  },
  {
    id: 'kpi-3',
    label: 'İşlenen Fatura',
    value: '2.147',
    changeLabel: '+312 bu ay',
    trend: 'up',
    icon: 'FileCheck2',
  },
  {
    id: 'kpi-4',
    label: 'Açık Mutabakat',
    value: '18',
    changeLabel: '6 kritik',
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
    name: 'Bitcoin',
    value: '$67.240',
    changePercent: 2.4,
    series: [42, 44, 43, 48, 47, 52, 55, 53, 58, 61, 60, 65],
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    value: '$3.512',
    changePercent: 1.1,
    series: [30, 32, 31, 34, 36, 35, 38, 37, 40, 39, 42, 44],
  },
  {
    id: 'xau',
    symbol: 'XAU',
    name: 'Altın / Ons',
    value: '$2.384',
    changePercent: -0.3,
    series: [58, 57, 59, 56, 55, 57, 54, 53, 55, 52, 51, 50],
  },
  {
    id: 'usdtry',
    symbol: 'USD/TRY',
    name: 'Dolar',
    value: '32,86',
    changePercent: 0.6,
    series: [20, 22, 24, 23, 26, 28, 27, 30, 32, 34, 33, 36],
  },
  {
    id: 'eurtry',
    symbol: 'EUR/TRY',
    name: 'Euro',
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
    title: 'Almanya · Makine ihracatı',
    subtitle: 'Gümrük vergisi avantajı tespit edildi',
    score: 87,
    accent: 'from-indigo-400 to-violet-500',
  },
  {
    id: 'op-2',
    title: 'KDV iadesi hızlandırma',
    subtitle: '3 dönemde eksik belge tamamlanabilir',
    score: 74,
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'op-3',
    title: 'BAE · Tekstil kotası',
    subtitle: 'Tercihli tarife kapsamı genişledi',
    score: 68,
    accent: 'from-violet-400 to-fuchsia-500',
  },
];

/**
 * Son uyarılar akışı.
 */
export const alerts: AlertItem[] = [
  { id: 'al-1', title: 'Fatura #2024-8871 tevkifat oranı hatalı', meta: '12 dk önce · Fatura Analizi', severity: 'critical' },
  { id: 'al-2', title: 'Banka ekstresinde 3 eşleşmeyen işlem', meta: '38 dk önce · Mutabakat', severity: 'warning' },
  { id: 'al-3', title: 'GTIP kodu güncellemesi yayınlandı', meta: '1 sa önce · Mevzuat', severity: 'info' },
  { id: 'al-4', title: 'Nisan dönemi KDV beyanı hazır', meta: '2 sa önce · KDV Hesabı', severity: 'info' },
];

/**
 * AI özet panelinde gösterilen metin ve etiketler.
 */
export const aiSummary = {
  updatedAt: '4 dk önce güncellendi',
  text:
    'Bu ay işlenen 2.147 faturanın 27\'sinde tevkifat oranı sapması var; toplam risk tutarı ₺186.400. ' +
    'İhracat kayıtlarında Almanya hattı %8,4 büyürken navlun maliyetleri %3,1 geriledi — marj iyileşmesi ' +
    'için fiyat revizyonu penceresi açık. Devreden KDV\'nin ₺112.000\'lik kısmı iade talebine uygun görünüyor.',
  detections: '3 fırsat · 2 risk tespit edildi',
};
