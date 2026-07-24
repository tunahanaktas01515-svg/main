import { useState } from 'react';
import { useLang } from '../i18n';
import { Toggle } from '../components/Toggle';
import { PlusIcon } from '../icons';
import type { HomeStyle } from '../components/StyleModal';
import type { DesignBlockId } from '../components/DesignBlocksPanel';

const ROOMS = {
  tr: ['Oturma Odası', 'Yatak Odası', 'Mutfak', 'Banyo'],
  en: ['Living Room', 'Bed Room', 'Kitchen', 'Bathroom'],
};

const LIGHT_COLORS = [
  '#ffffff', '#ffe6a8', '#ffb347', '#ff6b6b', '#ff74b0',
  '#c7b0ff', '#5b8def', '#4fd1c5', '#7bed9f', '#2d3436',
];

type SmartHomeProps = {
  editMode?: boolean;
  homeStyle?: HomeStyle;
  extraBlocks?: DesignBlockId[];
  onRemoveBlock?: (id: DesignBlockId) => void;
  onExitEdit?: () => void;
};

export function SmartHome({
  editMode = false,
  homeStyle = 'seffaf',
  extraBlocks = [],
  onRemoveBlock,
  onExitEdit,
}: SmartHomeProps) {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const [room, setRoom] = useState(0);
  const [temp, setTemp] = useState(23);
  const [devices, setDevices] = useState({ light: true, stereo: true, monitor: false, tv: false });
  const toggle = (k: keyof typeof devices) => setDevices((d) => ({ ...d, [k]: !d[k] }));

  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const hide = (id: string) => setHidden((s) => new Set(s).add(id));
  const shown = (id: string) => !hidden.has(id);
  const RemoveBtn = ({ id }: { id: string }) =>
    editMode ? (
      <button type="button" className="sh-remove" aria-label={t('Gizle', 'Hide')} onClick={() => hide(id)}>×</button>
    ) : null;

  // Light block state
  const [mainOn, setMainOn] = useState(true);
  const [spotOn, setSpotOn] = useState(false);
  const [stripOn, setStripOn] = useState(true);
  const [brightness, setBrightness] = useState(72);
  const [lightColor, setLightColor] = useState('#ffe6a8');
  const [scene, setScene] = useState(0);
  const scenes = [
    { tr: 'Okuma', en: 'Reading', color: '#ffe6a8' },
    { tr: 'Gece', en: 'Night', color: '#5b8def' },
    { tr: 'Parti', en: 'Party', color: '#ff74b0' },
  ];

  const forecast = ['24°', '25°', '27°', '28°', '26°'];
  const hours = ['10:00', '11:00', '12:00', '13:00', '14:00'];
  const energy = [24, 30, 22, 34, 28.3, 26, 20];
  const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'];
  const maxE = Math.max(...energy);

  const has = (id: DesignBlockId) => extraBlocks.includes(id);

  return (
    <div className={`home2 home2--${homeStyle} ${editMode ? 'is-editing' : ''}`}>
      {editMode && (
        <div className="sh-edit-bar">
          <span className="sh-edit-bar__title">{t('Düzenleme Modu — + ile blok ekle, × ile gizle', 'Edit mode — add via +, hide with ×')}</span>
          <div className="sh-edit-bar__actions">
            <button type="button" onClick={() => setHidden(new Set())}>{t('Sıfırla', 'Reset')}</button>
            <button type="button" className="is-primary" onClick={onExitEdit}>{t('Bitti', 'Done')}</button>
          </div>
        </div>
      )}

      <div className="home2__rooms">
        {ROOMS[lang].map((r, i) => (
          <button key={i} type="button" className={`room-tab ${room === i ? 'is-active' : ''}`} onClick={() => setRoom(i)}>
            {r}
          </button>
        ))}
        <div className="room-add-wrap">
          <button type="button" className="room-add" aria-label={t('Oda Ekle', 'Add Room')}>
            <PlusIcon size={18} />
          </button>
          <span className="room-add-label">{t('Oda Ekle', 'Add Room')}</span>
        </div>
      </div>

      {/* Işık design blocks row */}
      {extraBlocks.length > 0 && (
        <section className="sh-lights">
          <h3 className="sh-lights__title">{t('Işık', 'Light')}</h3>
          <div className="sh-lights__grid">
            {has('light-main') && (
              <div className={`glass-card sh-light-block ${mainOn ? 'is-on' : ''}`} style={{ ['--glow' as string]: lightColor }}>
                {editMode && (
                  <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.('light-main')}>×</button>
                )}
                <div className="sh-light-block__top">
                  <span className="sh-light-block__bulb" style={{ color: mainOn ? lightColor : undefined }}>☀︎</span>
                  <Toggle on={mainOn} onChange={() => setMainOn((v) => !v)} />
                </div>
                <span className="sh-light-block__name">{t('Ana Işık', 'Main Light')}</span>
                <span className="sh-light-block__sub">{mainOn ? t('Açık', 'On') : t('Kapalı', 'Off')}</span>
              </div>
            )}

            {has('light-palette') && (
              <div className="glass-card sh-light-block sh-light-block--wide">
                {editMode && (
                  <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.('light-palette')}>×</button>
                )}
                <span className="sh-light-block__name">{t('Renk Paleti', 'Color Palette')}</span>
                <span className="sh-light-block__sub">{t('Işık rengini değiştir', 'Change light color')}</span>
                <div className="sh-palette">
                  {LIGHT_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`sh-palette__swatch ${lightColor === c ? 'is-active' : ''}`}
                      style={{ background: c }}
                      aria-label={c}
                      onClick={() => setLightColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {has('light-dimmer') && (
              <div className="glass-card sh-light-block">
                {editMode && (
                  <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.('light-dimmer')}>×</button>
                )}
                <span className="sh-light-block__name">{t('Parlaklık', 'Brightness')}</span>
                <div className="sh-dimmer">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    style={{ accentColor: lightColor }}
                  />
                  <b>{brightness}%</b>
                </div>
              </div>
            )}

            {has('light-strip') && (
              <div className={`glass-card sh-light-block ${stripOn ? 'is-on' : ''}`}>
                {editMode && (
                  <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.('light-strip')}>×</button>
                )}
                <div className="sh-light-block__top">
                  <span className="sh-strip-preview" style={{ opacity: stripOn ? 1 : 0.25 }} />
                  <Toggle on={stripOn} onChange={() => setStripOn((v) => !v)} />
                </div>
                <span className="sh-light-block__name">{t('LED Şerit', 'LED Strip')}</span>
              </div>
            )}

            {has('light-scenes') && (
              <div className="glass-card sh-light-block sh-light-block--wide">
                {editMode && (
                  <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.('light-scenes')}>×</button>
                )}
                <span className="sh-light-block__name">{t('Sahne Modları', 'Scenes')}</span>
                <div className="sh-scenes">
                  {scenes.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`sh-scene ${scene === i ? 'is-on' : ''}`}
                      onClick={() => { setScene(i); setLightColor(s.color); setMainOn(true); }}
                    >
                      <i style={{ background: s.color }} />
                      {lang === 'tr' ? s.tr : s.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {has('light-spot') && (
              <div className={`glass-card sh-light-block ${spotOn ? 'is-on' : ''}`}>
                {editMode && (
                  <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.('light-spot')}>×</button>
                )}
                <div className="sh-light-block__top">
                  <span className="sh-light-block__bulb">◎</span>
                  <Toggle on={spotOn} onChange={() => setSpotOn((v) => !v)} />
                </div>
                <span className="sh-light-block__name">{t('Spot Işık', 'Spot Light')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="home2__grid">
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
            {[
              { id: 'front', label: t('Ön Kapı', 'Front Door') },
              { id: 'back', label: t('Arka Kapı', 'Back Door') },
            ].filter((d) => shown(d.id)).map((d) => (
              <div key={d.id} className="glass-card sh-door">
                <RemoveBtn id={d.id} />
                <span className="sh-door__state">{t('Kapalı', 'Closed')}</span>
                <span className="sh-door__name">{d.label}</span>
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

        <div className="home2__col">
          <div className="sh-devices">
            {([
              ['light', t('Işık', 'Light')],
              ['stereo', t('Stereo', 'Stereo')],
              ['monitor', t('İzleme', 'Monitoring')],
              ['tv', t('Televizyon', 'Television')],
            ] as const).filter(([k]) => shown(k)).map(([k, label]) => (
              <div key={k} className={`glass-card sh-dev ${devices[k] ? 'is-on' : ''}`}>
                <RemoveBtn id={k} />
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
