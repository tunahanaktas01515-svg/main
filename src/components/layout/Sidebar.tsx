import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LifeBuoy, LogOut, UserCircle2 } from 'lucide-react';
import { sidebarMenuGroups } from '../../data/sidebarMenu';
import { useAppContext } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { DynamicIcon } from '../ui/DynamicIcon';
import { cn } from '../../lib/cn';

/**
 * Sol taraftaki tam yükseklikte glass sidebar.
 * Üstte profil alanı (hover popover ile), altında "Ana" ve "Cenan" menü grupları yer alır.
 */
export function Sidebar() {
  const { activePage, setActivePage, activeFeatureId, triggerCenanFeature, isLoggedIn } = useAppContext();
  const [isProfileHovered, setProfileHovered] = useState(false);

  return (
    <aside className="glass-panel flex h-full w-[236px] shrink-0 flex-col rounded-none border-y-0 border-l-0 px-4 py-5">
      {/* Profil alanı */}
      <div
        className="relative mb-6 flex flex-col items-center gap-2 pb-4"
        onMouseEnter={() => setProfileHovered(true)}
        onMouseLeave={() => setProfileHovered(false)}
      >
        <button type="button" className="group relative rounded-full transition-transform duration-300 hover:scale-105">
          <Avatar isLoggedIn={isLoggedIn} size="lg" />
          <span className="absolute inset-0 rounded-full ring-0 ring-indigo-400/0 transition-all duration-300 group-hover:ring-4 group-hover:ring-indigo-400/20" />
        </button>
        <div className="text-center">
          <p className="text-sm font-medium text-white/85">
            {isLoggedIn ? 'Kullanıcı' : 'Bilinmeyen Kullanıcı'}
          </p>
          <p className="text-xs text-white/40">{isLoggedIn ? 'hesap@cenan.ai' : 'Giriş yapılmadı'}</p>
        </div>

        {/* Hover popover */}
        <AnimatePresence>
          {isProfileHovered && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass-panel-strong absolute left-full top-0 z-30 ml-3 w-52 origin-top-left rounded-2xl p-2"
            >
              <PopoverItem icon={<UserCircle2 className="h-4 w-4" />} label="Profil Bilgileri" />
              <PopoverItem icon={<LifeBuoy className="h-4 w-4" />} label="Destek" />
              <div className="my-1 h-px bg-white/10" />
              <PopoverItem icon={<LogOut className="h-4 w-4" />} label="Çıkış Yap" danger />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menü grupları */}
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto no-scrollbar">
        {sidebarMenuGroups.map((group) => (
          <div key={group.id}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">
              {group.title}
            </p>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = item.cenanFeatureId
                  ? activeFeatureId === item.cenanFeatureId
                  : activePage === item.onSelectPage;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.cenanFeatureId) {
                        triggerCenanFeature(item.cenanFeatureId);
                      } else if (item.onSelectPage) {
                        setActivePage(item.onSelectPage);
                      }
                    }}
                    className={cn('menu-item', isActive && 'menu-item-active')}
                  >
                    <DynamicIcon name={item.icon} className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
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
        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors duration-200',
        danger ? 'text-red-400/80 hover:bg-red-500/10 hover:text-red-400' : 'text-white/70 hover:bg-white/10 hover:text-white'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
