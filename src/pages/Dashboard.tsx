import { CartIcon, IyzicoLogo, OrbIcon } from '../icons';
import { markets, statements, todayActivities } from '../data';
import { MarketCard } from '../components/MarketCard';
import type { PageId } from '../types';

type DashboardProps = {
  userName: string;
  onNavigate: (page: PageId) => void;
};

export function Dashboard({ userName, onNavigate }: DashboardProps) {
  return (
    <div className="dash">
      {/* Welcome + credit cards row */}
      <section className="dash__top">
        <div className="welcome">
          <h1 className="welcome__title">
            Hoşgeldin,
            <br />
            {userName}!
          </h1>
          <span className="welcome__date">Sal, 26 Nisan 2026</span>
        </div>

        <div className="credit-cards">
          <div className="credit-card">
            <span className="credit-card__label">Bugün Kullanılan Kredi</span>
            <span className="credit-card__value">1.240</span>
            <span className="credit-card__hint">bugün</span>
          </div>
          <div className="credit-card credit-card--accent">
            <span className="credit-card__label">Kalan Kredi</span>
            <span className="credit-card__value">8.760</span>
            <span className="credit-card__hint">toplam 10.000</span>
          </div>
        </div>
      </section>

      {/* Activity timeline + Ekstreler */}
      <section className="dash__mid">
        <div className="glass-card activity">
          <header className="activity__head">
            <h2>Günlük İş Geçmişi</h2>
            <span className="activity__sub">Bugün yapılan işlemler</span>
          </header>
          <div className="timeline">
            <div className="timeline__line" />
            {todayActivities.map((a, i) => (
              <div className={`tl-item tl-${a.kind}`} key={i}>
                <span className="tl-dot" />
                <span className="tl-time">{a.time}</span>
                <span className="tl-label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card ekstre">
          <header className="ekstre__head">
            <div className="ekstre__brand">
              <span className="cart-badge">
                <CartIcon size={22} />
              </span>
              <span className="ekstre__title">Ekstremelerim</span>
            </div>
            <IyzicoLogo className="iyzico-tag" />
          </header>
          <ul className="ekstre__list">
            {statements.map((s, i) => (
              <li key={i} className="ekstre__row">
                <div>
                  <span className="ekstre__row-title">{s.title}</span>
                  <span className="ekstre__row-meta">{s.meta}</span>
                </div>
                <span className={`ekstre__amount ${s.positive ? 'pos' : 'neg'}`}>{s.amount}</span>
              </li>
            ))}
          </ul>
          <div className="ekstre__foot">Ekstre geçmişi & otonom ödemeler</div>
        </div>
      </section>

      {/* Borsa launcher + market cards */}
      <section className="dash__bottom">
        <button type="button" className="borsa-launch" onClick={() => onNavigate('borsa')}>
          <OrbIcon size={22} className="borsa-launch__icon" />
          <span>Borsa</span>
        </button>
        <div className="market-row">
          {markets.map((m) => (
            <MarketCard key={m.symbol} market={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
