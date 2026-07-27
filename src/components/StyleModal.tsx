import { useLang } from '../i18n';

/** 15 styles in transparent / black / metallic families. */
export type HomeStyle =
  | 'seffaf'
  | 'buz'
  | 'kristal'
  | 'duman'
  | 'buhar'
  | 'siyah'
  | 'obsidyen'
  | 'gece'
  | 'karbon'
  | 'matsiyah'
  | 'metalik'
  | 'krom'
  | 'celik'
  | 'platin'
  | 'titanyum';

export const HOME_STYLES: {
  id: HomeStyle;
  labelTr: string;
  labelEn: string;
  thumb: string;
  group: 'transparent' | 'black' | 'metallic';
}[] = [
  { id: 'seffaf', labelTr: 'Şeffaf', labelEn: 'Transparent', group: 'transparent', thumb: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.12))' },
  { id: 'buz', labelTr: 'Buz', labelEn: 'Ice', group: 'transparent', thumb: 'linear-gradient(135deg, rgba(200,230,255,0.7), rgba(255,255,255,0.2))' },
  { id: 'kristal', labelTr: 'Kristal', labelEn: 'Crystal', group: 'transparent', thumb: 'linear-gradient(135deg, rgba(220,240,255,0.8), rgba(180,210,255,0.25))' },
  { id: 'duman', labelTr: 'Duman', labelEn: 'Smoke', group: 'transparent', thumb: 'linear-gradient(135deg, rgba(180,185,200,0.45), rgba(90,95,110,0.2))' },
  { id: 'buhar', labelTr: 'Buhar', labelEn: 'Vapor', group: 'transparent', thumb: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(210,220,235,0.3))' },
  { id: 'siyah', labelTr: 'Siyah', labelEn: 'Black', group: 'black', thumb: 'linear-gradient(135deg, #1a1a1e, #0a0a0c)' },
  { id: 'obsidyen', labelTr: 'Obsidyen', labelEn: 'Obsidian', group: 'black', thumb: 'linear-gradient(135deg, #141418, #050508)' },
  { id: 'gece', labelTr: 'Gece', labelEn: 'Night', group: 'black', thumb: 'linear-gradient(135deg, #12162a, #07090f)' },
  { id: 'karbon', labelTr: 'Karbon', labelEn: 'Carbon', group: 'black', thumb: 'linear-gradient(135deg, #22262e, #101218)' },
  { id: 'matsiyah', labelTr: 'Mat Siyah', labelEn: 'Matte Black', group: 'black', thumb: 'linear-gradient(135deg, #1e1e22, #141416)' },
  { id: 'metalik', labelTr: 'Metalik', labelEn: 'Metallic', group: 'metallic', thumb: 'linear-gradient(135deg, #c8ccd4, #6a707c 50%, #e8eaef)' },
  { id: 'krom', labelTr: 'Krom', labelEn: 'Chrome', group: 'metallic', thumb: 'linear-gradient(135deg, #f2f3f5, #9aa0aa 45%, #ffffff)' },
  { id: 'celik', labelTr: 'Çelik', labelEn: 'Steel', group: 'metallic', thumb: 'linear-gradient(135deg, #8a93a0, #3d4552 50%, #b0b8c4)' },
  { id: 'platin', labelTr: 'Platin', labelEn: 'Platinum', group: 'metallic', thumb: 'linear-gradient(135deg, #e6e8ec, #a8adb8 50%, #f5f6f8)' },
  { id: 'titanyum', labelTr: 'Titanyum', labelEn: 'Titanium', group: 'metallic', thumb: 'linear-gradient(135deg, #9a9ea8, #4a4e58 50%, #c4c8d0)' },
];

type StyleModalProps = {
  current: HomeStyle;
  onSelect: (s: HomeStyle) => void;
  onClose: () => void;
};

export function StyleModal({ current, onSelect, onClose }: StyleModalProps) {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);

  const groups: { key: typeof HOME_STYLES[number]['group']; title: string }[] = [
    { key: 'transparent', title: t('Şeffaf', 'Transparent') },
    { key: 'black', title: t('Siyah', 'Black') },
    { key: 'metallic', title: t('Metalik', 'Metallic') },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--wide modal--styles" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="close">×</button>
        <h2 className="modal__title">{t('Stil', 'Style')}</h2>
        <p className="modal__sub">{t('Şeffaf, siyah ve metalik stillerden birini seç.', 'Pick a transparent, black, or metallic style.')}</p>
        {groups.map((g) => (
          <div key={g.key} className="style-group">
            <h3 className="style-group__title">{g.title}</h3>
            <div className="bg-grid">
              {HOME_STYLES.filter((s) => s.group === g.key).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`bg-swatch ${current === s.id ? 'is-active' : ''}`}
                  onClick={() => { onSelect(s.id); onClose(); }}
                >
                  <span className="bg-swatch__thumb" style={{ background: s.thumb }} />
                  <span className="bg-swatch__label">{lang === 'tr' ? s.labelTr : s.labelEn}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
