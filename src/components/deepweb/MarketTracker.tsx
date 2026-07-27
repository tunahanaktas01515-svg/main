import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Radio, TrendingDown, TrendingUp } from 'lucide-react';
import { extendedMarkets, marketTabs, marketTracker, type MarketTab, type TrackerRow } from '../../data/deepweb';
import { useAppContext } from '../../context/appContextCore';
import { Sparkline } from '../ui/Sparkline';
import { cn } from '../../lib/cn';

/**
 * Borsa takip bloğu — tek uzun panel içinde Borsa / Dövizler / Çapraz Kurlar sekmeleri.
 * Alttaki "Tüm piyasalar" butonu, kalan 18 kur ve endeksi açar; yukarı bakan ok
 * ikonuna basıldığında bu bölüm yeniden kapanır.
 */
export function MarketTracker() {
  const { t, tl } = useAppContext();
  const [activeTab, setActiveTab] = useState<MarketTab>('borsa');
  const [isExpanded, setExpanded] = useState(false);

  const rows = marketTracker[activeTab];
  const gainers = rows.filter((row) => row.changePercent >= 0).length;

  return (
    <section className="glass relative overflow-hidden rounded-3xl p-5">
      <span className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-indigo-500/12 blur-3xl" />

      <header className="relative mb-4 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white/95">
            {t('market.title')}
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              <Radio className="h-2.5 w-2.5" />
              {t('market.live')}
            </span>
          </h2>
          <p className="mt-0.5 text-[12px] text-white/40">
            {t('market.meta')} · {gainers}/{rows.length} {t('market.rising')}
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
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>
      </header>

      <div className="relative flex flex-col gap-1.5">
        {rows.map((row, index) => (
          <MarketRow key={row.id} row={row} index={index} label={tl(row.name)} extra={tl(row.extra)} />
        ))}
      </div>

      {/* Tüm piyasalar — açıldığında kalan kur ve endeksler listelenir */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="mt-3.5 flex items-center gap-2 border-t border-white/[0.07] pt-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {t('market.allMarketsTitle')}
              </span>
              <span className="text-[10.5px] text-white/25">
                {extendedMarkets.length} {t('market.allMarketsMeta')}
              </span>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label={t('market.collapseAll')}
                title={t('market.collapseAll')}
                className="focus-ring ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/60 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/18 hover:text-white"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {extendedMarkets.map((row, index) => (
                <MarketRow
                  key={row.id}
                  row={row}
                  index={index}
                  label={tl(row.name)}
                  extra={tl(row.extra)}
                  compact
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative mt-3.5 flex items-center justify-between border-t border-white/[0.07] pt-3">
        <span className="text-[10.5px] text-white/30">{t('market.delayNote')}</span>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="focus-ring flex items-center gap-1.5 text-[11.5px] font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
        >
          {isExpanded ? t('market.collapseAll') : t('market.allMarkets')}
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </footer>
    </section>
  );
}

function MarketRow({
  row,
  index,
  label,
  extra,
  compact = false,
}: {
  row: TrackerRow;
  index: number;
  label: string;
  extra: string;
  compact?: boolean;
}) {
  const isPositive = row.changePercent >= 0;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
      className={cn(
        'focus-ring group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] text-left transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06]',
        compact ? 'px-3 py-2' : 'px-4 py-3'
      )}
    >
      <span className={cn('shrink-0', compact ? 'w-[92px]' : 'w-[104px]')}>
        <span
          className={cn(
            'block truncate font-semibold text-white/90',
            compact ? 'text-[12px]' : 'text-[13px]'
          )}
        >
          {row.symbol}
        </span>
        <span className="block truncate text-[10.5px] text-white/35">{label}</span>
      </span>

      {!compact && <span className="hidden min-w-0 flex-1 truncate text-[11px] text-white/30 xl:block">{extra}</span>}
      {compact && <span className="min-w-0 flex-1" />}

      <Sparkline
        data={row.series}
        positive={isPositive}
        width={compact ? 64 : 92}
        height={compact ? 22 : 28}
        className="shrink-0 opacity-85"
      />

      <span className={cn('shrink-0 text-right', compact ? 'w-[98px]' : 'w-[112px]')}>
        <span
          className={cn(
            'block font-semibold tabular-nums text-white/95',
            compact ? 'text-[12.5px]' : 'text-[14px]'
          )}
        >
          {row.value}
        </span>
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
}
