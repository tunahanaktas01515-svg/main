import { useEffect, useState, type ReactElement } from 'react'
import './OsDownload.css'

export type OsKind = 'mac' | 'windows' | 'linux'

export function detectOs(): OsKind {
  if (typeof navigator === 'undefined') return 'windows'
  const ua = navigator.userAgent.toLowerCase()
  const platform = (navigator.platform || '').toLowerCase()
  if (platform.includes('mac') || ua.includes('mac os') || ua.includes('macintosh')) return 'mac'
  if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
    if (ua.includes('android')) return 'windows'
    return 'linux'
  }
  if (platform.includes('win') || ua.includes('windows')) return 'windows'
  return 'windows'
}

const META: Record<OsKind, { label: string; file: string; title: string }> = {
  mac: { label: 'macOS', file: 'CenanAI-macOS.dmg.txt', title: 'Mac için indir' },
  windows: { label: 'Windows', file: 'CenanAI-Windows.exe.txt', title: 'Windows için indir' },
  linux: { label: 'Linux', file: 'CenanAI-Linux.AppImage.txt', title: 'Linux için indir' },
}

function downloadFor(os: OsKind) {
  const meta = META[os]
  const content = [
    `Cenan AI — ${meta.label} Installer Placeholder`,
    '==========================================',
    '',
    `Hedef platform: ${meta.label}`,
    'Gerçek kurulum paketini public/downloads/ altına ekleyebilirsiniz.',
  ].join('\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = meta.file
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function AppleIcon() {
  return (
    <svg className="os-icon os-icon--apple" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="appleMetal" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#d8d8d8" />
          <stop offset="65%" stopColor="#9a9a9a" />
          <stop offset="100%" stopColor="#efefef" />
        </linearGradient>
        <filter id="appleGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        fill="url(#appleMetal)"
        filter="url(#appleGlow)"
        d="M44.8 33.2c.05-4.7 3.85-7 4-7.1-2.2-3.2-5.6-3.65-6.8-3.7-2.9-.3-5.65 1.7-7.1 1.7-1.5 0-3.75-1.65-6.15-1.6-3.15.05-6.05 1.85-7.65 4.7-3.3 5.7-.85 14.1 2.35 18.7 1.55 2.25 3.4 4.75 5.85 4.65 2.35-.1 3.25-1.5 6.1-1.5s3.65 1.5 6.15 1.45c2.55-.05 4.15-2.3 5.7-4.55 1.8-2.6 2.5-5.15 2.55-5.25-.05-.05-4.85-1.85-4.8-7.5zM39.2 16.6c1.25-1.55 2.1-3.7 1.85-5.85-1.8.1-4 1.2-5.3 2.75-1.15 1.35-2.15 3.55-1.9 5.65 2 .15 4.05-1 5.35-2.55z"
      />
      <circle cx="46" cy="14" r="1.6" fill="#fff" opacity="0.9" />
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg className="os-icon os-icon--windows" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="winMetal" x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#cfcfcf" />
          <stop offset="100%" stopColor="#f5f5f5" />
        </linearGradient>
      </defs>
      <g fill="url(#winMetal)">
        <rect x="12" y="12" width="18" height="18" rx="3.5" />
        <rect x="34" y="12" width="18" height="18" rx="3.5" />
        <rect x="12" y="34" width="18" height="18" rx="3.5" />
        <rect x="34" y="34" width="18" height="18" rx="3.5" />
      </g>
    </svg>
  )
}

function LinuxIcon() {
  return (
    <svg className="os-icon os-icon--linux" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="tuxMetal" x1="14" y1="8" x2="50" y2="56">
          <stop offset="0%" stopColor="#f7f7f7" />
          <stop offset="45%" stopColor="#bdbdbd" />
          <stop offset="100%" stopColor="#ececec" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#tuxMetal)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 10c-7 0-12 6.2-12 14.5 0 5.2 1.6 8.4 3.2 12.2.9 2.1 1.3 4.2 1.3 6.3 0 4.2 2.8 7.5 7.5 7.5h.1c4.7 0 7.5-3.3 7.5-7.5 0-2.1.4-4.2 1.3-6.3 1.6-3.8 3.2-7 3.2-12.2C44 16.2 39 10 32 10Z" />
        <path d="M24.5 48.5c1.8 3.2 4.4 5 7.5 5s5.7-1.8 7.5-5" />
        <ellipse cx="32" cy="28" rx="7.5" ry="9" />
        <circle cx="28.5" cy="20.5" r="1.6" fill="#cfcfcf" stroke="none" />
        <circle cx="35.5" cy="20.5" r="1.6" fill="#cfcfcf" stroke="none" />
        <path d="M29.5 24.5c1 .9 4 .9 5 0" />
        <path d="M22 52.5c2.2 2.8 5.5 4 10 4s7.8-1.2 10-4" />
      </g>
    </svg>
  )
}

const ICONS: Record<OsKind, () => ReactElement> = {
  mac: AppleIcon,
  windows: WindowsIcon,
  linux: LinuxIcon,
}

const ALL: OsKind[] = ['mac', 'windows', 'linux']

export default function OsDownload({ compact = false }: { compact?: boolean }) {
  const [os, setOs] = useState<OsKind>('windows')

  useEffect(() => {
    setOs(detectOs())
  }, [])

  const PrimaryIcon = ICONS[os]
  const others = ALL.filter((item) => item !== os)

  if (compact) {
    return (
      <button
        type="button"
        className="os-download os-download--compact"
        onClick={() => downloadFor(os)}
        aria-label={META[os].title}
      >
        <PrimaryIcon />
        <span>İndir · {META[os].label}</span>
      </button>
    )
  }

  return (
    <div className="os-download">
      <button
        type="button"
        className="os-download__primary"
        onClick={() => downloadFor(os)}
      >
        <span className="os-download__badge">
          <PrimaryIcon />
        </span>
        <span className="os-download__copy">
          <strong>{META[os].title}</strong>
          <small>Sisteminiz otomatik algılandı: {META[os].label}</small>
        </span>
      </button>

      <div className="os-download__others" aria-label="Diğer platformlar">
        {others.map((item) => {
          const Icon = ICONS[item]
          return (
            <button
              key={item}
              type="button"
              className="os-download__alt"
              onClick={() => downloadFor(item)}
              title={META[item].title}
              aria-label={META[item].title}
            >
              <Icon />
              <span>{META[item].label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { downloadFor }
