import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import SettingsModal from './SettingsModal'
import BlackHoleIcon from './BlackHoleIcon'
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
              className="nav__profile"
              aria-label="Profil ve ayarlar"
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
