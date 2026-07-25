import type { Language, Localized } from '../types';
import { dictionary, type TranslationKey } from './dictionary';

export type { TranslationKey };
export { dictionary };

/** Verilen dil için `t('anahtar')` çeviricisini üretir */
export function createTranslator(language: Language) {
  const table = dictionary[language];
  return (key: TranslationKey) => table[key] ?? dictionary.tr[key] ?? key;
}

/** İki dilli içerik alanından aktif dildeki metni seçer */
export function pickLocalized(value: Localized, language: Language) {
  return value[language] || value.tr;
}

/** Kısa dil etiketi — dil seçicide gösterilir */
export const languageLabels: Record<Language, { label: string; native: string; flag: string }> = {
  tr: { label: 'Türkçe', native: 'Türkçe', flag: 'TR' },
  en: { label: 'English', native: 'English', flag: 'EN' },
};

/** Tarih/saat biçimlendirmesinde kullanılan yerel ayar kodu */
export const localeCodes: Record<Language, string> = {
  tr: 'tr-TR',
  en: 'en-GB',
};
