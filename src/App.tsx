import { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { LoginModal } from './components/LoginModal';
import { BgPicker, BACKGROUNDS } from './components/BgPicker';
import { Dashboard } from './pages/Dashboard';
import { Borsa } from './pages/Borsa';
import { Ajanlar } from './pages/Ajanlar';
import { CenanAI } from './pages/CenanAI';
import { SmartHome } from './pages/SmartHome';
import { Settings } from './pages/Settings';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { LanguageProvider, useLang } from './i18n';
import { findItemLabel } from './menu';

export type User = { name: string; email: string };
type Theme = 'light' | 'dark' | 'system';

function Shell() {
  const { lang } = useLang();
  const [page, setPage] = useState<string>('dashboard');
  const [mode, setMode] = useState<'work' | 'home'>('work');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>('light');
  const [user, setUser] = useState<User | null>({ name: 'Ayşe', email: 'ayse@cenan.io' });
  const [loginOpen, setLoginOpen] = useState(false);
  const [bgOpen, setBgOpen] = useState(false);
  const [bgId, setBgId] = useState('glass');

  const displayName = user?.name ?? 'Misafir';
  const bg = BACKGROUNDS.find((b) => b.id === bgId) ?? BACKGROUNDS[0];

  const navigate = (id: string) => {
    setMode('work');
    setPage(id);
  };

  const renderContent = () => {
    if (mode === 'home') return <SmartHome />;
    switch (page) {
      case 'dashboard':
        return <Dashboard userName={displayName} onNavigate={navigate} />;
      case 'borsa':
        return <Borsa />;
      case 'ajanlar':
        return <Ajanlar />;
      case 'cenanai':
        return <CenanAI />;
      case 'settings':
        return <Settings theme={theme} onTheme={setTheme} />;
      default:
        return <PlaceholderPage title={findItemLabel(page, lang)} />;
    }
  };

  return (
    <div className={`app-shell ${theme === 'dark' ? 'theme-dark' : ''}`} style={{ background: bg.bg }}>
      {mode === 'work' && (
        <Sidebar
          active={page}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
          onNavigate={navigate}
        />
      )}
      <div className="app-main">
        <TopBar
          active={page}
          mode={mode}
          user={user}
          onNavigate={navigate}
          onToggleMode={() => setMode((m) => (m === 'work' ? 'home' : 'work'))}
          onOpenBg={() => setBgOpen(true)}
          onOpenSettings={() => { setMode('work'); setPage('settings'); setSidebarOpen(false); }}
          onLogin={() => setLoginOpen(true)}
          onLogout={() => setUser(null)}
          onProfile={() => navigate('cenanai')}
        />
        <main className="app-content">{renderContent()}</main>
      </div>

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSubmit={(u) => { setUser(u); setLoginOpen(false); }}
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
