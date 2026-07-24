import { motion } from 'framer-motion';
import { searchModes } from '../../data/deepweb';
import { DynamicIcon } from '../ui/DynamicIcon';
import { cn } from '../../lib/cn';

interface SearchModeChipsProps {
  activeIds: string[];
  onToggle: (id: string) => void;
}

/**
 * Arama motorunun altındaki tür "eklentileri" (Web Ara, Görsel Ara, Bilgi Ara…).
 * Çoklu seçim yapılabilir; aktif olanlar indigo vurgu ve glow alır.
 */
export function SearchModeChips({ activeIds, onToggle }: SearchModeChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {searchModes.map((mode, index) => {
        const isActive = activeIds.includes(mode.id);

        return (
          <motion.button
            key={mode.id}
            type="button"
            onClick={() => onToggle(mode.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.04, duration: 0.3 }}
            whileHover={{ y: -2 }}
            title={mode.hint}
            className={cn(
              'focus-ring group flex items-center gap-2 rounded-full border py-1.5 pl-2.5 pr-3 backdrop-blur-xl transition-all duration-300',
              isActive
                ? 'border-indigo-400/45 bg-indigo-500/20 text-white shadow-[0_0_26px_-10px_rgba(99,102,241,0.95)]'
                : 'border-white/10 bg-white/[0.05] text-white/60 hover:border-white/25 hover:bg-white/[0.09] hover:text-white/90'
            )}
          >
            <DynamicIcon
              name={mode.icon}
              className={cn('h-3.5 w-3.5', isActive ? 'text-indigo-200' : 'text-white/45')}
              strokeWidth={1.9}
            />
            <span className="text-[12.5px] font-medium">{mode.label}</span>
            <span
              className={cn(
                'hidden text-[10.5px] font-normal 2xl:inline',
                isActive ? 'text-indigo-100/60' : 'text-white/25'
              )}
            >
              {mode.hint}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
