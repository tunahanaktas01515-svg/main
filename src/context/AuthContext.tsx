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
}

interface AuthContextValue {
  user: UserProfile | null
  isAuthenticated: boolean
  register: (data: UserProfile) => { ok: boolean; error?: string }
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  updateProfile: (
    data: Partial<UserProfile>,
    currentPassword: string,
  ) => { ok: boolean; error?: string }
}

const STORAGE_KEY = 'cenan_user'
const USERS_KEY = 'cenan_users'

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as UserProfile)
    } catch {
      /* ignore */
    }
  }, [])

  const persistSession = (profile: UserProfile | null) => {
    setUser(profile)
    if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const register = (data: UserProfile) => {
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: 'Bu e-posta ile kayıtlı bir hesap var.' }
    }
    if (!data.email || !data.password || data.password.length < 4) {
      return { ok: false, error: 'Geçerli e-posta ve en az 4 karakter şifre girin.' }
    }
    const next = [...users, data]
    writeUsers(next)
    persistSession(data)
    return { ok: true }
  }

  const login = (email: string, password: string) => {
    const users = readUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!found) return { ok: false, error: 'E-posta veya şifre hatalı.' }
    persistSession(found)
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
        register,
        login,
        logout,
        updateProfile,
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
