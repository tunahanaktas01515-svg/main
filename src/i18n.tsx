import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'tr' | 'en';

const tr = {
  navEv: 'Ev',
  navIslemler: 'İşlemler',
  navBorsa: 'Borsa',
  navAjanlar: 'Ajanlar',

  settings: 'Ayarlar',
  profile: 'profili',
  language: 'Dil',

  welcome: 'Hoşgeldin,',
  date: 'Sal, 26 Nisan 2026',

  creditUsed: 'Bugün Kullanılan Kredi',
  creditUsedHint: 'bugün',
  creditRemaining: 'Kalan Kredi',
  creditRemainingHint: 'toplam 10.000',

  quickTitle: 'Hızlı Bakış',
  quickSub: 'Bugünün özeti',

  timelineTitle: 'Günlük İş Akışı',
  timelineSub: 'Bugün tamamlanan işlemler',
  timelineCount: 'işlem',

  ekstreTitle: 'Ekstremelerim',
  ekstreFoot: 'Ekstre geçmişi & otonom ödemeler',

  borsaBtn: 'Borsa',
  detay: 'Detay',

  islemlerTitle: 'İşlemler',
  islemlerDesc: 'Muhasebe ve ihracat işlemlerinizi buradan yönetin.',
  thTime: 'Saat',
  thTx: 'İşlem',
  thType: 'Tür',
  thStatus: 'Durum',
  statusDone: 'Tamamlandı',

  borsaTitle: 'Borsa Takip',
  borsaDesc: 'Canlı döviz kurları, grafikler ve piyasa hareketleri.',
  dovizEndeksi: 'Döviz Endeksi',
  paraBirimi: 'Para Birimi',
  ortalamaBugun: 'ortalama bugün',
  yuksek24: '24s Yüksek',
  dusuk24: '24s Düşük',
  degisim: 'Değişim',
  digerDovizler: 'Diğer Dövizler',
  baglantiStabil: 'Bağlantı Stabil',
  ranges: ['1G', '7G', '1A', '3A', '6A', '1Y', 'TÜMÜ'],

  borsaOverview: 'Genel Bakış',
  borsaSearch: 'Döviz ara...',
  sideStats: 'İstatistikler',
  sideMarket: 'Piyasa',
  sidePairs: 'Pariteler',
  sideMajor: 'Majör Pariteler',
  sideCross: 'Çapraz Kurlar',
  sideMetals: 'Değerli Madenler',
  sideSupport: 'Destek',
  sideSettings: 'Ayarlar',
  baseTry: '₺ TRY Bazlı',
  statVolume: 'Günlük Hacim',
  statReturn: 'Ortalama Getiri',
  generalStats: 'Genel İstatistikler',
  timePills: ['Bugün', 'Hafta', 'Ay', '6 Ay', 'Yıl'],
  thDoviz: 'Döviz',
  thGunluk: 'Günlük',
  thDeger: 'Değer',
  thDurum: 'Durum',
  thLikidite: 'Likidite',
  stateUp: 'Yükseliş',
  stateDown: 'Düşüş',

  ajanlarTitle: 'Ajanlar',
  ajanlarDesc: 'Otonom iş ajanlarınızı yönetin ve izleyin.',
  statusActive: 'Aktif',
  statusPending: 'Beklemede',

  kindInvoice: 'Fatura',
  kindExport: 'İhracat',
  kindPayment: 'Ödeme',
  kindReport: 'Rapor',

  navCenanAI: 'Cenan AI',
  aiTitle: 'Ben Cenan',
  aiSubtitle: 'Ben Sizler İçin oluşturuldum',
  aiPlaceholder: 'Bir şey sorun ya da bir görev tanımlayın…',
  aiSuggest1: 'E-Fatura analizi',
  aiSuggest2: 'KDV hesaplama',
  aiSuggest3: 'Web ürün bilgisi araştırma',
  attachFile: 'Dosya yükle',
  attachPlugin: 'Eklenti ekle',
  attachMedia: 'Fotoğraf veya video ekle',
  modelAuto: 'Auto',
  modelPro: 'Cenan Pro',
  modelUltra: 'Cenan Ultra',

  profileInfo: 'Profil Bilgileri',
  login: 'Giriş Yap',
  logout: 'Çıkış Yap',
  guest: 'Misafir',
  loginTitle: 'Giriş Yap',
  loginSub: 'Cenan hesabınıza giriş yapın',
  fieldName: 'Ad Soyad',
  fieldEmail: 'E-posta',
  fieldPassword: 'Şifre',

  toggleMenu: 'Menü',
  homeLink: 'Ana Sayfa',
  quickActions: 'Hızlı İşlemler',
  smartHome: 'Akıllı Ev',
  backToWork: 'İş Paneline Dön',
  editBg: 'Görünümü düzenle',
  bgTitle: 'Arka Plan Seç',
  bgSub: 'Uygulama arka planını kişiselleştir.',
  wSky: 'Parçalı Bulutlu',
  wCharge: 'Şarj Durumu',
  wToday: 'Bugün',
  wEvent1: 'Ekip toplantısı · 14:00',
  wEvent2: 'KDV son gün · 26 Nis',
  phDesc: 'Bu bölüm hazırlanıyor. Yakında burada olacak.',
  phSoon: 'Yakında',
  phLine: 'Cenan bu modülü sizin için otomatikleştiriyor.',
  phCard1: 'Genel Bakış',
  phCard2: 'Son Hareketler',
  phCard3: 'AI Önerileri',
};

