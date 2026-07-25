import { motion } from 'framer-motion';
import { Moon, Pencil, Sparkles, Sun } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { findPlan } from '../../data/plans';
import { IconButton } from '../ui/IconButton';
import { Logo } from '../ui/Logo';
import { AppSearch } from './AppSearch';
import { ProfileMenu } from './ProfileMenu';
import { cn } from '../../lib/cn';
import type { PageId } from '../../types';
import type { TranslationKey } from '../../i18n/dictionary';

const pageTabs: { id: PageId; labelKey: TranslationKey }[] = [
  { id: 'ana-sayfa', labelKey: 'nav.home' },
  { id: 'cenan', labelKey: 'nav.cenan' },
  { id: 'ajanlar', labelKey: 'nav.agents' },
  { id: 'haberler', labelKey: 'nav.news' },
  { id: 'deep-web', labelKey: 'nav.deepweb' },
];

/**
 * 64px yüksekliğinde, tam genişlikte glass üst bar.
 * Sol: marka + tema butonu · Orta: oval sayfa sekmeleri ·
 * Sağ: uygulama içi arama motoru, kredi rozeti, arka plan ayarı ve profil menüsü.
 */
export function TopBar() {
  const { t, theme, toggleTheme, activePage, setActivePage, openOverlay, isLoggedIn, profile } =
    useAppContext();

  const plan = findPlan(profile.plan);

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center gap-4 border-b border-white/10 bg-black/30 px-5 backdrop-blur-2xl">
      {/* Sol: tema butonu + marka */}
      <div className="flex w-[248px] items-center gap-3">
        <IconButton
          onClick={toggleTheme}
          aria-label={t('topbar.themeToggle')}
          title={t('topbar.themeToggle')}
          className="h-9 w-9"
        >
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
              {t('topbar.brandSubtitle')}
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
              {t(tab.labelKey)}
            </button>
          );
        })}
      </nav>

      {/* Sağ: arama, kredi, arka plan, profil */}
      <div className="flex items-center justify-end gap-2.5">
        <AppSearch />

        <div className="hidden items-center gap-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/12 px-2.5 py-1.5 2xl:flex">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
          <span className="text-[11px] font-semibold text-indigo-100">
            {isLoggedIn ? plan.credits : '1.240'} {t('topbar.credits')}
          </span>
        </div>

        <IconButton
          onClick={() => openOverlay('background')}
          aria-label={t('topbar.backgrounds')}
          title={t('topbar.backgrounds')}
          className="h-9 w-9"
        >
          <Pencil className="h-4 w-4" />
        </IconButton>

        <ProfileMenu />
      </div>
    </header>
  );
}
