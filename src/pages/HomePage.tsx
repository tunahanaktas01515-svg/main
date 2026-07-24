import { motion } from 'framer-motion';
import { CalendarDays, RefreshCw } from 'lucide-react';
import { newsItems } from '../data/news';
import { NewsGrid } from '../components/news/NewsGrid';
import { KpiRow } from '../components/dashboard/KpiRow';
import { AiSummaryPanel } from '../components/dashboard/AiSummaryPanel';
import { MarketPanel } from '../components/dashboard/MarketPanel';
import { OpportunitiesPanel } from '../components/dashboard/OpportunitiesPanel';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';

/**
 * Ana Sayfa — günlük haberler, AI özeti, KPI kartları ve sağ tarafta
 * borsa özeti / fırsatlar / uyarılar panellerini içeren ana dashboard.
 */
export function HomePage() {
  const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-5 py-5"
    >
      <div className="flex gap-4">
        {/* Orta kolon */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="flex items-end justify-between">
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight text-white/95">Günlük Haberler</h1>
              <p className="mt-1 text-[12.5px] text-white/45">
                Ekonomi, ihracat ve mevzuat gündeminden Cenan tarafından derlenmiş özet
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/50">
                <CalendarDays className="h-3.5 w-3.5" />
                {today}
              </span>
              <button
                type="button"
                aria-label="Yenile"
                className="icon-btn focus-ring h-8 w-8"
                title="Haberleri yenile"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </header>

          <KpiRow />
          <AiSummaryPanel />
          <NewsGrid items={newsItems} />
        </div>

        {/* Sağ ray: piyasa, fırsatlar, uyarılar */}
        <div className="flex w-[248px] shrink-0 flex-col gap-3.5 2xl:w-[280px]">
          <MarketPanel />
          <OpportunitiesPanel />
          <AlertsPanel />
        </div>
      </div>
    </motion.div>
  );
}
