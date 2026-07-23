import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { Dashboard } from './pages/Dashboard';
import { Islemler } from './pages/Islemler';
import { Borsa } from './pages/Borsa';
import { Ajanlar } from './pages/Ajanlar';
import { CenanAI } from './pages/CenanAI';
import { LanguageProvider } from './i18n';
import type { PageId } from './types';

export type User = { name: string; email: string };

export default function App() {
  const [page, setPage] = useState<PageId>('ev');
  const [user, setUser] = useState<User | null>({ name: 'Ayşe', email: 'ayse@cenan.io' });
  const [loginOpen, setLoginOpen] = useState(false);

  const displayName = user?.name ?? 'Misafir';

  return (
    <LanguageProvider>
      <div className="app-shell">
        <div className="app-frame">
          <div className="topbar">
            <NavBar active={page} onNavigate={setPage} />
            <Header
              user={user}
              onLogin={() => setLoginOpen(true)}
              onLogout={() => setUser(null)}
              onProfile={() => setPage('cenanai')}
            />
          </div>

          <main className="app-content">
            {page === 'ev' && <Dashboard userName={displayName} onNavigate={setPage} />}
            {page === 'islemler' && <Islemler />}
            {page === 'borsa' && <Borsa />}
            {page === 'ajanlar' && <Ajanlar />}
            {page === 'cenanai' && <CenanAI />}
          </main>
        </div>
      </div>

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSubmit={(u) => {
            setUser(u);
            setLoginOpen(false);
          }}
        />
      )}
    </LanguageProvider>
  );
}
