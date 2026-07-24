import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface GlassProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

/**
 * Yumuşak glow'lu, yuvarlak köşeli glass progress bar.
 * Dosya / fotoğraf yükleme işlemlerinde kullanılır.
 */
export function GlassProgressBar({ progress, className }: GlassProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner',
        className
      )}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.7)]"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}
