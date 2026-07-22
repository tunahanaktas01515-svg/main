import { useState } from 'react'

interface ShareIconProps {
  onClick?: () => void
  isOpen?: boolean
}

export default function ShareIcon({ onClick, isOpen }: ShareIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  const active = isHovered || isOpen

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
      aria-label="Görünüm değiştir"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Center node */}
        <circle cx="6" cy="12" r="2.5" fill="white" />

        {/* Top branch group - rotates 90° down on hover */}
        <g
          style={{
            transformOrigin: '6px 12px',
            transform: active ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <line x1="8.5" y1="12" x2="16" y2="5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="17" cy="4" r="2.5" fill="white" />
        </g>

        {/* Bottom branch group - rotates 90° down on hover */}
        <g
          style={{
            transformOrigin: '6px 12px',
            transform: active ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <line x1="8.5" y1="12" x2="16" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="17" cy="20" r="2.5" fill="white" />
        </g>
      </svg>
    </button>
  )
}
