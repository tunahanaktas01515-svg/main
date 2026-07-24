import { motion } from 'framer-motion';
import { quickActions } from '../../data/quickActions';
import { DynamicIcon } from '../ui/DynamicIcon';
import { cn } from '../../lib/cn';

interface QuickActionsProps {
  onSelect: (actionId: string) => void;
  className?: string;
}

/**
 * Composer'ın altındaki 7 hızlı aksiyon rozeti.
 * Her biri renkli ikonuyla birlikte hazır bir istemi composer'a yazar.
 */
export function QuickActions({ onSelect, className }: QuickActionsProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
      {quickActions.map((action, index) => (
        <motion.button
          key={action.id}
          type="button"
          onClick={() => onSelect(action.id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.045, duration: 0.32, ease: 'easeOut' }}
          whileHover={{ y: -2 }}
          className="focus-ring group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-1.5 pr-3.5 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1]"
        >
          <span className={cn('flex h-6 w-6 items-center justify-center rounded-full border', action.tone)}>
            <DynamicIcon name={action.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
          </span>
          <span className="text-[12.5px] font-medium text-white/75 transition-colors group-hover:text-white">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
