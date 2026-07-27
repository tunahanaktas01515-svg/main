import {
  GridToggleIcon,
  HomeOutlineIcon,
  HouseIcon,
  GlobeIcon,
  BoltIcon,
  BrushIcon,
  GearIcon,
  StarManIcon,
  ChevronDownIcon,
  PlusIcon,
} from '../icons';
import { useLang } from '../i18n';
import { QUICK_ACTIONS } from '../menu';
import type { User } from '../App';

type TopBarProps = {
  active: string;
  mode: 'work' | 'home';
  user: User | null;
  editMode?: boolean;
  onNavigate: (id: string) => void;
  onToggleMode: () => void;
  onOpenBg: () => void;
  onOpenStyle: () => void;
  onToggleEdit: () => void;
  onOpenBlocks?: () => void;
  onOpenSettings: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onProfile: () => void;
};

export function TopBar({
  active,
  mode,
  user,
  editMode = false,
  onNavigate,
  onToggleMode,
  onOpenBg,
  onOpenStyle,
  onToggleEdit,
  onOpenBlocks,
  onOpenSettings,
  onLogin,
  onLogout,
  onProfile,
}: TopBarProps) {
  const { lang, setLang, L } = useLang();
  const isHome = mode === 'home';

  return (
    <div className="topbar">
      {!isHome && (
        <div className="topbar__left">
          <button
            type="button"
            className={`topnav-link ${active === 'dashboard' ? 'is-active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <HouseIcon size={17} /> {L.homeLink}
          </button>
          <button
            type="button"
            className={`topnav-link ${active === 'borsa' ? 'is-active' : ''}`}
            onClick={() => onNavigate('borsa')}
          >
            <GlobeIcon size={17} /> {L.navBorsa}
          </button>
          <div className="quick">
            <button type="button" className="topnav-link">
              <BoltIcon size={16} /> {L.quickActions} <ChevronDownIcon size={13} />
            </button>
            <div className="quick__menu">
              {QUICK_ACTIONS.map((q) => (
                <button key={q.id} type="button" onClick={() => onNavigate(q.id)}>{q[lang]}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="header-actions">
        <button
          type="button"
          className="icon-chip mode-btn"
          aria-label={isHome ? L.backToWork : L.smartHome}
          onClick={onToggleMode}
        >
          {isHome ? <GridToggleIcon size={20} /> : <HomeOutlineIcon size={20} />}
        </button>

        {/* Work: Arka Plan only. Home: Stil + Arka Plan + bare + (edit/blocks). */}
        {isHome ? (
          <div className="brush-cluster">
            <div className="brushmenu">
              <button type="button" className="icon-chip brush-btn" aria-label={L.editBg}>
                <BrushIcon size={20} />
              </button>
              <div className="brushmenu__list">
                <button type="button" onClick={onOpenStyle}>{L.bgStil}</button>
                <button type="button" onClick={onOpenBg}>{L.bgArkaPlan}</button>
              </div>
            </div>
            <button
              type="button"
              className="layout-plus"
              aria-label={L.addBlock}
              onMouseEnter={() => {
                if (!editMode) onToggleEdit();
                onOpenBlocks?.();
              }}
              onFocus={() => {
                if (!editMode) onToggleEdit();
                onOpenBlocks?.();
              }}
              onClick={() => {
                if (!editMode) onToggleEdit();
                onOpenBlocks?.();
              }}
            >
              <PlusIcon size={22} />
            </button>
          </div>
        ) : (
          <button type="button" className="icon-chip brush-btn" aria-label={L.bgArkaPlan} onClick={onOpenBg}>
            <BrushIcon size={20} />
          </button>
        )}

        {!isHome && (
          <>
            <div className="lang-switch" role="group" aria-label={L.language}>
              <button type="button" className={`lang-switch__btn ${lang === 'tr' ? 'is-on' : ''}`} onClick={() => setLang('tr')} aria-pressed={lang === 'tr'}>TR</button>
              <button type="button" className={`lang-switch__btn ${lang === 'en' ? 'is-on' : ''}`} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>ENG</button>
            </div>

            <button type="button" className="icon-chip glow-chip" aria-label={L.settings} onClick={onOpenSettings}>
              <GearIcon size={22} />
            </button>

            <div className="profile">
              <button type="button" className="icon-chip avatar-chip glow-chip" aria-label={user ? `${user.name} ${L.profile}` : L.profile}>
                <StarManIcon size={30} />
              </button>
              <div className="profile__menu" role="menu">
                <div className="profile__head">
                  <span className="profile__name">{user ? `${user.name}${user.surname ? ` ${user.surname}` : ''}` : L.guest}</span>
                  <span className="profile__mail">{user ? user.email : '—'}</span>
                </div>
                <button type="button" className="profile__item" role="menuitem" onClick={onProfile}>{L.profileInfo}</button>
                <button type="button" className="profile__item" role="menuitem" onClick={onLogin}>{L.login}</button>
                <button type="button" className="profile__item profile__item--danger" role="menuitem" onClick={onLogout} disabled={!user}>{L.logout}</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
