import { motion } from 'framer-motion';
import { newsItems } from '../data/news';
import { NewsGrid } from '../components/news/NewsGrid';
import { MarketSummary } from '../components/news/MarketSummary';

/**
 * Ana Sayfa: Günlük haberler + borsa özeti içeren varsayılan dashboard ekranı.
 */
export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full gap-5 overflow-y-auto p-6"
    >
      <div className="flex-1">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white/95">Günlük Haberler</h1>
          <p className="mt-1 text-sm text-white/45">
            Ekonomi, ihracat ve teknoloji dünyasından güncel gelişmeler
          </p>
        </div>
        <NewsGrid items={newsItems} />
      </div>

      <MarketSummary />
    </motion.div>
  );
}
