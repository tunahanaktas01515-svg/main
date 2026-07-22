import { todayActivities } from '../data';

export function Islemler() {
  return (
    <div className="page">
      <header className="page__head">
        <h1>İşlemler</h1>
        <p>Muhasebe ve ihracat işlemlerinizi buradan yönetin.</p>
      </header>
      <div className="glass-card">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Saat</th>
              <th>İşlem</th>
              <th>Tür</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {todayActivities.map((a, i) => (
              <tr key={i}>
                <td>{a.time}</td>
                <td>{a.label}</td>
                <td className="cap">{a.kind}</td>
                <td>
                  <span className="badge-ok">Tamamlandı</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
