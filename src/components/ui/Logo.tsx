import { cn } from '../../lib/cn';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Cenan marka işareti — referanstaki geometrik, kademeli kare bloklardan
 * oluşan monokrom logoya yakın bir SVG mark.
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn('shrink-0', className)}
      aria-label="Cenan"
    >
      <g fill="currentColor">
        <rect x="2" y="2" width="7" height="7" rx="1" />
        <rect x="11" y="7" width="7" height="7" rx="1" opacity="0.85" />
        <rect x="23" y="2" width="7" height="7" rx="1" opacity="0.55" />
        <rect x="2" y="18" width="7" height="7" rx="1" opacity="0.55" />
        <rect x="14" y="18" width="7" height="7" rx="1" opacity="0.85" />
        <rect x="23" y="23" width="7" height="7" rx="1" />
      </g>
    </svg>
  );
}
