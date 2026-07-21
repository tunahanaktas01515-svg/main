import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import BlackHoleIcon from '../components/BlackHoleIcon'
import { useAuth, type SocialProvider } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import './Login.css'

export default function Login() {
  const { login, socialLogin, isAuthenticated, ready } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [email, setEmail] = useState(params.get('email') || '')
  const [password, setPassword] = useState('')
  const [flash, setFlash] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (ready && isAuthenticated) navigate('/', { replace: true })
  }, [ready, isAuthenticated, navigate])

  const triggerFlash = () => {
    setFlash(false)
    requestAnimationFrame(() => {
      setFlash(true)
      window.setTimeout(() => setFlash(false), 1100)
    })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const result = login(email, password)
    setBusy(false)

    if (result.ok) {
      navigate('/')
      return
    }

    if (result.reason === 'not_found') {
      navigate(`/kayit?email=${encodeURIComponent(email.trim())}`)
      return
    }

    // wrong_password or locked — stay, neon flash only (no text)
    triggerFlash()
  }

  const onSocial = (provider: SocialProvider) => {
    socialLogin(provider)
    navigate('/')
  }

  return (
    <AuthShell flash={flash}>
      <div className="login">
        <div className="login__mark">
          <BlackHoleIcon size={48} />
        </div>

        <form className="login__form" onSubmit={onSubmit}>
          <label className="login__field">
            <span>{t('login.email')}</span>
            <div className="login__input">
              <span className="login__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@cenan.ai"
                required
                autoComplete="email"
              />
            </div>
          </label>

          <label className="login__field">
            <span>{t('login.password')}</span>
            <div className="login__input">
              <span className="login__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.password')}
                required
                autoComplete="current-password"
              />
            </div>
          </label>

          <button type="submit" className="login__primary" disabled={busy}>
            {t('login.button')}
          </button>
        </form>

        <p className="login__switch">
          {t('login.noAccount')} <Link to="/kayit">{t('login.signUp')}</Link>
        </p>

        <div className="login__or">
          <span>{t('login.or')}</span>
        </div>

        <div className="login__socials">
          <button type="button" className="login__social" onClick={() => onSocial('github')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.1c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
            {t('login.github')}
          </button>

          <button type="button" className="login__social" onClick={() => onSocial('google')}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('login.google')}
          </button>

          <button type="button" className="login__social" onClick={() => onSocial('apple')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.2-3.7zm-2-6.1c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
            </svg>
            {t('login.apple')}
          </button>
        </div>
      </div>
    </AuthShell>
  )
}
