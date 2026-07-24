import { motion, AnimatePresence } from 'framer-motion';
import { backgroundOptions } from '../../data/backgrounds';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../lib/cn';

/**
 * Tüm uygulamanın arkasında sabit (fixed) duran gradient/liquid arka plan katmanı.
 * Kullanıcının seçtiği arka plan seçeneğine göre değişir, yumuşak bir fade ile geçiş yapar.
 */
export function AppBackground() {
  const { activeBackgroundId } = useAppContext();
  const active = backgroundOptions.find((bg) => bg.id === activeBackgroundId) ?? backgroundOptions[0];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={cn('absolute inset-0', active.className)}
        />
      </AnimatePresence>

      {/* İnce noise/vignette overlay — derinlik hissi için */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
