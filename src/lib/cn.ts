import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind sınıflarını koşullu birleştirmek için yardımcı fonksiyon.
 * clsx ile koşulları çözer, tailwind-merge ile çakışan sınıfları temizler.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
