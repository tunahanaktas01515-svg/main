import { AnimatePresence, motion } from 'framer-motion';
import { backgroundOptions } from '../../data/backgrounds';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

/**
 * Uygulamanın en arkasında sabit duran arka plan katmanı.
 * Görsel tabanlı seçeneklerde cover + hafif blur + karartma overlay uygulanır,
 * gradient seçeneklerinde katmanlı radial/linear gradientler kullanılır.
 * Üstüne her koşulda aurora blob'ları, vignette ve film grain eklenir.
 */
export function AppBackground() {
  const { activeBackgroundId } = useAppContext();
  const active = backgroundOptions.find((bg) => bg.id === activeBackgroundId) ?? backgroundOptions[0];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {active.kind === 'image' ? (
            <>
              <div
                className="absolute -inset-8 bg-cover bg-center blur-[3px]"
                style={{ backgroundImage: `url(${active.src})` }}
              />
              {/* Cam panellerin okunabilirliği için karartma katmanı */}
              <div className="absolute inset-0 bg-black" style={{ opacity: active.dim ?? 0.65 }} />
            </>
          ) : (
            <div className={cn('absolute inset-0', active.className)} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Yavaşça süzülen aurora blob'ları */}
      <div className="absolute -left-40 top-[-10%] h-[420px] w-[420px] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.22),transparent_65%)] blur-2xl" />
      <div className="absolute -right-32 bottom-[-15%] h-[520px] w-[520px] animate-float-slower rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_65%)] blur-2xl" />

      {/* Vignette + film grain */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="noise-layer absolute inset-0 opacity-[0.035]" />
    </div>
  );
}
