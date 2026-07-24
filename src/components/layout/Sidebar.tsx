import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, LifeBuoy, LogOut, PanelLeftClose, PanelLeftOpen, UserCircle2, Zap } from 'lucide-react';
import { navGroups } from '../../data/navigation';
import { useAppContext } from '../../context/appContextCore';
import { useClickOutside } from '../../lib/useClickOutside';
import { Avatar } from '../ui/Avatar';
import { DynamicIcon } from '../ui/DynamicIcon';
import { GlassProgressBar } from '../ui/GlassProgressBar';
import { cn } from '../../lib/cn';

/**
 * Sol ana menü.
 * Üstte profil alanı (hover popover ile), altında gruplanmış navigasyon
 * (Ana Sayfa · Ajanlar · Cenan AI · Deep Web · Araçlar · Ayarlar) ve kredi kartı.
 * Marka ikonu ve "Cenan" yazısı bu menüde değil, sağdaki yüzen menüde yer alır.
 */
export function Sidebar() {
  const { activePage, setActivePage, isSidebarCollapsed, toggleSidebar, isLoggedIn } = useAppContext();

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('dashboard');
  // Varsayılan olarak tüm gruplar açık; kullanıcı tek tek kapatabilir
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileRef, isProfileOpen, () => setProfileOpen(false));

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
          aria-label={isSidebarCollapsed ? "Menüyü genişlet" : 'Menüyü daralt'}
          title={isSidebarCollapsed ? 'Menüyü genişlet' : 'Menüyü daralt'}
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
          className={cn(
            'focus-ring group flex w-full items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-2.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]',
            isSidebarCollapsed && 'justify-center border-transparent bg-transparent p-0 hover:bg-transparent'
          )}
        >
          <span className="relative">
            <Avatar isLoggedIn={isLoggedIn} size={isSidebarCollapsed ? 'md' : 'lg'} />
            <span className="absolute inset-0 rounded-full ring-0 ring-indigo-400/0 transition-all duration-300 group-hover:ring-[5px] group-hover:ring-indigo-400/15" />
          </span>

          {!isSidebarCollapsed && (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-white/90">
                {isLoggedIn ? 'Deniz Yılmaz' : 'Misafir Kullanıcı'}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-white/35">
                {isLoggedIn ? 'deniz@cenan.ai' : 'Giriş yapılmadı'}
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
              className="glass-strong absolute left-full top-0 z-40 ml-3 w-52 origin-top-left rounded-2xl p-1.5"
            >
              <PopoverItem icon={<UserCircle2 className="h-4 w-4" />} label="Profil Bilgileri" />
              <PopoverItem icon={<LifeBuoy className="h-4 w-4" />} label="Destek" />
              <div className="my-1 h-px bg-white/10" />
              <PopoverItem icon={<LogOut className="h-4 w-4" />} label="Çıkış Yap" danger />
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
                  title={group.title}
                  onClick={() => {
                    const target = group.items.find((item) => item.page);
                    if (target?.page) {
                      setActivePage(target.page);
                      setActiveItemId(target.id);
                    }
                  }}
                  className={cn(
                    'nav-item focus-ring justify-center px-0',
                    group.items.some((item) => item.id === activeItemId) && 'nav-item-active'
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
                      {group.title}
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
                            const isActive = activeItemId === item.id;

                            return (
                              <motion.button
                                key={item.id}
                                type="button"
                                whileHover={{ scale: 1.012 }}
                                whileTap={{ scale: 0.988 }}
                                onClick={() => {
                                  setActiveItemId(item.id);
                                  if (item.page) setActivePage(item.page);
                                }}
                                className={cn('nav-item focus-ring', isActive && 'nav-item-active')}
                              >
                                <DynamicIcon
                                  name={item.icon}
                                  className={cn('h-4 w-4 shrink-0', isActive ? 'text-white' : 'text-white/45')}
                                  strokeWidth={1.8}
                                />
                                <span className="flex-1 truncate text-left">{item.label}</span>
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
                                    yakında
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
              Kredi kullanımı
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-white/45">68%</span>
          </div>
          <GlassProgressBar progress={68} />
          <p className="mt-2 text-[10px] leading-relaxed text-white/35">
            1.240 / 4.000 kredi · Ultra modeli 1.5x harcar
          </p>
        </div>
      )}

      {/* Aktif sayfa göstergesi (daraltılmış modda) */}
      {isSidebarCollapsed && (
        <span className="mx-auto mt-2 text-[9px] font-semibold uppercase tracking-wider text-white/25">
          {activePage === 'ana-sayfa' ? 'ANA' : activePage === 'cenan' ? 'AI' : activePage === 'haberler' ? 'HBR' : 'DW'}
        </span>
      )}
    </motion.aside>
  );
}

function PopoverItem({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
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
