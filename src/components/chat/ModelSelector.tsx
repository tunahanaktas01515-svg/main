import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { modelOptions } from '../../data/models';
import { useAppContext } from '../../context/AppContext';
import { useClickOutside } from '../../lib/useClickOutside';
import { cn } from '../../lib/cn';

/**
 * Cenan AI model seçici — Ultra / Pro arasında geçiş yapan glass dropdown.
 */
export function ModelSelector() {
  const { model, setModel } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = modelOptions.find((option) => option.id === model) ?? modelOptions[0];

  // Chat panelindeki backdrop-blur atası, "fixed" overlay tekniğini geçersiz kıldığı için
  // dışarı tıklama tespiti ref tabanlı bu hook ile yapılır.
  useClickOutside(containerRef, isOpen, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-xl transition-colors hover:bg-white/10"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
        {selected.label}
        <span className="text-white/35">{selected.paramSize}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-panel-strong absolute left-0 top-full z-30 mt-2 w-64 origin-top-left rounded-2xl p-1.5"
          >
            {modelOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setModel(option.id);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors',
                  option.id === model ? 'bg-white/10' : 'hover:bg-white/5'
                )}
              >
                <span className="flex items-center gap-1.5 text-sm font-medium text-white/90">
                  {option.label}
                  <span className="text-xs text-white/40">({option.paramSize})</span>
                </span>
                {option.note && <span className="text-[11px] text-white/35">{option.note}</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
