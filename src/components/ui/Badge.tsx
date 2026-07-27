import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'indigo' | 'success' | 'warning' | 'danger';
  className?: string;
}

const toneMap = {
  neutral: 'border-white/10 bg-white/[0.06] text-white/60',
  indigo: 'border-indigo-400/25 bg-indigo-500/15 text-indigo-200',
  success: 'border-emerald-400/25 bg-emerald-500/12 text-emerald-300',
  warning: 'border-amber-400/25 bg-amber-500/12 text-amber-300',
  danger: 'border-red-400/25 bg-red-500/12 text-red-300',
};

/**
 * Küçük durum/kategori etiketi.
 */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
