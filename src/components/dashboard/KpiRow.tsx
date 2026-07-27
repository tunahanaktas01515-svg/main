import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { kpiCards } from '../../data/market';
import { useAppContext } from '../../context/appContextCore';
import { DynamicIcon } from '../ui/DynamicIcon';
import { cn } from '../../lib/cn';

const trendStyles = {
  up: 'text-emerald-300',
  down: 'text-red-300',
  flat: 'text-white/45',
};

/**
 * Dashboard üstündeki dört sütunlu KPI kart sırası.
 */
export function KpiRow() {
  const { tl } = useAppContext();

  return (
    <div className="grid grid-cols-4 gap-3">
      {kpiCards.map((kpi, index) => {
        const TrendIcon = kpi.trend === 'up' ? ArrowUpRight : kpi.trend === 'down' ? ArrowDownRight : Minus;

        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
            className="glass glass-hover group relative overflow-hidden rounded-2xl p-4"
          >
            {/* Hover'da beliren yumuşak indigo glow */}
            <span className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-indigo-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70">
                <DynamicIcon name={kpi.icon} className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <span className={cn('flex items-center gap-0.5 text-[11px] font-semibold', trendStyles[kpi.trend])}>
                <TrendIcon className="h-3 w-3" />
                {tl(kpi.changeLabel)}
              </span>
            </div>

            <p className="mt-3.5 text-[11px] font-medium uppercase tracking-wider text-white/35">{tl(kpi.label)}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-white/95 tabular-nums">{kpi.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
