import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

/**
 * Uygulamanın en arkasında sabit duran arka plan katmanı.
 * Görsel tabanlı seçeneklerde cover + hafif blur + karartma overlay uygulanır,
 * gradient seçeneklerinde katmanlı radial/linear gradientler kullanılır.
 * Açık temada üstüne aydınlatıcı bir örtü (`--page-tint`) düşer; vignette ve
 * film grain yoğunluğu da temaya göre CSS değişkenlerinden gelir.
 */
export function AppBackground() {
  const { activeBackgroundId, backgrounds } = useAppContext();
  const active = backgrounds.find((bg) => bg.id === activeBackgroundId) ?? backgrounds[0];

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
              {/* Cam panellerin okunabilirliği için karartma katmanı — açık temada zayıflatılır */}
              <div
                className="absolute inset-0 bg-[#000]"
                style={
                  {
                    '--bg-dim': active.dim ?? 0.65,
                    opacity: 'calc(var(--bg-dim) * var(--bg-dim-scale))',
                  } as React.CSSProperties
                }
              />
            </>
          ) : (
            <div className={cn('absolute inset-0', active.className)} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Yavaşça süzülen aurora blob'ları */}
      <div className="absolute -left-40 top-[-10%] h-[420px] w-[420px] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.22),transparent_65%)] blur-2xl" />
      <div className="absolute -right-32 bottom-[-15%] h-[520px] w-[520px] animate-float-slower rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_65%)] blur-2xl" />

      {/* Açık temada zemini aydınlatan örtü */}
      <div className="absolute inset-0 transition-colors duration-500" style={{ background: 'var(--page-tint)' }} />

      {/* Vignette + film grain */}
      <div className="absolute inset-0" style={{ background: 'var(--vignette)' }} />
      <div className="noise-layer absolute inset-0" style={{ opacity: 'var(--noise-opacity)' }} />
    </div>
  );
}
