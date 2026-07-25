import { cn } from '../../lib/cn';

/**
 * Menü/başlık gibi küçük alanlar için orb ikonu.
 * Görsel siyah zemin üzerine üretildiği için `orb-blend` (mix-blend-mode: screen)
 * ile siyah bölgeler şeffaflaşır.
 */
export function OrbIcon({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full bg-sky-500/35 blur-md" aria-hidden />
      <span className="orb-disc absolute inset-0 hidden rounded-full light:block" aria-hidden />
      <img
        src="/orb/orb_icon.webp"
        alt=""
        aria-hidden
        className="orb-blend relative h-full w-full select-none rounded-full object-cover"
        draggable={false}
      />
    </span>
  );
}
