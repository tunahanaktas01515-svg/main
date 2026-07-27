import type { Market } from '../data';
import { useLang } from '../i18n';
import { Sparkline } from './Sparkline';

export function MarketCard({ market }: { market: Market }) {
  const { lang, L } = useLang();
  const positive = market.change >= 0;
  return (
    <article className="market-card">
      <header className="market-card__head">
        <div>
          <span className="market-card__symbol">{market.symbol}</span>
          <span className="market-card__name">{market.name[lang]}</span>
        </div>
        <span className={`chip-change ${positive ? 'up' : 'down'}`}>
          {positive ? '▲' : '▼'} {Math.abs(market.change).toFixed(2)}%
        </span>
      </header>
      <div className="market-card__price">{market.price} ₺</div>
      <div className="market-card__foot">
        <Sparkline data={market.series} positive={positive} />
        <button type="button" className="btn-mini">{L.detay}</button>
      </div>
    </article>
  );
}
