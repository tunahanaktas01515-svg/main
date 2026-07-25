import type { Localized, ModelOption } from '../types';

/**
 * Cenan AI sohbet modelleri.
 */
export const modelOptions: ModelOption[] = [
  {
    id: 'cenan-ultra',
    label: 'Cenan Ultra',
    paramSize: '72B',
    note: {
      tr: 'Pro’ya göre 1.5 kat fazla kredi harcar',
      en: 'Uses 1.5x more credits than Pro',
    },
    description: {
      tr: 'Derin analiz, çok belgeli mutabakat ve mevzuat yorumu',
      en: 'Deep analysis, multi-document reconciliation and regulatory interpretation',
    },
  },
  {
    id: 'cenan-pro',
    label: 'Cenan Pro',
    paramSize: '30B',
    description: {
      tr: 'Günlük fatura ve KDV işlemleri için hızlı yanıt',
      en: 'Fast answers for everyday invoice and VAT work',
    },
  },
];

/**
 * Sohbet panelinde gösterilen hızlı başlangıç önerileri.
 */
export const quickPrompts: Localized[] = [
  { tr: 'Bu ayın KDV özetini çıkar', en: 'Summarise this month’s VAT' },
  { tr: 'Eşleşmeyen banka kayıtlarını listele', en: 'List the unmatched bank entries' },
  { tr: 'Almanya ihracat teşvikini anlat', en: 'Explain the German export incentive' },
];
