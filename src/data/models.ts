import type { ModelOption } from '../types';

/**
 * Cenan AI sohbet modelleri.
 */
export const modelOptions: ModelOption[] = [
  {
    id: 'cenan-ultra',
    label: 'Cenan Ultra',
    paramSize: '72B',
    note: "Pro'ya göre 1.5 kat fazla kredi harcar",
    description: 'Derin analiz, çok belgeli mutabakat ve mevzuat yorumu',
  },
  {
    id: 'cenan-pro',
    label: 'Cenan Pro',
    paramSize: '30B',
    description: 'Günlük fatura ve KDV işlemleri için hızlı yanıt',
  },
];

/**
 * Sohbet panelinde gösterilen hızlı başlangıç önerileri.
 */
export const quickPrompts = [
  'Bu ayın KDV özetini çıkar',
  'Eşleşmeyen banka kayıtlarını listele',
  'Almanya ihracat teşvikini anlat',
];
