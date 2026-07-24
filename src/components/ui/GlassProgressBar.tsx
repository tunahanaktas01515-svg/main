import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface GlassProgressBarProps {
  progress: number; // 0-100
  /** 'sm' ince satır içi, 'md' modal içindeki kalın parlak bar */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Yumuşak glow'lu, tam yuvarlak köşeli progress bar.
 * Referans yükleme kartındaki parlak beyaz ilerleme çizgisini taklit eder.
 */
export function GlassProgressBar({ progress, size = 'sm', className }: GlassProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/[0.06]',
        size === 'sm' ? 'h-1.5' : 'h-2.5',
        className
      )}
    >
      <motion.div
        className={cn(
          'relative h-full rounded-full bg-gradient-to-r from-indigo-300 via-white to-white',
          'shadow-[0_0_16px_2px_rgba(199,210,254,0.65)]'
        )}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* İlerleme ucundaki parlak nokta */}
        <span className="absolute right-0 top-1/2 h-full w-2 -translate-y-1/2 rounded-full bg-white blur-[2px]" />
      </motion.div>
    </div>
  );
}
