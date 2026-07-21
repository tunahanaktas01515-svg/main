import type { ReactNode } from 'react'
import { useI18n } from '../context/I18nContext'
import './AuthShell.css'

export default function AuthShell({
  children,
  flash,
}: {
  children: ReactNode
  flash?: boolean
}) {
  const { lang, setLang, langs, t } = useI18n()

  return (
    <div className={`auth-shell ${flash ? 'auth-shell--flash' : ''}`}>
      <div className="auth-shell__frame" aria-hidden="true" />
      <div className="auth-shell__columns" aria-hidden="true">
        <svg viewBox="0 0 600 900" preserveAspectRatio="xMidYMax slice">
          <defs>
            <pattern id="dotFill" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.55)" />
            </pattern>
            <linearGradient id="colFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="35%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="white" stopOpacity="0.15" />
            </linearGradient>
            <mask id="colMask">
              <rect width="600" height="900" fill="url(#colFade)" />
            </mask>
          </defs>
          <g mask="url(#colMask)" fill="url(#dotFill)">
            <rect x="70" y="180" width="70" height="620" rx="4" />
            <rect x="55" y="150" width="100" height="40" rx="3" />
            <rect x="55" y="780" width="100" height="36" rx="3" />
            <rect x="230" y="120" width="78" height="680" rx="4" />
            <rect x="212" y="88" width="114" height="44" rx="3" />
            <rect x="212" y="780" width="114" height="36" rx="3" />
            <rect x="410" y="200" width="66" height="600" rx="4" />
            <rect x="395" y="168" width="96" height="40" rx="3" />
            <rect x="395" y="780" width="96" height="36" rx="3" />
          </g>
        </svg>
      </div>

      <div className="auth-shell__lang" aria-label={t('nav.language')}>
        {langs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === lang ? 'is-active' : ''}
            onClick={() => setLang(item.id)}
          >
            {item.short}
          </button>
        ))}
      </div>

      <div className="auth-shell__content">{children}</div>
    </div>
  )
}
