import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** 'soft' -> bg-white/5, 'strong' -> bg-black/40 */
  variant?: 'soft' | 'strong';
  rounded?: 'xl' | '2xl' | '3xl' | 'full';
  /** Hover'da yumuşak aydınlanma efekti */
  interactive?: boolean;
}

const roundedMap = {
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

/**
 * Tüm arayüzün temel glassmorphism yüzeyi.
 * Panel, kart, modal ve dropdown'lar bu bileşen üzerine kurulur.
 */
export function GlassPanel({
  children,
  variant = 'soft',
  rounded = '3xl',
  interactive = false,
  className,
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        variant === 'soft' ? 'glass' : 'glass-strong',
        roundedMap[rounded],
        interactive && 'glass-hover',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
