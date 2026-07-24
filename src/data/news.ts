import type { NewsItem } from '../types';

/**
 * Örnek (mock) haber verileri. Görsel alanları, tema ile uyumlu kalması için
 * katmanlı gradientlerle temsil edilir.
 */
export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: 'İhracatçılara Yeni Dijital Teşvik Paketi Açıklandı',
    summary:
      'Ticaret Bakanlığı, KOBİ\'lerin dijital ihracat altyapısını güçlendirmek için hibe ve faiz desteğini kapsayan yeni bir paketi devreye aldı. Başvurular çevrim içi yapılabilecek.',
    category: 'İhracat',
    source: 'Ticaret Gündemi',
    readTime: '4 dk',
    publishedAt: '2 sa önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_25%_25%,rgba(129,140,248,0.55),transparent_60%),radial-gradient(60%_60%_at_80%_75%,rgba(139,92,246,0.45),transparent_60%),linear-gradient(140deg,#131233,#0a0a18)]',
    featured: true,
  },
  {
    id: 'n2',
    title: 'Yapay Zeka Destekli Muhasebe Çözümleri Hızla Yaygınlaşıyor',
    summary:
      'Şirketler KDV, stopaj ve tevkifat hesaplamalarındaki hata oranını düşürmek için otonom muhasebe asistanlarına yöneliyor. Denetim süreleri ortalama %40 kısalıyor.',
    category: 'Teknoloji',
    source: 'Fintek Radar',
    readTime: '6 dk',
    publishedAt: '3 sa önce',
    gradient:
      'bg-[radial-gradient(65%_65%_at_75%_25%,rgba(56,189,248,0.45),transparent_60%),radial-gradient(60%_60%_at_25%_80%,rgba(99,102,241,0.5),transparent_60%),linear-gradient(140deg,#0b1530,#070a16)]',
    featured: true,
  },
  {
    id: 'n3',
    title: 'Merkez Bankası Faiz Kararını Açıkladı',
    summary: 'Piyasalar beklentiye paralel kararın ardından döviz kurlarında sınırlı hareket gördü.',
    category: 'Ekonomi',
    source: 'Piyasa Bülteni',
    readTime: '3 dk',
    publishedAt: '5 sa önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_30%_20%,rgba(148,163,184,0.35),transparent_60%),linear-gradient(150deg,#141522,#0a0a12)]',
  },
  {
    id: 'n4',
    title: 'E-Fatura Zorunluluğu Kapsamı Genişliyor',
    summary: 'Gelir İdaresi, e-fatura mükellefiyet ciro sınırını yeniden belirledi; geçiş takvimi netleşti.',
    category: 'Mevzuat',
    source: 'Resmî Gündem',
    readTime: '5 dk',
    publishedAt: '7 sa önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_70%_30%,rgba(167,139,250,0.45),transparent_60%),linear-gradient(150deg,#18122b,#0b0912)]',
  },
  {
    id: 'n5',
    title: 'Kripto Varlıklarda Vergilendirme Taslağı Şekilleniyor',
    summary: 'Yeni düzenleme, kripto varlık işlemlerinde beyan ve stopaj çerçevesini netleştirmeyi hedefliyor.',
    category: 'Finans',
    source: 'Vergi Analiz',
    readTime: '7 dk',
    publishedAt: '9 sa önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_25%_75%,rgba(34,211,238,0.35),transparent_60%),linear-gradient(150deg,#0a1a24,#050c12)]',
  },
  {
    id: 'n6',
    title: 'Küresel Tedarik Zincirinde Yeni Dengeler',
    summary: 'İhracatçı firmalar alternatif lojistik rotalarına yönelerek navlun maliyetlerini optimize ediyor.',
    category: 'İhracat',
    source: 'Lojistik Haber',
    readTime: '4 dk',
    publishedAt: '11 sa önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_50%_25%,rgba(99,102,241,0.42),transparent_60%),linear-gradient(150deg,#101427,#080a14)]',
  },
  {
    id: 'n7',
    title: 'Dijital Dönüşümde KOBİ Desteği Artıyor',
    summary: 'Süreç otomasyonu yatırımları, küçük işletmelerde çalışan başına verimliliği belirgin biçimde artırıyor.',
    category: 'Teknoloji',
    source: 'KOBİ Bülten',
    readTime: '5 dk',
    publishedAt: '13 sa önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_75%_70%,rgba(192,132,252,0.4),transparent_60%),linear-gradient(150deg,#191029,#0a0713)]',
  },
  {
    id: 'n8',
    title: 'Gümrük İşlemlerinde Tek Pencere Sistemi Genişledi',
    summary: 'Beyanname süreçleri tek portalda toplanarak ortalama işlem süresi 2 güne indi.',
    category: 'İhracat',
    source: 'Gümrük Ajansı',
    readTime: '6 dk',
    publishedAt: '1 gün önce',
    gradient:
      'bg-[radial-gradient(70%_70%_at_35%_65%,rgba(59,130,246,0.42),transparent_60%),linear-gradient(150deg,#0b1424,#060a12)]',
  },
];
