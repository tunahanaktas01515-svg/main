import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { modelOptions } from '../../data/models';
import { useAppContext } from '../../context/appContextCore';
import { useClickOutside } from '../../lib/useClickOutside';
import { cn } from '../../lib/cn';

/**
 * Cenan AI model seçici.
 * Ultra (72B) seçeneğinin altında kredi tüketimi notu gösterilir.
 */
export function ModelSelector() {
  const { model, setModel } = useAppContext();
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Not: backdrop-blur'lu üst eleman position:fixed overlay tekniğini bozduğu için
  // dışarı tıklama tespiti ref tabanlı hook ile yapılır.
  useClickOutside(containerRef, isOpen, () => setOpen(false));

  const selected = modelOptions.find((option) => option.id === model) ?? modelOptions[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="focus-ring flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-2.5 pr-2 text-[11.5px] font-semibold text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
        <span className="max-w-[92px] truncate">{selected.label}</span>
        <span className="rounded-full bg-white/[0.08] px-1.5 py-px text-[10px] font-bold text-white/45">
          {selected.paramSize}
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-white/40 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass-strong absolute right-0 top-full z-40 mt-2 w-[266px] origin-top-right rounded-2xl p-1.5"
          >
            {modelOptions.map((option) => {
              const isActive = option.id === model;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setModel(option.id);
                    setOpen(false);
                  }}
                  className={cn(
                    'focus-ring flex w-full items-start gap-2.5 rounded-xl p-2.5 text-left transition-colors duration-200',
                    isActive ? 'bg-white/[0.09]' : 'hover:bg-white/[0.05]'
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                      isActive
                        ? 'border-indigo-400/50 bg-indigo-500/30 text-white'
                        : 'border-white/15 bg-white/[0.04] text-transparent'
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-white/92">{option.label}</span>
                      <span className="rounded-full bg-white/[0.08] px-1.5 py-px text-[10px] font-bold text-white/45">
                        {option.paramSize}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-white/40">{option.description}</span>
                    {option.note && (
                      <span className="mt-1 block text-[10px] font-medium leading-snug text-amber-300/70">
                        {option.note}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
