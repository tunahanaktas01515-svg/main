import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CenanAI from './pages/CenanAI'
import Subscriptions from './pages/Subscriptions'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

function AuthRedirect() {
  const { isAuthenticated, ready } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!ready || isAuthenticated) return
    const skip =
      location.pathname === '/giris' ||
      location.pathname === '/kayit'
    if (skip) return

    const timer = window.setTimeout(() => {
      navigate('/giris', { replace: false })
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [ready, isAuthenticated, location.pathname, navigate])

  return null
}

export default function App() {
  const location = useLocation()
  const isImmersive =
    location.pathname === '/giris' ||
    location.pathname === '/kayit' ||
    location.pathname === '/404'

  // unknown routes also use NotFound — hide nav when not a known content page
  const known =
    location.pathname === '/' ||
    location.pathname === '/cenan-ai' ||
    location.pathname === '/abonelikler'
  const showNav = known && !isImmersive

  return (
    <div className="app">
      <AuthRedirect />
      {showNav && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cenan-ai" element={<CenanAI />} />
          <Route path="/abonelikler" element={<Subscriptions />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
