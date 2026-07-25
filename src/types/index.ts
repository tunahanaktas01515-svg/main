/** Uygulama genelinde kullanılan ortak tip tanımları */

import type { TranslationKey } from '../i18n/dictionary';

// Arayüz dili
export type Language = 'tr' | 'en';

/** İki dilde birden tutulan içerik metni */
export interface Localized {
  tr: string;
  en: string;
}

// Üst barda seçilebilen ana sayfalar
export type PageId = 'ana-sayfa' | 'cenan' | 'haberler' | 'deep-web' | 'ajanlar' | 'borsa';

/** Konuşma motorunun (composer) ve mesaj balonlarının boyut tercihi */
export type UiSize = 'small' | 'large';

// Tema modu
export type ThemeMode = 'dark' | 'light';

/** İkon ve yüzey görünümünü belirleyen stil teması */
export type SurfaceThemeId = 'glass' | 'metallic' | 'iconic' | 'white' | 'transparent';

export interface SurfaceTheme {
  id: SurfaceThemeId;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  /** Önizleme karesinde kullanılan tailwind sınıfları */
  preview: string;
}

// Cenan AI sohbet modelleri
export type ModelId = 'cenan-ultra' | 'cenan-pro';

export interface ModelOption {
  id: ModelId;
  label: string;
  paramSize: string;
  note?: Localized;
  description: Localized;
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
  title: Localized;
  description: Localized;
  icon: string;
  accent: string; // gradient sınıfı
  stats: { label: Localized; value: string }[];
  systemPrompt: Localized;
  greeting: Localized;
}

// Haber verisi
export interface NewsItem {
  id: string;
  title: Localized;
  summary: Localized;
  category: Localized;
  source: Localized;
  readTime: Localized;
  publishedAt: Localized;
  gradient: string; // görsel yerine kullanılan gradient
  featured?: boolean;
}

// Piyasa verisi (sparkline serisi ile)
export interface MarketAsset {
  id: string;
  symbol: string;
  name: Localized;
  value: string;
  changePercent: number;
  series: number[];
}

// Dashboard üstündeki KPI kartları
export interface KpiCard {
  id: string;
  label: Localized;
  value: string;
  changeLabel: Localized;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

// Yapay zekanın tespit ettiği fırsatlar
export interface Opportunity {
  id: string;
  title: Localized;
  subtitle: Localized;
  score: number; // 0-100 güven skoru
  accent: string;
}

// Sistem / analiz uyarıları
export interface AlertItem {
  id: string;
  title: Localized;
  meta: Localized;
  severity: 'info' | 'warning' | 'critical';
}

// Arka plan seçenekleri: görsel, gradient veya kullanıcının yüklediği dosya
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
  /** Kullanıcının bilgisayarından yüklediği arka planlar için */
  custom?: boolean;
}

/* --- Ajanlar --- */

export type AgentStatus = 'active' | 'available' | 'soon';

export interface AgentTemplate {
  id: string;
  /** Kart üzerinde büyük harflerle görünen motor adı */
  engine: string;
  title: Localized;
  description: Localized;
  icon: string;
  status: AgentStatus;
  /** Kart zeminindeki renk aksanı */
  accent: string;
  runs?: string;
}

/* --- Hesap / paket --- */

export type PlanId = 'standart' | 'pro' | 'business' | 'unlimited';

export interface PlanOption {
  id: PlanId;
  name: string;
  taglineKey: TranslationKey;
  /** Rozet için tailwind renk sınıfları */
  badge: string;
  credits: string;
}

export interface UserProfile {
  displayName: string;
  email: string;
  emailVerified: boolean;
  /** Yüklenen profil fotoğrafının data URL'i */
  avatarUrl: string | null;
  plan: PlanId;
}

/* --- Deep Web --- */

export type ResearchStatus = 'running' | 'done';

/** Yapılan her arama, otomatik başlıklandırılmış bir geçmiş kaydına dönüşür */
export interface ResearchRecord {
  id: string;
  /** İçeriğe göre otomatik üretilen başlık */
  title: string;
  query: string;
  /** Aramada seçili olan kaynak türleri */
  modes: string[];
  status: ResearchStatus;
  sourceCount: number;
  createdAt: string;
}

export type WatchTermStatus = 'idle' | 'searching' | 'done';

export interface WatchTerm {
  id: string;
  term: string;
  hits: number;
  risk: 'low' | 'medium' | 'high';
  status: WatchTermStatus;
}

/* --- Konum --- */

export type LocationStatus = 'idle' | 'asking' | 'granted' | 'denied' | 'error';

export interface LocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
  label: string;
}
