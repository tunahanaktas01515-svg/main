import type { AgentTemplate } from '../types';

/**
 * Ajan şablonları — tamamı n8n otomasyon motoru üzerinde çalışır.
 * İlk üçü kurulu ve çalışır durumda; kalanlar yakında açılacak.
 */
export const agentTemplates: AgentTemplate[] = [
  {
    id: 'fatura-toplayici',
    engine: 'n8n',
    title: { tr: 'Fatura Toplayıcı', en: 'Invoice Collector' },
    description: {
      tr: 'E-posta kutusundaki faturaları ayıklar, e-fatura portalıyla eşler ve muhasebeye düşer.',
      en: 'Pulls invoices out of the inbox, matches them with the e-invoice portal and files them.',
    },
    icon: 'ReceiptText',
    status: 'active',
    accent: 'from-indigo-400/70 to-violet-500/70',
    runs: '1.284',
  },
  {
    id: 'mutabakat-botu',
    engine: 'n8n',
    title: { tr: 'Mutabakat Botu', en: 'Reconciliation Bot' },
    description: {
      tr: 'Banka ekstresini her gece indirir, muhasebe kayıtlarıyla eşleştirir ve farkları raporlar.',
      en: 'Downloads the bank statement nightly, matches it with ledger records and reports the gaps.',
    },
    icon: 'Landmark',
    status: 'active',
    accent: 'from-blue-400/70 to-indigo-500/70',
    runs: '412',
  },
  {
    id: 'marka-bekcisi',
    engine: 'n8n',
    title: { tr: 'Marka Bekçisi', en: 'Brand Watchdog' },
    description: {
      tr: 'Pazar yerlerini ve kapalı ağları markanız için tarar, taklit listelerini bildirir.',
      en: 'Scans marketplaces and closed networks for your brand and flags counterfeit listings.',
    },
    icon: 'ShieldAlert',
    status: 'active',
    accent: 'from-emerald-400/70 to-teal-500/70',
    runs: '96',
  },
  {
    id: 'kdv-beyan',
    engine: 'n8n',
    title: { tr: 'KDV Beyan Hazırlayıcı', en: 'VAT Return Builder' },
    description: {
      tr: 'Dönem faturalarından beyanname taslağını üretir, eksik belgeleri listeler.',
      en: 'Builds the draft return from the period’s invoices and lists any missing documents.',
    },
    icon: 'Calculator',
    status: 'soon',
    accent: 'from-violet-400/70 to-fuchsia-500/70',
  },
  {
    id: 'stok-izleyici',
    engine: 'n8n',
    title: { tr: 'Stok İzleyici', en: 'Stock Monitor' },
    description: {
      tr: 'Depo seviyelerini izler, kritik eşiğin altına düşen ürünler için sipariş önerir.',
      en: 'Watches warehouse levels and suggests orders for products below the critical threshold.',
    },
    icon: 'Boxes',
    status: 'soon',
    accent: 'from-amber-400/70 to-orange-500/70',
  },
  {
    id: 'tedarikci-tarayici',
    engine: 'n8n',
    title: { tr: 'Tedarikçi Tarayıcı', en: 'Supplier Screener' },
    description: {
      tr: 'Yeni tedarikçilerin vergi, dava ve itibar kayıtlarını toplar, risk skoru üretir.',
      en: 'Collects tax, litigation and reputation records for new suppliers and scores the risk.',
    },
    icon: 'Building2',
    status: 'soon',
    accent: 'from-sky-400/70 to-cyan-500/70',
  },
  {
    id: 'kur-bildirimi',
    engine: 'n8n',
    title: { tr: 'Kur Alarmı', en: 'FX Alert' },
    description: {
      tr: 'Belirlediğiniz kur seviyelerini izler, eşik aşıldığında anında haber verir.',
      en: 'Watches the rate levels you set and pings you the moment a threshold is crossed.',
    },
    icon: 'TrendingUp',
    status: 'soon',
    accent: 'from-rose-400/70 to-pink-500/70',
  },
  {
    id: 'gumruk-takip',
    engine: 'n8n',
    title: { tr: 'Gümrük Takipçisi', en: 'Customs Tracker' },
    description: {
      tr: 'Beyanname ve konşimento durumlarını takip eder, gecikmeleri önceden bildirir.',
      en: 'Follows declaration and bill of lading status and warns about delays in advance.',
    },
    icon: 'Ship',
    status: 'soon',
    accent: 'from-teal-400/70 to-emerald-500/70',
  },
  {
    id: 'tahsilat-hatirlatici',
    engine: 'n8n',
    title: { tr: 'Tahsilat Hatırlatıcı', en: 'Collection Reminder' },
    description: {
      tr: 'Vadesi geçen alacaklar için kademeli hatırlatma e-postaları gönderir.',
      en: 'Sends escalating reminder emails for receivables past their due date.',
    },
    icon: 'CalendarClock',
    status: 'soon',
    accent: 'from-indigo-400/70 to-blue-500/70',
  },
  {
    id: 'mevzuat-ozeti',
    engine: 'n8n',
    title: { tr: 'Mevzuat Özetleyici', en: 'Regulation Digest' },
    description: {
      tr: 'Resmî Gazete ve tebliğleri tarar, sizi ilgilendiren değişiklikleri özetler.',
      en: 'Scans the official gazette and circulars and summarises the changes that affect you.',
    },
    icon: 'BookOpen',
    status: 'soon',
    accent: 'from-violet-400/70 to-indigo-500/70',
  },
  {
    id: 'ekstre-ayiklayici',
    engine: 'n8n',
    title: { tr: 'Ekstre Ayıklayıcı', en: 'Statement Parser' },
    description: {
      tr: 'PDF banka ekstrelerini tabloya çevirir, kalemleri hesap planına eşler.',
      en: 'Turns PDF bank statements into tables and maps the lines onto your chart of accounts.',
    },
    icon: 'FileSpreadsheet',
    status: 'soon',
    accent: 'from-cyan-400/70 to-sky-500/70',
  },
  {
    id: 'bordro-kontrol',
    engine: 'n8n',
    title: { tr: 'Bordro Kontrolü', en: 'Payroll Check' },
    description: {
      tr: 'Bordro çıktılarını SGK ve stopaj tabloları ile karşılaştırıp sapmaları işaretler.',
      en: 'Compares payroll output against social security and withholding tables and marks deviations.',
    },
    icon: 'Users',
    status: 'soon',
    accent: 'from-emerald-400/70 to-lime-500/70',
  },
  {
    id: 'sozlesme-okuyucu',
    engine: 'n8n',
    title: { tr: 'Sözleşme Okuyucu', en: 'Contract Reader' },
    description: {
      tr: 'Sözleşmelerdeki vade, ceza ve fesih maddelerini çıkarır, takvime işler.',
      en: 'Extracts term, penalty and termination clauses from contracts and writes them to the calendar.',
    },
    icon: 'FileSignature',
    status: 'soon',
    accent: 'from-amber-400/70 to-yellow-500/70',
  },
  {
    id: 'rakip-fiyat',
    engine: 'n8n',
    title: { tr: 'Rakip Fiyat Takibi', en: 'Competitor Pricing' },
    description: {
      tr: 'Rakip ürün fiyatlarını periyodik olarak toplar, değişim grafiği çıkarır.',
      en: 'Collects competitor product prices on a schedule and charts the movement.',
    },
    icon: 'Tags',
    status: 'soon',
    accent: 'from-pink-400/70 to-rose-500/70',
  },
  {
    id: 'kargo-eslestirici',
    engine: 'n8n',
    title: { tr: 'Kargo Eşleştirici', en: 'Shipment Matcher' },
    description: {
      tr: 'Kargo faturalarını siparişlerle eşler, fazla kesilen navlunu tespit eder.',
      en: 'Matches carrier invoices with orders and catches overcharged freight.',
    },
    icon: 'PackageSearch',
    status: 'soon',
    accent: 'from-orange-400/70 to-amber-500/70',
  },
  {
    id: 'rapor-dagitici',
    engine: 'n8n',
    title: { tr: 'Rapor Dağıtıcı', en: 'Report Dispatcher' },
    description: {
      tr: 'Haftalık mali özeti hazırlar ve seçtiğiniz ekibe otomatik gönderir.',
      en: 'Prepares the weekly financial digest and sends it to the team you choose.',
    },
    icon: 'FileBarChart2',
    status: 'soon',
    accent: 'from-blue-400/70 to-violet-500/70',
  },
];
