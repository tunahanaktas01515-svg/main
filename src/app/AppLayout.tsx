import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useAppStore } from './store/AppStore'
import type { ReactElement } from 'react'
import './AppLayout.css'
import './pages/AppPages.css'

const ICONS: Record<string, ReactElement> = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 20L12 4l6 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="15" r="2.4" fill="currentColor" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 3h9l3 3v15l-2.2-1.4L13.6 21l-2.3-1.4L9 21l-2.3-1.4L4.5 21V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 14.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  tax: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8h8M8 8l8 8M9 15.5h1M14 15.5h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 20V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="7" y="12" width="3" height="5" fill="currentColor" />
      <rect x="12" y="8" width="3" height="9" fill="currentColor" />
      <rect x="17" y="14" width="3" height="3" fill="currentColor" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v2.5M12 18.5V21M4.2 7l2.2 1.3M17.6 15.7l2.2 1.3M4.2 17l2.2-1.3M17.6 8.3l2.2-1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

const NAV = [
  { to: '/uygulama', end: true, icon: 'dashboard', key: 'app.nav.dashboard' },
  { to: '/uygulama/cenan', icon: 'ai', key: 'app.nav.assistant' },
  { to: '/uygulama/e-fatura', icon: 'invoice', key: 'app.nav.einvoice' },
  { to: '/uygulama/odeme', icon: 'payment', key: 'app.nav.payments' },
  { to: '/uygulama/vergi', icon: 'tax', key: 'app.nav.tax' },
  { to: '/uygulama/raporlar', icon: 'reports', key: 'app.nav.reports' },
  { to: '/uygulama/ayarlar', icon: 'settings', key: 'app.nav.settings' },
]

export default function AppLayout() {
  const { t, lang, setLang, langs } = useI18n()
  const { user, isAuthenticated, logout } = useAuth()
  const { credits } = useAppStore()
  const navigate = useNavigate()

  const displayName = user?.nickname || user?.firstName || t('app.guest')

  return (
    <div className="capp">
      <aside className="capp__sidebar">
        <div className="capp__brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className="capp__logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 20L12 4l6 16" stroke="url(#cg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="15" r="2.4" fill="url(#cg)" />
              <defs>
                <linearGradient id="cg" x1="6" y1="4" x2="18" y2="20">
                  <stop stopColor="#fff" />
                  <stop offset="0.5" stopColor="#f5c451" />
                  <stop offset="1" stopColor="#e2a53a" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="capp__brand-text">Cenan AI</span>
        </div>

        <nav className="capp__nav">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="capp__link">
              <span className="capp__link-icon">{ICONS[item.icon]}</span>
              <span>{t(item.key)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="capp__credits">
          <span className="capp__credits-label">{t('app.credits')}</span>
          <span className="capp__credits-value">{credits.toLocaleString('tr-TR')}</span>
        </div>
      </aside>

      <div className="capp__main">
        <header className="capp__topbar">
          <div className="capp__topbar-title">{t('app.workspace')}</div>
          <div className="capp__topbar-right">
            <div className="capp__lang">
              {langs.map((l: { id: typeof lang; short: string }) => (
                <button
                  key={l.id}
                  type="button"
                  className={l.id === lang ? 'is-active' : ''}
                  onClick={() => setLang(l.id)}
                >
                  {l.short}
                </button>
              ))}
            </div>
            <div className="capp__user">
              <span className="capp__avatar" aria-hidden="true">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
              <span className="capp__user-name">{displayName}</span>
            </div>
            {isAuthenticated ? (
              <button
                type="button"
                className="capp__auth"
                onClick={() => {
                  logout()
                  navigate('/giris')
                }}
              >
                {t('nav.logout')}
              </button>
            ) : (
              <button type="button" className="capp__auth" onClick={() => navigate('/giris')}>
                {t('nav.login')}
              </button>
            )}
          </div>
        </header>

        <div className="capp__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
