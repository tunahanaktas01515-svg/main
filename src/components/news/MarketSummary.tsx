import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { marketItems } from '../../data/news';
import { GlassPanel } from '../ui/GlassPanel';
import { cn } from '../../lib/cn';

/**
 * Sağ tarafta yer alan küçük "Borsa Özeti" paneli (BTC, ETH, altın, döviz).
 */
export function MarketSummary() {
  return (
    <GlassPanel rounded="3xl" className="flex w-[240px] shrink-0 flex-col gap-3 p-4">
      <h3 className="px-1 text-sm font-semibold text-white/85">Borsa Özeti</h3>
      <div className="flex flex-col gap-2">
        {marketItems.map((item, index) => {
          const isPositive = item.changePercent >= 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
            >
              <div>
                <p className="text-xs font-semibold text-white/80">{item.symbol}</p>
                <p className="text-[11px] text-white/35">{item.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-white/85">{item.value}</p>
                <p
                  className={cn(
                    'flex items-center justify-end gap-0.5 text-[11px] font-medium',
                    isPositive ? 'text-emerald-400' : 'text-red-400'
                  )}
                >
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(item.changePercent)}%
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
