/**
 * Cenan konuşma motorunun altında yer alan 7 hızlı aksiyon.
 * Her aksiyon composer'a hazır bir istem yazar ve ilgili renk aksanını taşır.
 */
import type { CenanFeatureId, Localized } from '../types';

export interface QuickAction {
  id: string;
  label: Localized;
  icon: string;
  /** İkon rozetinin renk aksanı */
  tone: string;
  prompt: Localized;
  /** Varsa ilgili Cenan modülünün sistem promptu da sohbete enjekte edilir */
  featureId?: CenanFeatureId;
}

export const quickActions: QuickAction[] = [
  {
    id: 'belge-analizi',
    label: { tr: 'Belge analizi', en: 'Document analysis' },
    icon: 'FileSearch',
    tone: 'text-indigo-300 bg-indigo-500/15 border-indigo-400/25',
    prompt: {
      tr: 'Yükleyeceğim belgeyi analiz et ve önemli kalemleri çıkar.',
      en: 'Analyse the document I upload and pull out the key line items.',
    },
    featureId: 'fatura-analizi',
  },
  {
    id: 'e-fatura',
    label: { tr: 'E-fatura oluştur', en: 'Create an e-invoice' },
    icon: 'ReceiptText',
    tone: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/25',
    prompt: {
      tr: 'Yeni bir e-fatura oluşturmak istiyorum, gerekli alanları sırayla sor.',
      en: 'I want to create a new e-invoice; ask me for the required fields one by one.',
    },
  },
  {
    id: 'stok-kontrol',
    label: { tr: 'Stok kontrolü', en: 'Stock check' },
    icon: 'Boxes',
    tone: 'text-amber-300 bg-amber-500/15 border-amber-400/25',
    prompt: {
      tr: 'Depo stok listemi kontrol et ve kritik seviyedeki ürünleri listele.',
      en: 'Check my warehouse stock list and flag the products at critical level.',
    },
  },
  {
    id: 'kdv-hesapla',
    label: { tr: 'KDV hesapla', en: 'Calculate VAT' },
    icon: 'Percent',
    tone: 'text-violet-300 bg-violet-500/15 border-violet-400/25',
    prompt: {
      tr: 'Bu dönemin hesaplanan, indirilecek ve devreden KDV tutarlarını hesapla.',
      en: 'Work out this period’s output, input and carried-forward VAT.',
    },
    featureId: 'kdv-hesabi',
  },
  {
    id: 'banka-mutabakat',
    label: { tr: 'Banka mutabakatı', en: 'Bank reconciliation' },
    icon: 'Landmark',
    tone: 'text-sky-300 bg-sky-500/15 border-sky-400/25',
    prompt: {
      tr: 'Banka ekstresi ile muhasebe kayıtlarımı karşılaştır, farkları raporla.',
      en: 'Compare the bank statement with my ledger records and report the differences.',
    },
    featureId: 'banka-mutabakati',
  },
  {
    id: 'ihracat-danisman',
    label: { tr: 'İhracat danışmanı', en: 'Export advisor' },
    icon: 'Ship',
    tone: 'text-cyan-300 bg-cyan-500/15 border-cyan-400/25',
    prompt: {
      tr: 'Almanya’ya makine ihracatında gümrük ve teşvik süreçlerini anlat.',
      en: 'Walk me through customs and incentives for exporting machinery to Germany.',
    },
  },
  {
    id: 'rapor-olustur',
    label: { tr: 'Rapor oluştur', en: 'Build a report' },
    icon: 'FileBarChart2',
    tone: 'text-rose-300 bg-rose-500/15 border-rose-400/25',
    prompt: {
      tr: 'Bu çeyreğin mali özet raporunu tablo hâlinde hazırla.',
      en: 'Prepare this quarter’s financial summary report as a table.',
    },
  },
];

/**
 * Composer içinde sırayla yazılan (typewriter) örnek istemler.
 * İmleç alanın üzerine geldiğinde animasyon durur, metin sabit kalır.
 */
export const composerSuggestions: Localized[] = [
  { tr: 'Nisan dönemi KDV beyanımı kontrol et…', en: 'Check my April VAT return…' },
  { tr: 'Bu faturada tevkifat hatası var mı?', en: 'Is there a deduction error on this invoice?' },
  { tr: 'İhracat teşviklerinden hangisine uygunum?', en: 'Which export incentive do I qualify for?' },
  { tr: 'Banka ekstresindeki eşleşmeyen kayıtları bul…', en: 'Find the unmatched entries in my bank statement…' },
];
