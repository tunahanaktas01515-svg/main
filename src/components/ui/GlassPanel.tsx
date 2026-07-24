import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** 'soft' -> bg-white/5 (varsayılan panel), 'strong' -> bg-black/40 (modal/chat gibi daha koyu bloklar) */
  variant?: 'soft' | 'strong';
  rounded?: 'xl' | '2xl' | '3xl';
}

/**
 * Uygulama genelinde kullanılan temel glassmorphism paneli.
 * Sidebar, kartlar, modaller ve chat blokları bu bileşenin üzerine kurulur.
 */
export function GlassPanel({
  children,
  variant = 'soft',
  rounded = '2xl',
  className,
  ...rest
}: GlassPanelProps) {
  const roundedClass = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  }[rounded];

  return (
    <div
      className={cn(
        variant === 'soft' ? 'glass-panel' : 'glass-panel-strong',
        roundedClass,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
