import { agents } from '../data';

export function Ajanlar() {
  return (
    <div className="page">
      <header className="page__head">
        <h1>Ajanlar</h1>
        <p>Otonom iş ajanlarınızı yönetin ve izleyin.</p>
      </header>
      <div className="agent-grid">
        {agents.map((a, i) => (
          <article className="agent-card glass-card" key={i}>
            <div className="agent-card__top">
              <span className={`agent-status ${a.status === 'Aktif' ? 'on' : 'off'}`}>{a.status}</span>
            </div>
            <h3>{a.name}</h3>
            <p>{a.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
