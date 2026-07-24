import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';

// Waveform çubuklarının farklı yükseklik/hız kombinasyonları
const bars = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  peak: 8 + ((index * 7) % 22),
  duration: 0.7 + ((index % 5) * 0.14),
  delay: (index % 7) * 0.06,
}));

/**
 * Mikrofona tıklandığında ekranın sol alt köşesinde açılan sesli asistan bloğu.
 * Referanstaki mavi-mor gradient orb + waveform + "Dinliyorum…" düzenini takip eder.
 */
export function VoiceOverlay() {
  const { isVoiceActive, closeVoiceAssistant, submitVoiceMessage } = useAppContext();

  return (
    <AnimatePresence>
      {isVoiceActive && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="glass-strong fixed bottom-6 left-6 z-50 w-[336px] rounded-[32px] p-6"
        >
          {/* Orb */}
          <div className="relative mx-auto flex h-[132px] w-[132px] items-center justify-center">
            <span className="absolute inset-0 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.55),rgba(139,92,246,0.25)_60%,transparent_72%)] blur-2xl" />

            <motion.div
              animate={{ scale: [1, 1.045, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-[112px] w-[112px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_26%,#93c5fd_0%,#3b82f6_28%,#1e3a8a_62%,#0b1024_100%)] shadow-[0_18px_44px_-12px_rgba(37,99,235,0.9),inset_0_1px_0_0_rgba(255,255,255,0.35)]"
            >
              {/* İçte yavaşça dönen ışık akışı */}
              <span className="absolute -inset-6 animate-orb-spin bg-[conic-gradient(from_0deg,transparent_0%,rgba(191,219,254,0.55)_22%,transparent_45%,rgba(167,139,250,0.4)_70%,transparent_100%)] blur-[10px]" />
              <span className="absolute left-[18%] top-[22%] h-[38%] w-[52%] -rotate-12 rounded-full bg-white/45 blur-[10px]" />
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_78%,rgba(0,0,0,0.45),transparent_60%)]" />
            </motion.div>
          </div>

          <p className="mt-5 text-center text-[13.5px] font-medium text-white/85">Dinliyorum…</p>
          <p className="mt-1 text-center text-[11px] text-white/35">Konuşmanı bitirince gönder simgesine dokun</p>

          {/* Waveform + aksiyonlar */}
          <div className="mt-5 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/35 p-2">
            <button
              type="button"
              onClick={closeVoiceAssistant}
              aria-label="İptal"
              className="icon-btn focus-ring h-8 w-8 border-white/10 hover:bg-red-500/20 hover:text-red-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex h-8 flex-1 items-center justify-center gap-[3px] overflow-hidden">
              {bars.map((bar) => (
                <motion.span
                  key={bar.id}
                  className="w-[3px] rounded-full bg-gradient-to-t from-indigo-400/70 via-blue-300 to-white/90"
                  animate={{ height: [4, bar.peak, 4] }}
                  transition={{ duration: bar.duration, repeat: Infinity, ease: 'easeInOut', delay: bar.delay }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={submitVoiceMessage}
              aria-label="Sesli mesajı gönder"
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_-6px_rgba(255,255,255,0.9)] transition-transform duration-300 hover:scale-105"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
