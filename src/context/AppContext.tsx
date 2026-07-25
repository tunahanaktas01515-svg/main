import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type {
  BackgroundOption,
  CenanFeatureId,
  ChatAttachment,
  ChatMessage,
  Language,
  LocationInfo,
  LocationStatus,
  Localized,
  ModelId,
  PageId,
  ResearchRecord,
  SurfaceThemeId,
  ThemeMode,
  UiSize,
  UserProfile,
  WatchTerm,
} from '../types';
import { cenanFeatures } from '../data/cenanFeatures';
import { backgroundOptions, defaultBackgroundId } from '../data/backgrounds';
import { initialWatchTerms } from '../data/deepweb';
import { createTranslator, localeCodes, pickLocalized } from '../i18n';
import { deriveResearchTitle } from '../lib/researchTitle';
import { AppContext, type AppContextValue, type OverlayId, type UploadTask } from './appContextCore';

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Demo hesap — gerçek oturum yönetimi bağlanana kadar yerelde tutulur */
const initialProfile: UserProfile = {
  displayName: 'Deniz Yılmaz',
  email: 'deniz.yilmaz@cenan.ai',
  emailVerified: false,
  avatarUrl: null,
  plan: 'pro',
};

/**
 * Uygulamanın tüm global durumunu (sayfa, dil, tema, arka plan, hesap, konum,
 * sohbet, araştırma, yükleme, ses) tek noktada yöneten sağlayıcı.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>('ana-sayfa');
  const [activeMenuItemId, setActiveMenuItemId] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('tr');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [surfaceTheme, setSurfaceTheme] = useState<SurfaceThemeId>('glass');
  const [composerSize, setComposerSize] = useState<UiSize>('large');
  const [bubbleSize, setBubbleSize] = useState<UiSize>('large');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRailOpen, setRailOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<OverlayId>(null);
  const [activeBackgroundId, setActiveBackgroundId] = useState(defaultBackgroundId);
  const [customBackgrounds, setCustomBackgrounds] = useState<BackgroundOption[]>([]);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [location, setLocation] = useState<LocationInfo | null>(null);
  // Boş dizi ile başlar; Cenan sayfası bu durumda karşılama (orb) düzenini gösterir
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [model, setModel] = useState<ModelId>('cenan-pro');
  const [activeFeatureId, setActiveFeatureId] = useState<CenanFeatureId | null>(null);
  const [isAssistantTyping, setAssistantTyping] = useState(false);
  const [researchHistory, setResearchHistory] = useState<ResearchRecord[]>([]);
  const [watchTerms, setWatchTerms] = useState<WatchTerm[]>(initialWatchTerms);
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

  const t = useMemo(() => createTranslator(language), [language]);
  const tl = useCallback((value: Localized) => pickLocalized(value, language), [language]);

  const createTimestamp = useCallback(
    () => new Date().toLocaleTimeString(localeCodes[language], { hour: '2-digit', minute: '2-digit' }),
    [language]
  );

  // Tema ve yüzey sınıfları <html> üzerinde yönetilir
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.dataset.surface = surfaceTheme;
    root.style.colorScheme = theme;
  }, [theme, surfaceTheme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarCollapsed((prev) => !prev), []);
  const toggleRail = useCallback(() => setRailOpen((prev) => !prev), []);
  const closeRail = useCallback(() => setRailOpen(false), []);
  const openOverlay = useCallback((id: Exclude<OverlayId, null>) => setActiveOverlay(id), []);
  const closeOverlay = useCallback(() => setActiveOverlay(null), []);
  const openVoiceAssistant = useCallback(() => setVoiceActive(true), []);
  const closeVoiceAssistant = useCallback(() => setVoiceActive(false), []);

  /* --- Arka planlar --- */

  const backgrounds = useMemo(
    () => [...backgroundOptions, ...customBackgrounds],
    [customBackgrounds]
  );

  const addCustomBackground = useCallback((dataUrl: string, name: string) => {
    const option: BackgroundOption = {
      id: `custom-${createId()}`,
      name,
      kind: 'image',
      src: dataUrl,
      thumb: dataUrl,
      dim: 0.55,
      custom: true,
    };
    setCustomBackgrounds((prev) => [...prev, option]);
    setActiveBackgroundId(option.id);
  }, []);

  const removeCustomBackground = useCallback(
    (id: string) => {
      setCustomBackgrounds((prev) => prev.filter((item) => item.id !== id));
      setActiveBackgroundId((current) => (current === id ? defaultBackgroundId : current));
    },
    []
  );

  /* --- Hesap --- */

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const signIn = useCallback(() => setLoggedIn(true), []);
  const signOut = useCallback(() => {
    setLoggedIn(false);
    setActiveOverlay(null);
  }, []);

  /* --- Konum --- */

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('asking');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy: Math.round(accuracy),
          label: `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`,
        });
        setLocationStatus('granted');
      },
      () => setLocationStatus('denied'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const rejectLocation = useCallback(() => {
    setLocation(null);
    setLocationStatus('denied');
  }, []);

  /* --- Sohbet --- */

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
    [createTimestamp, track]
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
        {
          id: createId(),
          role: 'system',
          content: pickLocalized(feature.systemPrompt, language),
          timestamp: createTimestamp(),
        },
      ]);
      simulateAssistantReply(pickLocalized(feature.greeting, language), 900);
    },
    [createTimestamp, language, simulateAssistantReply]
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
      const featureTitle = feature ? pickLocalized(feature.title, language) : null;

      const reply =
        language === 'en'
          ? hasAttachment
            ? `I received the document${featureTitle ? ` and added it to the ${featureTitle} flow` : ''}. This build is an interface demo, so it is not wired to the real calculation engine; the production version will break down VAT, withholding and deductions line by line here.`
            : 'Noted. This screen is an interface demo running without a backend — the production version will show the real Cenan model response here.'
          : hasAttachment
            ? `Belgeyi aldım${featureTitle ? ` ve ${featureTitle} akışına ekledim` : ''}. Bu sürüm arayüz demosu olduğu için gerçek hesaplama motoruna bağlı değil; üretim sürümünde burada kalem kalem KDV, stopaj ve tevkifat kırılımı görünecek.`
            : 'Not aldım. Bu ekran şu an backend olmadan çalışan bir arayüz demosu — üretim sürümünde burada Cenan modelinin gerçek yanıtı yer alacak.';

      simulateAssistantReply(reply, 1200);
    },
    [activeFeatureId, createTimestamp, language, simulateAssistantReply]
  );

  const submitVoiceMessage = useCallback(() => {
    setVoiceActive(false);
    sendUserMessage(
      language === 'en'
        ? 'Can you walk me through last month’s VAT summary?'
        : 'Geçen ayın KDV özetini sesli olarak anlatır mısın?'
    );
  }, [language, sendUserMessage]);

  /* --- Deep Web --- */

  /** Her arama, içeriğe göre otomatik başlıklandırılmış bir geçmiş kaydına dönüşür */
  const addResearch = useCallback(
    (query: string, modes: string[]) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      const record: ResearchRecord = {
        id: createId(),
        title: deriveResearchTitle(trimmed, language),
        query: trimmed,
        modes,
        status: 'running',
        sourceCount: 0,
        createdAt: new Date().toLocaleTimeString(localeCodes[language], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setResearchHistory((prev) => [record, ...prev].slice(0, 12));

      const doneId = window.setTimeout(() => {
        setResearchHistory((prev) =>
          prev.map((item) =>
            item.id === record.id
              ? { ...item, status: 'done', sourceCount: 40 + Math.floor(Math.random() * 220) }
              : item
          )
        );
      }, 2600);
      track(doneId);
    },
    [language, track]
  );

  const clearResearch = useCallback(() => setResearchHistory([]), []);

  const addWatchTerm = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setWatchTerms((prev) => [
      ...prev,
      { id: createId(), term: trimmed, hits: 0, risk: 'low', status: 'idle' },
    ]);
  }, []);

  const removeWatchTerm = useCallback((id: string) => {
    setWatchTerms((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /** "Arat" ikonuna basıldığında terim aranıyor durumuna geçer, sonra eşleşme sayısı düşer */
  const searchWatchTerm = useCallback(
    (id: string) => {
      setWatchTerms((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'searching' } : item))
      );

      const doneId = window.setTimeout(() => {
        setWatchTerms((prev) =>
          prev.map((item) => {
            if (item.id !== id) return item;
            const hits = Math.floor(Math.random() * 9);
            return {
              ...item,
              status: 'done',
              hits,
              risk: hits > 5 ? 'high' : hits > 2 ? 'medium' : 'low',
            };
          })
        );
      }, 2200);
      track(doneId);
    },
    [track]
  );

  /* --- Dosya yükleme --- */

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
          const next = Math.min(100, prev.progress + Math.random() * 8 + 5);

          if (next >= 100) {
            if (uploadIntervalRef.current) {
              window.clearInterval(uploadIntervalRef.current);
              uploadIntervalRef.current = null;
            }

            // Yükleme bitince modalı kapat ve belgeyi sohbete ekle
            const closeId = window.setTimeout(() => {
              setUploadTask(null);
              sendUserMessage(
                language === 'en'
                  ? 'I uploaded the document, can you analyse it?'
                  : 'Belgeyi yükledim, analiz edebilir misin?',
                [{ id: prev.id, name: prev.fileName, sizeLabel: prev.sizeLabel }]
              );
            }, 900);
            track(closeId);

            return { ...prev, progress: 100, status: 'done' };
          }

          return { ...prev, progress: next };
        });
      }, 300);
    },
    [language, sendUserMessage, track]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      activePage,
      setActivePage,
      activeMenuItemId,
      setActiveMenuItemId,
      language,
      setLanguage,
      t,
      tl,
      theme,
      toggleTheme,
      setTheme,
      surfaceTheme,
      setSurfaceTheme,
      composerSize,
      setComposerSize,
      bubbleSize,
      setBubbleSize,
      isSidebarCollapsed,
      toggleSidebar,
      isRailOpen,
      toggleRail,
      closeRail,
      activeOverlay,
      openOverlay,
      closeOverlay,
      activeBackgroundId,
      setActiveBackgroundId,
      backgrounds,
      addCustomBackground,
      removeCustomBackground,
      profile,
      updateProfile,
      isLoggedIn,
      signIn,
      signOut,
      locationStatus,
      location,
      requestLocation,
      rejectLocation,
      messages,
      model,
      setModel,
      activeFeatureId,
      triggerCenanFeature,
      sendUserMessage,
      isAssistantTyping,
      resetChat,
      researchHistory,
      addResearch,
      clearResearch,
      watchTerms,
      addWatchTerm,
      removeWatchTerm,
      searchWatchTerm,
      isVoiceActive,
      openVoiceAssistant,
      closeVoiceAssistant,
      submitVoiceMessage,
      uploadTask,
      startUpload,
      cancelUpload,
    }),
    [
      activePage,
      activeMenuItemId,
      language,
      t,
      tl,
      theme,
      toggleTheme,
      surfaceTheme,
      composerSize,
      bubbleSize,
      isSidebarCollapsed,
      toggleSidebar,
      isRailOpen,
      toggleRail,
      closeRail,
      activeOverlay,
      openOverlay,
      closeOverlay,
      activeBackgroundId,
      backgrounds,
      addCustomBackground,
      removeCustomBackground,
      profile,
      updateProfile,
      isLoggedIn,
      signIn,
      signOut,
      locationStatus,
      location,
      requestLocation,
      rejectLocation,
      messages,
      model,
      activeFeatureId,
      triggerCenanFeature,
      sendUserMessage,
      isAssistantTyping,
      resetChat,
      researchHistory,
      addResearch,
      clearResearch,
      watchTerms,
      addWatchTerm,
      removeWatchTerm,
      searchWatchTerm,
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
