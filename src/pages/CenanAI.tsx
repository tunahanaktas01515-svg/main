import { useEffect, useState } from 'react';
import { MicIcon, SendUpIcon, PlusIcon, ChevronDownIcon } from '../icons';
import { useLang } from '../i18n';
import { getConnectedLlmModels, type ConnectedModel } from '../lib/integrations';

type BuiltinModel = 'auto' | 'pro' | 'ultra';
type ModelId = BuiltinModel | string;

export function CenanAI() {
  const { L } = useLang();
  const [text, setText] = useState('');
  const [model, setModel] = useState<ModelId>('auto');
  const [modelOpen, setModelOpen] = useState(false);
  const [connected, setConnected] = useState<ConnectedModel[]>([]);

  // Refresh connected APIs when menu opens (or on mount) so Gemini/ChatGPT appear above Cenan.
  useEffect(() => {
    setConnected(getConnectedLlmModels());
  }, [modelOpen]);

  useEffect(() => {
    const onStorage = () => setConnected(getConnectedLlmModels());
    window.addEventListener('storage', onStorage);
    window.addEventListener('cenan-integrations', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cenan-integrations', onStorage);
    };
  }, []);

  const builtinLabels: Record<BuiltinModel, string> = {
    auto: L.modelAuto,
    pro: L.modelPro,
    ultra: L.modelUltra,
  };

  const modelLabel = (id: ModelId) => {
    const api = connected.find((c) => c.id === id);
    if (api) return api.label;
    if (id in builtinLabels) return builtinLabels[id as BuiltinModel];
    return String(id);
  };

  const pick = (id: ModelId) => {
    setModel(id);
    setModelOpen(false);
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

            <div className="ai-model">
              <button
                type="button"
                className="ai-model__btn"
                onClick={() => setModelOpen((o) => !o)}
                aria-expanded={modelOpen}
              >
                {modelLabel(model)}
                <ChevronDownIcon size={13} />
              </button>
              {modelOpen && (
                <div className="ai-model__menu">
                  {/* Connected APIs first (Gemini, ChatGPT, …) above Cenan Ultra / Pro */}
                  {connected.map((c) => (
                    <button key={c.id} type="button" className="ai-model__api" onClick={() => pick(c.id)}>
                      {c.label}
                      <span className="ai-model__badge">API</span>
                    </button>
                  ))}
                  <button type="button" onClick={() => pick('ultra')}>{L.modelUltra}</button>
                  <button type="button" onClick={() => pick('pro')}>{L.modelPro}</button>
                  <button type="button" onClick={() => pick('auto')}>{L.modelAuto}</button>
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
