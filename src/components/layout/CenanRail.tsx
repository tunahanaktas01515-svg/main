import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  Image as ImageIcon,
  Languages,
  Moon,
  Palette,
  Puzzle,
  SlidersHorizontal,
  Sun,
  X,
} from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { surfaceThemes } from '../../data/surfaceThemes';
import { OrbIcon } from '../ui/Orb';
import { cn } from '../../lib/cn';
import type { TranslationKey } from '../../i18n/dictionary';

/** Henüz açılmamış bölümler — kapalı rail'de ikon, açık panelde satır olarak görünür */
const placeholderSections: { id: string; labelKey: TranslationKey; icon: typeof Puzzle }[] = [
  { id: 'arayuz', labelKey: 'rail.layout', icon: SlidersHorizontal },
  { id: 'eklenti', labelKey: 'rail.plugins', icon: Puzzle },
  { id: 'tema', labelKey: 'rail.themeColors', icon: Palette },
];

/**
 * Sağdaki Cenan paneli.
 * Kapalı hâlde ekranın sağında ince bir rail olarak durur; ikona basıldığında
 * kenarlara değmeyen, büyük kavisli bir dikdörtgen olarak sola doğru açılır.
 * Kapat butonu paneli yeniden ilk (kapalı) hâline döndürür.
 */
