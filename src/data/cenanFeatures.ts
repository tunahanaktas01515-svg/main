import type { CenanFeature } from '../types';

/**
 * "Cenan" menüsü altındaki muhasebe özellikleri.
 * Her biri seçildiğinde sohbet paneline özel bir sistem promptu enjekte edilir.
 */
export const cenanFeatures: CenanFeature[] = [
  {
    id: 'fatura-analizi',
    title: 'Fatura Analizi',
    description: 'Faturalarınızı yükleyin, KDV, stopaj ve tevkifat detaylarını saniyeler içinde analiz edin.',
    systemPrompt:
      'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı fatura analizi yapmak istiyor. ' +
      'Önce faturayı (PDF, görsel veya XML e-fatura) yüklemesini iste. Fatura yüklendikten sonra ' +
      'KDV oranlarını, stopaj kesintilerini, tevkifat uygulanıp uygulanmadığını, toplam ve net tutarları ' +
      'detaylı biçimde analiz et. Olası hataları veya eksik bilgileri (vergi numarası, tarih, fatura seri no) ' +
      'kullanıcıya nazikçe bildir. Yanıtlarını Türkçe, profesyonel ve anlaşılır ver.',
  },
  {
    id: 'banka-mutabakati',
    title: 'Banka Mutabakatı',
    description: 'Banka ekstrelerinizi muhasebe kayıtlarınızla otomatik olarak karşılaştırın ve farkları tespit edin.',
    systemPrompt:
      'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı banka mutabakatı yapmak istiyor. ' +
      'Önce banka ekstresini (CSV/Excel/PDF) ve muhasebe kayıtlarını (mizan veya defter dökümü) yüklemesini iste. ' +
      'İki kaynağı karşılaştırarak eşleşmeyen işlemleri, gecikmiş tahsilatları, mükerrer kayıtları ve ' +
      'bakiye farklarını net biçimde raporla. Bulgularını tablo mantığıyla, kısa ve öz şekilde sun.',
  },
  {
    id: 'kdv-hesabi',
    title: 'KDV Hesabı',
    description: 'Dönemsel KDV yükümlülüğünüzü, indirilecek ve hesaplanan KDV\'yi otomatik hesaplayın.',
    systemPrompt:
      'Sen uzman bir muhasebe yapay zekasısın. Kullanıcı KDV hesabı yapmak istiyor. ' +
      'Önce ilgili dönemin alış ve satış faturalarını veya KDV beyanname taslağını yüklemesini iste. ' +
      'Hesaplanan KDV, indirilecek KDV, devreden KDV ve ödenecek KDV tutarlarını adım adım hesapla. ' +
      'İstisna ve indirim kalemlerini kontrol et, varsa uyarılarını belirt. Sonucu özet bir tablo ile sun.',
  },
];
