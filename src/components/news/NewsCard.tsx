import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { NewsItem } from '../../types';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

/**
 * Grid içinde yer alan standart haber kartı.
 */
export function NewsCard({ news }: { news: NewsItem }) {
  const { tl } = useAppContext();

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 shadow-[0_0_36px_-10px_rgba(139,92,246,0.6)] transition-opacity duration-500 group-hover:opacity-100" />

      <div className={cn('relative h-[74px] w-full overflow-hidden', news.gradient)}>
        <span className="absolute inset-0 bg-[radial-gradient(80%_80%_at_25%_20%,rgba(255,255,255,0.16),transparent_60%)]" />
        <span className="noise-layer absolute inset-0 opacity-[0.06]" />
        <span className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300/80">
          {tl(news.category)}
        </span>
        <h4 className="mt-1.5 line-clamp-2 text-[13px] font-semibold leading-snug text-white/90">{tl(news.title)}</h4>
        <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-white/40">{tl(news.summary)}</p>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
          <span className="text-[10px] text-white/30">
            {tl(news.publishedAt)} · {tl(news.readTime)}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-white/25 transition-colors duration-300 group-hover:text-indigo-300" />
        </div>
      </div>
    </motion.article>
  );
}
