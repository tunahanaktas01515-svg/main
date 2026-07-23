import { useState } from 'react';
import { allCurrencies, majorCurrencies, otherCurrencies, type Currency } from '../data';
import { useLang } from '../i18n';
import { MainChart } from '../components/MainChart';
import { Ticker } from '../components/Ticker';
import { RANGE_IDS, buildDates, buildSeries, type RangeId } from '../chart';

function fmtVal(v: number): string {
  const digits = v < 5 ? 4 : 2;
  return v.toLocaleString('tr-TR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function CurrencyChip({
  c,
  active,
  onClick,
  lang,
}: {
  c: Currency;
  active?: boolean;
  onClick?: () => void;
  lang: 'tr' | 'en';
}) {
  const up = c.change >= 0;
  return (
    <button type="button" className={`cur-chip ${active ? 'is-active' : ''}`} onClick={onClick}>
      <div className="cur-chip__top">
        <span className="cur-chip__flag">{c.flag}</span>
        <div className="cur-chip__id">
          <span className="cur-chip__code">{c.code}</span>
          <span className="cur-chip__name">{c.name[lang]}</span>
        </div>
      </div>
      <div className="cur-chip__val">{fmtVal(c.value)}</div>
      <div className={`cur-chip__chg ${up ? 'up' : 'down'}`}>
        {up ? '+' : ''}{c.change.toFixed(2)}%
      </div>
    </button>
  );
}

export function Borsa() {
  const { lang, L } = useLang();
  const [code, setCode] = useState<string>(majorCurrencies[0].code);
  const [range, setRange] = useState<RangeId>('1y');

  const selected = allCurrencies.find((c) => c.code === code) ?? majorCurrencies[0];
  const series = buildSeries(selected.seed, range, selected.value, selected.change);
  const dates = buildDates(range, series.length);
  const daySeries = buildSeries(selected.seed, '1d', selected.value, selected.change);
  const high = Math.max(...daySeries);
  const low = Math.min(...daySeries);
  const up = selected.change >= 0;

  const avgChange =
    allCurrencies.reduce((s, c) => s + c.change, 0) / allCurrencies.length;

  return (
    <div className="borsa">
      <header className="page__head">
        <h1>{L.borsaTitle}</h1>
        <p>{L.borsaDesc}</p>
      </header>

      {/* Index card + currency strip */}
      <section className="borsa__strip">
        <div className="index-card">
          <span className="index-card__label">{L.dovizEndeksi}</span>
          <span className="index-card__value">{allCurrencies.length + 42} {L.paraBirimi}</span>
          <div className="index-card__bar">
            {majorCurrencies.map((c, i) => (
              <span key={i} className={c.change >= 0 ? 'up' : 'down'} />
            ))}
          </div>
          <span className={`index-card__avg ${avgChange >= 0 ? 'up' : 'down'}`}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}% {L.ortalamaBugun}
          </span>
        </div>

        <div className="cur-strip">
          {majorCurrencies.map((c) => (
            <CurrencyChip
              key={c.code}
              c={c}
              lang={lang}
              active={c.code === code}
              onClick={() => setCode(c.code)}
            />
          ))}
        </div>
      </section>

      {/* Main chart */}
      <section className="chart-panel">
        <header className="chart-panel__head">
          <div className="chart-panel__id">
            <span className="chart-panel__flag">{selected.flag}</span>
            <div>
              <span className="chart-panel__pair">{selected.code}/TRY</span>
              <span className="chart-panel__name">{selected.name[lang]}</span>
            </div>
          </div>
          <div className="chart-panel__price">
            <span className="chart-panel__value">{fmtVal(selected.value)} ₺</span>
            <span className={`chart-panel__chg ${up ? 'up' : 'down'}`}>
              {up ? '▲' : '▼'} {Math.abs(selected.change).toFixed(2)}%
            </span>
          </div>
        </header>

        <div className="range-tabs">
          {RANGE_IDS.map((r, i) => (
            <button
              key={r}
              type="button"
              className={`range-tab ${r === range ? 'is-active' : ''}`}
              onClick={() => setRange(r)}
            >
              {L.ranges[i]}
            </button>
          ))}
        </div>

        <MainChart series={series} dates={dates} range={range} lang={lang} positive={up} />

        <div className="chart-stats">
          <div>
            <span className="chart-stats__label">{L.yuksek24}</span>
            <span className="chart-stats__val">{fmtVal(high)}</span>
          </div>
          <div>
            <span className="chart-stats__label">{L.dusuk24}</span>
            <span className="chart-stats__val">{fmtVal(low)}</span>
          </div>
          <div>
            <span className="chart-stats__label">{L.degisim}</span>
            <span className={`chart-stats__val ${up ? 'up' : 'down'}`}>
              {up ? '+' : ''}{selected.change.toFixed(2)}%
            </span>
          </div>
        </div>
      </section>

      {/* Other currencies */}
      <section className="borsa__others">
        <h2>{L.digerDovizler}</h2>
        <div className="others-grid">
          {otherCurrencies.map((c) => (
            <CurrencyChip key={c.code} c={c} lang={lang} onClick={() => setCode(c.code)} active={c.code === code} />
          ))}
        </div>
      </section>

      <Ticker />
    </div>
  );
}
