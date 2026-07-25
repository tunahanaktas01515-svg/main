import type { PageId } from '../types';
import type { TranslationKey } from '../i18n/dictionary';

export interface NavItem {
  id: string;
  labelKey: TranslationKey;
  icon: string;
  /** Tıklanınca gidilecek sayfa (yoksa yalnızca seçim durumu değişir) */
  page?: PageId;
  badge?: string;
  /** Henüz hazır olmayan bölümler için */
  soon?: boolean;
  /** Sayfa açıldığında odaklanılacak bölüm — Deep Web ve Ajanlar sekmelerinde kullanılır */
  section?: string;
  /** Tıklanınca açılacak katman üstü pencere */
  overlay?: 'settings' | 'account' | 'background';
}

export interface NavGroup {
  id: string;
  titleKey: TranslationKey;
  icon: string;
  items: NavItem[];
}

/**
 * Sol menünün grup + alt öğe hiyerarşisi.
 * Sayfası olan öğeler doğrudan yönlendirir, `overlay` taşıyanlar ilgili
 * pencereyi açar, diğerleri yalnızca seçim durumunu günceller.
 */
export const navGroups: NavGroup[] = [
  {
    id: 'ana-sayfa',
    titleKey: 'group.home',
    icon: 'House',
    items: [
      { id: 'dashboard', labelKey: 'item.dashboard', icon: 'LayoutDashboard', page: 'ana-sayfa' },
      { id: 'borsa-takibi', labelKey: 'item.marketWatch', icon: 'CandlestickChart', page: 'deep-web', section: 'market' },
    ],
  },
  {
    id: 'ajanlar',
    titleKey: 'group.agents',
    icon: 'Bot',
    items: [
      { id: 'aktif-ajanlar', labelKey: 'item.activeAgents', icon: 'Activity', badge: '3', page: 'ajanlar', section: 'active' },
      { id: 'yeni-ajan', labelKey: 'item.newAgent', icon: 'Plus', page: 'ajanlar', section: 'new' },
      { id: 'ajan-gecmisi', labelKey: 'item.agentHistory', icon: 'History', soon: true },
    ],
  },
  {
    id: 'cenan-ai',
    titleKey: 'group.cenanAi',
    icon: 'Sparkles',
    items: [
      { id: 'sohbet', labelKey: 'item.chat', icon: 'MessageSquare', page: 'cenan' },
      { id: 'api-ai', labelKey: 'item.apiAi', icon: 'Plug2', soon: true },
    ],
  },
  {
    id: 'deep-web',
    titleKey: 'group.deepweb',
    icon: 'Radar',
    items: [
      { id: 'arama', labelKey: 'item.search', icon: 'Search', page: 'deep-web', section: 'search' },
      { id: 'kaynaklar', labelKey: 'item.sources', icon: 'ListTree', page: 'deep-web', section: 'sources' },
      { id: 'izleme-listesi', labelKey: 'item.watchlist', icon: 'Eye', page: 'deep-web', section: 'watchlist' },
    ],
  },
  {
    id: 'araclar',
    titleKey: 'group.tools',
    icon: 'Wrench',
    items: [
      { id: 'hesap-makinesi', labelKey: 'item.calculator', icon: 'Calculator', soon: true },
      { id: 'kdv-hesaplayici', labelKey: 'item.vatCalculator', icon: 'Percent', soon: true },
      { id: 'doviz-cevirici', labelKey: 'item.currencyConverter', icon: 'ArrowLeftRight', soon: true },
      { id: 'net-brut', labelKey: 'item.netGross', icon: 'Scale', soon: true },
      { id: 'stopaj', labelKey: 'item.withholding', icon: 'Receipt', soon: true },
      { id: 'vade-tarih', labelKey: 'item.dueDate', icon: 'CalendarClock', soon: true },
    ],
  },
  {
    id: 'ayarlar',
    titleKey: 'group.settings',
    icon: 'Settings',
    items: [
      { id: 'hesap', labelKey: 'item.account', icon: 'UserCog', overlay: 'account' },
      { id: 'api', labelKey: 'item.integrations', icon: 'Plug', soon: true },
    ],
  },
];
