import { Bot } from 'lucide-react';
import { ModelSelector } from './ModelSelector';
import { ChatMessageList } from './ChatMessageList';
import { ChatInputBar } from './ChatInputBar';

/**
 * Sağ tarafta her zaman görünür olan yapay zeka sohbet paneli.
 * Üstte model seçici, ortada mesaj geçmişi, altta modern chat input yer alır.
 */
export function ChatPanel() {
  return (
    <aside className="glass-panel flex h-full w-[360px] shrink-0 flex-col rounded-none border-y-0 border-r-0">
      {/* Başlık ve model seçici */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_16px_rgba(139,92,246,0.5)]">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-white/90">Cenan AI</h2>
        </div>
        <ModelSelector />
      </div>

      <ChatMessageList />
      <ChatInputBar />
    </aside>
  );
}
