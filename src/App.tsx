import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Islemler } from './pages/Islemler';
import { Borsa } from './pages/Borsa';
import { Ajanlar } from './pages/Ajanlar';
import { LanguageProvider } from './i18n';
import type { PageId } from './types';

const USER_NAME = 'Ayşe';

export default function App() {
  const [page, setPage] = useState<PageId>('ev');

  return (
    <LanguageProvider>
      <div className="app-shell">
        <div className="app-frame">
          <div className="topbar">
            <NavBar active={page} onNavigate={setPage} />
            <Header userName={USER_NAME} />
          </div>

          <main className="app-content">
            {page === 'ev' && <Dashboard userName={USER_NAME} onNavigate={setPage} />}
            {page === 'islemler' && <Islemler />}
            {page === 'borsa' && <Borsa />}
            {page === 'ajanlar' && <Ajanlar />}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}
