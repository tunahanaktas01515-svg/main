import type { CenanFeature } from '../types';

/**
 * "Cenan" menüsü altındaki yapay zeka destekli muhasebe modülleri.
 * Her modül seçildiğinde sohbet paneline kendi sistem promptu enjekte edilir.
 */
export const cenanFeatures: CenanFeature[] = [
  {
    id: 'fatura-analizi',
    title: 'Fatura Analizi',
    description:
      'Fatura, e-fatura XML veya fotoğraf yükle; KDV, stopaj ve tevkifat kalemlerini kalem kalem çıkaralım.',
    icon: 'FileSearch',
    accent: 'from-indigo-400/80 to-violet-500/80',
    stats: [
      { label: 'Bu ay işlenen', value: '2.147' },
      { label: 'Ortalama süre', value: '11 sn' },
    ],
    systemPrompt:
      'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı fatura analizi yapmak istiyor. ' +
      'Önce faturayı (PDF, görsel veya e-fatura XML) yüklemesini iste. Fatura yüklendikten sonra ' +
      'KDV oranlarını, stopaj kesintilerini, tevkifat uygulanıp uygulanmadığını, matrah, toplam ve net ' +
      'tutarları kalem kalem analiz et. Eksik veya hatalı alanları (VKN, tarih, seri no, GTIP) uyarı ' +
      'olarak belirt. Yanıtlarını Türkçe, profesyonel ve maddeler hâlinde ver.',
    greeting:
      'Fatura Analizi modülü hazır. Başlamak için faturanı sohbet kutusundaki + simgesiyle yükle (PDF, görsel veya e-fatura XML). Yükleme biter bitmez KDV, stopaj ve tevkifat kırılımını çıkaracağım.',
  },
  {
    id: 'banka-mutabakati',
    title: 'Banka Mutabakatı',
    description:
      'Banka ekstresi ile muhasebe kayıtlarını eşleştir; farkları, mükerrer kayıtları ve gecikmeleri raporla.',
    icon: 'Landmark',
    accent: 'from-blue-400/80 to-indigo-500/80',
    stats: [
      { label: 'Açık kalem', value: '18' },
      { label: 'Eşleşme oranı', value: '%97,3' },
    ],
    systemPrompt:
      'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı banka mutabakatı yapmak istiyor. ' +
      'Önce banka ekstresini (CSV/Excel/PDF) ve muhasebe kayıtlarını (mizan veya defter dökümü) yüklemesini iste. ' +
      'İki kaynağı karşılaştırarak eşleşmeyen işlemleri, gecikmiş tahsilatları, mükerrer kayıtları ve bakiye ' +
      'farklarını tablo mantığıyla raporla. Her fark için olası nedeni ve önerilen aksiyonu yaz.',
    greeting:
      'Banka Mutabakatı modülü hazır. Banka ekstresini ve muhasebe kayıtlarını yükle; eşleşmeyen işlemleri, mükerrer kayıtları ve bakiye farklarını aksiyon önerileriyle birlikte raporlayayım.',
  },
  {
    id: 'kdv-hesabi',
    title: 'KDV Hesabı',
    description:
      'Dönemsel KDV yükümlülüğünü hesapla; hesaplanan, indirilecek ve devreden KDV\'yi adım adım göster.',
    icon: 'Calculator',
    accent: 'from-violet-400/80 to-fuchsia-500/80',
    stats: [
      { label: 'Devreden KDV', value: '₺342.180' },
      { label: 'İade uygun', value: '₺112.000' },
    ],
    systemPrompt:
      'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı KDV hesabı yapmak istiyor. ' +
      'Önce ilgili dönemin alış/satış faturalarını veya KDV beyanname taslağını yüklemesini iste. ' +
      'Hesaplanan KDV, indirilecek KDV, devreden KDV ve ödenecek KDV tutarlarını adım adım hesapla. ' +
      'İstisna, tevkifat ve indirim kalemlerini kontrol et; riskli gördüğün noktaları uyarı olarak ekle. ' +
      'Sonucu özet bir tablo ile sun.',
    greeting:
      'KDV Hesabı modülü hazır. Dönem alış/satış faturalarını ya da beyanname taslağını yükle; hesaplanan, indirilecek, devreden ve ödenecek KDV\'yi adım adım hesaplayıp özet tabloyla sunayım.',
  },
];
