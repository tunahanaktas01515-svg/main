import { useEffect, useState } from 'react';
import { useLang } from '../i18n';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function Widgets() {
  const { lang, L } = useLang();
  const now = useClock();
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  const day = now.toLocaleDateString(locale, { weekday: 'long' });
  const date = now.toLocaleDateString(locale, { day: 'numeric', month: 'short' });

  return (
    <section className="widgets">
      {/* Weather + clock */}
      <div className="wcard wcard--weather">
        <div className="wcard__row">
          <span className="wcard__ico" aria-hidden="true">☀︎</span>
          <div>
            <span className="wcard__temp">23°</span>
            <span className="wcard__cond">{L.wSky}</span>
          </div>
        </div>
        <div className="wcard__clock">
          <span className="wcard__time">{time}</span>
          <span className="wcard__date">{day} · {date}</span>
        </div>
      </div>

      {/* Battery / charge */}
      <div className="wcard wcard--battery">
        <span className="wcard__label">{L.wCharge}</span>
        <div className="wcard__ring" style={{ background: 'conic-gradient(var(--blue) 0% 75%, rgba(120,130,160,0.18) 75% 100%)' }}>
          <span>75%</span>
        </div>
        <div className="wcard__devs">
          <span>💻 82%</span>
          <span>📱 64%</span>
        </div>
      </div>

      {/* Now playing */}
      <div className="wcard wcard--music">
        <div className="wcard__cover" aria-hidden="true" />
        <div className="wcard__music-mid">
          <span className="wcard__track">Peaceful Mind</span>
          <span className="wcard__artist">Lo-fi Beats</span>
          <div className="wcard__controls">
            <button type="button" aria-label="prev">⏮</button>
            <button type="button" className="is-play" aria-label="play">⏸</button>
            <button type="button" aria-label="next">⏭</button>
          </div>
        </div>
      </div>

      {/* Calendar / today */}
      <div className="wcard wcard--cal">
        <span className="wcard__label">{L.wToday}</span>
        <span className="wcard__bigday">{now.toLocaleDateString(locale, { day: '2-digit' })}</span>
        <span className="wcard__weekday">{day}</span>
        <div className="wcard__events">
          <span><i className="dotp" /> {L.wEvent1}</span>
          <span><i className="dotb" /> {L.wEvent2}</span>
        </div>
      </div>
    </section>
  );
}
