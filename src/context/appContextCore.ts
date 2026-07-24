import { createContext, useContext } from 'react';
import type { CenanFeatureId, ChatAttachment, ChatMessage, ModelId, PageId, ThemeMode } from '../types';

/** Devam eden dosya yükleme işleminin durumu */
export interface UploadTask {
  id: string;
  fileName: string;
  sizeLabel: string;
  progress: number;
  status: 'uploading' | 'done';
}

export interface AppContextValue {
  // Navigasyon
  activePage: PageId;
  setActivePage: (page: PageId) => void;

  // Tema
  theme: ThemeMode;
  toggleTheme: () => void;

  // Sidebar
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Arka plan seçici
  isBackgroundModalOpen: boolean;
  openBackgroundModal: () => void;
  closeBackgroundModal: () => void;
  activeBackgroundId: string;
  setActiveBackgroundId: (id: string) => void;

  // Sohbet
  messages: ChatMessage[];
  model: ModelId;
  setModel: (model: ModelId) => void;
  activeFeatureId: CenanFeatureId | null;
  triggerCenanFeature: (featureId: CenanFeatureId) => void;
  sendUserMessage: (content: string, attachments?: ChatAttachment[]) => void;
  isAssistantTyping: boolean;
  resetChat: () => void;

  // Sesli asistan
  isVoiceActive: boolean;
  openVoiceAssistant: () => void;
  closeVoiceAssistant: () => void;
  submitVoiceMessage: () => void;

  // Dosya yükleme
  uploadTask: UploadTask | null;
  startUpload: (fileName: string, sizeBytes: number) => void;
  cancelUpload: () => void;

  // Oturum (demo — backend yok)
  isLoggedIn: boolean;
}

export const AppContext = createContext<AppContextValue | null>(null);

/** Global uygulama durumuna erişim kancası */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext, AppProvider içinde kullanılmalıdır');
  return ctx;
}
