import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, CandlestickChart, Radio, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/appContextCore';
import { marketInsight, marketKpis, sectorPerformance, trendLabels, trendSeries, weeklyVolume } from '../data/marketBoard';
import { MarketTracker } from '../components/deepweb/MarketTracker';
import { BarChart } from '../components/ui/BarChart';
import { Sparkline } from '../components/ui/Sparkline';
import { TrendChart } from '../components/ui/TrendChart';
import { localeCodes } from '../i18n';
import { cn } from '../lib/cn';
import type { TranslationKey } from '../i18n/dictionary';

const ranges: { id: string; labelKey: TranslationKey }[] = [
  { id: 'day', labelKey: 'market.range.day' },
  { id: 'week', labelKey: 'market.range.week' },
  { id: 'month', labelKey: 'market.range.month' },
];

/**
 * Borsa Takibi sayfası.
 * Üstte özet kartları, ortada çok serili trend grafiği ile AI piyasa yorumu,
 * altta tüm piyasaları açabilen takip tablosu ve istatistik grafikleri yer alır.
 */
export function MarketPage() {
  const { t, tl, language } = useAppContext();
  const [range, setRange] = useState('day');

  const today = new Date().toLocaleDateString(localeCodes[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const series = useMemo(
    () => trendSeries.map((item) => ({ id: item.id, label: t(item.nameKey), color: item.color, data: item.data })),
    [t]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-5 py-5"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4">
        {/* Başlık */}
        <header className="flex items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2.5 text-[22px] font-semibold uppercase tracking-tight text-white/95">
              <CandlestickChart className="h-5 w-5 text-indigo-300" />
              {t('market.pageTitle')}
            </h1>
            <p className="mt-1 text-[12.5px] text-white/45">
              {today} · {t('market.pageSubtitle')}
            </p>
          </div>

          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/12 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
            <Radio className="h-3 w-3" />
            {t('market.live')}
          </span>
        </header>

        {/* Özet kartları */}
        <div className="grid grid-cols-4 gap-3">
          {marketKpis.map((kpi, index) => {
            const isPositive = kpi.changePercent >= 0;

            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                className="glass glass-hover group relative overflow-hidden rounded-2xl p-4"
              >
                <span className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-indigo-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-semibold uppercase tracking-wider text-white/40">
                      {kpi.symbol}
                    </span>
                    <span className="mt-0.5 block truncate text-[10.5px] text-white/30">{tl(kpi.name)}</span>
                  </span>
                  <span
                    className={cn(
                      'flex shrink-0 items-center gap-0.5 text-[11px] font-semibold tabular-nums',
                      isPositive ? 'text-emerald-300' : 'text-red-300'
                    )}
                  >
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? '+' : '−'}
                    {Math.abs(kpi.changePercent).toFixed(2)}%
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-[22px] font-semibold tracking-tight tabular-nums text-white/95">{kpi.value}</p>
                  <Sparkline data={kpi.series} positive={isPositive} width={72} height={26} className="shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trend grafiği + AI yorumu */}
        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-4">
          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-sky-500/12 blur-3xl" />

            <header className="relative mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[15px] font-semibold tracking-tight text-white/95">{t('market.trendsTitle')}</h2>
                <p className="mt-0.5 text-[12px] text-white/40">{t('market.trendsMeta')}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                {ranges.map((item) => {
                  const isActive = item.id === range;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRange(item.id)}
                      className={cn(
                        'focus-ring relative rounded-full px-3 py-1 text-[11px] font-medium transition-colors duration-300',
                        isActive ? 'text-white' : 'text-white/50 hover:text-white/85'
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="market-range"
                          className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.14]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {t(item.labelKey)}
                    </button>
                  );
                })}
              </div>
            </header>

            {/* Seri göstergesi */}
            <div className="relative mb-2 flex flex-wrap items-center gap-3">
              {series.map((item) => (
                <span key={item.id} className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <span className="h-1.5 w-4 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </span>
              ))}
            </div>

            <TrendChart series={series} labels={trendLabels} height={248} className="relative" />
          </section>

          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl" />

            <header className="relative flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-blue-500 shadow-[0_0_22px_-4px_rgba(139,92,246,0.9)]">
                <Sparkles className="h-4 w-4 on-accent" />
              </span>
              <h2 className="flex-1 text-[14px] font-semibold text-white/95">{t('market.insightTitle')}</h2>
              <span className="rounded-full border border-indigo-400/25 bg-indigo-500/12 px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-indigo-100">
                {t('market.insightBadge')}
              </span>
            </header>

            <h3 className="relative mt-4 text-[13.5px] font-semibold leading-snug text-white/90">
              {tl(marketInsight.headline)}
            </h3>
            <p className="relative mt-2 text-[12px] leading-relaxed text-white/50">{tl(marketInsight.body)}</p>

            <div className="relative mt-4 flex flex-col gap-2">
              {marketInsight.signals.map((signal) => (
                <div
                  key={signal.labelKey}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2"
                >
                  <Activity
                    className={cn(
                      'h-3.5 w-3.5 shrink-0',
                      signal.tone === 'up'
                        ? 'text-emerald-300'
                        : signal.tone === 'down'
                          ? 'text-red-300'
                          : 'text-amber-300'
                    )}
                  />
                  <span className="text-[11px] uppercase tracking-wider text-white/35">{t(signal.labelKey)}</span>
                  <span className="ml-auto text-[11.5px] font-semibold text-white/80">{tl(signal.value)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Takip tablosu + istatistikler */}
        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-4">
          <MarketTracker />

          <section className="glass rounded-3xl p-5">
            <header className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-3.5 w-3.5 text-white/50" />
              <h2 className="text-[14px] font-semibold text-white/92">{t('market.volumeTitle')}</h2>
              <span className="ml-auto text-[10.5px] text-white/30">{t('market.volumeMeta')}</span>
            </header>

            <BarChart
              data={weeklyVolume.map((item) => ({ label: t(item.labelKey), value: item.value }))}
              color="#38bdf8"
              height={118}
            />

            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <header className="mb-3 flex items-center gap-2">
                <h2 className="text-[14px] font-semibold text-white/92">{t('market.sectorTitle')}</h2>
                <span className="ml-auto text-[10.5px] text-white/30">{t('market.sectorMeta')}</span>
              </header>

              <BarChart
                data={sectorPerformance.map((item) => ({ label: t(item.labelKey), value: item.value }))}
                color="#818cf8"
                height={104}
                showAxis={false}
              />
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
