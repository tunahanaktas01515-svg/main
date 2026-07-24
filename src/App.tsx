import { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { LoginModal } from './components/LoginModal';
import { BgPicker, BACKGROUNDS } from './components/BgPicker';
import { StyleModal, type HomeStyle } from './components/StyleModal';
import { DesignBlocksPanel, type DesignBlockId } from './components/DesignBlocksPanel';
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
  const [bgId, setBgId] = useState(BACKGROUNDS[0]?.id ?? 'bg-01-skyline');
  const [homeEdit, setHomeEdit] = useState(false);
  const [homeStyle, setHomeStyle] = useState<HomeStyle>('seffaf');
  const [styleOpen, setStyleOpen] = useState(false);
  const [blocksOpen, setBlocksOpen] = useState(false);
  const [extraBlocks, setExtraBlocks] = useState<DesignBlockId[]>([]);

  const displayName = user?.name ?? 'Misafir';
  const bg = BACKGROUNDS.find((b) => b.id === bgId) ?? BACKGROUNDS[0];

  const navigate = (id: string) => {
    setMode('work');
    setPage(id);
  };

  const addBlock = (id: DesignBlockId) => {
    setExtraBlocks((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setBlocksOpen(false);
  };

  const removeBlock = (id: DesignBlockId) => {
    setExtraBlocks((prev) => prev.filter((b) => b !== id));
  };

  const renderContent = () => {
    if (mode === 'home') {
      return (
        <SmartHome
          editMode={homeEdit}
          homeStyle={homeStyle}
          extraBlocks={extraBlocks}
          onRemoveBlock={removeBlock}
          onExitEdit={() => setHomeEdit(false)}
        />
      );
    }
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
      case 'entegrasyon':
        return <Settings key="entg" theme={theme} onTheme={setTheme} initialSection="entegrasyon" />;
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
          editMode={homeEdit}
          onNavigate={navigate}
          onToggleMode={() => {
            setMode((m) => (m === 'work' ? 'home' : 'work'));
            setHomeEdit(false);
            setBlocksOpen(false);
          }}
          onOpenBg={() => setBgOpen(true)}
          onOpenStyle={() => setStyleOpen(true)}
          onToggleEdit={() => {
            setHomeEdit((e) => !e);
            setBlocksOpen(false);
          }}
          onOpenBlocks={() => setBlocksOpen(true)}
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
      {styleOpen && (
        <StyleModal current={homeStyle} onSelect={setHomeStyle} onClose={() => setStyleOpen(false)} />
      )}
      {blocksOpen && (
        <DesignBlocksPanel
          placed={extraBlocks}
          onAdd={addBlock}
          onClose={() => setBlocksOpen(false)}
        />
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
