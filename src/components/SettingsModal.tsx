import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import './Modal.css'

interface Props {
  onClose: () => void
}

export default function SettingsModal({ onClose }: Props) {
  const { user, updateProfile, isAuthenticated } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    nickname: user?.nickname || '',
    email: user?.email || '',
    password: user?.password || '',
  })

  if (!isAuthenticated || !user) {
    return (
      <div className="modal-backdrop" onClick={onClose} role="presentation">
        <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Kapat">
            ×
          </button>
          <h2>Ayarlar</h2>
          <p className="modal__sub">Hesap ayarlarını düzenlemek için önce giriş yapın.</p>
        </div>
      </div>
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const res = updateProfile(form, currentPassword)
    if (!res.ok) {
      setError(res.error || 'Güncellenemedi')
      return
    }
    setSuccess('Bilgileriniz güncellendi.')
    setCurrentPassword('')
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal modal--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Kapat">
          ×
        </button>
        <h2 id="settings-title">Ayarlar</h2>
        <p className="modal__sub">
          İsim, soyisim, takma isim, e-posta ve şifrenizi düzenleyin. Değişiklik için mevcut
          şifrenizi girin.
        </p>

        <form onSubmit={onSubmit} className="modal__form">
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
            Yeni şifre
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          <label>
            Mevcut şifre (onay)
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Düzenlemek için şifrenizi girin"
            />
          </label>

          {error && <p className="modal__error">{error}</p>}
          {success && <p className="modal__success">{success}</p>}

          <button type="submit" className="btn btn--white">
            Kaydet
          </button>
        </form>
      </div>
    </div>
  )
}
