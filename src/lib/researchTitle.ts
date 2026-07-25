import type { Language } from '../types';

/**
 * Araştırma kayıtlarına içeriğe göre otomatik başlık atar.
 * Sorguda geçen anahtar kelimeler bir konu grubuna eşlenir; eşleşme yoksa
 * genel araştırma başlığı kullanılır. Başlığın kuyruğunda sorgunun ilk
 * kelimeleri kısaltılarak yer alır.
 */
const topics: { id: string; keywords: string[]; label: { tr: string; en: string } }[] = [
  {
    id: 'news',
    keywords: ['haber', 'gündem', 'basın', 'duyuru', 'news', 'press', 'headline'],
    label: { tr: 'Haber Araştırması', en: 'News Research' },
  },
  {
    id: 'brand',
    keywords: ['marka', 'replika', 'taklit', 'logo', 'brand', 'counterfeit', 'trademark'],
    label: { tr: 'Marka Takibi', en: 'Brand Monitoring' },
  },
  {
    id: 'leak',
    keywords: ['sızıntı', 'sizinti', 'dump', 'breach', 'leak', 'şifre', 'parola', 'password'],
    label: { tr: 'Sızıntı Taraması', en: 'Leak Scan' },
  },
  {
    id: 'company',
    keywords: ['firma', 'şirket', 'unvan', 'vkn', 'ticaret', 'company', 'vendor', 'supplier'],
    label: { tr: 'Firma İncelemesi', en: 'Company Review' },
  },
  {
    id: 'finance',
    keywords: ['döviz', 'doviz', 'kur', 'borsa', 'hisse', 'faiz', 'currency', 'market', 'stock'],
    label: { tr: 'Piyasa Araştırması', en: 'Market Research' },
  },
  {
    id: 'tax',
    keywords: ['kdv', 'vergi', 'stopaj', 'beyanname', 'fatura', 'tax', 'vat', 'invoice'],
    label: { tr: 'Mevzuat Araştırması', en: 'Regulation Research' },
  },
  {
    id: 'export',
    keywords: ['ihracat', 'gümrük', 'konşimento', 'navlun', 'export', 'customs', 'shipment'],
    label: { tr: 'İhracat Araştırması', en: 'Export Research' },
  },
];

const fallback = { tr: 'Genel Araştırma', en: 'General Research' };

export function deriveResearchTitle(query: string, language: Language) {
  const normalized = query.toLocaleLowerCase(language === 'en' ? 'en-GB' : 'tr-TR');
  const topic = topics.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  const label = (topic?.label ?? fallback)[language];

  const snippet = query.trim().split(/\s+/).slice(0, 4).join(' ');
  const trimmed = snippet.length > 34 ? `${snippet.slice(0, 34)}…` : snippet;

  return `${label} — ${trimmed}`;
}
