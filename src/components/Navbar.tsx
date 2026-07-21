import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SettingsModal from './SettingsModal'
import BlackHoleIcon from './BlackHoleIcon'
import './Navbar.css'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
                    if (isAuthenticated) setSettingsOpen(true)
                    else navigate('/giris')
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
                        navigate('/kayit')
                      }}
                    >
                      Kayıt Olma
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        navigate('/giris')
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
                      navigate('/giris')
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

      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </>
  )
}
