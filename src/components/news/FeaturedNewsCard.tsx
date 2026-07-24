import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { NewsItem } from '../../types';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/cn';

/**
 * Büyük, öne çıkan haber kartı: solda gradient görsel alanı, sağda başlık, özet ve aksiyon.
 */
export function FeaturedNewsCard({ news }: { news: NewsItem }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="glass group relative flex h-[172px] overflow-hidden rounded-3xl"
    >
      {/* Hover glow */}
      <span className="pointer-events-none absolute inset-0 opacity-0 shadow-[0_0_44px_-8px_rgba(99,102,241,0.55)] transition-opacity duration-500 group-hover:opacity-100" />

      {/* Görsel alanı */}
      <div className={cn('relative w-[38%] shrink-0 overflow-hidden', news.gradient)}>
        <span className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_25%,rgba(255,255,255,0.18),transparent_60%)]" />
        <span className="noise-layer absolute inset-0 opacity-[0.07]" />
        <span className="absolute left-3 top-3">
          <Badge tone="indigo">{news.category}</Badge>
        </span>
        {/* Kart gövdesine yumuşak geçiş */}
        <span className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-black/40" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug tracking-tight text-white/95">
            {news.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-white/50">{news.summary}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5 text-[11px] text-white/30">
            <span className="font-medium text-white/45">{news.source}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {news.readTime}
            </span>
            <span>{news.publishedAt}</span>
          </span>

          <span className="focus-ring flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold text-white/80 transition-all duration-300 group-hover:border-indigo-400/40 group-hover:bg-indigo-500/20 group-hover:text-white">
            Devamını oku
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
