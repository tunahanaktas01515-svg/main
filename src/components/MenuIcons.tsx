/** Growth / investments chart icon */
export function GrowthIcon({ glowing }: { glowing?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={glowing ? 'icon-glow' : ''}>
      <path d="M3 20h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="5" y="13" width="3" height="5" rx="0.5" fill="white" />
      <rect x="10.5" y="9" width="3" height="9" rx="0.5" fill="white" />
      <rect x="16" y="5" width="3" height="13" rx="0.5" fill="white" />
      <path
        d="M4.5 16.5 L9 12 L13 14 L19.5 5.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M16.5 5.5 H19.5 V8.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Piggy bank with coin */
export function PiggyIcon({ glowing }: { glowing?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={glowing ? 'icon-glow' : ''}>
      <path
        d="M5.5 11.5c0-3.2 2.8-5.5 6.2-5.5 2.4 0 4.5 1 5.5 2.5 1.2.2 2.3 1.2 2.3 2.8 0 1.1-.5 2-1.3 2.5v1.2c0 1.3-1.1 2.3-2.4 2.3h-.4v1.4c0 .4-.3.7-.7.7h-1.1c-.4 0-.7-.3-.7-.7v-1.4H10.5v1.4c0 .4-.3.7-.7.7H8.7c-.4 0-.7-.3-.7-.7v-1.4c-1.4-.2-2.5-1.4-2.5-2.9v-.8z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <ellipse cx="19.2" cy="11.2" rx="1.3" ry="1" stroke="white" strokeWidth="1.2" />
      <path d="M13.5 9.2c.4.2.7.2 1 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5.2 12.5c-1-.3-1.5-1-1.2-1.8" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12.5" cy="4.2" r="2.2" stroke="white" strokeWidth="1.3" />
      <path d="M12.5 3.2 V5.2 M11.6 4.2 H13.4" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

/** Person sitting at desk with laptop and clock */
export function DeskIcon({ glowing }: { glowing?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={glowing ? 'icon-glow' : ''}>
      {/* clock */}
      <circle cx="17" cy="4.5" r="2.3" stroke="white" strokeWidth="1.3" />
      <path d="M17 3.4 V4.5 L17.9 5" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      {/* head */}
      <circle cx="9" cy="7.5" r="2" stroke="white" strokeWidth="1.4" />
      {/* body sitting */}
      <path d="M9 9.5 L8 14.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      {/* arm */}
      <path d="M8.5 11.5 L13 13" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      {/* chair seat + back */}
      <path d="M5.5 14.5 H11 V18.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      {/* desk top */}
      <path d="M12.5 15 H21" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      {/* desk leg */}
      <path d="M14 15 Q14 18.5 12.5 19.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      {/* laptop */}
      <path d="M13.5 12.8 L17 11.2 L18 14.2 L14.5 15 Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
