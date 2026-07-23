import { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { BgPicker, BACKGROUNDS } from './components/BgPicker';
import { Dashboard } from './pages/Dashboard';
import { Borsa } from './pages/Borsa';
import { Ajanlar } from './pages/Ajanlar';
import { CenanAI } from './pages/CenanAI';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { LanguageProvider, useLang } from './i18n';
import { findItemLabel } from './menu';

export type User = { name: string; email: string };

function Shell() {
  const { lang } = useLang();
  const [page, setPage] = useState<string>('dashboard');
  const [user, setUser] = useState<User | null>({ name: 'Ayşe', email: 'ayse@cenan.io' });
  const [loginOpen, setLoginOpen] = useState(false);
  const [bgOpen, setBgOpen] = useState(false);
  const [bgId, setBgId] = useState('glass');

  const displayName = user?.name ?? 'Misafir';
  const bg = BACKGROUNDS.find((b) => b.id === bgId) ?? BACKGROUNDS[0];

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard userName={displayName} onNavigate={setPage} />;
      case 'borsa':
        return <Borsa />;
      case 'ajanlar':
        return <Ajanlar />;
      case 'cenanai':
        return <CenanAI />;
      default:
        return <PlaceholderPage title={findItemLabel(page, lang)} />;
    }
  };

  return (
    <div className="app-shell" style={{ background: bg.bg }}>
      <Sidebar active={page} onNavigate={setPage} />
      <div className="app-main">
        <div className="topbar">
          <Header
            user={user}
            onLogin={() => setLoginOpen(true)}
            onLogout={() => setUser(null)}
            onProfile={() => setPage('cenanai')}
            onOpenBg={() => setBgOpen(true)}
          />
        </div>
        <main className="app-content">{renderPage()}</main>
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
      {bgOpen && (
        <BgPicker current={bgId} onSelect={(id) => setBgId(id)} onClose={() => setBgOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}
