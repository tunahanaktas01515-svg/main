import { motion } from 'framer-motion';
import { Moon, Pencil, Sun } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { IconButton } from '../ui/IconButton';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/cn';
import type { PageId } from '../../types';

const pageTabs: { id: PageId; label: string }[] = [
  { id: 'ana-sayfa', label: 'Ana Sayfa' },
  { id: 'cenan', label: 'Cenan' },
  { id: 'haberler', label: 'Haberler' },
  { id: 'deep-web', label: 'Deep Web' },
];

/**
 * Üst navigasyon barı: tema butonu, sayfa sekmeleri, arka plan ayarı ve profil.
 */
export function TopBar() {
  const { theme, toggleTheme, activePage, setActivePage, openBackgroundModal, isLoggedIn } = useAppContext();

  return (
    <header className="glass-panel-strong flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 px-5">
      {/* Sol: Tema değiştirme butonu */}
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleTheme} aria-label="Tema değiştir">
          {theme === 'dark' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
        </IconButton>
        <div className="flex items-center gap-2 pl-1">
          <div className="h-2 w-2 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
          <span className="text-sm font-semibold tracking-wide text-white/80">Cenan</span>
        </div>
      </div>

      {/* Orta: Sayfa seçim pilleri */}
      <nav className="glass-panel flex items-center gap-1 rounded-full p-1">
        {pageTabs.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePage(tab.id)}
              className={cn('pill-button relative', isActive && 'pill-button-active')}
            >
              {isActive && (
                <motion.span
                  layoutId="active-page-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Sağ: Arka plan ayarı ve profil */}
      <div className="flex items-center gap-3">
        <IconButton onClick={openBackgroundModal} aria-label="Arka plan ve tema ayarları">
          <Pencil className="h-4 w-4" />
        </IconButton>
        <Avatar isLoggedIn={isLoggedIn} size="sm" />
      </div>
    </header>
  );
}
