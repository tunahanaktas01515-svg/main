import { useLang } from '../i18n';

export type HomeStyle = 'glass' | 'soft' | 'vivid';

type StyleModalProps = {
  current: HomeStyle;
  onSelect: (s: HomeStyle) => void;
  onClose: () => void;
};

export function StyleModal({ current, onSelect, onClose }: StyleModalProps) {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const styles: { id: HomeStyle; label: string; thumb: string }[] = [
    { id: 'glass', label: t('Cam', 'Glass'), thumb: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.35))' },
    { id: 'soft', label: t('Sade', 'Soft'), thumb: 'linear-gradient(135deg, #ffffff, #eef1f7)' },
    { id: 'vivid', label: t('Canlı', 'Vivid'), thumb: 'linear-gradient(135deg, #ff74b0, #5b8def)' },
  ];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="close">×</button>
        <h2 className="modal__title">{t('Stil', 'Style')}</h2>
        <p className="modal__sub">{t('Akıllı ev kartı stilini seç.', 'Choose the smart home card style.')}</p>
        <div className="bg-grid">
          {styles.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`bg-swatch ${current === s.id ? 'is-active' : ''}`}
              onClick={() => { onSelect(s.id); onClose(); }}
            >
              <span className="bg-swatch__thumb" style={{ background: s.thumb }} />
              <span className="bg-swatch__label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
