import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { newsItems } from '../data/news';
import { useAppContext } from '../context/appContextCore';
import { FeaturedNewsCard } from '../components/news/FeaturedNewsCard';
import { NewsCard } from '../components/news/NewsCard';
import { MarketPanel } from '../components/dashboard/MarketPanel';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { cn } from '../lib/cn';

const ALL = '__all__';

/**
 * Haberler sayfası — kategori filtreli tam liste görünümü.
 * Filtre kimliği olarak kategorinin Türkçe karşılığı kullanılır; etiketler
 * aktif dile göre çevrilir, böylece dil değişince seçim korunur.
 */
export function NewsPage() {
  const { t, tl } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(newsItems.map((item) => item.category.tr))],
    []
  );

  const filtered = useMemo(
    () => (activeCategory === ALL ? newsItems : newsItems.filter((item) => item.category.tr === activeCategory)),
    [activeCategory]
  );

  const [hero, ...rest] = filtered;

  const categoryLabel = (key: string) => {
    if (key === ALL) return t('common.all');
    const match = newsItems.find((item) => item.category.tr === key);
    return match ? tl(match.category) : key;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-5 py-5"
    >
      <div className="flex gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header>
            <h1 className="text-[22px] font-semibold tracking-tight text-white/95">{t('news.title')}</h1>
            <p className="mt-1 text-[12.5px] text-white/45">
              {filtered.length} {t('news.count')} · {t('news.subtitle')}
            </p>
          </header>

          {/* Kategori filtreleri */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'focus-ring rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-all duration-300',
                    isActive
                      ? 'border-indigo-400/40 bg-indigo-500/20 text-white shadow-[0_0_20px_-8px_rgba(99,102,241,0.9)]'
                      : 'border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:bg-white/[0.08] hover:text-white/85'
                  )}
                >
                  {categoryLabel(category)}
                </button>
              );
            })}
          </div>

          {hero && <FeaturedNewsCard news={hero} />}

          <div className="grid grid-cols-3 gap-3.5">
            {rest.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          {rest.length === 0 && !hero && (
            <p className="glass rounded-2xl p-6 text-center text-[13px] text-white/45">{t('news.empty')}</p>
          )}
        </div>

        <div className="flex w-[296px] shrink-0 flex-col gap-3.5 2xl:w-[324px]">
          <MarketPanel titleKey="panel.marketPulse" />
          <AlertsPanel />
        </div>
      </div>
    </motion.div>
  );
}
