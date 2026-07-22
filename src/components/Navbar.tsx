import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import SettingsModal from './SettingsModal'
import './Navbar.css'

type IconType = 'book' | 'home' | 'wallet' | 'spark' | 'chart'

function NavIcon({ type }: { type: IconType }) {
  if (type === 'home') {
    return (
      <span className="ni__icon">
        <svg viewBox="0 0 32 32" className="ni-svg" aria-hidden="true">
          <path
            className="ni-home"
            d="M6 15 L16 6 L26 15 M8.5 13 V25 h15 V13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect className="ni-chimney" x="20.5" y="8" width="3.2" height="5" rx="0.6" fill="currentColor" />
        </svg>
        <span className="ni-smoke" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </span>
    )
  }
  if (type === 'book') {
    return (
      <span className="ni__icon">
        <svg viewBox="0 0 32 32" className="ni-svg ni-book" aria-hidden="true">
          <path className="ni-book__l" d="M16 8 C13 6 8 6 5 7 V24 C8 23 13 23 16 25 Z" fill="currentColor" />
          <path className="ni-book__r" d="M16 8 C19 6 24 6 27 7 V24 C24 23 19 23 16 25 Z" fill="currentColor" />
        </svg>
      </span>
    )
  }
  if (type === 'wallet') {
    return (
      <span className="ni__icon">
        <svg viewBox="0 0 32 32" className="ni-svg" aria-hidden="true">
          <rect x="5" y="9" width="22" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="M21 15 h6 v4 h-6 a2 2 0 0 1 0 -4 Z" fill="currentColor" />
        </svg>
        <span className="ni-coin" aria-hidden="true" />
      </span>
    )
  }
  if (type === 'chart') {
    return (
      <span className="ni__icon">
        <svg viewBox="0 0 32 32" className="ni-svg" aria-hidden="true">
          <path d="M5 26 h22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="7" y="18" width="3.4" height="6" rx="0.6" fill="currentColor" />
          <rect x="13" y="14" width="3.4" height="10" rx="0.6" fill="currentColor" />
          <rect x="19" y="16" width="3.4" height="8" rx="0.6" fill="currentColor" />
          <rect x="25" y="11" width="3.4" height="13" rx="0.6" fill="currentColor" opacity="0.55" />
        </svg>
        <svg viewBox="0 0 32 32" className="ni-svg ni-arrow" aria-hidden="true">
          <path
            d="M6 22 L13 15 L18 18 L26 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M21 9 H26 V14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  // spark
  return (
    <span className="ni__icon">
      <svg viewBox="0 0 32 32" className="ni-svg ni-spark" aria-hidden="true">
        <path
          d="M16 4 C17 11 21 15 28 16 C21 17 17 21 16 28 C15 21 11 17 4 16 C11 15 15 11 16 4 Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const NAV_ITEMS: { to: string; end?: boolean; labelKey: string; type: IconType }[] = [
  { to: '/hakkinda', labelKey: 'nav.about', type: 'book' },
  { to: '/', end: true, labelKey: 'nav.home', type: 'home' },
  { to: '/abonelikler', labelKey: 'nav.plans', type: 'wallet' },
  { to: '/cenan-ai', labelKey: 'nav.ai', type: 'spark' },
  { to: '/borsa', labelKey: 'nav.stocks', type: 'chart' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { t, lang, setLang, langs } = useI18n()
  const [profileOpen, setProfileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <div className="nav__left">
            <div
              className="nav__profile-wrap"
              ref={profileRef}
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                type="button"
                className="nav__profile"
                aria-label={t('nav.settings')}
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
              >
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="16" cy="11" r="5.2" fill="currentColor" />
                  <path d="M6 27 C6 20.5 10.5 17.5 16 17.5 C21.5 17.5 26 20.5 26 27 Z" fill="currentColor" />
                </svg>
              </button>

              {profileOpen && (
                <div className="nav__profile-menu">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false)
                      if (isAuthenticated) setSettingsOpen(true)
                      else navigate('/giris')
                    }}
                  >
                    {t('nav.settings')}
                  </button>
                  {!isAuthenticated ? (
                    <>
                      <button type="button" onClick={() => { setProfileOpen(false); navigate('/kayit') }}>
                        {t('nav.register')}
                      </button>
                      <button type="button" onClick={() => { setProfileOpen(false); navigate('/giris') }}>
                        {t('nav.login')}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setProfileOpen(false); logout(); navigate('/giris') }}
                    >
                      {t('nav.logout')} ({user?.nickname || user?.firstName})
                    </button>
                  )}
                  <Link to="/abonelikler" onClick={() => setProfileOpen(false)}>
                    {t('nav.plans')}
                  </Link>
                </div>
              )}
            </div>

            <Link to="/" className="nav__brand">
              CENAN
            </Link>
          </div>

          <nav className="nav__links" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={`ni ni--${item.type}`}
                title={t(item.labelKey)}
              >
                <NavIcon type={item.type} />
                <span className="ni__label">{t(item.labelKey)}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav__right">
            <div className="nav__lang" ref={langRef}>
              <button
                type="button"
                className="nav__lang-btn"
                aria-label={t('nav.language')}
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                {langs.find((l) => l.id === lang)?.short || 'TR'}
                <span aria-hidden="true">▾</span>
              </button>
              {langOpen && (
                <div className="nav__lang-menu" role="listbox">
                  {langs.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={item.id === lang}
                      className={item.id === lang ? 'is-active' : ''}
                      onClick={() => {
                        setLang(item.id)
                        setLangOpen(false)
                      }}
                    >
                      <span>{item.short}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/uygulama" className="nav__app-link">
              {t('nav.openApp')}
            </NavLink>
          </div>
        </div>
      </header>

      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </>
  )
}
