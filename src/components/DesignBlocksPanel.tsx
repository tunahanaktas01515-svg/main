import { useLang } from '../i18n';

export type DesignBlockId =
  | 'light-main'
  | 'light-palette'
  | 'light-dimmer'
  | 'light-strip'
  | 'light-scenes'
  | 'light-spot'
  | 'climate-ac'
  | 'climate-fan'
  | 'thermo-main'
  | 'tv-main'
  | 'tv-apps'
  | 'car-status'
  | 'car-lock'
  | 'door-front'
  | 'door-back'
  | 'door-garage';

export type DesignCategory = 'light' | 'climate' | 'thermo' | 'tv' | 'car' | 'door';

export type DesignBlockDef = {
  id: DesignBlockId;
  labelTr: string;
  labelEn: string;
  thumb: string;
  category: DesignCategory;
};

export const SECTION_COLORS = [
  { id: 'white', labelTr: 'Beyaz', labelEn: 'White', value: '#ffffff' },
  { id: 'blue', labelTr: 'Mavi', labelEn: 'Blue', value: '#5b8def' },
  { id: 'sky', labelTr: 'Gök', labelEn: 'Sky', value: '#7eb6ff' },
  { id: 'mint', labelTr: 'Mint', labelEn: 'Mint', value: '#4fd1c5' },
  { id: 'green', labelTr: 'Yeşil', labelEn: 'Green', value: '#3dbf7a' },
  { id: 'silver', labelTr: 'Gümüş', labelEn: 'Silver', value: '#a8b0bd' },
  { id: 'slate', labelTr: 'Gri', labelEn: 'Slate', value: '#6b7286' },
  { id: 'navy', labelTr: 'Lacivert', labelEn: 'Navy', value: '#2c3e6b' },
] as const;

export type SectionColorId = (typeof SECTION_COLORS)[number]['id'];

const thumb = (from: string, to: string) =>
  `linear-gradient(145deg, ${from}, ${to})`;

export const DESIGN_BLOCKS: DesignBlockDef[] = [
  { id: 'light-main', labelTr: 'Ana Işık', labelEn: 'Main Light', category: 'light', thumb: '/blocks/block-light-main.jpg' },
  { id: 'light-palette', labelTr: 'Renk Paleti', labelEn: 'Color Palette', category: 'light', thumb: '/blocks/block-light-palette.jpg' },
  { id: 'light-dimmer', labelTr: 'Parlaklık', labelEn: 'Brightness', category: 'light', thumb: '/blocks/block-light-dimmer.jpg' },
  { id: 'light-strip', labelTr: 'LED Şerit', labelEn: 'LED Strip', category: 'light', thumb: '/blocks/block-light-strip.jpg' },
  { id: 'light-scenes', labelTr: 'Sahne Modları', labelEn: 'Scenes', category: 'light', thumb: '/blocks/block-light-scenes.jpg' },
  { id: 'light-spot', labelTr: 'Spot Işık', labelEn: 'Spot Light', category: 'light', thumb: '/blocks/block-light-spot.jpg' },
  { id: 'climate-ac', labelTr: 'Klima', labelEn: 'Air Conditioner', category: 'climate', thumb: thumb('#d9f3ff', '#7eb6ff') },
  { id: 'climate-fan', labelTr: 'Fan', labelEn: 'Fan', category: 'climate', thumb: thumb('#e8f7ff', '#a8d4f0') },
  { id: 'thermo-main', labelTr: 'Termostat', labelEn: 'Thermostat', category: 'thermo', thumb: thumb('#ffe8d6', '#ffb347') },
  { id: 'tv-main', labelTr: 'Televizyon', labelEn: 'Television', category: 'tv', thumb: thumb('#1a1d28', '#3a4158') },
  { id: 'tv-apps', labelTr: 'TV Uygulamaları', labelEn: 'TV Apps', category: 'tv', thumb: thumb('#22263a', '#5b8def') },
  { id: 'car-status', labelTr: 'Araç Durumu', labelEn: 'Car Status', category: 'car', thumb: thumb('#eef1f6', '#c8ceda') },
  { id: 'car-lock', labelTr: 'Araç Kilidi', labelEn: 'Car Lock', category: 'car', thumb: thumb('#dde3ee', '#8a93a8') },
  { id: 'door-front', labelTr: 'Ön Kapı', labelEn: 'Front Door', category: 'door', thumb: thumb('#f4f6fa', '#d5dae6') },
  { id: 'door-back', labelTr: 'Arka Kapı', labelEn: 'Back Door', category: 'door', thumb: thumb('#eef1f7', '#cfd5e4') },
  { id: 'door-garage', labelTr: 'Garaj', labelEn: 'Garage', category: 'door', thumb: thumb('#e8ecf4', '#9aa3b8') },
];

