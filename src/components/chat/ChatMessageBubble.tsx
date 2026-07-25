import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Sparkles, Terminal } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

/**
 * Sohbet mesajını rolüne göre farklı stillerde render eder.
 * system: katlanabilir sistem promptu kartı · user: indigo gradient balon · assistant: glass balon.
 */
export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const { t } = useAppContext();
  const [isSystemOpen, setSystemOpen] = useState(false);

  if (message.role === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-3"
      >
        <button
          type="button"
          onClick={() => setSystemOpen((prev) => !prev)}
          className="focus-ring flex w-full items-center gap-2 text-left"
        >
          <Terminal className="h-3.5 w-3.5 shrink-0 text-indigo-300/80" />
          <span className="flex-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-200/80">
            {t('chat.systemPrompt')}
          </span>
          <ChevronDown
            className={cn('h-3.5 w-3.5 text-indigo-200/60 transition-transform duration-300', isSystemOpen && 'rotate-180')}
          />
        </button>

        <motion.p
          initial={false}
          animate={{ height: isSystemOpen ? 'auto' : 32, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'mt-2 overflow-hidden text-[11.5px] leading-relaxed text-white/45',
            !isSystemOpen && 'line-clamp-2'
          )}
        >
          {message.content}
        </motion.p>
      </motion.div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}
    >
      {!isUser && (
        <span className="mb-0.5 flex items-center gap-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
          <Sparkles className="h-3 w-3 text-indigo-300/70" />
          {t('chat.title')}
        </span>
      )}

      <div
        className={cn(
          'max-w-[88%] px-3.5 py-2.5 text-[12.5px] leading-relaxed',
          isUser
            ? 'on-accent rounded-[18px] rounded-br-md bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_10px_28px_-10px_rgba(99,102,241,0.9)]'
            : 'glass rounded-[18px] rounded-bl-md text-white/85'
        )}
      >
        {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}

        {message.attachments?.map((attachment) => (
          <div
            key={attachment.id}
            className={cn(
              'mt-2 flex items-center gap-2.5 rounded-xl border px-2.5 py-2',
              isUser ? 'border-white/25 bg-black/20' : 'border-white/10 bg-white/[0.05]'
            )}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.12]">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11.5px] font-medium">{attachment.name}</span>
              <span className="block text-[10px] opacity-60">{attachment.sizeLabel}</span>
            </span>
          </div>
        ))}
      </div>

      <span className="px-1 text-[10px] tabular-nums text-white/25">{message.timestamp}</span>
    </motion.div>
  );
}