const en: typeof tr = {
  navEv: 'Home',
  navIslemler: 'Transactions',
  navBorsa: 'Market',
  navAjanlar: 'Agents',

  settings: 'Settings',
  profile: 'profile',
  language: 'Language',

  welcome: 'Welcome,',
  date: 'Tue, Apr 26 2026',

  creditUsed: 'Credit Used Today',
  creditUsedHint: 'today',
  creditRemaining: 'Remaining Credit',
  creditRemainingHint: 'of 10,000',

  quickTitle: 'Quick Overview',
  quickSub: "Today's summary",

  timelineTitle: 'Daily Work Flow',
  timelineSub: 'Completed today',
  timelineCount: 'actions',

  ekstreTitle: 'My Statements',
  ekstreFoot: 'Statement history & autonomous payments',

  borsaBtn: 'Market',
  detay: 'Details',

  islemlerTitle: 'Transactions',
  islemlerDesc: 'Manage your accounting and export operations here.',
  thTime: 'Time',
  thTx: 'Transaction',
  thType: 'Type',
  thStatus: 'Status',
  statusDone: 'Completed',

  borsaTitle: 'Market Tracker',
  borsaDesc: 'Live exchange rates, charts and market moves.',
  dovizEndeksi: 'Currency Index',
  paraBirimi: 'Currencies',
  ortalamaBugun: 'avg today',
  yuksek24: '24h High',
  dusuk24: '24h Low',
  degisim: 'Change',
  digerDovizler: 'Other Currencies',
  baglantiStabil: 'Connection Stable',
  ranges: ['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'],

  borsaOverview: 'Overview',
  borsaSearch: 'Search currency...',
  sideStats: 'Statistics',
  sideMarket: 'Market',
  sidePairs: 'Pairs',
  sideMajor: 'Major Pairs',
  sideCross: 'Cross Rates',
  sideMetals: 'Precious Metals',
  sideSupport: 'Support',
  sideSettings: 'Settings',
  baseTry: '₺ TRY Based',
  statVolume: 'Daily Volume',
  statReturn: 'Average Return',
  generalStats: 'General Statistics',
  timePills: ['Today', 'Week', 'Month', '6 Months', 'Year'],
  thDoviz: 'Currency',
  thGunluk: 'Daily',
  thDeger: 'Value',
  thDurum: 'State',
  thLikidite: 'Liquidity',
  stateUp: 'Rising',
  stateDown: 'Falling',

  ajanlarTitle: 'Agents',
  ajanlarDesc: 'Manage and monitor your autonomous work agents.',
  statusActive: 'Active',
  statusPending: 'Pending',

  kindInvoice: 'Invoice',
  kindExport: 'Export',
  kindPayment: 'Payment',
  kindReport: 'Report',

  navCenanAI: 'Cenan AI',
  aiTitle: 'I am Cenan',
  aiSubtitle: 'I was created for you',
  aiPlaceholder: 'Ask anything or describe a task…',
  aiSuggest1: 'E-invoice analysis',
  aiSuggest2: 'VAT calculation',
  aiSuggest3: 'Web product research',
  attachFile: 'Upload file',
  attachPlugin: 'Add plugin',
  attachMedia: 'Add photo or video',
  modelAuto: 'Auto',
  modelPro: 'Cenan Pro',
  modelUltra: 'Cenan Ultra',

  profileInfo: 'Profile Info',
  login: 'Log in',
  logout: 'Log out',
  guest: 'Guest',
  loginTitle: 'Log in',
  loginSub: 'Sign in to your Cenan account',
  fieldName: 'Full Name',
  fieldEmail: 'Email',
  fieldPassword: 'Password',

  toggleMenu: 'Menu',
  homeLink: 'Home',
  quickActions: 'Quick Actions',
  smartHome: 'Smart Home',
  backToWork: 'Back to Work',
  editBg: 'Edit appearance',
  bgTitle: 'Choose Background',
  bgSub: 'Personalize the app background.',
  wSky: 'Partly Cloudy',
  wCharge: 'Charge',
  wToday: 'Today',
  wEvent1: 'Team meeting · 2:00 PM',
  wEvent2: 'VAT due · Apr 26',
  phDesc: 'This section is being prepared. Coming soon.',
  phSoon: 'Soon',
  phLine: 'Cenan is automating this module for you.',
  phCard1: 'Overview',
  phCard2: 'Recent Activity',
  phCard3: 'AI Suggestions',
};

const dicts = { tr, en };

export type Dict = typeof tr;

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  L: Dict;
};

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('tr');
  return (
    <LanguageContext.Provider value={{ lang, setLang, L: dicts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
