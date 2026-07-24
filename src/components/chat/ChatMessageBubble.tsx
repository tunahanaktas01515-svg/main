import { motion } from 'framer-motion';
import { Paperclip, Terminal } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { GlassProgressBar } from '../ui/GlassProgressBar';
import { cn } from '../../lib/cn';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

/**
 * Tek bir sohbet mesajını rolüne göre (system / user / assistant) farklı stille render eder.
 */
export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  if (message.role === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel flex items-start gap-2 rounded-2xl border-indigo-400/20 bg-indigo-500/[0.06] p-3 text-xs text-white/45"
      >
        <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-300/70" />
        <div>
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-indigo-300/70">
            Sistem promptu ayarlandı
          </span>
          <p className="leading-relaxed">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-[0_4px_18px_rgba(0,0,0,0.25)]',
          isUser
            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
            : 'glass-panel text-white/85'
        )}
      >
        {message.content}

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="rounded-xl border border-white/15 bg-black/20 p-2.5">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Paperclip className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{attachment.name}</span>
                  <span className="ml-auto shrink-0 text-white/40">{attachment.sizeLabel}</span>
                </div>
                <GlassProgressBar progress={attachment.progress} className="mt-2" />
              </div>
            ))}
          </div>
        )}
      </div>
      <span className="px-1 text-[11px] text-white/30">{message.timestamp}</span>
    </motion.div>
  );
}
