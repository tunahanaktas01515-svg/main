interface Props {
  size?: number
  className?: string
}

/** Çerçevesiz karadelik profil ikonu */
export default function BlackHoleIcon({ size = 42, className = '' }: Props) {
  const id = `bh-${size}`
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="62%" stopColor="#000" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <linearGradient id={`${id}-disk`} x1="4" y1="32" x2="60" y2="32">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="18%" stopColor="#22d3ee" />
          <stop offset="38%" stopColor="#f8fafc" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="72%" stopColor="#f97316" />
          <stop offset="88%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="40%" stopColor="rgba(255,180,80,0)" />
          <stop offset="72%" stopColor="rgba(255,140,40,0.35)" />
          <stop offset="100%" stopColor="rgba(80,140,255,0.15)" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      <circle cx="32" cy="32" r="30" fill={`url(#${id}-glow)`} />

      {/* Accretion disk — outer soft */}
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="9"
        fill="none"
        stroke={`url(#${id}-disk)`}
        strokeWidth="3.2"
        opacity="0.55"
        filter={`url(#${id}-blur)`}
        transform="rotate(-18 32 32)"
      />

      {/* Photon ring top (lensed) */}
      <path
        d="M10 30 C18 18, 46 18, 54 30"
        fill="none"
        stroke={`url(#${id}-disk)`}
        strokeWidth="2.2"
        opacity="0.85"
        transform="rotate(-18 32 32)"
      />

      {/* Photon ring bottom */}
      <path
        d="M12 34 C20 44, 44 44, 52 34"
        fill="none"
        stroke={`url(#${id}-disk)`}
        strokeWidth="1.8"
        opacity="0.7"
        transform="rotate(-18 32 32)"
      />

      {/* Bright equatorial disk */}
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="5.5"
        fill="none"
        stroke={`url(#${id}-disk)`}
        strokeWidth="2.6"
        transform="rotate(-18 32 32)"
      />

      {/* Event horizon */}
      <circle cx="32" cy="32" r="12.5" fill={`url(#${id}-core)`} />
      <circle cx="32" cy="32" r="12.5" fill="none" stroke="rgba(255,200,140,0.25)" strokeWidth="0.6" />
    </svg>
  )
}
