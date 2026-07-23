import { useState } from 'react';
import { useLang } from '../i18n';
import { Toggle } from '../components/Toggle';

const ROOMS = {
  tr: ['Oturma Odası', 'Yatak Odası', 'Mutfak', 'Banyo'],
  en: ['Living Room', 'Bed Room', 'Kitchen', 'Bathroom'],
};

export function SmartHome() {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const [room, setRoom] = useState(0);
  const [temp, setTemp] = useState(23);
  const [devices, setDevices] = useState({ light: true, stereo: true, monitor: false, tv: false });
  const toggle = (k: keyof typeof devices) => setDevices((d) => ({ ...d, [k]: !d[k] }));

  const forecast = ['24°', '25°', '27°', '28°', '26°'];
  const hours = ['10:00', '11:00', '12:00', '13:00', '14:00'];
  const energy = [24, 30, 22, 34, 28.3, 26, 20];
  const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'];
  const maxE = Math.max(...energy);

  return (
    <div className="home2">
      {/* Rooms header */}
      <div className="home2__rooms">
        {ROOMS[lang].map((r, i) => (
          <button key={i} type="button" className={`room-tab ${room === i ? 'is-active' : ''}`} onClick={() => setRoom(i)}>
            {r}
          </button>
        ))}
        <button type="button" className="room-add">+</button>
      </div>

      <div className="home2__grid">
        {/* Left column */}
        <div className="home2__col">
          <div className="glass-card sh-members">
            <div className="sh-members__head">
              <span>{t('Üyeler', 'Members')}</span>
              <button type="button" className="sh-add">+</button>
            </div>
            <div className="sh-avatars">
              <i style={{ background: 'linear-gradient(135deg,#ff9ec7,#ff74b0)' }} />
              <i style={{ background: 'linear-gradient(135deg,#9ec7ff,#5b8def)' }} />
              <i style={{ background: 'linear-gradient(135deg,#c7b0ff,#b48cff)' }} />
              <i style={{ background: 'linear-gradient(135deg,#ffd6a0,#f2a63b)' }} />
              <span className="sh-more">+3</span>
            </div>
          </div>

          <div className="glass-card sh-thermo">
            <div className="sh-thermo__head">
              <div>
                <span className="sh-thermo__title">{t('Termostat', 'Thermostat')}</span>
                <span className="sh-thermo__sub">Samsung Thermostat '02</span>
              </div>
              <Toggle on onChange={() => {}} />
            </div>
            <div
              className="sh-dial"
              style={{ background: `conic-gradient(#5b8def ${(temp - 10) * 3.6}deg, rgba(120,130,160,0.16) 0)` }}
            >
              <div className="sh-dial__center">
                <span className="sh-dial__temp">{temp}°</span>
                <span className="sh-dial__label">{t('Sıcaklık', 'Temperature')}</span>
              </div>
            </div>
            <div className="sh-thermo__ctrl">
              <button type="button" onClick={() => setTemp((v) => Math.max(10, v - 1))}>−</button>
              <button type="button" onClick={() => setTemp((v) => Math.min(35, v + 1))}>+</button>
            </div>
            <div className="sh-actions">
              {[t('Fan', 'Fan'), t('Sıcak', 'Hot'), t('Soğuk', 'Cold'), t('Nem', 'Fan')].map((a, i) => (
                <button key={i} type="button" className={`sh-act ${i === 1 ? 'is-on' : ''}`}>{a}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="home2__col">
          <div className="glass-card sh-weather">
            <div className="sh-weather__top">
              <span className="sh-weather__temp">23° <small>/ 28°</small></span>
              <span className="sh-weather__wind">Kuzeybatı, 32.4 km/s</span>
            </div>
            <div className="sh-weather__row">
              {forecast.map((f, i) => (
                <div key={i}><span>☀︎</span><b>{f}</b><small>{hours[i]}</small></div>
              ))}
            </div>
          </div>
          <div className="sh-doors">
            {[t('Ön Kapı', 'Front Door'), t('Arka Kapı', 'Back Door')].map((d, i) => (
              <div key={i} className="glass-card sh-door">
                <span className="sh-door__state">{t('Kapalı', 'Closed')}</span>
                <span className="sh-door__name">{d}</span>
                <span className="sh-door__lock">🔒 › › 🔓</span>
              </div>
            ))}
          </div>
          <div className="glass-card sh-energy">
            <div className="sh-energy__head"><span>{t('Enerji (kWh)', 'Energy (kWh)')}</span><span className="sh-energy__tab">{t('Hafta', 'Week')}</span></div>
            <div className="sh-bars">
              {energy.map((e, i) => (
                <div key={i} className="sh-bar">
                  <span className={`sh-bar__fill ${i === 4 ? 'is-peak' : ''}`} style={{ height: `${(e / maxE) * 100}%` }} />
                  <small>{days[i]}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="home2__col">
          <div className="sh-devices">
            {([
              ['light', t('Işık', 'Light')],
              ['stereo', t('Stereo', 'Stereo')],
              ['monitor', t('İzleme', 'Monitoring')],
              ['tv', t('Televizyon', 'Television')],
            ] as const).map(([k, label]) => (
              <div key={k} className={`glass-card sh-dev ${devices[k] ? 'is-on' : ''}`}>
                <div className="sh-dev__top">
                  <span className="sh-dev__ico">◐</span>
                  <Toggle on={devices[k]} onChange={() => toggle(k)} />
                </div>
                <span className="sh-dev__name">{label}</span>
              </div>
            ))}
          </div>
          <div className="glass-card sh-music">
            <div className="sh-music__cover" />
            <div className="sh-music__mid">
              <span className="sh-music__title">COFFIN (feat. Eminem)</span>
              <span className="sh-music__artist">Jessie Reyez</span>
              <div className="sh-music__bar"><i /></div>
            </div>
            <div className="sh-music__ctrl"><button>⏮</button><button className="is-play">⏸</button><button>⏭</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
