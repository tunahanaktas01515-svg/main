import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, AtSign, Mic, Plus } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { useClickOutside } from '../../lib/useClickOutside';
import { UploadMenu } from './UploadMenu';
import { quickPrompts } from '../../data/models';
import { cn } from '../../lib/cn';

/**
 * Referanstaki "Ask anything" barına yakın, iki satırlı modern sohbet girişi.
 * Üst satır: otomatik büyüyen textarea · Alt satır: + / @ ve mikrofon + gönder aksiyonları.
 */
export function ChatInputBar() {
  const { sendUserMessage, openVoiceAssistant, startUpload, messages } = useAppContext();
  const [draft, setDraft] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const uploadWrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(uploadWrapperRef, isMenuOpen, () => setMenuOpen(false));

  const canSend = draft.trim().length > 0;
  // Hızlı öneriler yalnızca sohbet henüz başlamamışken gösterilir
  const showQuickPrompts = messages.length <= 1;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(event.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
    }
  };

  const handleSend = () => {
    if (!canSend) return;
    sendUserMessage(draft);
    setDraft('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 px-4 pb-4 pt-1">
      {showQuickPrompts && (
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendUserMessage(prompt)}
              className="focus-ring rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-white/55 transition-all duration-300 hover:border-indigo-400/35 hover:bg-indigo-500/15 hover:text-white/90"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div
        className={cn(
          'glass-strong relative rounded-[26px] px-3 pb-2.5 pt-3 transition-all duration-300',
          isFocused && 'border-indigo-400/30 shadow-[0_0_34px_-10px_rgba(99,102,241,0.75)]'
        )}
      >
        {/*
         * Işık efektleri kendi kırpılmış katmanında durur.
         * Bu sarmalayıcıya overflow-hidden verilir; ana kapsayıcıda verilmez,
         * aksi hâlde yukarı doğru açılan yükleme menüsü kırpılır.
         */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <span className="absolute -left-1/3 top-0 h-full w-1/2 animate-shimmer streak opacity-[0.18]" />
        </span>

        <textarea
          ref={textareaRef}
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={1}
          placeholder="Bir şey sor…"
          className="relative max-h-[132px] w-full resize-none bg-transparent px-1 text-[13px] leading-relaxed text-white/90 placeholder:text-white/35 focus:outline-none"
        />

        <div className="relative mt-1.5 flex items-center gap-1.5">
          <div ref={uploadWrapperRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Dosya ekle"
              className={cn(
                'focus-ring flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-all duration-300 hover:bg-white/[0.1] hover:text-white',
                isMenuOpen && 'bg-white/[0.12] text-white'
              )}
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
            <UploadMenu
              isOpen={isMenuOpen}
              onClose={() => setMenuOpen(false)}
              onFileSelected={(file) => startUpload(file.name, file.size)}
              onScanDemo={() => startUpload('Taranan-Fatura-2024-8871.pdf', 87728)}
            />
          </div>

          <button
            type="button"
            aria-label="Bağlam ekle"
            title="Belge veya modül bağlamı ekle"
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-all duration-300 hover:bg-white/[0.1] hover:text-white"
          >
            <AtSign className="h-4 w-4" />
          </button>

          <span className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={openVoiceAssistant}
              aria-label="Sesli asistanı aç"
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-all duration-300 hover:bg-white/[0.1] hover:text-white"
            >
              <Mic className="h-4 w-4" />
            </button>

            <motion.button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Gönder"
              whileTap={canSend ? { scale: 0.92 } : undefined}
              className={cn(
                'focus-ring flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
                canSend
                  ? 'bg-white text-black shadow-[0_0_22px_-6px_rgba(255,255,255,0.8)] hover:bg-white/90'
                  : 'cursor-not-allowed bg-white/[0.12] text-white/35'
              )}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
            </motion.button>
          </span>
        </div>
      </div>

      <p className="mt-2 px-1 text-center text-[10px] text-white/25">
        Enter ile gönder · Shift + Enter ile yeni satır
      </p>
    </div>
  );
}
