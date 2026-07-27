import { useState } from 'react';
import { MENU } from '../menu';
import { useLang } from '../i18n';
import {
  GridIcon,
  SwapIcon,
  ReportIcon,
  TaxIcon,
  GearIcon,
  MenuLinesIcon,
  ChevronDownIcon,
} from '../icons';

type SidebarProps = {
  active: string;
  open: boolean;
  onNavigate: (id: string) => void;
  onToggle: () => void;
};

const GROUP_ICONS = {
  grid: GridIcon,
  swap: SwapIcon,
  report: ReportIcon,
  tax: TaxIcon,
  gear: GearIcon,
} as const;

export function Sidebar({ active, open, onNavigate, onToggle }: SidebarProps) {
  const { lang, L } = useLang();
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<Set<string>>(new Set(['ana']));
  const [query, setQuery] = useState('');

  const isOpen = (id: string) => pinned.has(id) || hover === id;

  if (!open) {
    const openGroup = (id: string) => {
      setPinned((prev) => new Set(prev).add(id));
      onToggle();
    };
    return (
      <div className="menu-rail">
        <button type="button" className="rail-open" aria-label={L.toggleMenu} onClick={onToggle}>
          <MenuLinesIcon size={20} />
        </button>
        <span className="rail-sep" />
        <div className="rail-icons">
          {MENU.map((g) => {
            const Ico = GROUP_ICONS[g.icon];
            return (
              <div key={g.id} className="rail-item">
                <button type="button" className="rail-ico" aria-label={g[lang]} onClick={() => openGroup(g.id)}>
                  <Ico size={20} />
                </button>
                <button type="button" className="rail-flyout" onClick={() => openGroup(g.id)}>
                  {g[lang]}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const togglePin = (id: string) =>
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const q = query.trim().toLowerCase();
  const filteredMenu = MENU.map((g) => ({
    ...g,
    items: q
      ? g.items.filter((it) => it.tr.toLowerCase().includes(q) || it.en.toLowerCase().includes(q))
      : g.items,
  })).filter((g) => !q || g.items.length > 0);

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <form
          className="side-search"
          onSubmit={(e) => {
            e.preventDefault();
            const first = filteredMenu[0]?.items[0];
            if (first) onNavigate(first.id);
          }}
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L.searchPlaceholder}
            aria-label={L.searchPlaceholder}
          />
          <button type="submit" className="side-search__btn" aria-label={L.searchPlaceholder}>
            <SearchGlyph />
          </button>
        </form>
        <button type="button" className="sidebar__close" aria-label={L.close} onClick={onToggle}>×</button>
      </div>

      <nav className="sidebar__nav">
        {filteredMenu.map((g) => {
          const Ico = GROUP_ICONS[g.icon];
          const grpOpen = isOpen(g.id) || !!q;
          return (
            <div
              key={g.id}
              className={`mgroup ${grpOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setHover(g.id)}
              onMouseLeave={() => setHover((h) => (h === g.id ? null : h))}
            >
              <button
                type="button"
                className={`mgroup__head ${pinned.has(g.id) ? 'is-pinned' : ''}`}
                onClick={() => togglePin(g.id)}
              >
                <span className="mgroup__ico"><Ico size={18} /></span>
                <span className="mgroup__title">{g[lang]}</span>
                <span className="mgroup__chev"><ChevronDownIcon size={14} /></span>
              </button>
              <div className="mgroup__items">
                {g.items.map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    className={`mitem ${active === it.id ? 'is-active' : ''}`}
                    onClick={() => onNavigate(it.id)}
                  >
                    <span className="mitem__dot" />
                    {it[lang]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function SearchGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
