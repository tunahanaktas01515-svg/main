import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { ChatMessageBubble } from '../chat/ChatMessageBubble';
import { cn } from '../../lib/cn';

/**
 * Konuşma akışı: mesaj balonları ve "yazıyor" göstergesi.
 * Yeni mesajda otomatik olarak en alta kayar.
 */
export function ConversationThread() {
  const { t, messages, isAssistantTyping, bubbleSize } = useAppContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isAssistantTyping]);

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[760px] flex-col px-1',
        bubbleSize === 'small' ? 'gap-2' : 'gap-4'
      )}
    >
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}

      {isAssistantTyping && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1">
          <span className="mb-0.5 flex items-center gap-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            <Sparkles className="h-3 w-3 text-sky-300/70" />
            {t('chat.typing')}
          </span>
          <div className="glass flex w-fit items-center gap-1.5 rounded-[18px] rounded-bl-md px-4 py-3">
            <TypingDot delay={0} />
            <TypingDot delay={0.16} />
            <TypingDot delay={0.32} />
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-sky-200/70"
      animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}
