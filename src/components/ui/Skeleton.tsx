import { cn } from '../../lib/cn';

/**
 * Yumuşak parlama (shimmer) efektli skeleton bloğu — yükleme durumlarında kullanılır.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-white/[0.05]', className)}>
      <div className="absolute inset-0 animate-shimmer streak" />
    </div>
  );
}

/**
 * Glow'lu dönen spinner — buton içi ve küçük yükleme göstergeleri için.
 */
export function GlowSpinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/15 border-t-indigo-300',
        'shadow-[0_0_12px_-2px_rgba(129,140,248,0.9)]',
        className
      )}
    />
  );
}
