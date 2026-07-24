import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, X } from 'lucide-react';
import { useAppContext } from '../context/appContextCore';
import { quickActions } from '../data/quickActions';
import { cenanFeatures } from '../data/cenanFeatures';
import { Orb, OrbIcon } from '../components/ui/Orb';
import { PromptComposer } from '../components/cenan/PromptComposer';
import { QuickActions } from '../components/cenan/QuickActions';
import { ConversationThread } from '../components/cenan/ConversationThread';
import { DynamicIcon } from '../components/ui/DynamicIcon';

/**
 * Cenan sayfası — yapay zeka konuşma motoru.
 * Sohbet boşken: mavi orb + "Bugün, ne yapalım?" başlığı + composer + 7 hızlı aksiyon.
 * Sohbet başlayınca: üstte kompakt başlık, ortada konuşma akışı, altta composer.
 */
export function CenanPage() {
  const { messages, sendUserMessage, triggerCenanFeature, resetChat, activeFeatureId } = useAppContext();
  const [draft, setDraft] = useState('');

  const hasConversation = messages.length > 0;
  const activeFeature = cenanFeatures.find((feature) => feature.id === activeFeatureId);

  const handleSubmit = () => {
    if (!draft.trim()) return;
    sendUserMessage(draft);
    setDraft('');
  };

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find((item) => item.id === actionId);
    if (!action) return;

    // Modüle bağlı aksiyonlarda sistem promptu da sohbete enjekte edilir
    if (action.featureId) {
      triggerCenanFeature(action.featureId);
      setDraft('');
      return;
    }
    setDraft(action.prompt);
  };

  return (
    <div className="flex h-full flex-col">
      <AnimatePresence mode="wait">
        {!hasConversation ? (
          /* --- Karşılama düzeni --- */
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full flex-col items-center justify-center px-6 pb-8"
          >
            <Orb size={148} />

            <h1 className="mt-7 text-center text-[34px] font-semibold tracking-tight text-white/95">
              Bugün, ne yapalım?
            </h1>
            <p className="mt-2 text-center text-[13px] text-white/45">
              Muhasebe, e-fatura, stok ve ihracat işlerinde Cenan yanında
            </p>

            <div className="mt-7 w-full max-w-[780px]">
              <PromptComposer value={draft} onChange={setDraft} onSubmit={handleSubmit} variant="hero" />
              <QuickActions onSelect={handleQuickAction} className="mt-4" />
            </div>
          </motion.div>
        ) : (
          /* --- Konuşma düzeni --- */
          <motion.div
            key="thread"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full min-h-0 flex-col"
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-white/[0.07] px-6 py-3">
              <OrbIcon size={30} />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-white/92">Cenan AI</p>
                <p className="flex items-center gap-1.5 text-[10.5px] text-white/35">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_1px_rgba(52,211,153,0.8)]" />
                  Çevrimiçi · yanıtlar demo amaçlıdır
                </p>
              </div>

              {activeFeature && (
                <span className="flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/12 py-1.5 pl-2.5 pr-1.5 text-[11.5px] font-semibold text-indigo-100">
                  <DynamicIcon name={activeFeature.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
                  {activeFeature.title}
                  <button
                    type="button"
                    onClick={resetChat}
                    aria-label="Modül bağlamını kapat"
                    className="focus-ring flex h-5 w-5 items-center justify-center rounded-full text-indigo-100/70 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={resetChat}
                title="Yeni sohbet"
                aria-label="Yeni sohbet"
                className="icon-btn focus-ring h-8 w-8"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <ConversationThread />
            </div>

            <div className="shrink-0 px-6 pb-5">
              <div className="mx-auto w-full max-w-[760px]">
                <PromptComposer value={draft} onChange={setDraft} onSubmit={handleSubmit} variant="thread" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
