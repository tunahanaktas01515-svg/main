import { agents } from '../data';
import { useLang } from '../i18n';

export function Ajanlar() {
  const { lang, L } = useLang();
  return (
    <div className="page">
      <header className="page__head">
        <h1>{L.ajanlarTitle}</h1>
        <p>{L.ajanlarDesc}</p>
      </header>
      <div className="agent-grid">
        {agents.map((a, i) => (
          <article className="agent-card glass-card" key={i}>
            <div className="agent-card__top">
              <span className={`agent-status ${a.status === 'active' ? 'on' : 'off'}`}>
                {a.status === 'active' ? L.statusActive : L.statusPending}
              </span>
            </div>
            <h3>{a.name[lang]}</h3>
            <p>{a.role[lang]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
