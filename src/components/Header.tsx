import { GearIcon, StarManIcon } from '../icons';
import { useLang } from '../i18n';
import type { User } from '../App';

type HeaderProps = {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onProfile: () => void;
  onOpenSettings?: () => void;
};

export function Header({ user, onLogin, onLogout, onProfile, onOpenSettings }: HeaderProps) {
  const { lang, setLang, L } = useLang();
  return (
    <div className="header-actions">
      <div className="lang-switch" role="group" aria-label={L.language}>
        <button
          type="button"
          className={`lang-switch__btn ${lang === 'tr' ? 'is-on' : ''}`}
          onClick={() => setLang('tr')}
          aria-pressed={lang === 'tr'}
        >
          TR
        </button>
        <button
          type="button"
          className={`lang-switch__btn ${lang === 'en' ? 'is-on' : ''}`}
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
        >
          EN
        </button>
      </div>

      <button
        type="button"
        className="icon-chip glow-chip"
        aria-label={L.settings}
        onClick={onOpenSettings}
      >
        <GearIcon size={22} />
      </button>

      {/* Profile with hover dropdown */}
      <div className="profile">
        <button
          type="button"
          className="icon-chip avatar-chip glow-chip"
          aria-label={user ? `${user.name} ${L.profile}` : L.profile}
        >
          <StarManIcon size={30} />
        </button>
        <div className="profile__menu" role="menu">
          <div className="profile__head">
            <span className="profile__name">{user ? user.name : L.guest}</span>
            <span className="profile__mail">{user ? user.email : '—'}</span>
          </div>
          <button type="button" className="profile__item" role="menuitem" onClick={onProfile}>
            {L.profileInfo}
          </button>
          <button type="button" className="profile__item" role="menuitem" onClick={onLogin}>
            {L.login}
          </button>
          <button
            type="button"
            className="profile__item profile__item--danger"
            role="menuitem"
            onClick={onLogout}
            disabled={!user}
          >
            {L.logout}
          </button>
        </div>
      </div>
    </div>
  );
}
