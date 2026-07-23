import { todayActivities } from '../data';
import { useLang } from '../i18n';

export function Islemler() {
  const { lang, L } = useLang();
  const kindLabels: Record<string, string> = {
    invoice: L.kindInvoice,
    export: L.kindExport,
    payment: L.kindPayment,
    report: L.kindReport,
  };
  return (
    <div className="page">
      <header className="page__head">
        <h1>{L.islemlerTitle}</h1>
        <p>{L.islemlerDesc}</p>
      </header>
      <div className="glass-card">
        <table className="tx-table">
          <thead>
            <tr>
              <th>{L.thTime}</th>
              <th>{L.thTx}</th>
              <th>{L.thType}</th>
              <th>{L.thStatus}</th>
            </tr>
          </thead>
          <tbody>
            {todayActivities.map((a, i) => (
              <tr key={i}>
                <td>{a.time}</td>
                <td>{a.label[lang]}</td>
                <td>{kindLabels[a.kind]}</td>
                <td>
                  <span className="badge-ok">{L.statusDone}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
