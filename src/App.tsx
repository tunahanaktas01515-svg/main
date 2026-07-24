import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useAppContext } from './context/AppContext';
import { AppBackground } from './components/layout/AppBackground';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { ChatPanel } from './components/chat/ChatPanel';
import { VoiceAssistantOverlay } from './components/chat/VoiceAssistantOverlay';
import { BackgroundSelectorModal } from './components/background/BackgroundSelectorModal';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { CenanPage } from './pages/CenanPage';
import { DeepWebPage } from './pages/DeepWebPage';

/**
 * Aktif sayfaya göre orta içerik alanını render eden basit yönlendirici.
 */
function PageRouter() {
  const { activePage } = useAppContext();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={activePage} className="h-full min-h-0 flex-1">
        {activePage === 'ana-sayfa' && <HomePage />}
        {activePage === 'haberler' && <NewsPage />}
        {activePage === 'cenan' && <CenanPage />}
        {activePage === 'deep-web' && <DeepWebPage />}
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  return (
    <div className="dark relative flex h-screen min-w-[1280px] flex-col text-white/90">
      <AppBackground />
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <PageRouter />
        <ChatPanel />
      </div>

      <VoiceAssistantOverlay />
      <BackgroundSelectorModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
