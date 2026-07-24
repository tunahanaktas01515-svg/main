import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, X } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { cenanFeatures } from '../../data/cenanFeatures';
import { ModelSelector } from './ModelSelector';
import { ChatMessageList } from './ChatMessageList';
import { ChatInputBar } from './ChatInputBar';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Logo } from '../ui/Logo';

/**
 * Sağ tarafta her zaman görünür duran yapay zeka sohbet paneli.
 * Üst: başlık + model seçici · Orta: mesaj geçmişi · Alt: chat input barı.
 * Bir Cenan modülü aktifse başlığın altında modül şeridi gösterilir.
 */
export function ChatPanel() {
  const { activeFeatureId, resetChat } = useAppContext();
  const activeFeature = cenanFeatures.find((feature) => feature.id === activeFeatureId);

  return (
    <aside className="relative z-20 flex h-full w-[356px] shrink-0 flex-col border-l border-white/10 bg-white/[0.035] backdrop-blur-2xl">
      {/* Panelin üstündeki yumuşak ışık */}
      <span className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-indigo-500/12 blur-3xl" />

      <header className="relative flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-blue-500 shadow-[0_0_24px_-6px_rgba(139,92,246,0.95)]">
          <Logo size={16} className="text-white" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-[13.5px] font-semibold leading-tight text-white/95">Cenan AI</h2>
          <p className="flex items-center gap-1.5 text-[10.5px] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_1px_rgba(52,211,153,0.8)]" />
            Çevrimiçi
          </p>
        </div>

        <button
          type="button"
          onClick={resetChat}
          title="Sohbeti sıfırla"
          aria-label="Sohbeti sıfırla"
          className="icon-btn focus-ring h-8 w-8"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <ModelSelector />
      </header>

      {/* Aktif modül şeridi */}
      <AnimatePresence initial={false}>
        {activeFeature && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-b border-white/[0.07] bg-indigo-500/[0.06]"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-indigo-400/25 bg-indigo-500/15 text-indigo-200">
                <DynamicIcon name={activeFeature.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-white/90">{activeFeature.title}</p>
                <p className="truncate text-[10px] text-white/35">Modül bağlamı aktif</p>
              </div>
              <button
                type="button"
                onClick={resetChat}
                aria-label="Modül bağlamını kapat"
                className="focus-ring flex h-6 w-6 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatMessageList />
      <ChatInputBar />
    </aside>
  );
}
