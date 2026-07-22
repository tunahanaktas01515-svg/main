import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import SettingsModal from './SettingsModal'
import BlackHoleIcon from './BlackHoleIcon'
import './Navbar.css'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { t, lang, setLang, langs } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <Link to="/" className="nav__brand">
            CENAN
          </Link>

          <nav className="nav__links" aria-label="Main">
            <NavLink to="/" end>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/abonelikler">{t('nav.plans')}</NavLink>
            <NavLink to="/cenan-ai">{t('nav.ai')}</NavLink>
            <NavLink to="/borsa">{t('nav.stocks')}</NavLink>
            <NavLink to="/uygulama" className="nav__login-link nav__app-link">
              {t('nav.openApp')}
            </NavLink>
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

            <div className="nav__actions" ref={menuRef}>
              <button
                type="button"
                className="nav__profile"
                aria-label={t('nav.settings')}
                aria-expanded={menuOpen}
                onMouseEnter={() => setMenuOpen(true)}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <BlackHoleIcon size={42} />
              </button>

              {menuOpen && (
                <div className="nav__dropdown" onMouseLeave={() => setMenuOpen(false)}>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      if (isAuthenticated) setSettingsOpen(true)
                      else navigate('/giris')
                    }}
                  >
                    {t('nav.settings')}
                  </button>
                  {!isAuthenticated ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          navigate('/kayit')
                        }}
                      >
                        {t('nav.register')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          navigate('/giris')
                        }}
                      >
                        {t('nav.login')}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        logout()
                        navigate('/giris')
                      }}
                    >
                      {t('nav.logout')} ({user?.nickname || user?.firstName})
                    </button>
                  )}
                  <Link to="/abonelikler" onClick={() => setMenuOpen(false)}>
                    {t('nav.plans')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </>
  )
}
