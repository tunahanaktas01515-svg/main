import { cn } from '../../lib/cn';

interface SkeletonProps {
  className?: string;
}

/**
 * Yumuşak "nefes alan" (pulse) skeleton bloğu — yükleme durumlarında kullanılır.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5',
        className
      )}
    />
  );
}

/**
 * Dönen, glow'lu spinner — buton içi veya küçük yükleme göstergeleri için.
 */
export function GlowSpinner({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]',
        className
      )}
    />
  );
}
