import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Paperclip, Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { useTypewriter } from '../../lib/useTypewriter';
import { composerSuggestions } from '../../data/quickActions';
import { AttachMenu } from '../shared/AttachMenu';
import { ModelSelector } from '../chat/ModelSelector';
import { cn } from '../../lib/cn';

interface PromptComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  /** Hero düzeninde daha büyük, konuşma düzeninde daha kompakt görünür */
  variant?: 'hero' | 'thread';
  className?: string;
}

/**
 * Cenan'ın ana konuşma girişi.
 * Boşken örnek istemler daktilo efektiyle yazılır; imleç alanın üzerine
 * geldiğinde animasyon durur ve metin sabit kalır.
 */
export function PromptComposer({ value, onChange, onSubmit, variant = 'hero', className }: PromptComposerProps) {
  const { openVoiceAssistant } = useAppContext();
  const [isHovered, setHovered] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isHero = variant === 'hero';
  const typed = useTypewriter(composerSuggestions, isHovered || isFocused || value.length > 0);
  const canSend = value.trim().length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, isHero ? 168 : 132)}px`;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'glass-strong relative cursor-text rounded-[28px] p-3 transition-all duration-300',
        isFocused && 'border-indigo-400/35 shadow-[0_0_48px_-14px_rgba(99,102,241,0.9)]',
        className
      )}
      onClick={() => textareaRef.current?.focus()}
    >
      {/* Kenar ışığı ve gezinen parlama */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <span className="absolute -left-1/3 top-0 h-full w-1/2 animate-shimmer streak opacity-[0.15]" />
      </span>

      <div className="relative flex items-stretch gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Metin alanı + daktilo efektli örnek istem */}
          <div className="relative px-2 pt-1.5">
            {value.length === 0 && (
              <p
                className={cn(
                  'pointer-events-none absolute inset-x-2 top-1.5 truncate text-white/35',
                  isHero ? 'text-[17px]' : 'text-[14px]'
                )}
              >
                {/* Duraklatma anı iki öneri arasına denk gelirse ilk öneri gösterilir */}
                {typed || composerSuggestions[0]}
                <span className="ml-0.5 inline-block animate-caret text-indigo-300">|</span>
              </p>
            )}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              rows={1}
              aria-label="Cenan AI'a mesaj yaz"
              className={cn(
                'w-full resize-none bg-transparent text-white/92 placeholder:text-transparent focus:outline-none',
                isHero ? 'max-h-[168px] text-[17px] leading-relaxed' : 'max-h-[132px] text-[14px] leading-relaxed'
              )}
            />
          </div>

          {/* Bilgi şeridi */}
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
            <Paperclip className="h-3.5 w-3.5 shrink-0 text-white/40" />
            <span className="min-w-0 flex-1 truncate text-[11.5px] text-white/40">
              Belgen mi var? Fatura, ekstre veya fotoğraf yükle — Cenan analiz etsin.
            </span>
            <ModelSelector />
          </div>

          {/* Aksiyon satırı */}
          <div className="mt-2 flex items-center gap-2 px-0.5">
            <AttachMenu />

            <button
              type="button"
              onClick={openVoiceAssistant}
              aria-label="Sesli konuşmayı başlat"
              title="Sesli konuşmayı başlat"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition-all duration-300 hover:border-sky-400/40 hover:bg-sky-500/20 hover:text-white"
            >
              <Mic className="h-4 w-4" />
            </button>

            <span className="ml-auto text-[10.5px] text-white/25">
              Enter ile gönder · Shift + Enter yeni satır
            </span>
          </div>
        </div>

        {/* Gönder butonu */}
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={!canSend}
          aria-label="Gönder"
          whileTap={canSend ? { scale: 0.95 } : undefined}
          className={cn(
            'focus-ring flex shrink-0 items-center justify-center rounded-[22px] transition-all duration-300',
            isHero ? 'w-[92px]' : 'w-[68px]',
            canSend
              ? 'bg-white text-black shadow-[0_0_44px_-12px_rgba(255,255,255,0.85)] hover:bg-white/92'
              : 'cursor-not-allowed border border-white/10 bg-white/[0.06] text-white/30'
          )}
        >
          <Sparkles className={cn(isHero ? 'h-6 w-6' : 'h-5 w-5')} strokeWidth={1.9} />
        </motion.button>
      </div>
    </div>
  );
}
