import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export interface BarDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDatum[];
  /** Çubuk gradientinin üst rengi */
  color?: string;
  height?: number;
  /** Y ekseni etiketlerini göster */
  showAxis?: boolean;
  className?: string;
}

/**
 * Basit dikey sütun grafiği.
 * Değerler en yüksek sütuna göre ölçeklenir; sütunlar sırayla yukarı doğru büyür.
 */
export function BarChart({ data, color = '#38bdf8', height = 120, showAxis = true, className }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const ticks = [max, Math.round(max / 2), 0];

  return (
    <div className={cn('flex gap-2', className)}>
      {showAxis && (
        <div
          className="flex shrink-0 flex-col justify-between py-px text-right text-[9px] tabular-nums text-white/25"
          style={{ height }}
        >
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-1.5" style={{ height }}>
          {data.map((item, index) => (
            /* Sütunun yüzde yüksekliğinin çözümlenebilmesi için sarmalayıcı tam boy olmalı */
            <div key={item.label} className="flex h-full min-w-0 flex-1 flex-col justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / max) * 100}%` }}
                transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-t-md"
                style={{ background: `linear-gradient(180deg, ${color}, ${color}22)`, minHeight: 3 }}
                title={`${item.label}: ${item.value}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-1.5 flex gap-1.5">
          {data.map((item) => (
            <span
              key={item.label}
              className="min-w-0 flex-1 truncate text-center text-[9px] text-white/30"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
