import { useEffect, useRef } from 'react';
import { allCurrencies } from '../data';
import { useLang } from '../i18n';

export function Ticker() {
  const { L } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      // auto-scroll; wrap seamlessly (content is duplicated)
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft -= el.scrollWidth / 2;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...allCurrencies, ...allCurrencies];

  return (
    <div className="ticker">
      <span className="ticker__status">
        <span className="ticker__dot" />
        {L.baglantiStabil} <span className="ticker__ms">(23ms)</span>
      </span>
      <div className="ticker__track" ref={trackRef}>
        {items.map((c, i) => (
          <span className="ticker__item" key={i}>
            <span className="ticker__code">{c.code}/TRY</span>
            <span className="ticker__val">{c.value.toLocaleString('tr-TR', { minimumFractionDigits: c.value < 5 ? 4 : 2, maximumFractionDigits: 4 })}</span>
            <span className={c.change >= 0 ? 'up' : 'down'}>
              {c.change >= 0 ? '+' : ''}{c.change.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
      <span className="ticker__copy">© 2026 Cenan AI</span>
    </div>
  );
}
