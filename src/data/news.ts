import type { NewsItem, MarketItem } from '../types';

/**
 * Örnek (mock) haber verileri. Gerçek görsel yerine gradient kullanılıyor,
 * böylece dış görsel bağımlılığı olmadan glass estetiği korunuyor.
 */
export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: 'İhracatçılara Yeni Teşvik Paketi Açıklandı',
    summary:
      'Ticaret Bakanlığı, KOBİ\'lerin dijital ihracat altyapısını güçlendirmek için yeni bir destek paketini devreye aldı.',
    category: 'İhracat',
    readTime: '4 dk',
    gradient: 'from-indigo-500/40 via-violet-500/30 to-blue-600/40',
    featured: true,
  },
  {
    id: 'n2',
    title: 'Yapay Zeka Destekli Muhasebe Çözümleri Yükselişte',
    summary:
      'Şirketler, KDV ve stopaj hesaplamalarında hata oranını düşürmek için otonom muhasebe asistanlarına yöneliyor.',
    category: 'Teknoloji',
    readTime: '6 dk',
    gradient: 'from-blue-600/40 via-indigo-500/30 to-purple-600/40',
    featured: true,
  },
  {
    id: 'n3',
    title: 'Merkez Bankası Faiz Kararını Açıkladı',
    summary: 'Piyasalar beklenen kararın ardından döviz kurlarında sınırlı hareket gördü.',
    category: 'Ekonomi',
    readTime: '3 dk',
    gradient: 'from-slate-600/40 to-indigo-600/30',
  },
  {
    id: 'n4',
    title: 'E-Fatura Zorunluluğu Kapsamı Genişliyor',
    summary: 'Gelir İdaresi, e-fatura mükellefiyet sınırını yeniden belirledi.',
    category: 'Mevzuat',
    readTime: '5 dk',
    gradient: 'from-violet-600/40 to-fuchsia-600/20',
  },
  {
    id: 'n5',
    title: 'Kripto Varlıklarda Vergilendirme Tartışması',
    summary: 'Yeni düzenleme taslağı, kripto varlık işlemlerine ilişkin vergi çerçevesini netleştirmeyi hedefliyor.',
    category: 'Finans',
    readTime: '7 dk',
    gradient: 'from-blue-500/40 to-cyan-500/20',
  },
  {
    id: 'n6',
    title: 'Küresel Tedarik Zincirinde Yeni Dengeler',
    summary: 'İhracatçı firmalar, alternatif lojistik rotalarına yönelerek maliyetlerini optimize ediyor.',
    category: 'İhracat',
    readTime: '4 dk',
    gradient: 'from-indigo-600/40 to-slate-700/30',
  },
  {
    id: 'n7',
    title: 'Dijital Dönüşümde KOBİ Desteği Artıyor',
    summary: 'Yapay zeka tabanlı süreç otomasyonu, küçük işletmelerin verimliliğini artırıyor.',
    category: 'Teknoloji',
    readTime: '5 dk',
    gradient: 'from-purple-600/40 to-indigo-700/30',
  },
];

/**
 * Örnek piyasa/borsa özeti verileri.
 */
export const marketItems: MarketItem[] = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', value: '$67,240', changePercent: 2.4 },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', value: '$3,512', changePercent: 1.1 },
  { id: 'xau', symbol: 'XAU', name: 'Altın (Ons)', value: '$2,384', changePercent: -0.3 },
  { id: 'usd', symbol: 'USD/TRY', name: 'Dolar', value: '32.86', changePercent: 0.6 },
  { id: 'eur', symbol: 'EUR/TRY', name: 'Euro', value: '35.41', changePercent: 0.2 },
];
