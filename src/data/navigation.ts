import type { PageId } from '../types';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  /** Tıklanınca gidilecek sayfa (yoksa yalnızca seçim durumu değişir) */
  page?: PageId;
  badge?: string;
  /** Henüz hazır olmayan bölümler için */
  soon?: boolean;
}

export interface NavGroup {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

/**
 * Sol menünün grup + alt öğe hiyerarşisi.
 * Sayfası olan öğeler doğrudan yönlendirir, diğerleri seçim durumunu günceller.
 */
export const navGroups: NavGroup[] = [
  {
    id: 'ana-sayfa',
    title: 'Ana Sayfa',
    icon: 'House',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', page: 'ana-sayfa' },
      { id: 'borsa-takibi', label: 'Borsa Takibi', icon: 'CandlestickChart', page: 'deep-web' },
    ],
  },
  {
    id: 'ajanlar',
    title: 'Ajanlar',
    icon: 'Bot',
    items: [
      { id: 'aktif-ajanlar', label: 'Aktif Ajanlar', icon: 'Activity', badge: '3', soon: true },
      { id: 'yeni-ajan', label: 'Yeni Ajan Oluştur', icon: 'Plus', soon: true },
      { id: 'ajan-gecmisi', label: 'Ajan Geçmişi', icon: 'History', soon: true },
    ],
  },
  {
    id: 'cenan-ai',
    title: 'Cenan AI',
    icon: 'Sparkles',
    items: [
      { id: 'sohbet', label: 'Sohbet', icon: 'MessageSquare', page: 'cenan' },
      { id: 'ozel-promptlar', label: 'Özel Promptlar', icon: 'FileCode2', soon: true },
      { id: 'model-secimi', label: 'Model Seçimi', icon: 'Cpu', soon: true },
    ],
  },
  {
    id: 'deep-web',
    title: 'Deep Web',
    icon: 'Radar',
    items: [
      { id: 'arama', label: 'Arama', icon: 'Search', page: 'deep-web' },
      { id: 'kaynaklar', label: 'Kaynaklar / Sonuçlar', icon: 'ListTree', page: 'deep-web' },
      { id: 'izleme-listesi', label: 'İzleme Listesi', icon: 'Eye', page: 'deep-web' },
    ],
  },
  {
    id: 'araclar',
    title: 'Araçlar',
    icon: 'Wrench',
    items: [
      { id: 'hesap-makinesi', label: 'Hesap Makinesi (KDV’li)', icon: 'Calculator', soon: true },
      { id: 'kdv-hesaplayici', label: 'KDV Hesaplayıcı', icon: 'Percent', soon: true },
      { id: 'doviz-cevirici', label: 'Döviz Çevirici', icon: 'ArrowLeftRight', soon: true },
      { id: 'net-brut', label: 'Net / Brüt Hesaplayıcı', icon: 'Scale', soon: true },
      { id: 'stopaj', label: 'Stopaj Hesaplayıcı', icon: 'Receipt', soon: true },
      { id: 'vade-tarih', label: 'Vade / Tarih Hesaplayıcı', icon: 'CalendarClock', soon: true },
    ],
  },
  {
    id: 'ayarlar',
    title: 'Ayarlar',
    icon: 'Settings',
    items: [
      { id: 'hesap', label: 'Hesap', icon: 'UserCog', soon: true },
      { id: 'api', label: 'API / Entegrasyonlar', icon: 'Plug', soon: true },
    ],
  },
];
