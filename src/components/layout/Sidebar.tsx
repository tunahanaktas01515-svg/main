import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  ChevronRight,
  LifeBuoy,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldX,
  UserCircle2,
  Zap,
} from 'lucide-react';
import { navGroups } from '../../data/navigation';
import { findPlan } from '../../data/plans';
import { useAppContext } from '../../context/appContextCore';
import { useClickOutside } from '../../lib/useClickOutside';
import { maskEmail } from '../../lib/maskEmail';
import { Avatar } from '../ui/Avatar';
import { DynamicIcon } from '../ui/DynamicIcon';
import { GlassProgressBar } from '../ui/GlassProgressBar';
import { cn } from '../../lib/cn';

/**
 * Sol ana menü.
 * Üstte profil alanı (hover popover ile), altında gruplanmış navigasyon
 * (Ana Sayfa · Ajanlar · Cenan AI · Deep Web · Araçlar · Ayarlar) ve kredi kartı.
 */
export function Sidebar() {
  const {
    t,
    activePage,
    setActivePage,
    activeMenuItemId,
    setActiveMenuItemId,
    isSidebarCollapsed,
    toggleSidebar,
    isLoggedIn,
    profile,
    openOverlay,
    signOut,
  } = useAppContext();

  const [isProfileOpen, setProfileOpen] = useState(false);
  // Varsayılan olarak tüm gruplar açık; kullanıcı tek tek kapatabilir
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileRef, isProfileOpen, () => setProfileOpen(false));

  const plan = findPlan(profile.plan);

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 76 : 248 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="relative z-20 flex h-full shrink-0 flex-col border-r border-white/10 bg-white/[0.035] px-3 py-4 backdrop-blur-2xl"
    >
      {/* Daraltma butonu */}
      <div className={cn('mb-4 flex items-center', isSidebarCollapsed ? 'justify-center' : 'justify-end px-1')}>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          title={isSidebarCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-xl border border-white/12 bg-white/[0.07] text-white/60 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_-6px_rgba(99,102,241,0.9)] active:scale-95"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Profil */}
      <div
        ref={profileRef}
        className="relative mb-4"
        onMouseEnter={() => setProfileOpen(true)}
        onMouseLeave={() => setProfileOpen(false)}
      >
        <button
          type="button"
          onClick={() => openOverlay('account')}
          className={cn(
            'focus-ring group flex w-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-2.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]',
            isSidebarCollapsed && 'justify-center border-transparent bg-transparent p-0 hover:bg-transparent'
          )}
        >
          <span className="relative">
            <Avatar
              isLoggedIn={isLoggedIn}
              name={profile.displayName}
              src={profile.avatarUrl}
              size={isSidebarCollapsed ? 'md' : 'lg'}
            />
            <span className="absolute inset-0 rounded-full ring-0 ring-indigo-400/0 transition-all duration-300 group-hover:ring-[5px] group-hover:ring-indigo-400/15" />
          </span>

          {!isSidebarCollapsed && (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-white/90">
                {isLoggedIn ? profile.displayName : t('profile.guest')}
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] text-white/35">
                {isLoggedIn ? (
                  <>
                    <span className="truncate">
                      {profile.emailVerified ? profile.email : maskEmail(profile.email)}
                    </span>
                    {profile.emailVerified ? (
                      <BadgeCheck className="h-3 w-3 shrink-0 text-emerald-300" />
                    ) : (
                      <ShieldX className="h-3 w-3 shrink-0 text-red-300" />
                    )}
                  </>
                ) : (
                  t('profile.notSignedIn')
                )}
              </span>
            </span>
          )}
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, x: -8, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass-popover absolute left-full top-0 z-40 ml-3 w-56 origin-top-left rounded-2xl p-1.5"
            >
              {isLoggedIn && (
                <div className="mb-1 flex items-center justify-between gap-2 rounded-xl px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    {t('profile.currentPlan')}
                  </span>
                  <span className={cn('rounded-full border px-2 py-0.5 text-[10.5px] font-bold', plan.badge)}>
                    {plan.name}
                  </span>
                </div>
              )}
              <PopoverItem
                icon={<UserCircle2 className="h-4 w-4" />}
                label={t('profile.profileInfo')}
                onClick={() => openOverlay('account')}
              />
              <PopoverItem
                icon={<Settings className="h-4 w-4" />}
                label={t('profile.settings')}
                onClick={() => openOverlay('settings')}
              />
              <PopoverItem icon={<LifeBuoy className="h-4 w-4" />} label={t('profile.support')} />
              <div className="my-1 h-px bg-white/10" />
              <PopoverItem
                icon={<LogOut className="h-4 w-4" />}
                label={t('profile.logout')}
                danger
                onClick={signOut}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigasyon */}
      <nav className="no-scrollbar flex flex-1 flex-col gap-1.5 overflow-y-auto pb-2">
        {navGroups.map((group) => {
          const isGroupCollapsed = collapsedGroups.includes(group.id);

          return (
            <div key={group.id}>
              {isSidebarCollapsed ? (
                /* Daraltılmış modda yalnızca grup ikonu gösterilir */
                <button
                  type="button"
                  title={t(group.titleKey)}
                  onClick={() => {
                    const target = group.items.find((item) => item.page || item.overlay);
                    if (!target) return;
                    setActiveMenuItemId(target.id);
                    if (target.page) setActivePage(target.page);
                    if (target.overlay) openOverlay(target.overlay);
                  }}
                  className={cn(
                    'nav-item focus-ring justify-center px-0',
                    group.items.some((item) => item.id === activeMenuItemId) && 'nav-item-active'
                  )}
                >
                  <DynamicIcon name={group.icon} className="h-4 w-4" strokeWidth={1.8} />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className="focus-ring group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-colors duration-200 hover:bg-white/[0.04]"
                  >
                    <DynamicIcon name={group.icon} className="h-3.5 w-3.5 text-white/35" strokeWidth={1.9} />
                    <span className="flex-1 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/35 transition-colors group-hover:text-white/55">
                      {t(group.titleKey)}
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-3 w-3 text-white/25 transition-transform duration-300',
                        !isGroupCollapsed && 'rotate-90'
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {!isGroupCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-0.5 flex flex-col gap-0.5 pb-1">
                          {group.items.map((item) => {
                            const isActive = activeMenuItemId === item.id;

                            return (
                              <motion.button
                                key={item.id}
                                type="button"
                                whileHover={{ scale: 1.012 }}
                                whileTap={{ scale: 0.988 }}
                                onClick={() => {
                                  setActiveMenuItemId(item.id);
                                  if (item.page) setActivePage(item.page);
                                  if (item.overlay) openOverlay(item.overlay);
                                }}
                                className={cn('nav-item focus-ring', isActive && 'nav-item-active')}
                              >
                                <DynamicIcon
                                  name={item.icon}
                                  className={cn('h-4 w-4 shrink-0', isActive ? 'text-white' : 'text-white/45')}
                                  strokeWidth={1.8}
                                />
                                <span className="flex-1 truncate text-left">{t(item.labelKey)}</span>
                                {item.badge && (
                                  <span
                                    className={cn(
                                      'shrink-0 text-[11px] font-semibold tabular-nums',
                                      isActive ? 'text-white/70' : 'text-white/30'
                                    )}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                {item.soon && !item.badge && (
                                  <span className="shrink-0 rounded-full bg-white/[0.07] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-white/30">
                                    {t('common.soon')}
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* Kredi kullanımı */}
      {!isSidebarCollapsed && (
        <div className="mt-2 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
              <Zap className="h-3 w-3 text-indigo-300" />
              {t('sidebar.creditUsage')}
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-white/45">68%</span>
          </div>
          <GlassProgressBar progress={68} />
          <p className="mt-2 text-[10px] leading-relaxed text-white/35">{t('sidebar.creditNote')}</p>
        </div>
      )}

      {/* Aktif sayfa göstergesi (daraltılmış modda) */}
      {isSidebarCollapsed && (
        <span className="mx-auto mt-2 text-[9px] font-semibold uppercase tracking-wider text-white/25">
          {activePage === 'ana-sayfa'
            ? 'ANA'
            : activePage === 'cenan'
              ? 'AI'
              : activePage === 'haberler'
                ? 'HBR'
                : activePage === 'ajanlar'
                  ? 'AJN'
                  : 'DW'}
        </span>
      )}
    </motion.aside>
  );
}

function PopoverItem({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'focus-ring flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-colors duration-200',
        danger
          ? 'text-red-300/80 hover:bg-red-500/10 hover:text-red-300'
          : 'text-white/70 hover:bg-white/[0.08] hover:text-white'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
