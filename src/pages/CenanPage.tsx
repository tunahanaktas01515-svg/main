import { motion } from 'framer-motion';
import { FileSearch, Landmark, Calculator, ArrowRight, type LucideIcon } from 'lucide-react';
import { cenanFeatures } from '../data/cenanFeatures';
import { useAppContext } from '../context/AppContext';
import { GlassPanel } from '../components/ui/GlassPanel';
import { cn } from '../lib/cn';
import type { CenanFeatureId } from '../types';

const featureIcons: Record<CenanFeatureId, LucideIcon> = {
  'fatura-analizi': FileSearch,
  'banka-mutabakati': Landmark,
  'kdv-hesabi': Calculator,
};

/**
 * Cenan sayfası: yapay zeka destekli muhasebe modüllerinin öne çıkarıldığı sayfa.
 * Her karta tıklandığında sağdaki sohbet paneline ilgili sistem promptu enjekte edilir.
 */
export function CenanPage() {
  const { activeFeatureId, triggerCenanFeature } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto p-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white/95">Cenan Muhasebe Modülleri</h1>
        <p className="mt-1 text-sm text-white/45">
          Bir modül seç, sağdaki sohbet paneli otomatik olarak uzman moda geçsin
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {cenanFeatures.map((feature, index) => {
          const Icon = featureIcons[feature.id];
          const isActive = activeFeatureId === feature.id;

          return (
            <motion.button
              key={feature.id}
              type="button"
              onClick={() => triggerCenanFeature(feature.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="text-left"
            >
              <GlassPanel
                rounded="3xl"
                className={cn(
                  'flex h-full flex-col gap-4 p-6 transition-all duration-300',
                  isActive && 'border-indigo-400/40 shadow-[0_0_32px_rgba(99,102,241,0.3)]'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-indigo-300">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white/95">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">{feature.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-sm font-medium text-indigo-300">
                  {isActive ? 'Aktif modül' : 'Sohbeti başlat'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlassPanel>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
