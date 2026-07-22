import { FlowerIcon, HouseIcon, OrbIcon, GlobeIcon } from '../icons';
import type { PageId } from '../types';

type NavBarProps = {
  active: PageId;
  onNavigate: (page: PageId) => void;
};

export function NavBar({ active, onNavigate }: NavBarProps) {
  return (
    <nav className="nav" aria-label="Ana menü">
      {/* Cenan — flower blooms (shrink then grow) and writes its name */}
      <button
        type="button"
        className={`navbtn navbtn--cenan ${active === 'cenan' ? 'is-active' : ''}`}
        onClick={() => onNavigate('cenan')}
        aria-label="Cenan"
      >
        <span className="navbtn__icon">
          <FlowerIcon className="ic ic-flower" />
        </span>
        <span className="navbtn__label">Cenan</span>
      </button>

      {/* İşlemler — black house, white glow + continuous chimney smoke */}
      <button
        type="button"
        className={`navbtn navbtn--islemler ${active === 'islemler' ? 'is-active' : ''}`}
        onClick={() => onNavigate('islemler')}
        aria-label="İşlemler"
      >
        <span className="navbtn__icon">
          <HouseIcon className="ic ic-house" />
          <span className="smoke" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </span>
        <span className="navbtn__label">İşlemler</span>
      </button>

      {/* Borsa — orb slides out then returns, writing its name on the way back */}
      <button
        type="button"
        className={`navbtn navbtn--borsa ${active === 'borsa' ? 'is-active' : ''}`}
        onClick={() => onNavigate('borsa')}
        aria-label="Borsa"
      >
        <span className="navbtn__icon">
          <OrbIcon className="ic ic-orb" />
        </span>
        <span className="navbtn__label">Borsa</span>
      </button>

      {/* Ajanlar — no icon animation, just the name reveal */}
      <button
        type="button"
        className={`navbtn navbtn--ajanlar ${active === 'ajanlar' ? 'is-active' : ''}`}
        onClick={() => onNavigate('ajanlar')}
        aria-label="Ajanlar"
      >
        <span className="navbtn__icon">
          <GlobeIcon className="ic ic-globe" />
        </span>
        <span className="navbtn__label">Ajanlar</span>
      </button>
    </nav>
  );
}
