import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './context/appContextCore';
import { AppBackground } from './components/layout/AppBackground';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { CenanRail } from './components/layout/CenanRail';
import { VoiceOverlay } from './components/chat/VoiceOverlay';
import { UploadModal } from './components/chat/UploadModal';
import { BackgroundSelector } from './components/background/BackgroundSelector';
import { SettingsModal } from './components/settings/SettingsModal';
import { AccountModal } from './components/settings/AccountModal';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { CenanPage } from './pages/CenanPage';
import { DeepWebPage } from './pages/DeepWebPage';
import { AgentsPage } from './pages/AgentsPage';

/** Aktif sayfaya göre orta içerik alanını değiştiren basit yönlendirici */
function PageRouter() {
  const { activePage } = useAppContext();

  return (
    <main className="relative z-10 min-h-0 min-w-0 flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          {activePage === 'ana-sayfa' && <HomePage />}
          {activePage === 'haberler' && <NewsPage />}
          {activePage === 'cenan' && <CenanPage />}
          {activePage === 'deep-web' && <DeepWebPage />}
          {activePage === 'ajanlar' && <AgentsPage />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function AppShell() {
  return (
    <div className="flex h-screen min-w-[1280px] flex-col overflow-hidden">
      <AppBackground />
      <TopBar />

      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <PageRouter />
        {/* Sağdaki kapalı rail'in içeriği örtmemesi için ayrılan boşluk */}
        <div className="w-[84px] shrink-0" aria-hidden />
      </div>

      {/* Katman üstü bileşenler */}
      <CenanRail />
      <VoiceOverlay />
      <UploadModal />
      <BackgroundSelector />
      <SettingsModal />
      <AccountModal />
    </div>
  );
}

/**
 * Cenan — yapay zeka destekli muhasebe ve ihracat destek platformu arayüzü.
 * Tüm global durum AppProvider içinde yönetilir.
 */
export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
