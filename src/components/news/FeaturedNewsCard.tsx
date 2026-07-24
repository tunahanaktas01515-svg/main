import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { NewsItem } from '../../types';
import { cn } from '../../lib/cn';

interface FeaturedNewsCardProps {
  news: NewsItem;
}

/**
 * Büyük, öne çıkan haber kartı. Solda gradient görsel alanı, sağda başlık/özet yer alır.
 */
export function FeaturedNewsCard({ news }: FeaturedNewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="glass-panel flex overflow-hidden rounded-3xl"
    >
      {/* Görsel yerine gradient blok */}
      <div className={cn('relative w-2/5 shrink-0 overflow-hidden bg-gradient-to-br', news.gradient)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
          {news.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-semibold leading-snug text-white/95">{news.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{news.summary}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-white/35">{news.readTime} okuma</span>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            Devamını oku
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
