import { useId, useMemo, useState } from 'react';
import { cn } from '../../lib/cn';

export interface TrendSeries {
  id: string;
  label: string;
  color: string;
  data: number[];
}

interface TrendChartProps {
  series: TrendSeries[];
  /** X ekseninde gösterilen zaman etiketleri */
  labels: string[];
  height?: number;
  className?: string;
}

const PADDING = { top: 14, right: 12, bottom: 26, left: 34 };

/**
 * Çok serili çizgi grafiği — bağımlılık kullanmadan SVG ile çizilir.
 * Her seri kendi rengiyle bir çizgi ve yumuşak alan dolgusu alır; bir noktanın
 * üzerine gelindiğinde dikey kılavuz ve o andaki değerler gösterilir.
 */
export function TrendChart({ series, labels, height = 240, className }: TrendChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 640;
  const innerWidth = width - PADDING.left - PADDING.right;
  const innerHeight = height - PADDING.top - PADDING.bottom;
  const pointCount = series[0]?.data.length ?? 0;

  const { min, max } = useMemo(() => {
    const values = series.flatMap((item) => item.data);
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const pad = (hi - lo) * 0.12 || 1;
    return { min: lo - pad, max: hi + pad };
  }, [series]);

  const xAt = (index: number) =>
    PADDING.left + (pointCount > 1 ? (index / (pointCount - 1)) * innerWidth : innerWidth / 2);
  const yAt = (value: number) =>
    PADDING.top + innerHeight - ((value - min) / (max - min || 1)) * innerHeight;

  const gridValues = [0, 0.25, 0.5, 0.75, 1].map((ratio) => min + (max - min) * ratio);

  return (
    <div className={cn('relative', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          {series.map((item) => (
            <linearGradient key={item.id} id={`${gradientId}-${item.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={item.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={item.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Yatay kılavuz çizgileri ve y ekseni etiketleri */}
        {gridValues.map((value, index) => {
          const y = yAt(value);
          return (
            <g key={index}>
              <line
                x1={PADDING.left}
                x2={width - PADDING.right}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/[0.07]"
              />
              <text
                x={PADDING.left - 8}
                y={y + 3}
                textAnchor="end"
                className="fill-current text-[9px] tabular-nums text-white/30"
              >
                {Math.round(value)}
              </text>
            </g>
          );
        })}

        {/* Seriler */}
        {series.map((item) => {
          const points = item.data.map((value, index) => `${xAt(index)},${yAt(value)}`);
          const line = `M ${points.join(' L ')}`;
          const area = `${line} L ${xAt(item.data.length - 1)},${PADDING.top + innerHeight} L ${PADDING.left},${
            PADDING.top + innerHeight
          } Z`;

          return (
            <g key={item.id}>
              <path d={area} fill={`url(#${gradientId}-${item.id})`} />
              <path
                d={line}
                fill="none"
                stroke={item.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {item.data.map((value, index) => (
                <circle
                  key={index}
                  cx={xAt(index)}
                  cy={yAt(value)}
                  r={hoverIndex === index ? 4 : 2.4}
                  fill={item.color}
                  className="transition-all duration-150"
                />
              ))}
            </g>
          );
        })}

        {/* İmleç kılavuzu */}
        {hoverIndex !== null && (
          <line
            x1={xAt(hoverIndex)}
            x2={xAt(hoverIndex)}
            y1={PADDING.top}
            y2={PADDING.top + innerHeight}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="text-white/25"
          />
        )}

        {/* X ekseni etiketleri */}
        {labels.map((label, index) => (
          <text
            key={label + index}
            x={xAt(index)}
            y={height - 8}
            textAnchor="middle"
            className="fill-current text-[9px] text-white/30"
          >
            {label}
          </text>
        ))}

        {/* Fare yakalama alanları */}
        {Array.from({ length: pointCount }, (_, index) => (
          <rect
            key={index}
            x={xAt(index) - innerWidth / (pointCount * 2)}
            y={PADDING.top}
            width={innerWidth / pointCount}
            height={innerHeight}
            fill="transparent"
            onMouseEnter={() => setHoverIndex(index)}
          />
        ))}
      </svg>

      {/* Seçili noktadaki değerler */}
      {hoverIndex !== null && (
        <div className="glass-popover pointer-events-none absolute right-2 top-2 rounded-2xl px-3 py-2">
          <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-wider text-white/35">
            {labels[hoverIndex]}
          </p>
          {series.map((item) => (
            <p key={item.id} className="flex items-center gap-2 text-[11px] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
              <span className="flex-1">{item.label}</span>
              <span className="font-semibold tabular-nums">{item.data[hoverIndex]}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
