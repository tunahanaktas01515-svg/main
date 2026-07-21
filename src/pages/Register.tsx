import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../context/AuthContext'
import './Register.css'

const ROLES = [
  'Product Designer',
  'Developer',
  'Finance',
  'Business Owner',
  'Student',
  'Other',
]

export default function Register() {
  const { register, isAuthenticated, ready, findByEmail } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [showPass, setShowPass] = useState(false)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    role: 'Product Designer',
    firstName: '',
    lastName: '',
    nickname: '',
    email: params.get('email') || '',
    password: '',
  })

  useEffect(() => {
    if (ready && isAuthenticated) navigate('/', { replace: true })
  }, [ready, isAuthenticated, navigate])

  useEffect(() => {
    const email = params.get('email')
    if (email) setForm((f) => ({ ...f, email }))
  }, [params])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!agree) {
      setError('Terms and Conditions kabul edilmeli.')
      return
    }
    if (findByEmail(form.email)) {
      setError('Bu e-posta zaten kayıtlı. Giriş sayfasına yönlendiriliyorsunuz…')
      window.setTimeout(() => navigate(`/giris?email=${encodeURIComponent(form.email)}`), 900)
      return
    }
    const res = register({
      firstName: form.firstName,
      lastName: form.lastName,
      nickname: form.nickname,
      email: form.email,
      password: form.password,
      role: form.role,
      provider: 'email',
    })
    if (!res.ok) {
      setError(res.error || 'Kayıt başarısız')
      return
    }
    navigate('/')
  }

  return (
    <AuthShell>
      <div className="register-wrap">
        <div className="register">
          <div className="register__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3.2" stroke="#fff" strokeWidth="1.6" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 12
                const x1 = 12 + Math.cos(a) * 5.5
                const y1 = 12 + Math.sin(a) * 5.5
                const x2 = 12 + Math.cos(a) * 9.2
                const y2 = 12 + Math.sin(a) * 9.2
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>
          </div>

          <h1>Create an account</h1>
          <p className="register__sub">Welcome! Create an account to get started.</p>

          <form onSubmit={onSubmit} className="register__form">
            <label className="register__field">
              <span>Role</span>
              <div className="register__input register__input--select">
                <span className="register__lead" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M5 19c1.5-3.2 3.8-4.8 7-4.8s5.5 1.6 7 4.8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <div className="register__row">
              <label className="register__field">
                <span>First name</span>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                />
              </label>
              <label className="register__field">
                <span>Last name</span>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </label>
            </div>

            <label className="register__field">
              <span>Username</span>
              <input
                value={form.nickname}
                onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                required
              />
            </label>

            <label className="register__field">
              <span>Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <label className="register__field">
              <span>Password</span>
              <div className="register__pass">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={4}
                />
                <button type="button" onClick={() => setShowPass((v) => !v)} aria-label="Şifreyi göster">
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <label className="register__agree">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>
                I agree to the <a href="#terms">Terms</a> and <a href="#conditions">Conditions</a>.
              </span>
            </label>

            {error && <p className="register__error">{error}</p>}

            <button type="submit" className="register__submit">
              Create free account
            </button>
          </form>

          <p className="register__footer">
            Already have an account? <Link to="/giris">Sign in</Link>
          </p>
        </div>
      </div>
    </AuthShell>
  )
}
