import { useRef, useState } from 'react';
import { ArrowUp, Mic, Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { UploadMenu } from './UploadMenu';
import { GlassProgressBar } from '../ui/GlassProgressBar';
import { cn } from '../../lib/cn';
import { useClickOutside } from '../../lib/useClickOutside';
import type { ChatAttachment } from '../../types';

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * "Ask anything" tarzı modern sohbet giriş çubuğu.
 * Sol: dosya yükleme menüsü, orta: otomatik büyüyen textarea, sağ: mikrofon ve gönder.
 */
export function ChatInputBar() {
  const { sendUserMessage, openVoiceAssistant } = useAppContext();
  const [draft, setDraft] = useState('');
  const [isUploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<ChatAttachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const uploadWrapperRef = useRef<HTMLDivElement>(null);

  // Not: "position: fixed" tabanlı overlay yerine bu hook kullanılır, çünkü chat panelindeki
  // backdrop-blur ataları fixed elemanlar için yeni bir containing block oluşturarak
  // tam ekran overlay'in çalışmasını engeller.
  useClickOutside(uploadWrapperRef, isUploadMenuOpen, () => setUploadMenuOpen(false));

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(event.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }
  };

  const handleFilesSelected = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = Math.random().toString(36).slice(2, 10);
      const attachment: ChatAttachment = {
        id,
        name: file.name,
        sizeLabel: formatFileSize(file.size),
        progress: 0,
      };
      setPendingAttachments((prev) => [...prev, attachment]);

      // Sahte (mock) yükleme ilerlemesi — gerçek backend olmadığı için simüle edilir
      const interval = window.setInterval(() => {
        setPendingAttachments((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, progress: Math.min(100, item.progress + 18) } : item
          )
        );
      }, 220);

      window.setTimeout(() => window.clearInterval(interval), 1600);
    });
  };

  const handleSend = () => {
    const isReady = pendingAttachments.every((item) => item.progress >= 100);
    if (!draft.trim() && pendingAttachments.length === 0) return;
    if (!isReady) return;

    sendUserMessage(draft.trim() || 'Belge paylaşıldı', pendingAttachments.length ? pendingAttachments : undefined);
    setDraft('');
    setPendingAttachments([]);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 pt-2">
      {pendingAttachments.length > 0 && (
        <div className="mb-2 flex flex-col gap-2">
          {pendingAttachments.map((attachment) => (
            <div key={attachment.id} className="glass-panel rounded-xl p-2.5">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="truncate">{attachment.name}</span>
                <span className="text-white/35">{attachment.sizeLabel}</span>
              </div>
              <GlassProgressBar progress={attachment.progress} className="mt-1.5" />
            </div>
          ))}
        </div>
      )}

      <div className="glass-panel-strong flex items-end gap-2 rounded-3xl p-2.5">
        <div ref={uploadWrapperRef} className="relative">
          <button
            type="button"
            onClick={() => setUploadMenuOpen((prev) => !prev)}
            className="icon-button h-9 w-9 shrink-0"
            aria-label="Dosya ekle"
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
          <UploadMenu
            isOpen={isUploadMenuOpen}
            onClose={() => setUploadMenuOpen(false)}
            onFilesSelected={handleFilesSelected}
          />
        </div>

        <textarea
          ref={textareaRef}
          value={draft}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Bir şey sor..."
          rows={1}
          className="max-h-36 flex-1 resize-none bg-transparent px-1 py-1.5 text-sm text-white/90 placeholder:text-white/35 focus:outline-none"
        />

        <button
          type="button"
          onClick={openVoiceAssistant}
          className="icon-button h-9 w-9 shrink-0"
          aria-label="Sesli asistanı aç"
        >
          <Mic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!draft.trim() && pendingAttachments.length === 0}
          className={cn(
            'icon-button h-9 w-9 shrink-0 border-indigo-400/30 bg-indigo-500/25 text-white hover:bg-indigo-500/40',
            !draft.trim() && pendingAttachments.length === 0 && 'cursor-not-allowed opacity-40 hover:bg-indigo-500/25'
          )}
          aria-label="Gönder"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