const CATEGORIES: { key: DesignCategory; tr: string; en: string }[] = [
  { key: 'light', tr: 'Işık', en: 'Light' },
  { key: 'climate', tr: 'Klima', en: 'Climate' },
  { key: 'thermo', tr: 'Termostat', en: 'Thermostat' },
  { key: 'tv', tr: 'TV', en: 'TV' },
  { key: 'car', tr: 'Araç', en: 'Car' },
  { key: 'door', tr: 'Kapı & Kilit', en: 'Doors & Locks' },
];

type DesignBlocksPanelProps = {
  placed: DesignBlockId[];
  sectionColor: SectionColorId;
  onSectionColor: (id: SectionColorId) => void;
  onAdd: (id: DesignBlockId) => void;
  onClose: () => void;
};

export function DesignBlocksPanel({
  placed,
  sectionColor,
  onSectionColor,
  onAdd,
  onClose,
}: DesignBlocksPanelProps) {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);

  return (
    <div className="blocks-overlay" onClick={onClose}>
      <div className="blocks-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t('Tasarım Blokları', 'Design Blocks')}>
        <button type="button" className="blocks-sheet__close" onClick={onClose} aria-label={t('Kapat', 'Close')}>×</button>
        <header className="blocks-sheet__head">
          <h2>{t('Akıllı Ev Blokları', 'Smart Home Blocks')}</h2>
          <p>{t('Bölüm rengi seçin, sonra blok ekleyin.', 'Pick a section color, then add blocks.')}</p>
        </header>

        <section className="blocks-section">
          <h3 className="blocks-section__title">{t('Bölüm Rengi', 'Section Color')}</h3>
          <div className="section-colors">
            {SECTION_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`section-color ${sectionColor === c.id ? 'is-active' : ''}`}
                style={{ ['--swatch' as string]: c.value }}
                onClick={() => onSectionColor(c.id)}
                title={lang === 'tr' ? c.labelTr : c.labelEn}
              >
                <i />
                <span>{lang === 'tr' ? c.labelTr : c.labelEn}</span>
              </button>
            ))}
          </div>
        </section>

        {CATEGORIES.map((cat) => {
          const items = DESIGN_BLOCKS.filter((b) => b.category === cat.key);
          return (
            <section key={cat.key} className="blocks-section">
              <h3 className="blocks-section__title">{lang === 'tr' ? cat.tr : cat.en}</h3>
              <div className="blocks-grid">
                {items.map((b) => {
                  const added = placed.includes(b.id);
                  const isImg = b.thumb.startsWith('/');
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`block-card ${added ? 'is-added' : ''}`}
                      disabled={added}
                      onClick={() => onAdd(b.id)}
                    >
                      <span
                        className="block-card__thumb"
                        style={isImg ? { backgroundImage: `url('${b.thumb}')` } : { background: b.thumb }}
                      />
                      <span className="block-card__label">{lang === 'tr' ? b.labelTr : b.labelEn}</span>
                      <span className="block-card__hint">{added ? t('Eklendi', 'Added') : t('Ekle', 'Add')}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
