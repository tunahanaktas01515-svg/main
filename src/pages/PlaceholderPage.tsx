import { useLang } from '../i18n';

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  const { L } = useLang();
  const cards = [L.phCard1, L.phCard2, L.phCard3];
  return (
    <div className="page">
      <header className="page__head">
        <h1>{title}</h1>
        <p>{L.phDesc}</p>
      </header>
      <div className="ph-grid">
        {cards.map((c, i) => (
          <div className="glass-card ph-card" key={i}>
            <span className="ph-card__badge">{L.phSoon}</span>
            <h3>{c}</h3>
            <p>{L.phLine}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
