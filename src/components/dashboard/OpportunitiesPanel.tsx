import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { opportunities } from '../../data/market';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

/**
 * "AI Fırsatları" paneli — modelin tespit ettiği ihracat/vergi fırsatları
 * ve her biri için güven skoru göstergesi.
 */
export function OpportunitiesPanel({ className }: { className?: string }) {
  const { t, tl } = useAppContext();

  return (
    <section className={cn('glass rounded-3xl p-4', className)}>
      <header className="mb-3 flex items-center gap-2 px-1">
        <Target className="h-3.5 w-3.5 text-indigo-300" />
        <h2 className="text-sm font-semibold text-white/90">{t('panel.opportunities')}</h2>
        <span className="ml-auto text-[10px] font-medium text-white/30">{opportunities.length}</span>
      </header>

      <div className="flex flex-col gap-2">
        {opportunities.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.32 }}
            className="focus-ring group w-full rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-semibold text-white/90">{tl(item.title)}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/40">{tl(item.subtitle)}</p>
              </div>
              <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white/85">{item.score}%</span>
            </div>

            {/* Güven skoru göstergesi */}
            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: 'easeOut' }}
                className={cn('h-full rounded-full bg-gradient-to-r', item.accent)}
              />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
