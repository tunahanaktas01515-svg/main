import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { navGroups } from '../../data/navigation';
import { agentTemplates } from '../../data/agents';
import { useClickOutside } from '../../lib/useClickOutside';
import { DynamicIcon } from '../ui/DynamicIcon';
import { cn } from '../../lib/cn';
import type { TranslationKey } from '../../i18n/dictionary';

type SearchGroup = 'pages' | 'actions' | 'settings' | 'agents' | 'tools';

interface SearchEntry {
  id: string;
  group: SearchGroup;
  label: string;
  hint?: string;
  icon: string;
  /** Sonuç seçildiğinde çalışan işlem */
  run: () => void;
  soon?: boolean;
}

const groupOrder: SearchGroup[] = ['actions', 'pages', 'settings', 'agents', 'tools'];

const groupLabelKeys: Record<SearchGroup, TranslationKey> = {
  pages: 'search.group.pages',
  actions: 'search.group.actions',
  settings: 'search.group.settings',
  agents: 'search.group.agents',
  tools: 'search.group.tools',
};

/** Türkçe/İngilizce aksan farklarını yok sayan basit normalleştirme */
function normalize(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .replaceAll('ş', 's')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Üst bardaki uzun cam arama motoru.
 * Üzerine gelindiğinde ya da odaklandığında uygulamada yapılabilecek işlemleri
 * listeler; yazmaya başlandığında sayfa, ayar, ajan ve araçlar arasında filtreler.
 */
export function AppSearch() {
  const {
    t,
    tl,
    setActivePage,
    setActiveMenuItemId,
    openOverlay,
    toggleTheme,
    language,
    setLanguage,
    resetChat,
  } = useAppContext();

  const [query, setQuery] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(wrapperRef, isOpen, () => {
    setOpen(false);
    setQuery('');
  });

  const entries = useMemo<SearchEntry[]>(() => {
    const goto = (page: Parameters<typeof setActivePage>[0], itemId: string) => () => {
      setActivePage(page);
      setActiveMenuItemId(itemId);
    };

    const list: SearchEntry[] = [
      /* Sayfalar */
      { id: 'page-home', group: 'pages', label: t('nav.home'), icon: 'LayoutDashboard', run: goto('ana-sayfa', 'dashboard') },
      { id: 'page-cenan', group: 'pages', label: t('nav.cenan'), icon: 'MessageSquare', run: goto('cenan', 'sohbet') },
      { id: 'page-news', group: 'pages', label: t('nav.news'), icon: 'Newspaper', run: goto('haberler', 'dashboard') },
      { id: 'page-deepweb', group: 'pages', label: t('nav.deepweb'), icon: 'Radar', run: goto('deep-web', 'deep-web') },
      { id: 'page-agents', group: 'pages', label: t('nav.agents'), icon: 'Bot', run: goto('ajanlar', 'aktif-ajanlar') },
      { id: 'page-market', group: 'pages', label: t('nav.market'), icon: 'CandlestickChart', run: goto('borsa', 'borsa-takibi') },

      /* İşlemler */
      { id: 'act-theme', group: 'actions', label: t('action.toggleTheme'), icon: 'SunMoon', run: toggleTheme },
      { id: 'act-settings', group: 'actions', label: t('action.openSettings'), icon: 'Settings', run: () => openOverlay('settings') },
      { id: 'act-account', group: 'actions', label: t('action.openProfile'), icon: 'UserCog', run: () => openOverlay('account') },
      { id: 'act-background', group: 'actions', label: t('action.openBackgrounds'), icon: 'Image', run: () => openOverlay('background') },
      {
        id: 'act-language',
        group: 'actions',
        label: t('action.switchLanguage'),
        hint: language === 'tr' ? 'TR → EN' : 'EN → TR',
        icon: 'Languages',
        run: () => setLanguage(language === 'tr' ? 'en' : 'tr'),
      },
      {
        id: 'act-newchat',
        group: 'actions',
        label: t('action.newChat'),
        icon: 'MessageSquarePlus',
        run: () => {
          resetChat();
          setActivePage('cenan');
          setActiveMenuItemId('sohbet');
        },
      },
      {
        id: 'act-newagent',
        group: 'actions',
        label: t('action.newAgent'),
        icon: 'Plus',
        run: goto('ajanlar', 'yeni-ajan'),
      },
      {
        id: 'act-watchterm',
        group: 'actions',
        label: t('action.addWatchTerm'),
        icon: 'Fingerprint',
        run: goto('deep-web', 'deep-web'),
      },
      {
        id: 'act-allmarkets',
        group: 'actions',
        label: t('action.allMarkets'),
        icon: 'CandlestickChart',
        run: goto('borsa', 'borsa-takibi'),
      },
      {
        id: 'act-location',
        group: 'actions',
        label: t('action.requestLocation'),
        icon: 'MapPin',
        run: () => openOverlay('settings'),
      },

      /* Ayarlar */
      { id: 'set-language', group: 'settings', label: t('settings.languageTitle'), icon: 'Languages', run: () => openOverlay('settings') },
      { id: 'set-surface', group: 'settings', label: t('settings.surfaceTitle'), icon: 'Palette', run: () => openOverlay('settings') },
      { id: 'set-background', group: 'settings', label: t('settings.backgroundTitle'), icon: 'Image', run: () => openOverlay('settings') },
      { id: 'set-location', group: 'settings', label: t('settings.locationTitle'), icon: 'MapPin', run: () => openOverlay('settings') },
      { id: 'set-account', group: 'settings', label: t('account.title'), icon: 'UserCircle2', run: () => openOverlay('account') },
    ];

    /* Ajan şablonları */
    agentTemplates.forEach((agent) => {
      list.push({
        id: `agent-${agent.id}`,
        group: 'agents',
        label: tl(agent.title),
        hint: agent.engine,
        icon: agent.icon,
        soon: agent.status === 'soon',
        run: goto('ajanlar', 'aktif-ajanlar'),
      });
    });

    /* Araçlar — henüz yakında olsa da aranabilir kalır */
    navGroups
      .find((group) => group.id === 'araclar')
      ?.items.forEach((item) => {
        list.push({
          id: `tool-${item.id}`,
          group: 'tools',
          label: t(item.labelKey),
          icon: item.icon,
          soon: item.soon,
          run: () => setActiveMenuItemId(item.id),
        });
      });

    return list;
  }, [language, openOverlay, resetChat, setActiveMenuItemId, setActivePage, setLanguage, t, tl, toggleTheme]);

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return entries.filter((entry) => entry.group === 'actions' || entry.group === 'pages');
    return entries.filter((entry) => normalize(`${entry.label} ${entry.hint ?? ''}`).includes(needle));
  }, [entries, query]);

  const grouped = useMemo(() => {
    return groupOrder
      .map((group) => ({ group, items: results.filter((entry) => entry.group === group) }))
      .filter((section) => section.items.length > 0);
  }, [results]);

  const flat = useMemo(() => grouped.flatMap((section) => section.items), [grouped]);

  const select = (entry: SearchEntry) => {
    entry.run();
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (document.activeElement !== inputRef.current) setOpen(false);
      }}
    >
      {/* Uzun cam arama çubuğu — sağ ucunda koyu gönder kapsülü */}
      <motion.div
        animate={{ width: isOpen ? 340 : 232 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className={cn(
          'group flex h-9 items-center gap-2 rounded-full border pl-3.5 pr-1 transition-colors duration-300',
          isOpen
            ? 'border-indigo-400/40 bg-white/[0.1] shadow-[0_0_26px_-10px_rgba(99,102,241,0.9)]'
            : 'border-white/12 bg-white/[0.05]'
        )}
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-white/45" strokeWidth={2.2} />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setHighlight((prev) => Math.min(prev + 1, flat.length - 1));
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setHighlight((prev) => Math.max(prev - 1, 0));
            } else if (event.key === 'Enter') {
              const entry = flat[highlight];
              if (entry) select(entry);
            } else if (event.key === 'Escape') {
              setQuery('');
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={isOpen ? t('search.expandedPlaceholder') : t('search.placeholder')}
          aria-label={t('search.placeholder')}
          className="min-w-0 flex-1 bg-transparent text-[12.5px] text-white/90 placeholder:text-white/35 focus:outline-none"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label={t('common.close')}
            className="focus-ring flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          /* Referans görseldeki koyu yuvarlak arama kapsülü */
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/55 text-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]">
            <Search className="h-3 w-3" strokeWidth={2.4} />
          </span>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-popover absolute right-0 top-[calc(100%+10px)] z-50 max-h-[440px] w-[380px] origin-top-right overflow-y-auto rounded-3xl p-2"
          >
            <p className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {query ? `“${query}”` : t('search.hint')}
            </p>

            {grouped.length === 0 ? (
              <div className="px-3 py-6 text-center">
                <p className="text-[13px] font-medium text-white/70">{t('search.empty')}</p>
                <p className="mt-1 text-[11.5px] text-white/35">{t('search.emptyHint')}</p>
              </div>
            ) : (
              grouped.map((section) => (
                <div key={section.group} className="mb-1 last:mb-0">
                  <p className="px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    {t(groupLabelKeys[section.group])}
                  </p>
                  {section.items.map((entry) => {
                    const index = flat.indexOf(entry);
                    const isActive = index === highlight;

                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onMouseEnter={() => setHighlight(index)}
                        onClick={() => select(entry)}
                        className={cn(
                          'focus-ring flex w-full items-center gap-2.5 rounded-2xl px-3 py-2 text-left transition-colors duration-150',
                          isActive ? 'bg-white/[0.1]' : 'hover:bg-white/[0.06]'
                        )}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70">
                          <DynamicIcon name={entry.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-white/85">
                          {entry.label}
                        </span>
                        {entry.soon && (
                          <span className="shrink-0 rounded-full bg-white/[0.07] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-white/35">
                            {t('common.soon')}
                          </span>
                        )}
                        {entry.hint && !entry.soon && (
                          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                            {entry.hint}
                          </span>
                        )}
                        {isActive && <CornerDownLeft className="h-3 w-3 shrink-0 text-white/35" />}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
