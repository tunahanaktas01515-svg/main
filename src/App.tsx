import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CenanAI from './pages/CenanAI'
import Subscriptions from './pages/Subscriptions'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const isImmersive =
    location.pathname === '/giris' ||
    location.pathname === '/kayit' ||
    location.pathname === '/404'

  const known =
    location.pathname === '/' ||
    location.pathname === '/cenan-ai' ||
    location.pathname === '/abonelikler'
  const showNav = known && !isImmersive

  return (
    <div className="app">
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
