import { useLang } from '../i18n';

export type DesignBlockId =
  | 'light-main'
  | 'light-palette'
  | 'light-dimmer'
  | 'light-strip'
  | 'light-scenes'
  | 'light-spot';

export type DesignBlockDef = {
  id: DesignBlockId;
  labelTr: string;
  labelEn: string;
  thumb: string;
  category: 'light';
};

/** Smart-home design blocks shown under Işık (from photo pack #13+ / designed controls). */
export const DESIGN_BLOCKS: DesignBlockDef[] = [
  { id: 'light-main', labelTr: 'Ana Işık', labelEn: 'Main Light', thumb: '/blocks/block-light-main.jpg', category: 'light' },
  { id: 'light-palette', labelTr: 'Renk Paleti', labelEn: 'Color Palette', thumb: '/blocks/block-light-palette.jpg', category: 'light' },
  { id: 'light-dimmer', labelTr: 'Parlaklık', labelEn: 'Brightness', thumb: '/blocks/block-light-dimmer.jpg', category: 'light' },
  { id: 'light-strip', labelTr: 'LED Şerit', labelEn: 'LED Strip', thumb: '/blocks/block-light-strip.jpg', category: 'light' },
  { id: 'light-scenes', labelTr: 'Sahne Modları', labelEn: 'Scenes', thumb: '/blocks/block-light-scenes.jpg', category: 'light' },
  { id: 'light-spot', labelTr: 'Spot Işık', labelEn: 'Spot Light', thumb: '/blocks/block-light-spot.jpg', category: 'light' },
];

type DesignBlocksPanelProps = {
  placed: DesignBlockId[];
  onAdd: (id: DesignBlockId) => void;
  onClose: () => void;
};

export function DesignBlocksPanel({ placed, onAdd, onClose }: DesignBlocksPanelProps) {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const lights = DESIGN_BLOCKS.filter((b) => b.category === 'light');

  return (
    <div className="blocks-overlay" onClick={onClose}>
      <div className="blocks-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t('Tasarım Blokları', 'Design Blocks')}>
        <button type="button" className="blocks-sheet__close" onClick={onClose} aria-label={t('Kapat', 'Close')}>×</button>
        <header className="blocks-sheet__head">
          <h2>{t('Akıllı Ev Blokları', 'Smart Home Blocks')}</h2>
          <p>{t('Sayfaya eklemek için bir blok seç.', 'Pick a block to add to the page.')}</p>
        </header>

        <section className="blocks-section">
          <h3 className="blocks-section__title">{t('Işık', 'Light')}</h3>
          <div className="blocks-grid">
            {lights.map((b) => {
              const added = placed.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`block-card ${added ? 'is-added' : ''}`}
                  disabled={added}
                  onClick={() => onAdd(b.id)}
                >
                  <span className="block-card__thumb" style={{ backgroundImage: `url('${b.thumb}')` }} />
                  <span className="block-card__label">{lang === 'tr' ? b.labelTr : b.labelEn}</span>
                  <span className="block-card__hint">{added ? t('Eklendi', 'Added') : t('Ekle', 'Add')}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
