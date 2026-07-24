import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';

/**
 * Deep Web sayfası: ihracatta risk/uyum istihbaratı için ayrılmış, henüz geliştirilmekte olan modül.
 */
export function DeepWebPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full items-center justify-center p-6"
    >
      <GlassPanel rounded="3xl" className="flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-600/30 text-indigo-300 shadow-[0_0_30px_rgba(139,92,246,0.35)]">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-white/95">Deep Web İstihbarat Modülü</h2>
        <p className="text-sm leading-relaxed text-white/50">
          İhracat riski, sahtecilik ve marka ihlali taramaları için karanlık ağ istihbarat modülü
          yakında burada olacak. Bu modül şu anda yapım aşamasındadır.
        </p>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50">
          Yakında
        </span>
      </GlassPanel>
    </motion.div>
  );
}
