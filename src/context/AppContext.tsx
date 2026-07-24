import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CenanFeatureId, ChatAttachment, ChatMessage, ModelId, PageId, ThemeMode } from '../types';
import { cenanFeatures } from '../data/cenanFeatures';
import { backgroundOptions } from '../data/backgrounds';

interface AppContextValue {
  // Sayfa navigasyonu
  activePage: PageId;
  setActivePage: (page: PageId) => void;

  // Tema (şu anlık sadece koyu tema tam stillendirildi)
  theme: ThemeMode;
  toggleTheme: () => void;

  // Arka plan seçici
  isBackgroundModalOpen: boolean;
  openBackgroundModal: () => void;
  closeBackgroundModal: () => void;
  activeBackgroundId: string;
  setActiveBackgroundId: (id: string) => void;

  // Sohbet paneli
  messages: ChatMessage[];
  model: ModelId;
  setModel: (model: ModelId) => void;
  activeFeatureId: CenanFeatureId | null;
  triggerCenanFeature: (featureId: CenanFeatureId) => void;
  sendUserMessage: (content: string, attachments?: ChatAttachment[]) => void;
  isAssistantTyping: boolean;

  // Sesli asistan
  isVoiceActive: boolean;
  openVoiceAssistant: () => void;
  closeVoiceAssistant: () => void;

  // Oturum durumu (demo amaçlı - backend yok)
  isLoggedIn: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

function createTimestamp() {
  return new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

// Sohbet başlangıcında karşılayan varsayılan asistan mesajı
const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Merhaba! Ben Cenan AI. Fatura analizi, banka mutabakatı, KDV hesaplama ve ihracat süreçlerinizde sana yardımcı olabilirim. Soldaki menüden bir işlem seç veya doğrudan sorunu yaz.',
  timestamp: createTimestamp(),
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>('ana-sayfa');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isBackgroundModalOpen, setBackgroundModalOpen] = useState(false);
  const [activeBackgroundId, setActiveBackgroundId] = useState<string>(backgroundOptions[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [model, setModel] = useState<ModelId>('cenan-pro');
  const [activeFeatureId, setActiveFeatureId] = useState<CenanFeatureId | null>(null);
  const [isAssistantTyping, setAssistantTyping] = useState(false);
  const [isVoiceActive, setVoiceActive] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const openBackgroundModal = useCallback(() => setBackgroundModalOpen(true), []);
  const closeBackgroundModal = useCallback(() => setBackgroundModalOpen(false), []);

  const openVoiceAssistant = useCallback(() => setVoiceActive(true), []);
  const closeVoiceAssistant = useCallback(() => setVoiceActive(false), []);

  // Asistan yazıyor efekti ile sahte (mock) yanıt üretir
  const simulateAssistantReply = useCallback((replyContent: string) => {
    setAssistantTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: 'assistant', content: replyContent, timestamp: createTimestamp() },
      ]);
      setAssistantTyping(false);
    }, 1100 + Math.random() * 700);
  }, []);

  const triggerCenanFeature = useCallback(
    (featureId: CenanFeatureId) => {
      const feature = cenanFeatures.find((item) => item.id === featureId);
      if (!feature) return;

      setActiveFeatureId(featureId);
      setActivePage('cenan');

      const systemMessage: ChatMessage = {
        id: createId(),
        role: 'system',
        content: feature.systemPrompt,
        timestamp: createTimestamp(),
      };

      setMessages([systemMessage]);
      simulateAssistantReply(
        `${feature.title} modülüne hoş geldin. Devam edebilmem için lütfen ilgili belgeyi (dosya, fotoğraf veya PDF) sohbet kutusundaki + simgesiyle yükle. Yükleme tamamlandığında detaylı analizi seninle paylaşacağım.`
      );
    },
    [simulateAssistantReply]
  );

  const sendUserMessage = useCallback(
    (content: string, attachments?: ChatAttachment[]) => {
      if (!content.trim() && (!attachments || attachments.length === 0)) return;

      const userMessage: ChatMessage = {
        id: createId(),
        role: 'user',
        content,
        timestamp: createTimestamp(),
        attachments,
      };

      setMessages((prev) => [...prev, userMessage]);

      const hasAttachment = Boolean(attachments && attachments.length > 0);
      const contextualReply = hasAttachment
        ? 'Belgeni aldım, analiz ediyorum. Bu bir arayüz demosu olduğundan gerçek bir hesaplama motoruna bağlı değilim, ancak üretim sürümünde burada detaylı KDV/stopaj/mutabakat sonuçları görünecek.'
        : 'Not aldım. Bu ekran şu an backend olmadan çalışan bir arayüz demosu — üretim sürümünde burada Cenan modelinin gerçek yanıtı yer alacak.';

      simulateAssistantReply(contextualReply);
    },
    [simulateAssistantReply]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      activePage,
      setActivePage,
      theme,
      toggleTheme,
      isBackgroundModalOpen,
      openBackgroundModal,
      closeBackgroundModal,
      activeBackgroundId,
      setActiveBackgroundId,
      messages,
      model,
      setModel,
      activeFeatureId,
      triggerCenanFeature,
      sendUserMessage,
      isAssistantTyping,
      isVoiceActive,
      openVoiceAssistant,
      closeVoiceAssistant,
      isLoggedIn: false,
    }),
    [
      activePage,
      theme,
      toggleTheme,
      isBackgroundModalOpen,
      openBackgroundModal,
      closeBackgroundModal,
      activeBackgroundId,
      messages,
      model,
      activeFeatureId,
      triggerCenanFeature,
      sendUserMessage,
      isAssistantTyping,
      isVoiceActive,
      openVoiceAssistant,
      closeVoiceAssistant,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext, AppProvider içinde kullanılmalıdır');
  }
  return ctx;
}
