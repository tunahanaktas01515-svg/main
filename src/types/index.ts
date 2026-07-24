/** Uygulama genelinde kullanılan ortak tip tanımları */

// Üst barda seçilebilen ana sayfalar
export type PageId = 'ana-sayfa' | 'cenan' | 'haberler' | 'deep-web';

// Tema modu (şu an koyu tema önceliklendirilmiştir)
export type ThemeMode = 'dark' | 'light';

// Cenan AI sohbet modelleri
export type ModelId = 'cenan-ultra' | 'cenan-pro';

export interface ModelOption {
  id: ModelId;
  label: string;
  paramSize: string;
  note?: string;
  description: string;
}

// Sohbet mesajı rolleri
export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatAttachment {
  id: string;
  name: string;
  sizeLabel: string;
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
  icon: string;
  accent: string; // gradient sınıfı
  stats: { label: string; value: string }[];
  systemPrompt: string;
  greeting: string;
}

// Sidebar menü yapısı
export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string; // lucide-react ikon adı
  badge?: string;
  page?: PageId;
  featureId?: CenanFeatureId;
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
  source: string;
  readTime: string;
  publishedAt: string;
  gradient: string; // görsel yerine kullanılan gradient
  featured?: boolean;
}

// Piyasa verisi (sparkline serisi ile)
export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  value: string;
  changePercent: number;
  series: number[];
}

// Dashboard üstündeki KPI kartları
export interface KpiCard {
  id: string;
  label: string;
  value: string;
  changeLabel: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

// Yapay zekanın tespit ettiği fırsatlar
export interface Opportunity {
  id: string;
  title: string;
  subtitle: string;
  score: number; // 0-100 güven skoru
  accent: string;
}

// Sistem / analiz uyarıları
export interface AlertItem {
  id: string;
  title: string;
  meta: string;
  severity: 'info' | 'warning' | 'critical';
}

// Arka plan seçenekleri: görsel veya CSS gradient tabanlı
export interface BackgroundOption {
  id: string;
  name: string;
  kind: 'image' | 'gradient';
  /** kind === 'image' için tam boy görsel yolu */
  src?: string;
  /** kind === 'image' için küçük önizleme yolu */
  thumb?: string;
  /** kind === 'gradient' için tailwind sınıfları */
  className?: string;
  /** Görsel arka planların üstüne uygulanan karartma yoğunluğu (0-1) */
  dim?: number;
}
