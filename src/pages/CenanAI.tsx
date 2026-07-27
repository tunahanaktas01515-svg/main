import { useState } from 'react';
import { MicIcon, SendUpIcon, PlusIcon, ChevronDownIcon } from '../icons';
import { useLang } from '../i18n';

type ModelId = 'auto' | 'pro' | 'ultra';

export function CenanAI() {
  const { L } = useLang();
  const [text, setText] = useState('');
  const [model, setModel] = useState<ModelId>('auto');
  const [modelOpen, setModelOpen] = useState(false);

  const modelLabels: Record<ModelId, string> = {
    auto: L.modelAuto,
    pro: L.modelPro,
    ultra: L.modelUltra,
  };

  const suggestions = [L.aiSuggest1, L.aiSuggest2, L.aiSuggest3];

  return (
    <div className="ai">
      <div className="ai__hero">
        <h1 className="ai__title">{L.aiTitle}</h1>
        <p className="ai__subtitle">{L.aiSubtitle}</p>
      </div>

      <div className="ai-box">
        <textarea
          className="ai-box__input"
          placeholder={L.aiPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
        />

        <div className="ai-box__bar">
          <div className="ai-box__left">
            {/* Attach (+) — rotates 45° on hover and reveals options */}
            <div className="ai-attach">
              <button type="button" className="ai-icon-btn ai-plus" aria-label={L.attachFile}>
                <PlusIcon size={18} />
              </button>
              <div className="ai-attach__menu">
                <button type="button">{L.attachFile}</button>
                <button type="button">{L.attachPlugin}</button>
                <button type="button">{L.attachMedia}</button>
              </div>
            </div>

            {/* Model selector */}
            <div className="ai-model">
              <button
                type="button"
                className="ai-model__btn"
                onClick={() => setModelOpen((o) => !o)}
                aria-expanded={modelOpen}
              >
                {modelLabels[model]}
                <ChevronDownIcon size={13} />
              </button>
              {modelOpen && (
                <div className="ai-model__menu">
                  <button type="button" onClick={() => { setModel('ultra'); setModelOpen(false); }}>
                    {L.modelUltra}
                  </button>
                  <button type="button" onClick={() => { setModel('pro'); setModelOpen(false); }}>
                    {L.modelPro}
                  </button>
                  <button type="button" onClick={() => { setModel('auto'); setModelOpen(false); }}>
                    {L.modelAuto}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="ai-box__right">
            <button type="button" className="ai-icon-btn" aria-label="mic">
              <MicIcon size={19} />
            </button>
            <button type="button" className="ai-send" aria-label="send">
              <SendUpIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="ai-suggests">
        {suggestions.map((s, i) => (
          <button type="button" className="ai-chip" key={i} onClick={() => setText(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
