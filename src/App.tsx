import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CenanAI from './pages/CenanAI'
import { Suspense, lazy } from 'react'
import Subscriptions from './pages/Subscriptions'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import AppLayout from './app/AppLayout'
import Dashboard from './app/pages/Dashboard'
import AssistantApp from './app/pages/AssistantApp'
import EInvoice from './app/pages/EInvoice'
import Payments from './app/pages/Payments'
import TaxCalc from './app/pages/TaxCalc'
import Reports from './app/pages/Reports'
import AppSettings from './app/pages/AppSettings'
import { AppStoreProvider } from './app/store/AppStore'

const Borsa = lazy(() => import('./pages/Borsa'))

export default function App() {
  const location = useLocation()
  const isImmersive =
    location.pathname === '/giris' ||
    location.pathname === '/kayit' ||
    location.pathname === '/404'

  const known =
    location.pathname === '/' ||
    location.pathname === '/cenan-ai' ||
    location.pathname === '/abonelikler' ||
    location.pathname === '/borsa'
  const showNav = known && !isImmersive

  return (
    <div className="app">
      {showNav && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cenan-ai" element={<CenanAI />} />
          <Route path="/abonelikler" element={<Subscriptions />} />
          <Route
            path="/borsa"
            element={
              <Suspense fallback={<div className="borsa" style={{ minHeight: '60vh' }} />}>
                <Borsa />
              </Suspense>
            }
          />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<Register />} />
          <Route
            path="/uygulama"
            element={
              <AppStoreProvider>
                <AppLayout />
              </AppStoreProvider>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="cenan" element={<AssistantApp />} />
            <Route path="e-fatura" element={<EInvoice />} />
            <Route path="odeme" element={<Payments />} />
            <Route path="vergi" element={<TaxCalc />} />
            <Route path="raporlar" element={<Reports />} />
            <Route path="ayarlar" element={<AppSettings />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
