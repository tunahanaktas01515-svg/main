import { motion } from 'framer-motion';
import type { NewsItem } from '../../types';
import { cn } from '../../lib/cn';

interface NewsCardProps {
  news: NewsItem;
}

/**
 * Grid içinde yer alan standart (küçük) haber kartı.
 */
export function NewsCard({ news }: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="glass-panel flex flex-col overflow-hidden rounded-2xl"
    >
      <div className={cn('h-24 w-full bg-gradient-to-br', news.gradient)} />
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-indigo-300/80">
          {news.category}
        </span>
        <h4 className="mt-1.5 text-sm font-semibold leading-snug text-white/90">{news.title}</h4>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/45">{news.summary}</p>
        <span className="mt-3 text-[11px] text-white/30">{news.readTime} okuma</span>
      </div>
    </motion.article>
  );
}
