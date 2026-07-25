import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Search } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { useTypewriter } from '../../lib/useTypewriter';
import { AttachMenu } from '../shared/AttachMenu';
import { cn } from '../../lib/cn';
import type { Localized } from '../../types';

const searchSuggestions: Localized[] = [
  { tr: 'marka adı + replika listesi ara…', en: 'search brand name + replica listings…' },
  { tr: 'kurumsal e-posta sızıntısı sorgula…', en: 'check corporate email in leaks…' },
  { tr: 'konşimento numarası izini sür…', en: 'trace a bill of lading number…' },
  { tr: 'GTIP kodu ile pazar yeri taraması…', en: 'scan marketplaces by HS code…' },
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
  const { t, tl } = useAppContext();
  const [query, setQuery] = useState('');
  const [isHovered, setHovered] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => searchSuggestions.map(tl), [tl]);
  const typed = useTypewriter(suggestions, isHovered || isFocused || query.length > 0);
  const canSearch = query.trim().length > 0;

  const submit = () => {
    if (!canSearch) return;
    onSearch(query.trim());
    setQuery('');
  };

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
            {typed || t('deepweb.searchPlaceholder')}
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
            if (event.key === 'Enter') submit();
          }}
          aria-label={t('deepweb.title')}
          className="w-full bg-transparent py-1.5 text-[14px] text-white/92 placeholder:text-transparent focus:outline-none"
        />
      </div>

      <motion.button
        type="button"
        onClick={submit}
        disabled={!canSearch}
        aria-label={t('item.search')}
        whileTap={canSearch ? { scale: 0.93 } : undefined}
        className={cn(
          'focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300',
          canSearch
            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 on-accent shadow-[0_0_34px_-10px_rgba(99,102,241,0.95)] hover:from-indigo-400 hover:to-violet-500'
            : 'cursor-not-allowed border border-white/12 bg-white/[0.07] text-white/35'
        )}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
      </motion.button>
    </div>
  );
}
