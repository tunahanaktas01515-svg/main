import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

/**
 * Mikrofon ikonuna tıklandığında ekranın sol alt köşesinde açılan
 * mavi-mor gradient orb animasyonlu sesli asistan bloğu.
 */
export function VoiceAssistantOverlay() {
  const { isVoiceActive, closeVoiceAssistant, sendUserMessage } = useAppContext();

  const handleConfirm = () => {
    sendUserMessage('(Sesli mesaj) Faturamı nasıl analiz edebilirim?');
    closeVoiceAssistant();
  };

  return (
    <AnimatePresence>
      {isVoiceActive && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="glass-panel-strong fixed bottom-6 left-6 z-50 flex w-80 flex-col items-center gap-5 rounded-3xl p-6"
        >
          {/* Gradient orb */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 blur-xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-3 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 shadow-[0_0_40px_rgba(139,92,246,0.65)]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Waveform */}
          <div className="flex h-8 items-center gap-1">
            {Array.from({ length: 16 }).map((_, index) => (
              <motion.span
                key={index}
                className="w-1 rounded-full bg-gradient-to-t from-indigo-400 to-violet-300"
                animate={{ height: [6, 24, 6] }}
                transition={{
                  duration: 0.9 + (index % 4) * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.05,
                }}
              />
            ))}
          </div>

          <p className="text-sm font-medium text-white/80">Dinliyorum…</p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeVoiceAssistant}
              className="icon-button h-11 w-11 border-white/15 text-white/70 hover:bg-red-500/15 hover:text-red-300"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="icon-button h-11 w-11 border-indigo-400/30 bg-indigo-500/20 text-white hover:bg-indigo-500/30"
            >
              <Check className="h-4.5 w-4.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
