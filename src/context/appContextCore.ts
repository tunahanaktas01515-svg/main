import { createContext, useContext } from 'react';
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
import type { TranslationKey } from '../i18n/dictionary';

/** Devam eden dosya yükleme işleminin durumu */
export interface UploadTask {
  id: string;
  fileName: string;
  sizeLabel: string;
  progress: number;
  status: 'uploading' | 'done';
}

/** Katman üstü pencerelerden hangisinin açık olduğu */
export type OverlayId = 'background' | 'settings' | 'account' | null;

export interface AppContextValue {
  // Navigasyon
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  activeMenuItemId: string;
  setActiveMenuItemId: (id: string) => void;

  // Dil
  language: Language;
  setLanguage: (language: Language) => void;
  /** Sabit arayüz metinleri */
  t: (key: TranslationKey) => string;
  /** Veri dosyalarındaki iki dilli içerik metinleri */
  tl: (value: Localized) => string;

  // Tema
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  surfaceTheme: SurfaceThemeId;
  setSurfaceTheme: (id: SurfaceThemeId) => void;

  // Konuşma motoru ve mesaj balonu boyutları
  composerSize: UiSize;
  setComposerSize: (size: UiSize) => void;
  bubbleSize: UiSize;
  setBubbleSize: (size: UiSize) => void;

  // Sidebar
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Sağdaki Cenan paneli
  isRailOpen: boolean;
  toggleRail: () => void;
  closeRail: () => void;

  // Katman üstü pencereler
  activeOverlay: OverlayId;
  openOverlay: (id: Exclude<OverlayId, null>) => void;
  closeOverlay: () => void;

  // Arka planlar
  activeBackgroundId: string;
  setActiveBackgroundId: (id: string) => void;
  /** Hazır seçenekler + kullanıcının yüklediği arka planlar */
  backgrounds: BackgroundOption[];
  addCustomBackground: (dataUrl: string, name: string) => void;
  removeCustomBackground: (id: string) => void;

  // Hesap
  profile: UserProfile;
  updateProfile: (patch: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  signIn: () => void;
  signOut: () => void;

  // Konum
  locationStatus: LocationStatus;
  location: LocationInfo | null;
  requestLocation: () => void;
  rejectLocation: () => void;

  // Sohbet
  messages: ChatMessage[];
  model: ModelId;
  setModel: (model: ModelId) => void;
  activeFeatureId: CenanFeatureId | null;
  triggerCenanFeature: (featureId: CenanFeatureId) => void;
  sendUserMessage: (content: string, attachments?: ChatAttachment[]) => void;
  isAssistantTyping: boolean;
  resetChat: () => void;

  // Deep Web
  researchHistory: ResearchRecord[];
  addResearch: (query: string, modes: string[]) => void;
  clearResearch: () => void;
  watchTerms: WatchTerm[];
  addWatchTerm: (term: string) => void;
  removeWatchTerm: (id: string) => void;
  searchWatchTerm: (id: string) => void;

  // Sesli asistan
  isVoiceActive: boolean;
  openVoiceAssistant: () => void;
  closeVoiceAssistant: () => void;
  submitVoiceMessage: () => void;

  // Dosya yükleme
  uploadTask: UploadTask | null;
  startUpload: (fileName: string, sizeBytes: number) => void;
  cancelUpload: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

/** Global uygulama durumuna erişim kancası */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext, AppProvider içinde kullanılmalıdır');
  return ctx;
}
