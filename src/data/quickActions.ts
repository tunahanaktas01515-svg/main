/**
 * Cenan konuşma motorunun altında yer alan 7 hızlı aksiyon.
 * Her aksiyon composer'a hazır bir istem yazar ve ilgili renk aksanını taşır.
 */
import type { CenanFeatureId } from '../types';

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  /** İkon rozetinin renk aksanı */
  tone: string;
  prompt: string;
  /** Varsa ilgili Cenan modülünün sistem promptu da sohbete enjekte edilir */
  featureId?: CenanFeatureId;
}

export const quickActions: QuickAction[] = [
  {
    id: 'belge-analizi',
    label: 'Belge analizi',
    icon: 'FileSearch',
    tone: 'text-indigo-300 bg-indigo-500/15 border-indigo-400/25',
    prompt: 'Yükleyeceğim belgeyi analiz et ve önemli kalemleri çıkar.',
    featureId: 'fatura-analizi',
  },
  {
    id: 'e-fatura',
    label: 'E-fatura oluştur',
    icon: 'ReceiptText',
    tone: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/25',
    prompt: 'Yeni bir e-fatura oluşturmak istiyorum, gerekli alanları sırayla sor.',
  },
  {
    id: 'stok-kontrol',
    label: 'Stok kontrolü',
    icon: 'Boxes',
    tone: 'text-amber-300 bg-amber-500/15 border-amber-400/25',
    prompt: 'Depo stok listemi kontrol et ve kritik seviyedeki ürünleri listele.',
  },
  {
    id: 'kdv-hesapla',
    label: 'KDV hesapla',
    icon: 'Percent',
    tone: 'text-violet-300 bg-violet-500/15 border-violet-400/25',
    prompt: 'Bu dönemin hesaplanan, indirilecek ve devreden KDV tutarlarını hesapla.',
    featureId: 'kdv-hesabi',
  },
  {
    id: 'banka-mutabakat',
    label: 'Banka mutabakatı',
    icon: 'Landmark',
    tone: 'text-sky-300 bg-sky-500/15 border-sky-400/25',
    prompt: 'Banka ekstresi ile muhasebe kayıtlarımı karşılaştır, farkları raporla.',
    featureId: 'banka-mutabakati',
  },
  {
    id: 'ihracat-danisman',
    label: 'İhracat danışmanı',
    icon: 'Ship',
    tone: 'text-cyan-300 bg-cyan-500/15 border-cyan-400/25',
    prompt: 'Almanya’ya makine ihracatında gümrük ve teşvik süreçlerini anlat.',
  },
  {
    id: 'rapor-olustur',
    label: 'Rapor oluştur',
    icon: 'FileBarChart2',
    tone: 'text-rose-300 bg-rose-500/15 border-rose-400/25',
    prompt: 'Bu çeyreğin mali özet raporunu tablo hâlinde hazırla.',
  },
];

/**
 * Composer içinde sırayla yazılan (typewriter) örnek istemler.
 * İmleç alanın üzerine geldiğinde animasyon durur, metin sabit kalır.
 */
export const composerSuggestions = [
  'Nisan dönemi KDV beyanımı kontrol et…',
  'Bu faturada tevkifat hatası var mı?',
  'İhracat teşviklerinden hangisine uygunum?',
  'Banka ekstresindeki eşleşmeyen kayıtları bul…',
];
