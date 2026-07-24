import { motion } from 'framer-motion';
import { Bell, Moon, Pencil, Search, Sparkles, Sun } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { IconButton } from '../ui/IconButton';
import { Avatar } from '../ui/Avatar';
import { Logo } from '../ui/Logo';
import { cn } from '../../lib/cn';
import type { PageId } from '../../types';

const pageTabs: { id: PageId; label: string }[] = [
  { id: 'ana-sayfa', label: 'Ana Sayfa' },
  { id: 'cenan', label: 'Cenan' },
  { id: 'haberler', label: 'Haberler' },
  { id: 'deep-web', label: 'Deep Web' },
];

/**
 * 64px yüksekliğinde, tam genişlikte glass üst bar.
 * Sol: marka + tema butonu · Orta: oval sayfa sekmeleri · Sağ: arama, bildirim, kredi, arka plan ayarı, profil.
 */
export function TopBar() {
  const { theme, toggleTheme, activePage, setActivePage, openBackgroundModal, isLoggedIn } = useAppContext();

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center gap-4 border-b border-white/10 bg-black/30 px-5 backdrop-blur-2xl">
      {/* Sol: tema butonu + marka */}
      <div className="flex w-[260px] items-center gap-3">
        <IconButton onClick={toggleTheme} aria-label="Tema değiştir" title="Koyu / açık tema">
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex items-center justify-center"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </IconButton>

        <div className="flex items-center gap-2.5">
          <Logo size={22} className="text-white" />
          <div className="leading-none">
            <p className="text-[15px] font-semibold tracking-tight text-white/95">Cenan</p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              Muhasebe · İhracat
            </p>
          </div>
        </div>
      </div>

      {/* Orta: sayfa sekmeleri */}
      <nav className="mx-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
        {pageTabs.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePage(tab.id)}
              className={cn('pill focus-ring', isActive && 'pill-active')}
            >
              {isActive && (
                <motion.span
                  layoutId="top-tab-indicator"
                  className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.15] shadow-[0_6px_22px_-8px_rgba(99,102,241,0.9)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Sağ: yardımcı aksiyonlar */}
      <div className="flex w-[260px] items-center justify-end gap-2.5">
        <label className="group flex h-9 w-40 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 transition-colors focus-within:border-indigo-400/40 focus-within:bg-white/[0.07]">
          <Search className="h-3.5 w-3.5 shrink-0 text-white/40" />
          <input
            placeholder="Ara"
            className="w-full bg-transparent text-[13px] text-white/85 placeholder:text-white/35 focus:outline-none"
          />
        </label>

        <div className="hidden items-center gap-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/12 px-2.5 py-1.5 xl:flex">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
          <span className="text-[11px] font-semibold text-indigo-100">1.240 kredi</span>
        </div>

        <IconButton aria-label="Bildirimler" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.8)]" />
        </IconButton>

        <IconButton onClick={openBackgroundModal} aria-label="Arka plan ayarları" title="Tema ve arka planlar">
          <Pencil className="h-4 w-4" />
        </IconButton>

        <button type="button" className="focus-ring rounded-full transition-transform duration-300 hover:scale-105">
          <Avatar isLoggedIn={isLoggedIn} size="sm" glow />
        </button>
      </div>
    </header>
  );
}
