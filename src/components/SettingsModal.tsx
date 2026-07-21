import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import './Modal.css'

interface Props {
  onClose: () => void
}

export default function SettingsModal({ onClose }: Props) {
  const { user, updateProfile, isAuthenticated } = useAuth()
  const { t } = useI18n()
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
          <h2>{t('settings.title')}</h2>
          <p className="modal__sub">{t('settings.needLogin')}</p>
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
    setSuccess(t('settings.saved'))
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
        <h2 id="settings-title">{t('settings.title')}</h2>
        <p className="modal__sub">{t('settings.help')}</p>

        <form onSubmit={onSubmit} className="modal__form">
          <div className="modal__row">
            <label>
              {t('settings.firstName')}
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </label>
            <label>
              {t('settings.lastName')}
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </label>
          </div>
          <label>
            {t('settings.nickname')}
            <input
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              required
            />
          </label>
          <label>
            {t('settings.email')}
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            {t('settings.newPassword')}
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          <label>
            {t('settings.currentPassword')}
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
            {t('settings.save')}
          </button>
        </form>
      </div>
    </div>
  )
}
