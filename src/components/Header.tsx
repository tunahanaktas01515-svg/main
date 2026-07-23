import { GearIcon, StarManIcon } from '../icons';
import { useLang } from '../i18n';

type HeaderProps = {
  userName: string;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
};

export function Header({ userName, onOpenSettings, onOpenProfile }: HeaderProps) {
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
      <button
        type="button"
        className="icon-chip avatar-chip glow-chip"
        aria-label={`${userName} ${L.profile}`}
        onClick={onOpenProfile}
      >
        <StarManIcon size={30} />
      </button>
    </div>
  );
}
