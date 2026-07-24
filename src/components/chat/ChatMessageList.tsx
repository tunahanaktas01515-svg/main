import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { ChatMessageBubble } from './ChatMessageBubble';

/**
 * Kaydırılabilir sohbet geçmişi. Yeni mesaj veya "yazıyor" durumunda otomatik en alta kayar.
 */
export function ChatMessageList() {
  const { messages, isAssistantTyping } = useAppContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isAssistantTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="flex flex-col gap-3.5">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {isAssistantTyping && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1">
            <span className="mb-0.5 flex items-center gap-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              <Sparkles className="h-3 w-3 text-indigo-300/70" />
              Cenan AI
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
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-indigo-200/70"
      animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}
