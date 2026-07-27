import { UserRound } from 'lucide-react';
import { cn } from '../../lib/cn';

interface AvatarProps {
  isLoggedIn?: boolean;
  name?: string;
  /** Kullanıcının yüklediği profil fotoğrafı (data URL) */
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Etrafında yumuşak indigo halo göster */
  glow?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
  '2xl': 'h-24 w-24',
};

/**
 * Profil avatarı.
 * Fotoğraf yüklenmişse yuvarlak alana kırpılarak gösterilir; yoksa giriş
 * durumuna göre baş harfler ya da "bilinmeyen kullanıcı" silueti çizilir.
 */
export function Avatar({
  isLoggedIn = false,
  name,
  src,
  size = 'md',
  glow = false,
  className,
}: AvatarProps) {
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
        src
          ? 'bg-white/[0.06]'
          : isLoggedIn
            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 on-accent'
            : 'bg-gradient-to-br from-white/[0.16] to-white/[0.06] text-white/40',
        glow && 'shadow-[0_0_24px_-6px_rgba(99,102,241,0.65)]',
        className
      )}
    >
      {src ? (
        <img src={src} alt="" aria-hidden className="h-full w-full object-cover" draggable={false} />
      ) : isLoggedIn && initials ? (
        <span className="text-sm font-semibold">{initials}</span>
      ) : (
        <UserRound className="h-[58%] w-[58%]" strokeWidth={1.6} />
      )}
    </span>
  );
}
