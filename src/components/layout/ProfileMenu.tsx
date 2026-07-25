import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, LifeBuoy, LogIn, LogOut, Settings, ShieldX, Sparkles, UserCog } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { useClickOutside } from '../../lib/useClickOutside';
import { findPlan } from '../../data/plans';
import { maskEmail } from '../../lib/maskEmail';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/cn';

/**
 * Üst bar sağındaki profil menüsü.
 * Profil bilgilerinin altında web sitesinde seçilen paket otomatik görünür;
 * en altta destek ve çıkış aksiyonları yer alır.
 */
export function ProfileMenu() {
  const { t, profile, isLoggedIn, signIn, signOut, openOverlay } = useAppContext();
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, isOpen, () => setOpen(false));

  const plan = findPlan(profile.plan);
  const emailLabel = profile.emailVerified ? profile.email : maskEmail(profile.email);

  const close = () => setOpen(false);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t('topbar.openProfile')}
        aria-expanded={isOpen}
        className="focus-ring rounded-full transition-transform duration-300 hover:scale-105"
      >
        <Avatar isLoggedIn={isLoggedIn} name={profile.displayName} src={profile.avatarUrl} size="sm" glow />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-strong absolute right-0 top-[calc(100%+10px)] z-50 w-[268px] origin-top-right rounded-3xl p-2"
          >
            {/* Profil bilgileri */}
            <div className="flex items-center gap-3 rounded-2xl px-2.5 py-2.5">
              <Avatar isLoggedIn={isLoggedIn} name={profile.displayName} src={profile.avatarUrl} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-white/92">
                  {isLoggedIn ? profile.displayName : t('profile.guest')}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                  {isLoggedIn ? (
                    <>
                      <span className="truncate">{emailLabel}</span>
                      {profile.emailVerified ? (
                        <BadgeCheck className="h-3 w-3 shrink-0 text-emerald-300" />
                      ) : (
                        <ShieldX className="h-3 w-3 shrink-0 text-red-300" />
                      )}
                    </>
                  ) : (
                    t('profile.notSignedIn')
                  )}
                </p>
              </div>
            </div>

            {/* Kullanılan paket — web sitesindeki tercihe göre otomatik gelir */}
            {isLoggedIn && (
              <div className="mx-1 mb-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    {t('profile.currentPlan')}
                  </span>
                  <span className={cn('rounded-full border px-2 py-0.5 text-[10.5px] font-bold', plan.badge)}>
                    {plan.name}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-white/45">{t(plan.taglineKey)}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-indigo-200">
                  <Sparkles className="h-3 w-3" />
                  {plan.credits} {t('topbar.credits')}
                </p>
              </div>
            )}

            <div className="my-1 h-px bg-white/10" />

            <MenuItem
              icon={<Settings className="h-4 w-4" />}
              label={t('profile.settings')}
              onClick={() => {
                openOverlay('settings');
                close();
              }}
            />
            <MenuItem
              icon={<UserCog className="h-4 w-4" />}
              label={t('profile.profileSettings')}
              onClick={() => {
                openOverlay('account');
                close();
              }}
            />

            <div className="my-1 h-px bg-white/10" />

            <MenuItem
              icon={<LifeBuoy className="h-4 w-4" />}
              label={t('profile.support')}
              onClick={close}
            />
            {isLoggedIn ? (
              <MenuItem
                icon={<LogOut className="h-4 w-4" />}
                label={t('profile.logout')}
                danger
                onClick={() => {
                  signOut();
                  close();
                }}
              />
            ) : (
              <MenuItem
                icon={<LogIn className="h-4 w-4" />}
                label={t('profile.login')}
                onClick={() => {
                  signIn();
                  close();
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'focus-ring flex w-full items-center gap-2.5 rounded-2xl px-3 py-2 text-[13px] transition-colors duration-200',
        danger
          ? 'text-red-300/85 hover:bg-red-500/10 hover:text-red-300'
          : 'text-white/72 hover:bg-white/[0.08] hover:text-white'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
