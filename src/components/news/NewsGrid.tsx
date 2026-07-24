import type { NewsItem } from '../../types';
import { FeaturedNewsCard } from './FeaturedNewsCard';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  items: NewsItem[];
}

/**
 * Haber listesini öne çıkanlar (büyük kartlar) ve standart grid olarak render eder.
 */
export function NewsGrid({ items }: NewsGridProps) {
  const featured = items.filter((item) => item.featured);
  const regular = items.filter((item) => !item.featured);

  return (
    <div className="flex flex-col gap-5">
      {featured.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {featured.map((news) => (
            <FeaturedNewsCard key={news.id} news={news} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {regular.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}
