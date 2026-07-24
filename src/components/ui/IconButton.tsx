import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

/**
 * Yuvarlak, glass stilinde ikon butonu. Top bar ve chat input gibi
 * alanlarda tekrar eden ikon aksiyonları için kullanılır.
 */
export function IconButton({ children, size = 'md', active, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'icon-button',
        sizeMap[size],
        active && 'border-indigo-400/40 bg-indigo-500/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
