import { useState, type MouseEvent } from 'react';
import type { Lang } from '../i18n';
import type { RangeId } from '../chart';
import { formatAxisDate, formatTooltipDate } from '../chart';

type MainChartProps = {
  series: number[];
  dates: Date[];
  range: RangeId;
  lang: Lang;
  positive: boolean;
};

const W = 1000;
const H = 300;
const PAD = 16;

function fmt(v: number): string {
  const digits = v < 5 ? 4 : 2;
  return v.toLocaleString('tr-TR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function MainChart({ series, dates, range, lang, positive }: MainChartProps) {
  const [hover, setHover] = useState<number | null>(null);

  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const n = series.length;

  const xAt = (i: number) => (i / (n - 1)) * W;
  const yAt = (v: number) => H - PAD - ((v - min) / span) * (H - PAD * 2);

  const linePoints = series.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
  const areaPath = `M0,${H} L${series.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' L')} L${W},${H} Z`;

  const stroke = positive ? '#4ade80' : '#f87171';
  const fillId = positive ? 'grad-up' : 'grad-down';

  const gridVals = [max, min + span * 0.5, min];
  const xTicks = Array.from({ length: 6 }, (_, k) => {
    const idx = Math.round((k / 5) * (n - 1));
    return formatAxisDate(dates[idx], range, lang);
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHover(Math.round(ratio * (n - 1)));
  };

  const hoverLeft = hover != null ? `${(hover / (n - 1)) * 100}%` : '0';
  const hoverTopPct = hover != null ? `${(yAt(series[hover]) / H) * 100}%` : '0';

  return (
    <div className="chart" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      {/* y-axis labels */}
      <div className="chart__yaxis">
        {gridVals.map((v, i) => (
          <span key={i} style={{ top: `${(yAt(v) / H) * 100}%` }}>{fmt(v)}</span>
        ))}
      </div>

      <svg className="chart__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="grad-up" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-down" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridVals.map((v, i) => (
          <line key={i} x1="0" x2={W} y1={yAt(v)} y2={yAt(v)} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        ))}
        <path d={areaPath} fill={`url(#${fillId})`} />
        <polyline points={linePoints} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* x-axis labels */}
      <div className="chart__xaxis">
        {xTicks.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>

      {/* interactive crosshair */}
      {hover != null && (
        <>
          <div className="chart__cross" style={{ left: hoverLeft }} />
          <div className="chart__dot" style={{ left: hoverLeft, top: hoverTopPct, borderColor: stroke }} />
          <div
            className={`chart__tip ${hover > n / 2 ? 'is-left' : ''}`}
            style={{ left: hoverLeft, top: hoverTopPct }}
          >
            <span className="chart__tip-date">{formatTooltipDate(dates[hover], range, lang)}</span>
            <span className="chart__tip-val">{fmt(series[hover])} ₺</span>
          </div>
        </>
      )}
    </div>
  );
}
