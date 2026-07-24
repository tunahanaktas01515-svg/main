import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CenanFeatureId, ChatAttachment, ChatMessage, ModelId, PageId, ThemeMode } from '../types';
import { cenanFeatures } from '../data/cenanFeatures';
import { defaultBackgroundId } from '../data/backgrounds';
import { AppContext, type AppContextValue, type UploadTask } from './appContextCore';

function createTimestamp() {
  return new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Uygulamanın tüm global durumunu (sayfa, tema, arka plan, sohbet, yükleme, ses)
 * tek noktada yöneten sağlayıcı.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>('ana-sayfa');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isBackgroundModalOpen, setBackgroundModalOpen] = useState(false);
  const [activeBackgroundId, setActiveBackgroundId] = useState(defaultBackgroundId);
  // Boş dizi ile başlar; Cenan sayfası bu durumda karşılama (orb) düzenini gösterir
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [model, setModel] = useState<ModelId>('cenan-pro');
  const [activeFeatureId, setActiveFeatureId] = useState<CenanFeatureId | null>(null);
  const [isAssistantTyping, setAssistantTyping] = useState(false);
  const [isVoiceActive, setVoiceActive] = useState(false);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);

  // Zamanlayıcı referansları — bileşen kaldırıldığında temizlenir
  const timeoutsRef = useRef<number[]>([]);
  const uploadIntervalRef = useRef<number | null>(null);

  const track = useCallback((id: number) => {
    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    // Aynı dizi/obje referansları mutasyona uğradığı için mount anında yakalanabilir
    const timeouts = timeoutsRef.current;
    const intervalHolder = uploadIntervalRef;
    return () => {
      timeouts.forEach(window.clearTimeout);
      if (intervalHolder.current) window.clearInterval(intervalHolder.current);
    };
  }, []);

  // Tema sınıfı <html> üzerinde yönetilir
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarCollapsed((prev) => !prev), []);
  const openBackgroundModal = useCallback(() => setBackgroundModalOpen(true), []);
  const closeBackgroundModal = useCallback(() => setBackgroundModalOpen(false), []);
  const openVoiceAssistant = useCallback(() => setVoiceActive(true), []);
  const closeVoiceAssistant = useCallback(() => setVoiceActive(false), []);

  /** Asistan yanıtını "yazıyor" efektiyle birlikte simüle eder (backend yok) */
  const simulateAssistantReply = useCallback(
    (content: string, delay = 1100) => {
      setAssistantTyping(true);
      const id = window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: createId(), role: 'assistant', content, timestamp: createTimestamp() },
        ]);
        setAssistantTyping(false);
      }, delay);
      track(id);
    },
    [track]
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setActiveFeatureId(null);
  }, []);

  /** Cenan modülü seçildiğinde sohbete sistem promptunu enjekte eder */
  const triggerCenanFeature = useCallback(
    (featureId: CenanFeatureId) => {
      const feature = cenanFeatures.find((item) => item.id === featureId);
      if (!feature) return;

      setActiveFeatureId(featureId);
      setActivePage('cenan');
      setMessages([
        { id: createId(), role: 'system', content: feature.systemPrompt, timestamp: createTimestamp() },
      ]);
      simulateAssistantReply(feature.greeting, 900);
    },
    [simulateAssistantReply]
  );

  const sendUserMessage = useCallback(
    (content: string, attachments?: ChatAttachment[]) => {
      const hasAttachment = Boolean(attachments?.length);
      if (!content.trim() && !hasAttachment) return;

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'user',
          content: content.trim(),
          timestamp: createTimestamp(),
          attachments,
        },
      ]);

      const feature = cenanFeatures.find((item) => item.id === activeFeatureId);
      const reply = hasAttachment
        ? `Belgeyi aldım${feature ? ` ve ${feature.title} akışına ekledim` : ''}. Bu sürüm arayüz demosu olduğu için gerçek hesaplama motoruna bağlı değil; üretim sürümünde burada kalem kalem KDV, stopaj ve tevkifat kırılımı görünecek.`
        : 'Not aldım. Bu ekran şu an backend olmadan çalışan bir arayüz demosu — üretim sürümünde burada Cenan modelinin gerçek yanıtı yer alacak.';

      simulateAssistantReply(reply, 1200);
    },
    [activeFeatureId, simulateAssistantReply]
  );

  const submitVoiceMessage = useCallback(() => {
    setVoiceActive(false);
    sendUserMessage('Geçen ayın KDV özetini sesli olarak anlatır mısın?');
  }, [sendUserMessage]);

  const cancelUpload = useCallback(() => {
    if (uploadIntervalRef.current) {
      window.clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
    setUploadTask(null);
  }, []);

  /** Dosya yükleme akışını simüle eder; tamamlandığında dosyayı sohbete ek olarak düşer */
  const startUpload = useCallback(
    (fileName: string, sizeBytes: number) => {
      if (uploadIntervalRef.current) window.clearInterval(uploadIntervalRef.current);

      setUploadTask({
        id: createId(),
        fileName,
        sizeLabel: formatSize(sizeBytes),
        progress: 0,
        status: 'uploading',
      });

      uploadIntervalRef.current = window.setInterval(() => {
        setUploadTask((prev) => {
          if (!prev) return prev;
          const next = Math.min(100, prev.progress + Math.random() * 14 + 6);

          if (next >= 100) {
            if (uploadIntervalRef.current) {
              window.clearInterval(uploadIntervalRef.current);
              uploadIntervalRef.current = null;
            }

            // Yükleme bitince modalı kapat ve belgeyi sohbete ekle
            const closeId = window.setTimeout(() => {
              setUploadTask(null);
              sendUserMessage('Belgeyi yükledim, analiz edebilir misin?', [
                { id: prev.id, name: prev.fileName, sizeLabel: prev.sizeLabel },
              ]);
            }, 900);
            track(closeId);

            return { ...prev, progress: 100, status: 'done' };
          }

          return { ...prev, progress: next };
        });
      }, 260);
    },
    [sendUserMessage, track]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      activePage,
      setActivePage,
      theme,
      toggleTheme,
      isSidebarCollapsed,
      toggleSidebar,
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
      resetChat,
      isVoiceActive,
      openVoiceAssistant,
      closeVoiceAssistant,
      submitVoiceMessage,
      uploadTask,
      startUpload,
      cancelUpload,
      isLoggedIn: false,
    }),
    [
      activePage,
      theme,
      toggleTheme,
      isSidebarCollapsed,
      toggleSidebar,
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
      resetChat,
      isVoiceActive,
      openVoiceAssistant,
      closeVoiceAssistant,
      submitVoiceMessage,
      uploadTask,
      startUpload,
      cancelUpload,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
