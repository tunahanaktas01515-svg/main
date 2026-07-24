import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, TrendingDown, TrendingUp } from 'lucide-react';
import { marketTabs, marketTracker, type MarketTab } from '../../data/deepweb';
import { Sparkline } from '../ui/Sparkline';
import { cn } from '../../lib/cn';

/**
 * Borsa takip bloğu — tek uzun panel içinde Borsa / Dövizler / Çapraz Kurlar sekmeleri.
 * Her satırda sembol, isim, sparkline, değer, değişim yüzdesi ve ek bilgi yer alır.
 */
export function MarketTracker() {
  const [activeTab, setActiveTab] = useState<MarketTab>('borsa');
  const rows = marketTracker[activeTab];

  const gainers = rows.filter((row) => row.changePercent >= 0).length;

  return (
    <section className="glass relative overflow-hidden rounded-3xl p-5">
      <span className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-indigo-500/12 blur-3xl" />

      <header className="relative mb-4 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white/95">
            Borsa Takibi
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              <Radio className="h-2.5 w-2.5" />
              CANLI
            </span>
          </h2>
          <p className="mt-0.5 text-[12px] text-white/40">
            Endeksler, döviz kurları ve çapraz pariteler · {gainers}/{rows.length} yükselişte
          </p>
        </div>

        {/* Sekmeler */}
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {marketTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'focus-ring relative rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/85'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="market-tab-indicator"
                    className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.14] shadow-[0_6px_20px_-8px_rgba(99,102,241,0.9)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="relative flex flex-col gap-1.5">
        {rows.map((row, index) => {
          const isPositive = row.changePercent >= 0;

          return (
            <motion.button
              key={row.id}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className="focus-ring group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-left transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06]"
            >
              <span className="w-[104px] shrink-0">
                <span className="block truncate text-[13px] font-semibold text-white/90">{row.symbol}</span>
                <span className="block truncate text-[10.5px] text-white/35">{row.name}</span>
              </span>

              <span className="hidden min-w-0 flex-1 truncate text-[11px] text-white/30 xl:block">{row.extra}</span>

              <Sparkline data={row.series} positive={isPositive} width={92} height={28} className="shrink-0 opacity-85" />

              <span className="w-[112px] shrink-0 text-right">
                <span className="block text-[14px] font-semibold tabular-nums text-white/95">{row.value}</span>
                <span
                  className={cn(
                    'flex items-center justify-end gap-1 text-[11px] font-semibold tabular-nums',
                    isPositive ? 'text-emerald-300' : 'text-red-300'
                  )}
                >
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {isPositive ? '+' : '−'}
                  {Math.abs(row.changePercent).toFixed(2)}%
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <footer className="relative mt-3.5 flex items-center justify-between border-t border-white/[0.07] pt-3">
        <span className="text-[10.5px] text-white/30">Veriler 15 dk gecikmeli · demo verisi</span>
        <button
          type="button"
          className="focus-ring text-[11.5px] font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
        >
          Tüm piyasalar
        </button>
      </footer>
    </section>
  );
}
