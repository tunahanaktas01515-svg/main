import { useState, type FormEvent } from 'react'
import { useI18n } from '../../context/I18nContext'
import { useAuth } from '../../context/AuthContext'
import { useAppStore } from '../store/AppStore'

export default function AppSettings() {
  const { t } = useI18n()
  const { user, isAuthenticated, updateProfile } = useAuth()
  const { resetDemo, pushActivity } = useAppStore()
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [current, setCurrent] = useState('')
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    nickname: user?.nickname || '',
    email: user?.email || '',
    password: user?.password || '',
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setMsg('')
    setErr('')
    const res = updateProfile(form, current)
    if (!res.ok) {
      setErr(res.error || 'Error')
      return
    }
    setMsg(t('settings.saved'))
    setCurrent('')
  }

  return (
    <div className="apage">
      <div className="apage__head">
        <h1>{t('app.nav.settings')}</h1>
        <p>{t('app.settings.sub')}</p>
      </div>

      <div className="set-grid">
        <div className="acard">
          <h2 className="dash-h2">{t('app.settings.profile')}</h2>
          {!isAuthenticated ? (
            <p className="einv-empty">{t('settings.needLogin')}</p>
          ) : (
            <form className="set-form" onSubmit={onSubmit}>
              <div className="set-row">
                <label>
                  {t('settings.firstName')}
                  <input className="ainput" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </label>
                <label>
                  {t('settings.lastName')}
                  <input className="ainput" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </label>
              </div>
              <label>
                {t('settings.nickname')}
                <input className="ainput" value={form.nickname} onChange={(e) => setForm({ ...form, nickname: e.target.value })} />
              </label>
              <label>
                {t('settings.email')}
                <input type="email" className="ainput" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>
                {t('settings.newPassword')}
                <input type="password" className="ainput" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </label>
              <label>
                {t('settings.currentPassword')}
                <input type="password" className="ainput" value={current} onChange={(e) => setCurrent(e.target.value)} />
              </label>
              {err && <p className="set-err">{err}</p>}
              {msg && <p className="set-ok">{msg}</p>}
              <button type="submit" className="abtn">{t('settings.save')}</button>
            </form>
          )}
        </div>

        <div className="acard">
          <h2 className="dash-h2">{t('app.settings.workspace')}</h2>
          <p className="einv-empty">{t('app.settings.resetHint')}</p>
          <button
            type="button"
            className="abtn abtn--ghost"
            onClick={() => {
              resetDemo()
              pushActivity('system', t('app.settings.resetDone'))
              setMsg(t('app.settings.resetDone'))
            }}
          >
            {t('app.settings.reset')}
          </button>
        </div>
      </div>
    </div>
  )
}
