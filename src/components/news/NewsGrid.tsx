import type { NewsItem } from '../../types';
import { FeaturedNewsCard } from './FeaturedNewsCard';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  items: NewsItem[];
  /** Standart kart grid'inin sütun sayısı */
  columns?: 2 | 3 | 4;
}

/**
 * Haber listesini iki büyük öne çıkan kart + standart kart grid'i olarak render eder.
 */
export function NewsGrid({ items, columns = 3 }: NewsGridProps) {
  const featured = items.filter((item) => item.featured);
  const regular = items.filter((item) => !item.featured);
  const columnClass = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[columns];

  return (
    <div className="flex flex-col gap-4">
      {featured.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {featured.map((news) => (
            <FeaturedNewsCard key={news.id} news={news} />
          ))}
        </div>
      )}

      <div className={`grid gap-3.5 ${columnClass}`}>
        {regular.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}
