import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import './Modal.css'

interface Props {
  mode: 'login' | 'register'
  onClose: () => void
  onSwitch: (mode: 'login' | 'register') => void
}

export default function AuthModal({ mode, onClose, onSwitch }: Props) {
  const { login, register } = useAuth()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      const res = login(form.email, form.password)
      if (!res.ok) setError(res.error || 'Hata')
      else onClose()
      return
    }
    const res = register(form)
    if (!res.ok) setError(res.error || 'Hata')
    else onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Kapat">
          ×
        </button>
        <h2 id="auth-title">{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        <p className="modal__sub">
          {mode === 'login'
            ? 'Cenan AI hesabınıza giriş yapın.'
            : 'Hesap oluşturun ve Cenan AI’ya erişin.'}
        </p>

        <form onSubmit={onSubmit} className="modal__form">
          {mode === 'register' && (
            <>
              <div className="modal__row">
                <label>
                  İsim
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Soyisim
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                  />
                </label>
              </div>
              <label>
                Takma isim
                <input
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                  required
                />
              </label>
            </>
          )}
          <label>
            E-posta
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Şifre
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          {error && <p className="modal__error">{error}</p>}

          <button type="submit" className="btn btn--white">
            {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="modal__switch">
          {mode === 'login' ? (
            <>
              Hesabınız yok mu?{' '}
              <button type="button" onClick={() => onSwitch('register')}>
                Kayıt olun
              </button>
            </>
          ) : (
            <>
              Zaten hesabınız var mı?{' '}
              <button type="button" onClick={() => onSwitch('login')}>
                Giriş yapın
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
