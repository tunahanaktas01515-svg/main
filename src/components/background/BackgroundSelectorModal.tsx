import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { backgroundOptions } from '../../data/backgrounds';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../lib/cn';

/**
 * Kalem ikonuna tıklandığında açılan, ekranı tam kaplamayan glass arka plan seçici modal.
 */
export function BackgroundSelectorModal() {
  const { isBackgroundModalOpen, closeBackgroundModal, activeBackgroundId, setActiveBackgroundId } =
    useAppContext();

  return (
    <AnimatePresence>
      {isBackgroundModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeBackgroundModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="glass-panel-strong w-[640px] rounded-3xl p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white/95">Arka Planlar</h2>
                <p className="mt-0.5 text-sm text-white/45">
                  Uygulamanın tümüne uygulanacak liquid abstract temayı seç
                </p>
              </div>
              <button
                type="button"
                onClick={closeBackgroundModal}
                className="icon-button h-9 w-9"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {backgroundOptions.map((bg) => {
                const isActive = bg.id === activeBackgroundId;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setActiveBackgroundId(bg.id)}
                    className={cn(
                      'group relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300',
                      isActive
                        ? 'border-indigo-400/60 shadow-[0_0_24px_rgba(99,102,241,0.45)]'
                        : 'border-white/10 hover:border-white/25'
                    )}
                  >
                    <div className={cn('absolute inset-0', bg.className)} />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                    {isActive && (
                      <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <span className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                      {bg.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
