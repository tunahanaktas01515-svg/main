import { markets } from '../data';
import { MarketCard } from '../components/MarketCard';

export function Borsa() {
  return (
    <div className="page">
      <header className="page__head">
        <h1>Borsa</h1>
        <p>Döviz ve emtia kurlarını canlı takip edin.</p>
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
