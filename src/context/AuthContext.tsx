import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export interface UserProfile {
  firstName: string
  lastName: string
  nickname: string
  email: string
  password: string
  role?: string
  provider?: 'email' | 'github' | 'google' | 'apple'
}

export type SocialProvider = 'github' | 'google' | 'apple'

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: 'not_found' | 'wrong_password' | 'locked'; attemptsLeft?: number }

interface AuthContextValue {
  user: UserProfile | null
  isAuthenticated: boolean
  ready: boolean
  findByEmail: (email: string) => UserProfile | undefined
  register: (data: UserProfile) => { ok: boolean; error?: string }
  login: (email: string, password: string) => LoginResult
  socialLogin: (provider: SocialProvider, emailHint?: string) => { ok: boolean }
  logout: () => void
  updateProfile: (
    data: Partial<UserProfile>,
    currentPassword: string,
  ) => { ok: boolean; error?: string }
  getAttemptsLeft: (email: string) => number
}

const STORAGE_KEY = 'cenan_user'
const USERS_KEY = 'cenan_users'
const ATTEMPTS_KEY = 'cenan_login_attempts'
const MAX_ATTEMPTS = 3

const AuthContext = createContext<AuthContextValue | null>(null)

function readUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as UserProfile[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: UserProfile[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readAttempts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, number>) : {}
  } catch {
    return {}
  }
}

function writeAttempts(map: Record<string, number>) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(map))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as UserProfile)
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const persistSession = (profile: UserProfile | null) => {
    setUser(profile)
    if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const findByEmail = (email: string) =>
    readUsers().find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

  const getAttemptsLeft = (email: string) => {
    const key = email.trim().toLowerCase()
    const used = readAttempts()[key] || 0
    return Math.max(0, MAX_ATTEMPTS - used)
  }

  const register = (data: UserProfile) => {
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: 'Bu e-posta ile kayıtlı bir hesap var.' }
    }
    if (!data.email || !data.password || data.password.length < 4) {
      return { ok: false, error: 'Geçerli e-posta ve en az 4 karakter şifre girin.' }
    }
    const profile = { ...data, provider: data.provider || 'email' }
    writeUsers([...users, profile])
    persistSession(profile)
    return { ok: true }
  }

  const login = (email: string, password: string): LoginResult => {
    const key = email.trim().toLowerCase()
    const attempts = readAttempts()
    const used = attempts[key] || 0

    if (used >= MAX_ATTEMPTS) {
      return { ok: false, reason: 'locked', attemptsLeft: 0 }
    }

    const account = findByEmail(email)
    if (!account) {
      return { ok: false, reason: 'not_found' }
    }

    if (account.password !== password) {
      const nextUsed = used + 1
      writeAttempts({ ...attempts, [key]: nextUsed })
      return {
        ok: false,
        reason: nextUsed >= MAX_ATTEMPTS ? 'locked' : 'wrong_password',
        attemptsLeft: Math.max(0, MAX_ATTEMPTS - nextUsed),
      }
    }

    const { [key]: _removed, ...rest } = attempts
    void _removed
    writeAttempts(rest)
    persistSession(account)
    return { ok: true }
  }

  const socialLogin = (provider: SocialProvider, emailHint?: string) => {
    const email =
      emailHint ||
      `${provider}.user@cenan.ai`
    const existing = findByEmail(email)
    if (existing) {
      persistSession(existing)
      return { ok: true }
    }
    const profile: UserProfile = {
      firstName: provider === 'apple' ? 'Apple' : provider === 'google' ? 'Google' : 'Github',
      lastName: 'User',
      nickname: `${provider}_user`,
      email,
      password: `social_${provider}_${Date.now()}`,
      role: 'User',
      provider,
    }
    writeUsers([...readUsers(), profile])
    persistSession(profile)
    return { ok: true }
  }

  const logout = () => persistSession(null)

  const updateProfile = (data: Partial<UserProfile>, currentPassword: string) => {
    if (!user) return { ok: false, error: 'Giriş yapmanız gerekiyor.' }
    if (user.password !== currentPassword) {
      return { ok: false, error: 'Düzenleme için mevcut şifrenizi doğru girin.' }
    }
    const updated = { ...user, ...data, email: data.email ?? user.email }
    const users = readUsers().map((u) =>
      u.email.toLowerCase() === user.email.toLowerCase() ? updated : u,
    )
    writeUsers(users)
    persistSession(updated)
    return { ok: true }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        ready,
        findByEmail,
        register,
        login,
        socialLogin,
        logout,
        updateProfile,
        getAttemptsLeft,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
