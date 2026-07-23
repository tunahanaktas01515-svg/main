// Small decorative charts for the Borsa overview stat cards.

const UP = '#2f9e44';
const DOWN = '#e03131';

function seeded(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function MiniCandles({ seed = 7 }: { seed?: number }) {
  const r = seeded(seed);
  const n = 12;
  const W = 132;
  const H = 52;
  const cw = W / n;
  let prev = 0.5;
  const y = (v: number) => H - v * (H - 6) - 3;
  const items = Array.from({ length: n }, () => {
    const open = prev;
    const close = Math.min(0.9, Math.max(0.1, open + (r() - 0.5) * 0.42));
    const high = Math.max(open, close) + r() * 0.09;
    const low = Math.min(open, close) - r() * 0.09;
    prev = close;
    return { open, close, high, low, up: close >= open };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      {items.map((c, i) => {
        const x = i * cw + cw / 2;
        const col = c.up ? UP : DOWN;
        const top = y(Math.max(c.open, c.close));
        const h = Math.max(2, Math.abs(y(c.open) - y(c.close)));
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} stroke={col} strokeWidth="1" />
            <rect x={x - cw * 0.28} y={top} width={cw * 0.56} height={h} rx="1" fill={col} />
          </g>
        );
      })}
    </svg>
  );
}

export function MiniBars({ seed = 13 }: { seed?: number }) {
  const r = seeded(seed);
  const n = 14;
  const W = 132;
  const H = 52;
  const bw = W / n;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const h = 8 + r() * (H - 12);
        return (
          <rect
            key={i}
            x={i * bw + bw * 0.2}
            y={H - h}
            width={bw * 0.6}
            height={h}
            rx="2"
            fill="#3f8f4f"
            opacity={0.55 + (i / n) * 0.45}
          />
        );
      })}
    </svg>
  );
}

export function MiniArea({ seed = 21, positive = true }: { seed?: number; positive?: boolean }) {
  const r = seeded(seed);
  const n = 20;
  const W = 132;
  const H = 52;
  const pts = Array.from({ length: n }, (_, i) => {
    const x = (i / (n - 1)) * W;
    const y = H - (0.25 + r() * 0.5) * H;
    return { x, y };
  });
  const line = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `M0,${H} L${line} L${W},${H} Z`;
  const col = positive ? UP : DOWN;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`mini-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={col} stopOpacity="0.3" />
          <stop offset="100%" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#mini-${seed})`} />
      <polyline points={line} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
