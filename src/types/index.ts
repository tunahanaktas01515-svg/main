/** Uygulama genelinde kullanılan ortak tip tanımları */

// Üst barda seçilebilen ana sayfalar
export type PageId = 'ana-sayfa' | 'cenan' | 'haberler' | 'deep-web';

// Tema modu (şu an sadece koyu tema tam destekleniyor)
export type ThemeMode = 'dark' | 'light';

// Cenan AI sohbet modelleri
export type ModelId = 'cenan-ultra' | 'cenan-pro';

export interface ModelOption {
  id: ModelId;
  label: string;
  paramSize: string;
  note?: string;
}

// Sohbet mesajı rolleri
export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatAttachment {
  id: string;
  name: string;
  sizeLabel: string;
  progress: number; // 0-100, yükleme ilerlemesi
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
}

// Cenan modülü altındaki muhasebe özellikleri
export type CenanFeatureId = 'fatura-analizi' | 'banka-mutabakati' | 'kdv-hesabi';

export interface CenanFeature {
  id: CenanFeatureId;
  title: string;
  description: string;
  systemPrompt: string;
}

// Sidebar menü öğesi
export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string; // lucide-react ikon adı, dinamik render için
  onSelectPage?: PageId;
  cenanFeatureId?: CenanFeatureId;
}

export interface SidebarMenuGroup {
  id: string;
  title: string;
  items: SidebarMenuItem[];
}

// Haber verisi
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  gradient: string; // görsel yerine kullanılan gradient sınıfı
  featured?: boolean;
}

// Borsa / piyasa özeti kartı
export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  value: string;
  changePercent: number;
}

// Arka plan seçenekleri
export interface BackgroundOption {
  id: string;
  name: string;
  className: string; // arka plana uygulanan tailwind gradient sınıfları
}
