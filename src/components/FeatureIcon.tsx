interface Props {
  name: string
  size?: number
}

/** Line icons for Cenan feature cards. */
export default function FeatureIcon({ name, size = 22 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
  } as const
  const s = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  switch (name) {
    case 'invoice':
      return (
        <svg {...common}>
          <path d="M6 3h9l3 3v15l-2.2-1.4L13.6 21l-2.3-1.4L9 21l-2.3-1.4L4.5 21V6.5" {...s} />
          <path d="M8 9h8M8 12.5h8M8 16h5" {...s} />
        </svg>
      )
    case 'bank':
      return (
        <svg {...common}>
          <path d="M3 9l9-5 9 5" {...s} />
          <path d="M5 9v9M9 9v9M15 9v9M19 9v9M3 21h18" {...s} />
        </svg>
      )
    case 'alert':
      return (
        <svg {...common}>
          <path d="M12 4l9 15H3l9-15Z" {...s} />
          <path d="M12 10v4M12 17h.01" {...s} />
        </svg>
      )
    case 'mic':
      return (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="11" rx="3" {...s} />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" {...s} />
        </svg>
      )
    case 'suggest':
      return (
        <svg {...common}>
          <path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2V16H9v-.5c0-.8-.3-1.4-1-2A6 6 0 0 1 12 3Z" {...s} />
          <path d="M9.5 19h5M10.5 21h3" {...s} />
        </svg>
      )
    case 'code':
      return (
        <svg {...common}>
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" {...s} />
        </svg>
      )
    case 'checklist':
      return (
        <svg {...common}>
          <path d="M9 5h10M9 12h10M9 19h10" {...s} />
          <path d="M4 5l1.2 1.2L7 4M4 12l1.2 1.2L7 11M4 19l1.2 1.2L7 18" {...s} />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" {...s} />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" {...s} />
        </svg>
      )
    case 'exchange':
      return (
        <svg {...common}>
          <path d="M4 8h13l-3-3M20 16H7l3 3" {...s} />
        </svg>
      )
    case 'folder':
      return (
        <svg {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" {...s} />
          <path d="M12 11v4M10 13h4" {...s} />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" {...s} />
        </svg>
      )
  }
}
