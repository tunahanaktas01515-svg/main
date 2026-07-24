import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { aiSummary } from '../../data/market';
import { Badge } from '../ui/Badge';

/**
 * "AI Summary" paneli — Cenan modelinin ürettiği günlük durum özeti.
 * Sol üstte canlı gradient orb, altta tespit sayacı ve aksiyon linki bulunur.
 */
export function AiSummaryPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass relative overflow-hidden rounded-3xl p-5"
    >
      {/* Arka plandaki yumuşak indigo/violet ışık */}
      <span className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-violet-500/15 blur-3xl" />

      <header className="relative flex items-center gap-3">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-blue-500 shadow-[0_0_22px_-4px_rgba(139,92,246,0.9)]">
          <Sparkles className="h-4 w-4 text-white" />
        </span>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-white/95">AI Özeti</h2>
          <p className="text-[11px] text-white/35">{aiSummary.updatedAt}</p>
        </div>
        <Badge tone="indigo">Cenan Ultra</Badge>
      </header>

      <p className="relative mt-4 text-[13px] leading-relaxed text-white/65">{aiSummary.text}</p>

      <footer className="relative mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3.5">
        <span className="text-[11px] font-medium text-white/45">{aiSummary.detections}</span>
        <button
          type="button"
          className="focus-ring flex items-center gap-1 text-[12px] font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
        >
          Detaylı rapor
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </footer>
    </motion.section>
  );
}
