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

  ajanlarTitle: 'Ajanlar',
  ajanlarDesc: 'Otonom iş ajanlarınızı yönetin ve izleyin.',
  statusActive: 'Aktif',
  statusPending: 'Beklemede',

  kindInvoice: 'Fatura',
  kindExport: 'İhracat',
  kindPayment: 'Ödeme',
  kindReport: 'Rapor',
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

  ajanlarTitle: 'Agents',
  ajanlarDesc: 'Manage and monitor your autonomous work agents.',
  statusActive: 'Active',
  statusPending: 'Pending',

  kindInvoice: 'Invoice',
  kindExport: 'Export',
  kindPayment: 'Payment',
  kindReport: 'Report',
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
