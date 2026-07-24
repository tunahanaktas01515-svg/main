import { useEffect, type RefObject } from 'react';

/**
 * Belirtilen ref'in dışına tıklandığında veya Escape tuşuna basıldığında callback'i tetikler.
 *
 * Not: Popover'lar için "fixed inset-0" overlay tekniği yerine bu hook kullanılır, çünkü
 * backdrop-blur (backdrop-filter) uygulanan bir üst eleman, position:fixed elemanlar için
 * yeni bir containing block oluşturur ve overlay'in tüm ekranı kaplamasını engeller.
 */
export function useClickOutside(ref: RefObject<HTMLElement | null>, isActive: boolean, onOutside: () => void) {
  useEffect(() => {
    if (!isActive) return;

    function handlePointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onOutside();
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, isActive, onOutside]);
}
