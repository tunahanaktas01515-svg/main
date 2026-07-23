import { markets } from '../data';
import { MarketCard } from '../components/MarketCard';
import { useLang } from '../i18n';

export function Borsa() {
  const { L } = useLang();
  return (
    <div className="page">
      <header className="page__head">
        <h1>{L.borsaTitle}</h1>
        <p>{L.borsaDesc}</p>
      </header>
      <div className="market-grid">
        {markets.map((m) => (
          <MarketCard key={m.symbol} market={m} />
        ))}
        {markets.map((m) => (
          <MarketCard key={`${m.symbol}-2`} market={{ ...m, change: -m.change }} />
        ))}
      </div>
    </div>
  );
}
