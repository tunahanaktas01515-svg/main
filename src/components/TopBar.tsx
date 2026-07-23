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
} from '../icons';
import { useLang } from '../i18n';
import { QUICK_ACTIONS } from '../menu';
import type { User } from '../App';

type TopBarProps = {
  active: string;
  mode: 'work' | 'home';
  user: User | null;
  onNavigate: (id: string) => void;
  onToggleSidebar: () => void;
  onToggleMode: () => void;
  onOpenBg: () => void;
  onOpenSettings: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onProfile: () => void;
};

export function TopBar({
  active,
  mode,
  user,
  onNavigate,
  onToggleSidebar,
  onToggleMode,
  onOpenBg,
  onOpenSettings,
  onLogin,
  onLogout,
  onProfile,
}: TopBarProps) {
  const { lang, setLang, L } = useLang();

  return (
    <div className="topbar">
      <div className="topbar__left">
        <button type="button" className="icon-chip glow-chip panel-toggle" aria-label={L.toggleMenu} onClick={onToggleSidebar}>
          <GridToggleIcon size={20} />
        </button>
        <button
          type="button"
          className={`topnav-link ${active === 'dashboard' && mode === 'work' ? 'is-active' : ''}`}
          onClick={() => { onNavigate('dashboard'); }}
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

      <div className="header-actions">
        {/* Smart-home / back-to-work mode toggle */}
        <button
          type="button"
          className="icon-chip mode-btn"
          aria-label={mode === 'work' ? L.smartHome : L.backToWork}
          onClick={onToggleMode}
        >
          {mode === 'work' ? <HomeOutlineIcon size={20} /> : <GridToggleIcon size={20} />}
        </button>

        <button type="button" className="icon-chip brush-btn" aria-label={L.editBg} onClick={onOpenBg}>
          <BrushIcon size={20} />
        </button>

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
              <span className="profile__name">{user ? user.name : L.guest}</span>
              <span className="profile__mail">{user ? user.email : '—'}</span>
            </div>
            <button type="button" className="profile__item" role="menuitem" onClick={onProfile}>{L.profileInfo}</button>
            <button type="button" className="profile__item" role="menuitem" onClick={onLogin}>{L.login}</button>
            <button type="button" className="profile__item profile__item--danger" role="menuitem" onClick={onLogout} disabled={!user}>{L.logout}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
