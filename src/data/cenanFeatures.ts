import type { CenanFeature } from '../types';

/**
 * "Cenan" menüsü altındaki yapay zeka destekli muhasebe modülleri.
 * Her modül seçildiğinde sohbet paneline kendi sistem promptu enjekte edilir.
 */
export const cenanFeatures: CenanFeature[] = [
  {
    id: 'fatura-analizi',
    title: { tr: 'Fatura Analizi', en: 'Invoice Analysis' },
    description: {
      tr: 'Fatura, e-fatura XML veya fotoğraf yükle; KDV, stopaj ve tevkifat kalemlerini kalem kalem çıkaralım.',
      en: 'Upload an invoice, e-invoice XML or a photo and we will break out VAT, withholding and deduction lines one by one.',
    },
    icon: 'FileSearch',
    accent: 'from-indigo-400/80 to-violet-500/80',
    stats: [
      { label: { tr: 'Bu ay işlenen', en: 'Processed this month' }, value: '2.147' },
      { label: { tr: 'Ortalama süre', en: 'Average time' }, value: '11 sn' },
    ],
    systemPrompt: {
      tr:
        'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı fatura analizi yapmak istiyor. ' +
        'Önce faturayı (PDF, görsel veya e-fatura XML) yüklemesini iste. Fatura yüklendikten sonra ' +
        'KDV oranlarını, stopaj kesintilerini, tevkifat uygulanıp uygulanmadığını, matrah, toplam ve net ' +
        'tutarları kalem kalem analiz et. Eksik veya hatalı alanları (VKN, tarih, seri no, GTIP) uyarı ' +
        'olarak belirt. Yanıtlarını Türkçe, profesyonel ve maddeler hâlinde ver.',
      en:
        'You are an expert accounting AI. The user wants an invoice analysis. First ask them to upload the ' +
        'invoice (PDF, image or e-invoice XML). Once uploaded, analyse VAT rates, withholding deductions, ' +
        'whether reverse charge applies, plus the base, total and net amounts line by line. Flag missing or ' +
        'invalid fields (tax number, date, serial number, HS code) as warnings. Answer professionally, in bullet form.',
    },
    greeting: {
      tr: 'Fatura Analizi modülü hazır. Başlamak için faturanı sohbet kutusundaki + simgesiyle yükle (PDF, görsel veya e-fatura XML). Yükleme biter bitmez KDV, stopaj ve tevkifat kırılımını çıkaracağım.',
      en: 'The Invoice Analysis module is ready. Upload your invoice with the + icon in the chat box (PDF, image or e-invoice XML). As soon as it lands I will break down VAT, withholding and deductions.',
    },
  },
  {
    id: 'banka-mutabakati',
    title: { tr: 'Banka Mutabakatı', en: 'Bank Reconciliation' },
    description: {
      tr: 'Banka ekstresi ile muhasebe kayıtlarını eşleştir; farkları, mükerrer kayıtları ve gecikmeleri raporla.',
      en: 'Match the bank statement against ledger records and report differences, duplicates and delays.',
    },
    icon: 'Landmark',
    accent: 'from-blue-400/80 to-indigo-500/80',
    stats: [
      { label: { tr: 'Açık kalem', en: 'Open items' }, value: '18' },
      { label: { tr: 'Eşleşme oranı', en: 'Match rate' }, value: '%97,3' },
    ],
    systemPrompt: {
      tr:
        'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı banka mutabakatı yapmak istiyor. ' +
        'Önce banka ekstresini (CSV/Excel/PDF) ve muhasebe kayıtlarını (mizan veya defter dökümü) yüklemesini iste. ' +
        'İki kaynağı karşılaştırarak eşleşmeyen işlemleri, gecikmiş tahsilatları, mükerrer kayıtları ve bakiye ' +
        'farklarını tablo mantığıyla raporla. Her fark için olası nedeni ve önerilen aksiyonu yaz.',
      en:
        'You are an expert accounting AI. The user wants a bank reconciliation. First ask for the bank statement ' +
        '(CSV/Excel/PDF) and the ledger records (trial balance or account extract). Compare both sources and report ' +
        'unmatched transactions, late collections, duplicate entries and balance differences in a tabular structure. ' +
        'For every difference add a likely cause and a recommended action.',
    },
    greeting: {
      tr: 'Banka Mutabakatı modülü hazır. Banka ekstresini ve muhasebe kayıtlarını yükle; eşleşmeyen işlemleri, mükerrer kayıtları ve bakiye farklarını aksiyon önerileriyle birlikte raporlayayım.',
      en: 'The Bank Reconciliation module is ready. Upload the bank statement and your ledger records, and I will report unmatched transactions, duplicates and balance gaps together with suggested actions.',
    },
  },
  {
    id: 'kdv-hesabi',
    title: { tr: 'KDV Hesabı', en: 'VAT Calculation' },
    description: {
      tr: 'Dönemsel KDV yükümlülüğünü hesapla; hesaplanan, indirilecek ve devreden KDV’yi adım adım göster.',
      en: 'Work out the VAT liability for the period and show output, input and carried-forward VAT step by step.',
    },
    icon: 'Calculator',
    accent: 'from-violet-400/80 to-fuchsia-500/80',
    stats: [
      { label: { tr: 'Devreden KDV', en: 'Carried-forward VAT' }, value: '₺342.180' },
      { label: { tr: 'İade uygun', en: 'Refund eligible' }, value: '₺112.000' },
    ],
    systemPrompt: {
      tr:
        'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı KDV hesabı yapmak istiyor. ' +
        'Önce ilgili dönemin alış/satış faturalarını veya KDV beyanname taslağını yüklemesini iste. ' +
        'Hesaplanan KDV, indirilecek KDV, devreden KDV ve ödenecek KDV tutarlarını adım adım hesapla. ' +
        'İstisna, tevkifat ve indirim kalemlerini kontrol et; riskli gördüğün noktaları uyarı olarak ekle. ' +
        'Sonucu özet bir tablo ile sun.',
      en:
        'You are an expert accounting AI. The user wants a VAT calculation. First ask for the period’s purchase/sales ' +
        'invoices or the draft VAT return. Compute output VAT, input VAT, carried-forward VAT and VAT payable step by ' +
        'step. Check exemptions, reverse charge and deduction items, and add warnings wherever you see risk. ' +
        'Present the result as a summary table.',
    },
    greeting: {
      tr: 'KDV Hesabı modülü hazır. Dönem alış/satış faturalarını ya da beyanname taslağını yükle; hesaplanan, indirilecek, devreden ve ödenecek KDV’yi adım adım hesaplayıp özet tabloyla sunayım.',
      en: 'The VAT Calculation module is ready. Upload the period’s purchase/sales invoices or the draft return, and I will compute output, input, carried-forward and payable VAT step by step with a summary table.',
    },
  },
];
