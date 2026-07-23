import { HouseIcon, OrbIcon, GlobeIcon } from '../icons';
import { useLang } from '../i18n';
import type { PageId } from '../types';

type NavBarProps = {
  active: PageId;
  onNavigate: (page: PageId) => void;
};

export function NavBar({ active, onNavigate }: NavBarProps) {
  const { L } = useLang();
  return (
    <nav className="nav" aria-label="Ana menü">
      {/* Ev — black house, white glow + continuous chimney smoke (home page) */}
      <button
        type="button"
        className={`navbtn navbtn--ev has-glow ${active === 'ev' ? 'is-active' : ''}`}
        onClick={() => onNavigate('ev')}
        aria-label={L.navEv}
      >
        <span className="navbtn__icon">
          <HouseIcon className="ic ic-house" />
          <span className="smoke" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </span>
        <span className="navbtn__label">{L.navEv}</span>
      </button>

      {/* İşlemler — lollipop icon whose ring bounces slightly, white glow */}
      <button
        type="button"
        className={`navbtn navbtn--islemler has-glow ${active === 'islemler' ? 'is-active' : ''}`}
        onClick={() => onNavigate('islemler')}
        aria-label={L.navIslemler}
      >
        <span className="navbtn__icon">
          <span className="lolli" aria-hidden="true">
            <span className="lolli__ring" />
            <span className="lolli__stem" />
          </span>
        </span>
        <span className="navbtn__label">{L.navIslemler}</span>
      </button>

      {/* Borsa — globe, name reveal only */}
      <button
        type="button"
        className={`navbtn navbtn--borsa ${active === 'borsa' ? 'is-active' : ''}`}
        onClick={() => onNavigate('borsa')}
        aria-label={L.navBorsa}
      >
        <span className="navbtn__icon">
          <GlobeIcon className="ic ic-globe" />
        </span>
        <span className="navbtn__label">{L.navBorsa}</span>
      </button>

      {/* Ajanlar — flower/orb slides out then returns while name reveals */}
      <button
        type="button"
        className={`navbtn navbtn--ajanlar ${active === 'ajanlar' ? 'is-active' : ''}`}
        onClick={() => onNavigate('ajanlar')}
        aria-label={L.navAjanlar}
      >
        <span className="navbtn__icon">
          <OrbIcon className="ic ic-orb" />
        </span>
        <span className="navbtn__label">{L.navAjanlar}</span>
      </button>
    </nav>
  );
}
