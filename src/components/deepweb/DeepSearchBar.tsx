import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Search } from 'lucide-react';
import { useTypewriter } from '../../lib/useTypewriter';
import { AttachMenu } from '../shared/AttachMenu';
import { cn } from '../../lib/cn';

const searchSuggestions = [
  'marka adı + replika listesi ara…',
  'kurumsal e-posta sızıntısı sorgula…',
  'konşimento numarası izini sür…',
  'GTIP kodu ile pazar yeri taraması…',
];

interface DeepSearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * Deep Web arama çubuğu.
 * Solda "+" ekleme menüsü, ortada daktilo efektli arama alanı, sağda yuvarlak gönder butonu.
 * İmleç alanın üzerine geldiğinde yazı animasyonu durur.
 */
export function DeepSearchBar({ onSearch }: DeepSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isHovered, setHovered] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const typed = useTypewriter(searchSuggestions, isHovered || isFocused || query.length > 0);
  const canSearch = query.trim().length > 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'glass-strong relative flex items-center gap-2 rounded-full py-2 pl-2.5 pr-2 transition-all duration-300',
        isFocused && 'border-indigo-400/35 shadow-[0_0_48px_-14px_rgba(99,102,241,0.9)]'
      )}
    >
      <AttachMenu placement="bottom" />

      <Search className="h-4 w-4 shrink-0 text-white/35" />

      <div className="relative min-w-0 flex-1 cursor-text" onClick={() => inputRef.current?.focus()}>
        {query.length === 0 && (
          <p className="pointer-events-none absolute inset-0 flex items-center truncate text-[14px] text-white/32">
            {typed || 'Kapalı ağda ara…'}
            <span className="ml-0.5 inline-block animate-caret text-indigo-300">|</span>
          </p>
        )}
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && canSearch) onSearch(query.trim());
          }}
          aria-label="Deep web araması"
          className="w-full bg-transparent py-1.5 text-[14px] text-white/92 placeholder:text-transparent focus:outline-none"
        />
      </div>

      <motion.button
        type="button"
        onClick={() => canSearch && onSearch(query.trim())}
        disabled={!canSearch}
        aria-label="Ara"
        whileTap={canSearch ? { scale: 0.93 } : undefined}
        className={cn(
          'focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300',
          canSearch
            ? 'bg-white text-black shadow-[0_0_34px_-10px_rgba(255,255,255,0.9)] hover:bg-white/90'
            : 'cursor-not-allowed border border-white/12 bg-white/[0.07] text-white/35'
        )}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
      </motion.button>
    </div>
  );
}
