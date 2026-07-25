import { cn } from '../../lib/cn';

interface OrbProps {
  /** Piksel cinsinden çap */
  size?: number;
  /** Yukarı-aşağı süzülme animasyonu */
  floating?: boolean;
  className?: string;
}

/**
 * Cenan'ın mavi enerji baloncuğu (orb).
 * Görsel siyah zemin üzerine üretildiği için `orb-blend` (mix-blend-mode: screen)
 * ile siyah bölgeler şeffaflaşır; arkasına ayrıca yumuşak mavi halo eklenir.
 */
export function Orb({ size = 132, floating = true, className }: OrbProps) {
  return (
    <div
      className={cn('relative shrink-0', floating && 'animate-orb-float', className)}
      style={{ width: size, height: size }}
    >
      {/* Arkadaki nefes alan halo */}
      <span
        className="absolute inset-0 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5),rgba(99,102,241,0.22)_55%,transparent_72%)] blur-2xl"
        aria-hidden
      />
      {/* Açık temada "screen" karışımının çalışabilmesi için koyu taşıyıcı disk */}
      <span className="orb-disc absolute inset-0 hidden rounded-full light:block" aria-hidden />
      {/* Yavaşça dönen orb görseli */}
      <img
        src="/orb/orb.webp"
        alt=""
        aria-hidden
        className="orb-blend relative h-full w-full animate-orb-spin select-none rounded-full object-cover"
        draggable={false}
      />
      {/* Merkezdeki parlak çekirdek */}
      <span
        className="absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-[6px]"
        aria-hidden
      />
    </div>
  );
}

/**
 * Menü/başlık gibi küçük alanlar için orb ikonu (dönme animasyonu olmadan).
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
