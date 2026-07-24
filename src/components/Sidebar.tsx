import { useState } from 'react';
import { MENU } from '../menu';
import { useLang } from '../i18n';
import {
  SquircleIcon,
  GridIcon,
  SwapIcon,
  ReportIcon,
  TaxIcon,
  GearIcon,
  GridToggleIcon,
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

  // Collapsed: only a floating round "open" button, independent from edges.
  if (!open) {
    return (
      <div className="menu-rail">
        <button type="button" className="menu-open glow-chip" aria-label={L.toggleMenu} onClick={onToggle}>
          <GridToggleIcon size={22} />
        </button>
      </div>
    );
  }

  const isOpen = (id: string) => pinned.has(id) || hover === id;
  const togglePin = (id: string) =>
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <SquircleIcon size={22} />
        </span>
        <div>
          <span className="sidebar__brandname">Cenan</span>
          <span className="sidebar__brandsub">Muhasebe & İhracat</span>
        </div>
        <button type="button" className="sidebar__close" aria-label={L.close} onClick={onToggle}>×</button>
      </div>

      <nav className="sidebar__nav">
        {MENU.map((g) => {
          const Ico = GROUP_ICONS[g.icon];
          const grpOpen = isOpen(g.id);
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
