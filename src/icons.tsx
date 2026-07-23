// Icon set for the Cenan dashboard.
// Each icon is a self-contained SVG so it can be styled/animated via CSS.

type IconProps = {
  className?: string;
  size?: number;
};

// Cenan — wireframe line-art flower (Cenan brand mark).
export function FlowerIcon({ className, size = 28 }: IconProps) {
  const petals = [0, 30, 60, 90, 120, 150];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.9">
        {petals.map((deg) => (
          <ellipse
            key={`o-${deg}`}
            cx="50"
            cy="50"
            rx="14"
            ry="42"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        {petals.map((deg) => (
          <ellipse
            key={`i-${deg}`}
            cx="50"
            cy="50"
            rx="8"
            ry="30"
            opacity="0.55"
            transform={`rotate(${deg + 15} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="6" opacity="0.8" />
      </g>
    </svg>
  );
}

// İşlemler — solid house with a chimney (smoke is added separately in CSS).
export function HouseIcon({ className, size = 26 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* chimney */}
      <rect x="66" y="20" width="12" height="26" rx="3" />
      {/* roof */}
      <path
        d="M50 18 L92 52 a5 5 0 0 1 -6 8 L50 30 L14 60 a5 5 0 0 1 -6 -8 Z"
      />
      {/* body */}
      <path d="M22 52 L50 30 L78 52 L78 84 a4 4 0 0 1 -4 4 H58 V64 a8 8 0 0 0 -16 0 V88 H26 a4 4 0 0 1 -4 -4 Z" />
    </svg>
  );
}

// Borsa — pinwheel orb built from six rounded swirl petals.
export function OrbIcon({ className, size = 26 }: IconProps) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <g>
        {petals.map((deg) => (
          <path
            key={deg}
            d="M50 50 C50 34 58 24 70 24 C82 24 88 34 82 44 C77 52 66 52 62 46 C66 54 60 62 52 60 C50 58 50 54 50 50 Z"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

// Ajanlar — wireframe globe.
export function GlobeIcon({ className, size = 26 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="38" />
      <ellipse cx="50" cy="50" rx="16" ry="38" />
      <line x1="12" y1="50" x2="88" y2="50" />
      <line x1="50" y1="12" x2="50" y2="88" />
      <path d="M18 32 H82" strokeWidth="3" />
      <path d="M18 68 H82" strokeWidth="3" />
    </svg>
  );
}

// Settings gear.
export function GearIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// Default profile avatar — stick figure celebrating under five stars.
export function StarManIcon({ className, size = 34 }: IconProps) {
  const stars = [
    { x: 30, y: 20 },
    { x: 50, y: 12 },
    { x: 70, y: 20 },
    { x: 22, y: 34 },
    { x: 78, y: 34 },
  ];
  const starPath = (cx: number, cy: number, r: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? r : r * 0.45;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
  };
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <polygon
          key={i}
          points={starPath(s.x, s.y, 9)}
          fill="#ffca28"
          stroke="#1c1c1c"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      ))}
      <g fill="none" stroke="#1c1c1c" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        {/* body */}
        <path d="M40 66 H60 V88 H40 Z" fill="#c7d6e8" stroke="#1c1c1c" />
        {/* head */}
        <circle cx="50" cy="58" r="12" fill="#fff" />
        {/* arms up */}
        <path d="M40 66 L28 46" />
        <path d="M60 66 L72 46" />
        {/* legs */}
        <path d="M45 88 L40 98" />
        <path d="M55 88 L60 98" />
        {/* smile */}
        <path d="M44 58 q6 7 12 0" strokeWidth="2.4" />
      </g>
      <circle cx="46" cy="55" r="1.6" fill="#1c1c1c" />
      <circle cx="54" cy="55" r="1.6" fill="#1c1c1c" />
    </svg>
  );
}

// Shopping basket (black, transparent background) for the Ekstreler card.
export function CartIcon({ className, size = 26 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 5h2l1.2 2M7.2 7L9 15h9l2-8H7.2z" />
      <circle cx="10" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

// iyzico wordmark (tiny brand tag).
export function IyzicoLogo({ className }: { className?: string }) {
  return <span className={className}>iyzico</span>;
}

// Cenan AI — pinched squircle outline (brand mark).
export function SquircleIcon({ className, size = 26 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M26 26 C42 34 58 34 74 26 C66 42 66 58 74 74 C58 66 42 66 26 74 C34 58 34 42 26 26 Z" />
    </svg>
  );
}

// Microphone.
export function MicIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v3" />
    </svg>
  );
}

// Send (up arrow).
export function SendUpIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  );
}

// Plus.
export function PlusIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// Paint brush (edit / customize).
export function BrushIcon({ className, size = 22 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15.5 3.5l5 5-8.8 8.8a3 3 0 0 1-1.7.85l-3.6.6.6-3.6a3 3 0 0 1 .85-1.7z" />
      <path d="M13.5 5.5l5 5" />
      <path d="M6.5 14.5c-1.8.6-2.4 2.2-2.6 4-.06.5-.5 1.6-1.4 2 1.7.5 4.2.4 5.6-1a3 3 0 0 0 .4-3.6" />
    </svg>
  );
}

// Menu group icons
export function GridIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </svg>
  );
}
export function SwapIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h13l-3-3" />
      <path d="M20 16H7l3 3" />
    </svg>
  );
}
export function ReportIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V4" />
      <rect x="7" y="11" width="3.4" height="7" rx="1" fill="currentColor" stroke="none" />
      <rect x="12.5" y="7" width="3.4" height="11" rx="1" fill="currentColor" stroke="none" />
      <rect x="18" y="13" width="3.4" height="5" rx="1" fill="currentColor" stroke="none" />
      <path d="M4 20h17" />
    </svg>
  );
}
export function TaxIcon({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h9l3 3v15l-3-1.5L15 21l-3-1.5L9 21l-1.5-1.5L6 21z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

// Chevron down.
export function ChevronDownIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
