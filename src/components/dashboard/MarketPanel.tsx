import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { marketAssets } from '../../data/market';
import { Sparkline } from '../ui/Sparkline';
import { cn } from '../../lib/cn';

interface MarketPanelProps {
  /** Panel başlığı; sayfaya göre değiştirilebilir */
  title?: string;
  className?: string;
}

/**
 * "Borsa Özeti" paneli — BTC, ETH, altın ve döviz satırları,
 * her satırda mini sparkline ve değişim yüzdesi ile.
 */
export function MarketPanel({ title = 'Borsa Özeti', className }: MarketPanelProps) {
  return (
    <section className={cn('glass flex flex-col rounded-3xl p-4', className)}>
      <header className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-white/90">{title}</h2>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/35">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_1px_rgba(52,211,153,0.8)]" />
          Canlı
        </span>
      </header>

      <div className="flex flex-col gap-1.5">
        {marketAssets.map((asset, index) => {
          const isPositive = asset.changePercent >= 0;

          return (
            <motion.button
              key={asset.id}
              type="button"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="focus-ring group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[10px] font-bold text-white/70">
                {asset.symbol.slice(0, 3)}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-white/85">{asset.symbol}</span>
                <span className="block truncate text-[10px] text-white/35">{asset.name}</span>
              </span>

              <Sparkline data={asset.series} positive={isPositive} className="shrink-0 opacity-80" />

              <span className="w-[68px] shrink-0 text-right">
                <span className="block text-[12px] font-semibold tabular-nums text-white/90">{asset.value}</span>
                <span
                  className={cn(
                    'flex items-center justify-end gap-0.5 text-[10px] font-semibold tabular-nums',
                    isPositive ? 'text-emerald-300' : 'text-red-300'
                  )}
                >
                  {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                  {Math.abs(asset.changePercent).toFixed(1)}%
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
