import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Palette, Puzzle, SlidersHorizontal } from 'lucide-react';
import { OrbIcon } from '../ui/Orb';
import { cn } from '../../lib/cn';

/** Şimdilik yer tutucu bölümler — işlevleri sonraki adımda eklenecek */
const placeholderSections = [
  { id: 'arayuz', label: 'Arayüz Düzenleme', icon: SlidersHorizontal },
  { id: 'eklenti', label: 'Eklenti Kurma', icon: Puzzle },
  { id: 'tema', label: 'Tema & Renkler', icon: Palette },
];

/**
 * Sağdaki yüzen mini menü.
 * Ekran kenarlarından bağımsız, kavisli ve uzun bir panel olarak durur.
 * Üstten sabitlendiği için açılıp kapanırken butonların dikey konumu kaymaz.
 * Kapalı hâlde yalnızca marka orb'u ve ikonlar görünür; açıldığında orb'un
 * sağından başlayarak el yazısıyla "Cenan" yazısı gelir.
 */
export function FloatingMenu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.aside
      animate={{ width: isOpen ? 252 : 60 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="glass-strong fixed bottom-6 right-5 top-[88px] z-40 flex flex-col overflow-hidden rounded-[28px] p-2.5"
    >
      {/* Marka satırı */}
      <div className={cn('flex shrink-0 items-center gap-2.5', isOpen ? 'px-1.5 pt-1' : 'justify-center pt-0.5')}>
        <OrbIcon size={30} />

        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-hand whitespace-nowrap text-[30px] leading-none text-white/95"
            >
              Cenan
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="my-2.5 h-px shrink-0 bg-white/10" />

      {/* Aç / kapat */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={isOpen ? 'Paneli kapat' : 'Paneli aç'}
        title={isOpen ? 'Paneli kapat' : 'Paneli aç'}
        className={cn(
          'focus-ring flex h-9 shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] text-white/65 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/18 hover:text-white',
          isOpen ? 'w-full justify-between px-3' : 'mx-auto w-9 justify-center'
        )}
      >
        {isOpen ? (
          <>
            <span className="text-[12px] font-medium">Paneli kapat</span>
            <ChevronRight className="h-4 w-4" />
          </>
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Yer tutucu bölümler */}
      <div className={cn('mt-2 flex shrink-0 flex-col gap-1.5', !isOpen && 'items-center')}>
        {placeholderSections.map((section) => (
          <button
            key={section.id}
            type="button"
            disabled
            title={`${section.label} · yakında`}
            className={cn(
              'flex cursor-not-allowed items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] text-white/30',
              isOpen ? 'w-full gap-2.5 px-3 py-2.5' : 'h-9 w-9 justify-center'
            )}
          >
            <section.icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            {isOpen && (
              <>
                <span className="flex-1 truncate text-left text-[12.5px] font-medium">{section.label}</span>
                <span className="shrink-0 rounded-full bg-white/[0.06] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-white/30">
                  yakında
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      {isOpen && (
        <p className="mt-2.5 shrink-0 px-1.5 text-[10.5px] leading-relaxed text-white/25">
          Bu panel arayüz düzenleme ve eklenti kurulumu için ayrıldı — içerik sonraki adımda eklenecek.
        </p>
      )}

      {/* Alt kısım: kredi kullanım halkası */}
      <div className={cn('mt-auto flex shrink-0 flex-col items-center gap-2 pt-3', isOpen && 'px-1.5')}>
        <div className="h-px w-full bg-white/10" />
        <UsageRing value={68} compact={!isOpen} />
      </div>
    </motion.aside>
  );
}

/**
 * Kredi kullanımını gösteren dairesel gösterge.
 * Kapalı modda yalnızca halka + yüzde, açık modda etiketiyle birlikte görünür.
 */
function UsageRing({ value, compact }: { value: number; compact: boolean }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className={cn('flex items-center gap-2.5 py-1', compact ? 'flex-col' : 'w-full')}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
          <circle cx="18" cy="18" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
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
          <span className="block text-[11.5px] font-semibold text-white/75">Kredi kullanımı</span>
          <span className="block text-[10px] text-white/35">1.240 / 4.000 kredi</span>
        </span>
      )}
      {compact && <span className="text-[8px] font-semibold uppercase tracking-wider text-white/25">kredi</span>}
    </div>
  );
}
