import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** 'glass' varsayılan, 'accent' indigo vurgulu, 'solid' beyaz (gönder butonu) */
  tone?: 'glass' | 'accent' | 'solid' | 'ghost';
  active?: boolean;
}

const sizeMap = {
  xs: 'h-7 w-7',
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

const toneMap = {
  glass: '',
  accent:
    'border-indigo-400/35 bg-indigo-500/25 text-white hover:border-indigo-300/50 hover:bg-indigo-500/40',
  solid: 'border-white/0 bg-white text-black hover:bg-white/90 hover:text-black',
  ghost: 'border-transparent bg-transparent hover:bg-white/[0.08]',
};

/**
 * Yuvarlak, glass stilinde ikon butonu.
 * Top bar, chat input ve modal başlıklarında tekrar eden aksiyonlar için kullanılır.
 */
export function IconButton({
  children,
  size = 'md',
  tone = 'glass',
  active,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'icon-btn focus-ring',
        sizeMap[size],
        toneMap[tone],
        active && 'border-indigo-400/40 bg-indigo-500/20 text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.75)]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
