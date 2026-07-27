import type { Lang } from './i18n';

export type MenuItem = { id: string; tr: string; en: string };
export type MenuGroup = {
  id: string;
  icon: 'grid' | 'swap' | 'report' | 'tax' | 'gear';
  tr: string;
  en: string;
  items: MenuItem[];
};

export const MENU: MenuGroup[] = [
  {
    id: 'ana',
    icon: 'grid',
    tr: 'Ana Bölümler',
    en: 'Main',
    items: [
      { id: 'dashboard', tr: 'Dashboard', en: 'Dashboard' },
      { id: 'cenanai', tr: 'Cenan AI', en: 'Cenan AI' },
      { id: 'borsa', tr: 'Borsa', en: 'Market' },
      { id: 'ajanlar', tr: 'Ajanlar', en: 'Agents' },
      { id: 'faturalar', tr: 'Faturalar', en: 'Invoices' },
      { id: 'cari', tr: 'Cari Hesaplar', en: 'Accounts' },
      { id: 'kasabanka', tr: 'Kasa & Banka', en: 'Cash & Bank' },
      { id: 'giderler', tr: 'Giderler / Masraflar', en: 'Expenses' },
    ],
  },
  {
    id: 'islemler',
    icon: 'swap',
    tr: 'İşlemler',
    en: 'Operations',
    items: [
      { id: 'stok', tr: 'Stok / Envanter', en: 'Inventory' },
      { id: 'ceksenet', tr: 'Çek & Senet', en: 'Cheques & Notes' },
      { id: 'mutabakat', tr: 'Banka Mutabakatı', en: 'Bank Reconciliation' },
      { id: 'ocr', tr: 'Fatura Yükle / OCR', en: 'Upload / OCR' },
    ],
  },
  {
    id: 'raporlar',
    icon: 'report',
    tr: 'Raporlar & Analitik',
    en: 'Reports & Analytics',
    items: [
      { id: 'mizan', tr: 'Mizan', en: 'Trial Balance' },
      { id: 'gelirgider', tr: 'Gelir-Gider / Kâr-Zarar', en: 'P&L' },
      { id: 'bilanco', tr: 'Bilanço', en: 'Balance Sheet' },
      { id: 'kdvrapor', tr: 'KDV Raporu', en: 'VAT Report' },
      { id: 'yaslandirma', tr: 'Cari Yaşlandırma', en: 'Aging' },
      { id: 'aiozet', tr: 'AI Özet & Anomali Tespiti', en: 'AI Summary & Anomaly' },
    ],
  },
  {
    id: 'vergi',
    icon: 'tax',
    tr: 'Vergi & Uyum',
    en: 'Tax & Compliance',
    items: [
      { id: 'beyanname', tr: 'Beyannameler', en: 'Declarations' },
      { id: 'vergitakvim', tr: 'Vergi Takvimi / Hatırlatıcılar', en: 'Tax Calendar' },
      { id: 'ebelge', tr: 'e-Belgeler', en: 'e-Documents' },
    ],
  },
  {
    id: 'ayarlar',
    icon: 'gear',
    tr: 'Ayarlar & Destek',
    en: 'Settings & Support',
    items: [
      { id: 'settings', tr: 'Ayarlar', en: 'Settings' },
      { id: 'entegrasyon', tr: 'Entegrasyonlar', en: 'Integrations' },
      { id: 'destek', tr: 'Destek', en: 'Support' },
    ],
  },
];

export const QUICK_ACTIONS: MenuItem[] = [
  { id: 'belge', tr: 'Belge & Fatura İşlemleri', en: 'Documents & Invoices' },
  { id: 'bankamut', tr: 'Banka & Mutabakat', en: 'Bank & Reconciliation' },
  { id: 'ihracat', tr: 'İhracat & Belgeler', en: 'Export & Documents' },
  { id: 'sorgu', tr: 'Hızlı Sorgulama & Hesaplama', en: 'Quick Query & Calc' },
  { id: 'webtara', tr: 'Web / Bilgi Tarama', en: 'Web / Info Search' },
  { id: 'yazma', tr: 'Yazma & Düzenleme', en: 'Writing & Editing' },
];

export function findItemLabel(id: string, lang: Lang): string {
  for (const g of MENU) {
    for (const it of g.items) {
      if (it.id === id) return it[lang];
    }
  }
  for (const q of QUICK_ACTIONS) {
    if (q.id === id) return q[lang];
  }
  return id;
}
