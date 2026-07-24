import { motion } from 'framer-motion';
import { newsItems } from '../data/news';
import { NewsCard } from '../components/news/NewsCard';
import { FeaturedNewsCard } from '../components/news/FeaturedNewsCard';

/**
 * Haberler sayfası: tüm haberlerin daha kapsamlı biçimde listelendiği tam sayfa görünüm.
 */
export function NewsPage() {
  const [primary, ...rest] = newsItems;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto p-6"
    >
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white/95">Tüm Haberler</h1>
        <p className="mt-1 text-sm text-white/45">Muhasebe, ihracat ve ekonomi gündemi tek yerde</p>
      </div>

      <div className="mb-5">
        <FeaturedNewsCard news={primary} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rest.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </motion.div>
  );
}
