import { useState } from 'react';
import { useLang } from '../i18n';
import { Toggle } from '../components/Toggle';
import { PlusIcon } from '../icons';
import type { HomeStyle } from '../components/StyleModal';
import {
  SECTION_COLORS,
  type DesignBlockId,
  type SectionColorId,
} from '../components/DesignBlocksPanel';

const ROOMS = {
  tr: ['Ev', 'Yatak Odası', 'Mutfak', 'Banyo'],
  en: ['Home', 'Bedroom', 'Kitchen', 'Bathroom'],
};

const LIGHT_COLORS = [
  '#ffffff', '#ffe6a8', '#ffb347', '#ff6b6b', '#c7b0ff',
  '#5b8def', '#4fd1c5', '#7bed9f', '#a8b0bd', '#2d3436',
];

type SmartHomeProps = {
  editMode?: boolean;
  homeStyle?: HomeStyle;
  sectionColor?: SectionColorId;
  extraBlocks?: DesignBlockId[];
  onRemoveBlock?: (id: DesignBlockId) => void;
  onExitEdit?: () => void;
};

export function SmartHome({
  editMode = false,
  homeStyle = 'seffaf',
  sectionColor = 'white',
  extraBlocks = [],
  onRemoveBlock,
  onExitEdit,
}: SmartHomeProps) {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const [room, setRoom] = useState(0);
  const [temp, setTemp] = useState(23);
  const [acOn, setAcOn] = useState(true);
  const [fanOn, setFanOn] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [carLocked, setCarLocked] = useState(true);
  const [doors, setDoors] = useState({ front: true, back: true, garage: true });

  const [mainOn, setMainOn] = useState(true);
  const [spotOn, setSpotOn] = useState(false);
  const [stripOn, setStripOn] = useState(true);
  const [brightness, setBrightness] = useState(72);
  const [lightColor, setLightColor] = useState('#ffe6a8');
  const [scene, setScene] = useState(0);
  const scenes = [
    { tr: 'Okuma', en: 'Reading', color: '#ffe6a8' },
    { tr: 'Gece', en: 'Night', color: '#5b8def' },
    { tr: 'Parti', en: 'Party', color: '#7eb6ff' },
  ];

  const accent = SECTION_COLORS.find((c) => c.id === sectionColor)?.value ?? '#ffffff';
  const has = (id: DesignBlockId) => extraBlocks.includes(id);
  const isHomeRoom = room === 0;

  const BlockX = ({ id }: { id: DesignBlockId }) =>
    editMode ? (
      <button type="button" className="sh-remove" onClick={() => onRemoveBlock?.(id)}>×</button>
    ) : null;

  return (
    <div
      className={`home2 home2--${homeStyle} ${editMode ? 'is-editing' : ''}`}
      style={{ ['--section-accent' as string]: accent }}
    >
      {editMode && (
        <div className="sh-edit-bar">
          <span className="sh-edit-bar__title">{t('Düzenleme Modu — + ile blok ekle', 'Edit mode — add blocks via +')}</span>
          <div className="sh-edit-bar__actions">
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

      {!isHomeRoom ? (
        <div className="glass-card sh-empty-room">
          <h3>{ROOMS[lang][room]}</h3>
          <p>
            {t(
              'Bu oda boş. Home Assistant bağlantısı kurulunca cihazlar otomatik aktarılacak.',
              'This room is empty. Devices will sync automatically when Home Assistant is connected.',
            )}
          </p>
          <span className="sh-empty-room__badge">Home Assistant</span>
        </div>
      ) : (
        <>
          {extraBlocks.length > 0 && (
            <div className="sh-blocks-stack">
              {(has('light-main') || has('light-palette') || has('light-dimmer') || has('light-strip') || has('light-scenes') || has('light-spot')) && (
                <section className="sh-lights">
                  <h3 className="sh-lights__title">{t('Işık', 'Light')}</h3>
                  <div className="sh-lights__grid">
                    {has('light-main') && (
                      <div className={`glass-card sh-light-block ${mainOn ? 'is-on' : ''}`} style={{ ['--glow' as string]: lightColor }}>
                        <BlockX id="light-main" />
                        <div className="sh-light-block__top">
                          <span className="sh-light-block__bulb" style={{ color: mainOn ? lightColor : undefined }}>☀︎</span>
                          <Toggle on={mainOn} onChange={() => setMainOn((v) => !v)} />
                        </div>
                        <span className="sh-light-block__name">{t('Ana Işık', 'Main Light')}</span>
                      </div>
                    )}
                    {has('light-palette') && (
                      <div className="glass-card sh-light-block sh-light-block--wide">
                        <BlockX id="light-palette" />
                        <span className="sh-light-block__name">{t('Renk Paleti', 'Color Palette')}</span>
                        <div className="sh-palette">
                          {LIGHT_COLORS.map((c) => (
                            <button
                              key={c}
                              type="button"
                              className={`sh-palette__swatch ${lightColor === c ? 'is-active' : ''}`}
                              style={{ background: c }}
                              onClick={() => setLightColor(c)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {has('light-dimmer') && (
                      <div className="glass-card sh-light-block">
                        <BlockX id="light-dimmer" />
                        <span className="sh-light-block__name">{t('Parlaklık', 'Brightness')}</span>
                        <div className="sh-dimmer">
                          <input type="range" min={0} max={100} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
                          <b>{brightness}%</b>
                        </div>
                      </div>
                    )}
                    {has('light-strip') && (
                      <div className={`glass-card sh-light-block ${stripOn ? 'is-on' : ''}`}>
                        <BlockX id="light-strip" />
                        <div className="sh-light-block__top">
                          <span className="sh-strip-preview" style={{ opacity: stripOn ? 1 : 0.25 }} />
                          <Toggle on={stripOn} onChange={() => setStripOn((v) => !v)} />
                        </div>
                        <span className="sh-light-block__name">{t('LED Şerit', 'LED Strip')}</span>
                      </div>
                    )}
                    {has('light-scenes') && (
                      <div className="glass-card sh-light-block sh-light-block--wide">
                        <BlockX id="light-scenes" />
                        <span className="sh-light-block__name">{t('Sahne Modları', 'Scenes')}</span>
                        <div className="sh-scenes">
                          {scenes.map((s, i) => (
                            <button key={i} type="button" className={`sh-scene ${scene === i ? 'is-on' : ''}`} onClick={() => { setScene(i); setLightColor(s.color); setMainOn(true); }}>
                              <i style={{ background: s.color }} />
                              {lang === 'tr' ? s.tr : s.en}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {has('light-spot') && (
                      <div className={`glass-card sh-light-block ${spotOn ? 'is-on' : ''}`}>
                        <BlockX id="light-spot" />
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

              {(has('climate-ac') || has('climate-fan') || has('thermo-main')) && (
                <section className="sh-lights">
                  <h3 className="sh-lights__title">{t('İklim', 'Climate')}</h3>
                  <div className="sh-lights__grid">
                    {has('climate-ac') && (
                      <div className={`glass-card sh-light-block ${acOn ? 'is-on' : ''}`}>
                        <BlockX id="climate-ac" />
                        <div className="sh-light-block__top">
                          <span className="sh-ctrl-ico">❄</span>
                          <Toggle on={acOn} onChange={() => setAcOn((v) => !v)} />
                        </div>
                        <span className="sh-light-block__name">{t('Klima', 'A/C')}</span>
                        <span className="sh-light-block__sub">{acOn ? `${temp}° · ${t('Soğutma', 'Cooling')}` : t('Kapalı', 'Off')}</span>
                      </div>
                    )}
                    {has('climate-fan') && (
                      <div className={`glass-card sh-light-block ${fanOn ? 'is-on' : ''}`}>
                        <BlockX id="climate-fan" />
                        <div className="sh-light-block__top">
                          <span className="sh-ctrl-ico">🎐</span>
                          <Toggle on={fanOn} onChange={() => setFanOn((v) => !v)} />
                        </div>
                        <span className="sh-light-block__name">{t('Fan', 'Fan')}</span>
                      </div>
                    )}
                    {has('thermo-main') && (
                      <div className="glass-card sh-light-block sh-light-block--wide sh-mini-thermo">
                        <BlockX id="thermo-main" />
                        <span className="sh-light-block__name">{t('Termostat', 'Thermostat')}</span>
                        <div className="sh-mini-thermo__row">
                          <button type="button" onClick={() => setTemp((v) => Math.max(10, v - 1))}>−</button>
                          <b>{temp}°</b>
                          <button type="button" onClick={() => setTemp((v) => Math.min(35, v + 1))}>+</button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {(has('tv-main') || has('tv-apps')) && (
                <section className="sh-lights">
                  <h3 className="sh-lights__title">TV</h3>
                  <div className="sh-lights__grid">
                    {has('tv-main') && (
                      <div className={`glass-card sh-light-block ${tvOn ? 'is-on' : ''}`}>
                        <BlockX id="tv-main" />
                        <div className="sh-light-block__top">
                          <span className="sh-ctrl-ico">▣</span>
                          <Toggle on={tvOn} onChange={() => setTvOn((v) => !v)} />
                        </div>
                        <span className="sh-light-block__name">{t('Televizyon', 'Television')}</span>
                        <span className="sh-light-block__sub">{tvOn ? 'HDMI 1' : t('Kapalı', 'Off')}</span>
                      </div>
                    )}
                    {has('tv-apps') && (
                      <div className="glass-card sh-light-block sh-light-block--wide">
                        <BlockX id="tv-apps" />
                        <span className="sh-light-block__name">{t('Uygulamalar', 'Apps')}</span>
                        <div className="sh-tv-apps">
                          {['Netflix', 'YouTube', 'Spotify', 'Prime'].map((a) => (
                            <button key={a} type="button" className="sh-tv-app">{a}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {(has('car-status') || has('car-lock')) && (
                <section className="sh-lights">
                  <h3 className="sh-lights__title">{t('Araç', 'Car')}</h3>
                  <div className="sh-lights__grid">
                    {has('car-status') && (
                      <div className="glass-card sh-car">
                        <BlockX id="car-status" />
                        <div className="sh-car__head">
                          <span className="sh-car__badge">EV</span>
                          <span>{t('Bağlı', 'Connected')}</span>
                        </div>
                        <strong className="sh-car__name">Cenan GT</strong>
                        <div className="sh-car__stats">
                          <div><small>{t('Şarj', 'Charge')}</small><b>78%</b></div>
                          <div><small>{t('Menzil', 'Range')}</small><b>312 km</b></div>
                          <div><small>{t('Kapı', 'Doors')}</small><b>{t('Kilitli', 'Locked')}</b></div>
                        </div>
                        <div className="sh-car__bar"><i style={{ width: '78%' }} /></div>
                      </div>
                    )}
                    {has('car-lock') && (
                      <div className={`glass-card sh-light-block ${carLocked ? 'is-on' : ''}`}>
                        <BlockX id="car-lock" />
                        <div className="sh-light-block__top">
                          <span className="sh-ctrl-ico">{carLocked ? '🔒' : '🔓'}</span>
                          <Toggle on={carLocked} onChange={() => setCarLocked((v) => !v)} />
                        </div>
                        <span className="sh-light-block__name">{t('Araç Kilidi', 'Car Lock')}</span>
                        <span className="sh-light-block__sub">{carLocked ? t('Kilitli', 'Locked') : t('Açık', 'Unlocked')}</span>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {(has('door-front') || has('door-back') || has('door-garage')) && (
                <section className="sh-lights">
                  <h3 className="sh-lights__title">{t('Kapı & Kilit', 'Doors & Locks')}</h3>
                  <div className="sh-doors-nice">
                    {([
                      ['door-front', 'front', t('Ön Kapı', 'Front Door')],
                      ['door-back', 'back', t('Arka Kapı', 'Back Door')],
                      ['door-garage', 'garage', t('Garaj', 'Garage')],
                    ] as const).filter(([id]) => has(id)).map(([id, key, label]) => {
                      const locked = doors[key];
                      return (
                        <div key={id} className={`glass-card sh-door-nice ${locked ? 'is-locked' : 'is-open'}`}>
                          <BlockX id={id} />
                          <div className="sh-door-nice__status">{locked ? t('Kapalı', 'Closed') : t('Açık', 'Open')}</div>
                          <div className="sh-door-nice__name">{label}</div>
                          <button
                            type="button"
                            className="sh-door-nice__slide"
                            onClick={() => setDoors((d) => ({ ...d, [key]: !d[key] }))}
                          >
                            <span className="sh-door-nice__lock">{locked ? '🔒' : '🔓'}</span>
                            <span className="sh-door-nice__track"><i /></span>
                            <span className="sh-door-nice__hint">{locked ? t('Kilidi aç', 'Unlock') : t('Kilitle', 'Lock')}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}

          <div className="home2__grid">
            <div className="home2__col">
              <div className="glass-card sh-members">
                <div className="sh-members__head">
                  <span>{t('Üyeler', 'Members')}</span>
                  <button type="button" className="sh-add">+</button>
                </div>
                <div className="sh-avatars">
                  <i style={{ background: 'linear-gradient(135deg,#c7d0e0,#8a93a8)' }} />
                  <i style={{ background: 'linear-gradient(135deg,#9ec7ff,#5b8def)' }} />
                  <i style={{ background: 'linear-gradient(135deg,#b8e0d2,#4fd1c5)' }} />
                  <i style={{ background: 'linear-gradient(135deg,#ffe6a8,#f2a63b)' }} />
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
                <div className="sh-dial" style={{ background: `conic-gradient(var(--section-accent, #5b8def) ${(temp - 10) * 3.6}deg, rgba(120,130,160,0.16) 0)` }}>
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
                  {[t('Fan', 'Fan'), t('Sıcak', 'Hot'), t('Soğuk', 'Cold'), t('Nem', 'Humidity')].map((a, i) => (
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
                  {['24°', '25°', '27°', '28°', '26°'].map((f, i) => (
                    <div key={i}><span>☀︎</span><b>{f}</b><small>{['10:00', '11:00', '12:00', '13:00', '14:00'][i]}</small></div>
                  ))}
                </div>
              </div>

              <div className="sh-doors-nice">
                {([
                  ['front', t('Ön Kapı', 'Front Door')],
                  ['back', t('Arka Kapı', 'Back Door')],
                ] as const).map(([key, label]) => {
                  const locked = doors[key];
                  return (
                    <div key={key} className={`glass-card sh-door-nice ${locked ? 'is-locked' : 'is-open'}`}>
                      <div className="sh-door-nice__status">{locked ? t('Kapalı', 'Closed') : t('Açık', 'Open')}</div>
                      <div className="sh-door-nice__name">{label}</div>
                      <button
                        type="button"
                        className="sh-door-nice__slide"
                        onClick={() => setDoors((d) => ({ ...d, [key]: !d[key] }))}
                      >
                        <span className="sh-door-nice__lock">{locked ? '🔒' : '🔓'}</span>
                        <span className="sh-door-nice__track"><i /></span>
                        <span className="sh-door-nice__hint">{locked ? t('Kilidi aç', 'Unlock') : t('Kilitle', 'Lock')}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="glass-card sh-energy">
                <div className="sh-energy__head"><span>{t('Enerji (kWh)', 'Energy (kWh)')}</span><span className="sh-energy__tab">{t('Hafta', 'Week')}</span></div>
                <div className="sh-bars">
                  {[24, 30, 22, 34, 28.3, 26, 20].map((e, i) => (
                    <div key={i} className="sh-bar">
                      <span className={`sh-bar__fill ${i === 4 ? 'is-peak' : ''}`} style={{ height: `${(e / 34) * 100}%` }} />
                      <small>{['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'][i]}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="home2__col">
              <div className="sh-devices">
                {([
                  ['light', t('Işık', 'Light'), mainOn, () => setMainOn((v) => !v)],
                  ['stereo', t('Stereo', 'Stereo'), true, () => {}],
                  ['tv', t('Televizyon', 'Television'), tvOn, () => setTvOn((v) => !v)],
                  ['ac', t('Klima', 'A/C'), acOn, () => setAcOn((v) => !v)],
                ] as const).map(([k, label, on, fn]) => (
                  <div key={k} className={`glass-card sh-dev ${on ? 'is-on' : ''}`}>
                    <div className="sh-dev__top">
                      <span className="sh-dev__ico">◐</span>
                      <Toggle on={on} onChange={fn} />
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
        </>
      )}
    </div>
  );
}
