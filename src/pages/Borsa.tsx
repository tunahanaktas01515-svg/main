import { useState } from 'react';
import { allCurrencies, majorCurrencies, otherCurrencies, type Currency } from '../data';
import { useLang } from '../i18n';
import { MainChart } from '../components/MainChart';
import { buildDates, buildSeries, type RangeId } from '../chart';

const TIME_RANGES: RangeId[] = ['1d', '1w', '1m', '6m', '1y'];

function fmtVal(v: number): string {
  const digits = v < 5 ? 4 : 2;
  return v.toLocaleString('tr-TR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function liquidity(seed: number): ('g' | 'a' | 'r')[] {
  let s = (seed * 9301 + 49297) % 233280;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: 6 }, () => {
    const v = rnd();
    return v > 0.6 ? 'g' : v > 0.3 ? 'a' : 'r';
  });
}

type Filter = 'all' | 'major' | 'other';

export function Borsa() {
  const { lang, L } = useLang();
  const [code, setCode] = useState<string>(majorCurrencies[0].code);
  const [rangeIdx, setRangeIdx] = useState<number>(4); // Yıl
  const [filter, setFilter] = useState<Filter>('all');

  const range = TIME_RANGES[rangeIdx];
  const selected = allCurrencies.find((c) => c.code === code) ?? majorCurrencies[0];
  const series = buildSeries(selected.seed, range, selected.value, selected.change);
  const dates = buildDates(range, series.length);
  const up = selected.change >= 0;

  const rows =
    filter === 'major' ? majorCurrencies : filter === 'other' ? otherCurrencies : allCurrencies;

  const sideItems: { key: string; label: string; filter?: Filter }[] = [
    { key: 'overview', label: L.borsaOverview, filter: 'all' },
    { key: 'stats', label: L.sideStats },
    { key: 'market', label: L.sideMarket, filter: 'all' },
  ];

  return (
    <div className="vault">
      {/* Sidebar */}
      <aside className="vside">
        <div className="vside__brand">
          <span className="vside__logo" aria-hidden="true">₺</span>
          <span>Borsa</span>
        </div>

        <div className="vside__search">
          <span aria-hidden="true">⌕</span>
          <input type="text" placeholder={L.borsaSearch} />
        </div>

        <nav className="vside__nav">
          {sideItems.map((it) => (
            <button
              key={it.key}
              type="button"
              className={`vside__item ${it.filter && filter === it.filter && it.key === 'overview' ? 'is-active' : ''}`}
              onClick={() => it.filter && setFilter(it.filter)}
            >
              <span className="vside__ico" aria-hidden="true" />
              {it.label}
            </button>
          ))}

          <span className="vside__group">{L.sidePairs}</span>
          <button
            type="button"
            className={`vside__sub ${filter === 'major' ? 'is-active' : ''}`}
            onClick={() => setFilter('major')}
          >
            <i className="dot dot--g" /> {L.sideMajor}
          </button>
          <button
            type="button"
            className={`vside__sub ${filter === 'other' ? 'is-active' : ''}`}
            onClick={() => setFilter('other')}
          >
            <i className="dot dot--b" /> {L.sideCross}
          </button>
          <button type="button" className="vside__sub" onClick={() => setFilter('other')}>
            <i className="dot dot--a" /> {L.sideMetals}
          </button>
        </nav>

        <div className="vside__foot">
          <button type="button" className="vside__item">
            <span className="vside__ico" aria-hidden="true" /> {L.sideSupport}
          </button>
          <button type="button" className="vside__item">
            <span className="vside__ico" aria-hidden="true" /> {L.sideSettings}
          </button>
        </div>

        <div className="vside__user">
          <span className="vside__avatar">A</span>
          <div>
            <span className="vside__uname">Ayşe Kenter</span>
            <span className="vside__umail">ayse@cenan.io</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="vmain">
        <header className="vmain__head">
          <h1>{L.borsaOverview}</h1>
          <div className="vmain__head-right">
            <span className="vpill">📅 23 Tem 2026</span>
            <span className="vpill vpill--select">{L.baseTry} ▾</span>
          </div>
        </header>

        {/* General statistics */}
        <section className="vchart-card">
          <header className="vchart-card__head">
            <div>
              <h2>{L.generalStats}</h2>
              <span className="vchart-card__pair">
                {selected.flag} {selected.code}/TRY · {fmtVal(selected.value)} ₺
              </span>
            </div>
            <div className="time-pills">
              {L.timePills.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  className={`time-pill ${i === rangeIdx ? 'is-active' : ''}`}
                  onClick={() => setRangeIdx(i)}
                >
                  {t}
                </button>
              ))}
            </div>
          </header>
          <MainChart series={series} dates={dates} range={range} lang={lang} positive={up} />
        </section>

        {/* Currency table */}
        <section className="vtable-card">
          <div className="vtable">
            <div className="vtable__head">
              <span>{L.thDoviz}</span>
              <span>{L.thGunluk}</span>
              <span>{L.thDeger}</span>
              <span>{L.degisim}</span>
              <span>{L.thDurum}</span>
              <span>{L.thLikidite}</span>
              <span />
            </div>
            {rows.map((c: Currency) => {
              const cu = c.change >= 0;
              const daily = (c.value * c.change) / 100;
              const liq = liquidity(c.seed);
              return (
                <button
                  key={c.code}
                  type="button"
                  className={`vrow ${c.code === code ? 'is-active' : ''}`}
                  onClick={() => setCode(c.code)}
                >
                  <span className="vrow__cur">
                    <span className="vrow__flag">{c.flag}</span>
                    <span className="vrow__id">
                      <span className="vrow__code">{c.code}/TRY</span>
                      <span className="vrow__name">{c.name[lang]}</span>
                    </span>
                  </span>
                  <span className={`vrow__daily ${cu ? 'up' : 'down'}`}>
                    {cu ? '+' : ''}{daily.toFixed(4)} ₺
                  </span>
                  <span className="vrow__val">{fmtVal(c.value)} ₺</span>
                  <span className={`vrow__chg ${cu ? 'up' : 'down'}`}>
                    {cu ? '+' : ''}{c.change.toFixed(2)}%
                  </span>
                  <span className="vrow__state">
                    <span className={`state-badge ${cu ? 'up' : 'down'}`}>
                      {cu ? L.stateUp : L.stateDown}
                    </span>
                  </span>
                  <span className="vrow__liq" aria-hidden="true">
                    {liq.map((seg, i) => (
                      <i key={i} className={`liq liq--${seg}`} />
                    ))}
                  </span>
                  <span className="vrow__more" aria-hidden="true">⋯</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
