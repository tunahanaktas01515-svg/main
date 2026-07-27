import { CartIcon, IyzicoLogo, GlobeIcon } from '../icons';
import { markets, quickStats, statements, todayActivities } from '../data';
import { MarketCard } from '../components/MarketCard';
import { Widgets } from '../components/Widgets';
import { useLang } from '../i18n';
import type { PageId } from '../types';

type DashboardProps = {
  userName: string;
  onNavigate: (page: PageId) => void;
};

export function Dashboard({ userName, onNavigate }: DashboardProps) {
  const { lang, L } = useLang();
  const kindLabels: Record<string, string> = {
    invoice: L.kindInvoice,
    export: L.kindExport,
    payment: L.kindPayment,
    report: L.kindReport,
  };

  return (
    <div className="dash">
      {/* Welcome + credit cards row */}
      <section className="dash__top">
        <div className="welcome">
          <h1 className="welcome__title">
            {L.welcome}
            <br />
            {userName}!
          </h1>
          <span className="welcome__date">{L.date}</span>
        </div>

        <div className="credit-cards">
          <div className="credit-card">
            <span className="credit-card__label">{L.creditUsed}</span>
            <span className="credit-card__value">1.240</span>
            <span className="credit-card__hint">{L.creditUsedHint}</span>
          </div>
          <div className="credit-card credit-card--accent">
            <span className="credit-card__label">{L.creditRemaining}</span>
            <span className="credit-card__value">8.760</span>
            <span className="credit-card__hint">{L.creditRemainingHint}</span>
          </div>
        </div>
      </section>

      {/* Glass widgets */}
      <Widgets />

      {/* Quick stats — makes the home screen fuller */}
      <section className="dash__quick">
        {quickStats.map((s, i) => (
          <div className={`qstat qstat--${s.accent}`} key={i}>
            <span className="qstat__delta">{s.delta}</span>
            <span className="qstat__value">{s.value}</span>
            <span className="qstat__label">{s.label[lang]}</span>
          </div>
        ))}
      </section>

      {/* Activity timeline + Ekstreler */}
      <section className="dash__mid">
        <div className="glass-card activity">
          <header className="activity__head">
            <div>
              <h2>{L.timelineTitle}</h2>
              <span className="activity__sub">{L.timelineSub}</span>
            </div>
            <span className="activity__count">
              {todayActivities.length} {L.timelineCount}
            </span>
          </header>
          <div className="timeline">
            {todayActivities.map((a, i) => (
              <div className={`tl-item tl-${a.kind}`} key={i}>
                <span className="tl-rail">
                  <span className="tl-dot" />
                </span>
                <span className="tl-time">{a.time}</span>
                <span className="tl-label">{a.label[lang]}</span>
                <span className="tl-tag">{kindLabels[a.kind]}</span>
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
              <span className="ekstre__title">{L.ekstreTitle}</span>
            </div>
            <IyzicoLogo className="iyzico-tag" />
          </header>
          <ul className="ekstre__list">
            {statements.map((s, i) => (
              <li key={i} className="ekstre__row">
                <div>
                  <span className="ekstre__row-title">{s.title[lang]}</span>
                  <span className="ekstre__row-meta">{s.meta[lang]}</span>
                </div>
                <span className={`ekstre__amount ${s.positive ? 'pos' : 'neg'}`}>{s.amount}</span>
              </li>
            ))}
          </ul>
          <div className="ekstre__foot">{L.ekstreFoot}</div>
        </div>
      </section>

      {/* Borsa launcher + market cards */}
      <section className="dash__bottom">
        <button type="button" className="borsa-launch" onClick={() => onNavigate('borsa')}>
          <GlobeIcon size={22} className="borsa-launch__icon" />
          <span>{L.borsaBtn}</span>
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
