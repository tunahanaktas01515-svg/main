import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Panel genişliği — varsayılan orta boy */
  size?: 'md' | 'lg';
  closeLabel: string;
}

/**
 * Uygulama genelinde kullanılan cam modal kabuğu.
 * Arka planı karartır, Escape ile kapanır ve açıkken sayfa kaydırmasını kilitler.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  size = 'md',
  closeLabel,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              'glass-strong flex max-h-[86vh] w-full flex-col overflow-hidden rounded-[32px]',
              size === 'lg' ? 'max-w-[920px]' : 'max-w-[640px]'
            )}
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-6 py-4">
              {icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/75">
                  {icon}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-semibold tracking-tight text-white/95">{title}</h2>
                {subtitle && <p className="mt-0.5 text-[12px] text-white/45">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/60 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] hover:text-white active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer && (
              <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-white/10 px-6 py-4">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
