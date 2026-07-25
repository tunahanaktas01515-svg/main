import type { NewsItem } from '../types';

/**
 * Örnek (mock) haber verileri. Görsel alanları, tema ile uyumlu kalması için
 * katmanlı gradientlerle temsil edilir. Tüm metinler iki dilde tutulur.
 */
export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: {
      tr: 'İhracatçılara Yeni Dijital Teşvik Paketi Açıklandı',
      en: 'New Digital Incentive Package Announced for Exporters',
    },
    summary: {
      tr: 'Ticaret Bakanlığı, KOBİ’lerin dijital ihracat altyapısını güçlendirmek için hibe ve faiz desteğini kapsayan yeni bir paketi devreye aldı. Başvurular çevrim içi yapılabilecek.',
      en: 'The Ministry of Trade launched a package of grants and interest support to strengthen the digital export infrastructure of small businesses. Applications can be filed online.',
    },
    category: { tr: 'İhracat', en: 'Export' },
    source: { tr: 'Ticaret Gündemi', en: 'Trade Agenda' },
    readTime: { tr: '4 dk', en: '4 min' },
    publishedAt: { tr: '2 sa önce', en: '2 h ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_25%_25%,rgba(129,140,248,0.55),transparent_60%),radial-gradient(60%_60%_at_80%_75%,rgba(139,92,246,0.45),transparent_60%),linear-gradient(140deg,#131233,#0a0a18)]',
    featured: true,
  },
  {
    id: 'n2',
    title: {
      tr: 'Yapay Zeka Destekli Muhasebe Çözümleri Hızla Yaygınlaşıyor',
      en: 'AI-Powered Accounting Tools Are Spreading Fast',
    },
    summary: {
      tr: 'Şirketler KDV, stopaj ve tevkifat hesaplamalarındaki hata oranını düşürmek için otonom muhasebe asistanlarına yöneliyor. Denetim süreleri ortalama %40 kısalıyor.',
      en: 'Companies are turning to autonomous accounting assistants to cut error rates in VAT, withholding and deduction calculations. Audit cycles are shortening by around 40%.',
    },
    category: { tr: 'Teknoloji', en: 'Technology' },
    source: { tr: 'Fintek Radar', en: 'Fintech Radar' },
    readTime: { tr: '6 dk', en: '6 min' },
    publishedAt: { tr: '3 sa önce', en: '3 h ago' },
    gradient:
      'bg-[radial-gradient(65%_65%_at_75%_25%,rgba(56,189,248,0.45),transparent_60%),radial-gradient(60%_60%_at_25%_80%,rgba(99,102,241,0.5),transparent_60%),linear-gradient(140deg,#0b1530,#070a16)]',
    featured: true,
  },
  {
    id: 'n3',
    title: {
      tr: 'Merkez Bankası Faiz Kararını Açıkladı',
      en: 'Central Bank Announces Its Rate Decision',
    },
    summary: {
      tr: 'Piyasalar beklentiye paralel kararın ardından döviz kurlarında sınırlı hareket gördü.',
      en: 'Markets saw limited movement in currency rates after the decision landed in line with expectations.',
    },
    category: { tr: 'Ekonomi', en: 'Economy' },
    source: { tr: 'Piyasa Bülteni', en: 'Market Bulletin' },
    readTime: { tr: '3 dk', en: '3 min' },
    publishedAt: { tr: '5 sa önce', en: '5 h ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_30%_20%,rgba(148,163,184,0.35),transparent_60%),linear-gradient(150deg,#141522,#0a0a12)]',
  },
  {
    id: 'n4',
    title: {
      tr: 'E-Fatura Zorunluluğu Kapsamı Genişliyor',
      en: 'E-Invoice Mandate Widens Its Scope',
    },
    summary: {
      tr: 'Gelir İdaresi, e-fatura mükellefiyet ciro sınırını yeniden belirledi; geçiş takvimi netleşti.',
      en: 'The revenue administration reset the turnover threshold for e-invoicing and published the transition calendar.',
    },
    category: { tr: 'Mevzuat', en: 'Regulation' },
    source: { tr: 'Resmî Gündem', en: 'Official Gazette' },
    readTime: { tr: '5 dk', en: '5 min' },
    publishedAt: { tr: '7 sa önce', en: '7 h ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_70%_30%,rgba(167,139,250,0.45),transparent_60%),linear-gradient(150deg,#18122b,#0b0912)]',
  },
  {
    id: 'n5',
    title: {
      tr: 'Kripto Varlıklarda Vergilendirme Taslağı Şekilleniyor',
      en: 'Crypto Asset Taxation Draft Takes Shape',
    },
    summary: {
      tr: 'Yeni düzenleme, kripto varlık işlemlerinde beyan ve stopaj çerçevesini netleştirmeyi hedefliyor.',
      en: 'The draft aims to clarify the declaration and withholding framework for crypto asset transactions.',
    },
    category: { tr: 'Finans', en: 'Finance' },
    source: { tr: 'Vergi Analiz', en: 'Tax Analysis' },
    readTime: { tr: '7 dk', en: '7 min' },
    publishedAt: { tr: '9 sa önce', en: '9 h ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_25%_75%,rgba(34,211,238,0.35),transparent_60%),linear-gradient(150deg,#0a1a24,#050c12)]',
  },
  {
    id: 'n6',
    title: {
      tr: 'Küresel Tedarik Zincirinde Yeni Dengeler',
      en: 'New Balances in the Global Supply Chain',
    },
    summary: {
      tr: 'İhracatçı firmalar alternatif lojistik rotalarına yönelerek navlun maliyetlerini optimize ediyor.',
      en: 'Exporters are shifting to alternative logistics routes to optimise freight costs.',
    },
    category: { tr: 'İhracat', en: 'Export' },
    source: { tr: 'Lojistik Haber', en: 'Logistics News' },
    readTime: { tr: '4 dk', en: '4 min' },
    publishedAt: { tr: '11 sa önce', en: '11 h ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_50%_25%,rgba(99,102,241,0.42),transparent_60%),linear-gradient(150deg,#101427,#080a14)]',
  },
  {
    id: 'n7',
    title: {
      tr: 'Dijital Dönüşümde KOBİ Desteği Artıyor',
      en: 'Support for Small Business Digitalisation Grows',
    },
    summary: {
      tr: 'Süreç otomasyonu yatırımları, küçük işletmelerde çalışan başına verimliliği belirgin biçimde artırıyor.',
      en: 'Process automation investment is visibly lifting output per employee in small companies.',
    },
    category: { tr: 'Teknoloji', en: 'Technology' },
    source: { tr: 'KOBİ Bülten', en: 'SME Bulletin' },
    readTime: { tr: '5 dk', en: '5 min' },
    publishedAt: { tr: '13 sa önce', en: '13 h ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_75%_70%,rgba(192,132,252,0.4),transparent_60%),linear-gradient(150deg,#191029,#0a0713)]',
  },
  {
    id: 'n8',
    title: {
      tr: 'Gümrük İşlemlerinde Tek Pencere Sistemi Genişledi',
      en: 'Single Window Customs System Expands',
    },
    summary: {
      tr: 'Beyanname süreçleri tek portalda toplanarak ortalama işlem süresi 2 güne indi.',
      en: 'Declaration processes moved onto a single portal, cutting the average turnaround to two days.',
    },
    category: { tr: 'İhracat', en: 'Export' },
    source: { tr: 'Gümrük Ajansı', en: 'Customs Agency' },
    readTime: { tr: '6 dk', en: '6 min' },
    publishedAt: { tr: '1 gün önce', en: '1 day ago' },
    gradient:
      'bg-[radial-gradient(70%_70%_at_35%_65%,rgba(59,130,246,0.42),transparent_60%),linear-gradient(150deg,#0b1424,#060a12)]',
  },
];
