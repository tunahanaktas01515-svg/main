import { UserRound } from 'lucide-react';
import { cn } from '../../lib/cn';

interface AvatarProps {
  isLoggedIn?: boolean;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-16 w-16',
};

/**
 * Profil avatarı. Giriş yapılmamışsa gri-beyaz siluet ikon, giriş yapılmışsa
 * kullanıcı adının baş harflerini gösteren gradient bir rozet render eder.
 */
export function Avatar({ isLoggedIn = false, name, size = 'md', className }: AvatarProps) {
  const initials = name
    ?.split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-full border border-white/15 shadow-[0_0_16px_rgba(99,102,241,0.25)]',
        sizeMap[size],
        isLoggedIn
          ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
          : 'bg-white/10 text-white/40',
        className
      )}
    >
      {isLoggedIn && initials ? (
        <span className="text-sm font-semibold">{initials}</span>
      ) : (
        <UserRound className="h-[55%] w-[55%]" strokeWidth={1.5} />
      )}
    </div>
  );
}
