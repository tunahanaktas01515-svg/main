import type { SidebarMenuGroup } from '../types';

/**
 * Sol sidebar menü yapısı. İki grup halinde düzenlenir: "Ana" ve "Cenan".
 */
export const sidebarMenuGroups: SidebarMenuGroup[] = [
  {
    id: 'ana',
    title: 'Ana',
    items: [
      { id: 'onemli-haberler', label: 'Önemli Haberler', icon: 'Newspaper', onSelectPage: 'haberler' },
      { id: 'borsa-hakkinda', label: 'Borsa Hakkında', icon: 'TrendingUp', onSelectPage: 'ana-sayfa' },
      { id: 'deep-web', label: 'Deep Web', icon: 'ShieldAlert', onSelectPage: 'deep-web' },
    ],
  },
  {
    id: 'cenan',
    title: 'Cenan',
    items: [
      { id: 'fatura-analizi', label: 'Fatura Analizi', icon: 'FileSearch', onSelectPage: 'cenan', cenanFeatureId: 'fatura-analizi' },
      { id: 'banka-mutabakati', label: 'Banka Mutabakatı', icon: 'Landmark', onSelectPage: 'cenan', cenanFeatureId: 'banka-mutabakati' },
      { id: 'kdv-hesabi', label: 'KDV Hesabı', icon: 'Calculator', onSelectPage: 'cenan', cenanFeatureId: 'kdv-hesabi' },
    ],
  },
];