export function CenanRail() {
  const {
    t,
    isRailOpen,
    toggleRail,
    closeRail,
    theme,
    toggleTheme,
    surfaceTheme,
    setSurfaceTheme,
    language,
    setLanguage,
    openOverlay,
  } = useAppContext();

  return (
    <motion.aside
      animate={
        isRailOpen
          ? { width: 316, top: 84, bottom: 24, right: 24, borderRadius: 32 }
          : { width: 60, top: 88, bottom: 24, right: 20, borderRadius: 28 }
      }
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="glass-strong fixed z-40 flex flex-col overflow-hidden p-2.5"
    >
      {/* Marka satırı */}
      <div className={cn('flex shrink-0 items-center gap-2.5', isRailOpen ? 'px-1.5 pt-1' : 'justify-center pt-0.5')}>
        <OrbIcon size={34} />

        <AnimatePresence>
          {isRailOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-hand flex-1 whitespace-nowrap text-[30px] leading-none text-white/95"
            >
              Cenan
            </motion.span>
          )}
        </AnimatePresence>

        {isRailOpen && (
          <button
            type="button"
            onClick={closeRail}
            aria-label={t('rail.close')}
            title={t('rail.close')}
            className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="my-2.5 h-px shrink-0 bg-white/10" />

      {/* Aç / kapat — kapalı hâlde tek ikon */}
      {!isRailOpen && (
        <button
          type="button"
          onClick={toggleRail}
          aria-label={t('rail.open')}
          title={t('rail.open')}
          className="focus-ring mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/65 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/18 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {isRailOpen ? (
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-1.5 pb-1">
          {/* Hızlı ayarlar — panel açıkken doğrudan kullanılabilir */}
          <section>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              {t('rail.quickTitle')}
            </h3>

            <button
              type="button"
              onClick={toggleTheme}
              className="focus-ring flex w-full items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
            >
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 shrink-0 text-indigo-300" />
              ) : (
                <Sun className="h-4 w-4 shrink-0 text-amber-300" />
              )}
              <span className="flex-1 text-left text-[12.5px] font-medium text-white/85">
                {t('settings.mode')}
              </span>
              <span className="rounded-full border border-white/12 bg-white/[0.07] px-2 py-0.5 text-[10px] font-semibold text-white/60">
                {theme === 'dark' ? t('settings.modeDark') : t('settings.modeLight')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="focus-ring mt-1.5 flex w-full items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
            >
              <Languages className="h-4 w-4 shrink-0 text-white/55" />
              <span className="flex-1 text-left text-[12.5px] font-medium text-white/85">
                {t('settings.languageTitle')}
              </span>
              <span className="rounded-full border border-white/12 bg-white/[0.07] px-2 py-0.5 text-[10px] font-bold uppercase text-white/60">
                {language}
              </span>
            </button>

            <button
              type="button"
              onClick={() => openOverlay('background')}
              className="focus-ring mt-1.5 flex w-full items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
            >
              <ImageIcon className="h-4 w-4 shrink-0 text-white/55" />
              <span className="flex-1 text-left text-[12.5px] font-medium text-white/85">
                {t('settings.backgroundTitle')}
              </span>
            </button>
          </section>

          {/* Yüzey teması hızlı seçimi */}
          <section>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              {t('settings.surfaceTitle')}
            </h3>
            <div className="grid grid-cols-5 gap-1.5">
              {surfaceThemes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSurfaceTheme(item.id)}
                  title={t(item.nameKey)}
                  aria-label={t(item.nameKey)}
                  className={cn(
                    'focus-ring h-10 rounded-xl border transition-all duration-300',
                    item.preview,
                    surfaceTheme === item.id
                      ? 'ring-2 ring-indigo-400/70 ring-offset-2 ring-offset-transparent'
                      : 'opacity-70 hover:opacity-100'
                  )}
                />
              ))}
            </div>
          </section>

          {/* Yer tutucu bölümler */}
          <section className="flex flex-col gap-1.5">
            {placeholderSections.map((section) => (
              <button
                key={section.id}
                type="button"
                disabled
                title={`${t(section.labelKey)} · ${t('common.soon')}`}
                className="flex w-full cursor-not-allowed items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-white/30"
              >
                <section.icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                <span className="flex-1 truncate text-left text-[12.5px] font-medium">{t(section.labelKey)}</span>
                <span className="shrink-0 rounded-full bg-white/[0.06] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-white/30">
                  {t('common.soon')}
                </span>
              </button>
            ))}
          </section>

          <p className="text-[10.5px] leading-relaxed text-white/25">{t('rail.note')}</p>
        </div>
      ) : (
        <>
          {/* Kapalı rail: yer tutucu ikonlar + dikey marka yazısı */}
          <div className="mt-2 flex shrink-0 flex-col items-center gap-1.5">
            {placeholderSections.map((section) => (
              <button
                key={section.id}
                type="button"
                disabled
                title={`${t(section.labelKey)} · ${t('common.soon')}`}
                className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] text-white/30"
              >
                <section.icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden py-3">
            <span className="rotate-180 select-none text-[9px] font-semibold uppercase tracking-[0.42em] text-white/15 [writing-mode:vertical-rl]">
              Cenan AI
            </span>
          </div>
        </>
      )}

      {/* Alt kısım: kredi kullanım halkası */}
      <div className={cn('mt-auto flex shrink-0 flex-col items-center gap-2 pt-3', isRailOpen && 'px-1.5')}>
        <div className="h-px w-full bg-white/10" />
        <UsageRing value={68} compact={!isRailOpen} label={t('sidebar.creditUsage')} />
      </div>
    </motion.aside>
  );
}

/**
 * Kredi kullanımını gösteren dairesel gösterge.
 * Kapalı modda yalnızca halka + yüzde, açık modda etiketiyle birlikte görünür.
 */
function UsageRing({ value, compact, label }: { value: number; compact: boolean; label: string }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className={cn('flex items-center gap-2.5 py-1', compact ? 'flex-col' : 'w-full')}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
          <circle cx="18" cy="18" r={radius} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/10" />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="url(#usage-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="usage-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-[9px] font-bold tabular-nums text-white/70">{value}</span>
      </span>

      {!compact && (
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] font-semibold text-white/75">{label}</span>
          <span className="block text-[10px] text-white/35">1.240 / 4.000</span>
        </span>
      )}
      {compact && <span className="text-[8px] font-semibold uppercase tracking-wider text-white/25">kredi</span>}
    </div>
  );
}
