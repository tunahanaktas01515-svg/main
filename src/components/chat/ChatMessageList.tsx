import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { ChatMessageBubble } from './ChatMessageBubble';

/**
 * Kaydırılabilir sohbet geçmişi alanı. Yeni mesaj geldiğinde otomatik en alta kayar.
 */
export function ChatMessageList() {
  const { messages, isAssistantTyping } = useAppContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isAssistantTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {isAssistantTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel flex w-fit items-center gap-1.5 rounded-2xl px-4 py-3"
          >
            <TypingDot delay={0} />
            <TypingDot delay={0.15} />
            <TypingDot delay={0.3} />
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
      className="h-1.5 w-1.5 rounded-full bg-white/50"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}
