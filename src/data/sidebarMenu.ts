import type { SidebarMenuGroup } from '../types';

/**
 * Sol sidebar menü yapısı: "Ana" ve "Cenan" olmak üzere iki grup.
 * badge alanı, referans tasarımdaki sağ hizalı sayaç etiketini besler.
 */
export const sidebarMenuGroups: SidebarMenuGroup[] = [
  {
    id: 'ana',
    title: 'Ana',
    items: [
      { id: 'onemli-haberler', label: 'Önemli Haberler', icon: 'Newspaper', badge: '8', page: 'haberler' },
      { id: 'borsa-hakkinda', label: 'Borsa Hakkında', icon: 'CandlestickChart', page: 'ana-sayfa' },
      { id: 'deep-web', label: 'Deep Web', icon: 'Radar', badge: '3', page: 'deep-web' },
    ],
  },
  {
    id: 'cenan',
    title: 'Cenan',
    items: [
      {
        id: 'fatura-analizi',
        label: 'Fatura Analizi',
        icon: 'FileSearch',
        badge: '10',
        page: 'cenan',
        featureId: 'fatura-analizi',
      },
      {
        id: 'banka-mutabakati',
        label: 'Banka Mutabakatı',
        icon: 'Landmark',
        page: 'cenan',
        featureId: 'banka-mutabakati',
      },
      {
        id: 'kdv-hesabi',
        label: 'KDV Hesabı',
        icon: 'Calculator',
        page: 'cenan',
        featureId: 'kdv-hesabi',
      },
    ],
  },
];
