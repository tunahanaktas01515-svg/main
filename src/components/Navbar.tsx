import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import SettingsModal from './SettingsModal'
import './Navbar.css'

type ModalMode = null | 'login' | 'register' | 'settings'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalMode>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
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

          <nav className="nav__links" aria-label="Ana menü">
            <NavLink to="/" end>
              Ana Sayfa
            </NavLink>
            <NavLink to="/abonelikler">Abonelikler</NavLink>
            <NavLink to="/cenan-ai">Cenan AI</NavLink>
          </nav>

          <div className="nav__actions" ref={menuRef}>
            <button
              type="button"
              className="nav__gear"
              aria-label="Hesap menüsü"
              aria-expanded={menuOpen}
              onMouseEnter={() => setMenuOpen(true)}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M19.4 13a7.7 7.7 0 0 0 .05-2l1.9-1.5-1.8-3.1-2.3.7a7.6 7.6 0 0 0-1.7-1L15.2 3h-3.4l-.35 2.1a7.6 7.6 0 0 0-1.7 1l-2.3-.7-1.8 3.1L7.55 11a7.7 7.7 0 0 0 0 2l-1.9 1.5 1.8 3.1 2.3-.7a7.6 7.6 0 0 0 1.7 1l.35 2.1h3.4l.35-2.1a7.6 7.6 0 0 0 1.7-1l2.3.7 1.8-3.1L19.4 13Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="nav__dropdown" onMouseLeave={() => setMenuOpen(false)}>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    if (isAuthenticated) setModal('settings')
                    else setModal('login')
                  }}
                >
                  Ayarlar
                </button>
                {!isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        setModal('register')
                      }}
                    >
                      Kayıt Olma
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        setModal('login')
                      }}
                    >
                      Giriş Yapma
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      logout()
                    }}
                  >
                    Çıkış ({user?.nickname || user?.firstName})
                  </button>
                )}
                <Link to="/abonelikler" onClick={() => setMenuOpen(false)}>
                  Abonelikler
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {(modal === 'login' || modal === 'register') && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSwitch={(m) => setModal(m)}
        />
      )}
      {modal === 'settings' && <SettingsModal onClose={() => setModal(null)} />}
    </>
  )
}
