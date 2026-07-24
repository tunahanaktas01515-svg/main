import { useId } from 'react';

interface SparklineProps {
  data: number[];
  /** Yükseliş/düşüş rengini belirler */
  positive?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Piyasa satırlarında kullanılan, bağımlılık gerektirmeyen minik SVG sparkline.
 * Alan dolgusu gradient ile yumuşatılır.
 */
export function Sparkline({ data, positive = true, width = 64, height = 24, className }: SparklineProps) {
  const gradientId = useId();
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / span) * (height - 3) - 1.5;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const line = `M ${points.join(' L ')}`;
  const area = `${line} L ${width},${height} L 0,${height} Z`;
  const stroke = positive ? '#34d399' : '#f87171';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
