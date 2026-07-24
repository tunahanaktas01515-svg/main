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
  },
  {
    id: 'cenan-pro',
    label: 'Cenan Pro',
    paramSize: '30B',
  },
];
