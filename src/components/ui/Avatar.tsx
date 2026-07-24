import { UserRound } from 'lucide-react';
import { cn } from '../../lib/cn';

interface AvatarProps {
  isLoggedIn?: boolean;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Etrafında yumuşak indigo halo göster */
  glow?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

/**
 * Profil avatarı.
 * Giriş yapılmamışsa gri-beyaz "bilinmeyen kullanıcı" siluetini,
 * giriş yapılmışsa kullanıcının baş harflerini gradient zeminde gösterir.
 */
export function Avatar({ isLoggedIn = false, name, size = 'md', glow = false, className }: AvatarProps) {
  const initials = name
    ?.split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15',
        sizeMap[size],
        isLoggedIn
          ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
          : 'bg-gradient-to-br from-white/[0.16] to-white/[0.06] text-white/40',
        glow && 'shadow-[0_0_24px_-6px_rgba(99,102,241,0.65)]',
        className
      )}
    >
      {isLoggedIn && initials ? (
        <span className="text-sm font-semibold">{initials}</span>
      ) : (
        <UserRound className="h-[58%] w-[58%]" strokeWidth={1.6} />
      )}
    </span>
  );
}
