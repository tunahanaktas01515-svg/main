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

  borsaTitle: 'Borsa',
  borsaDesc: 'Döviz ve emtia kurlarını canlı takip edin.',

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

  borsaTitle: 'Market',
  borsaDesc: 'Track currency and commodity rates live.',

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
