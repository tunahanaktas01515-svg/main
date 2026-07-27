import { useEffect, useRef, useState } from 'react';
import { MicIcon, SendUpIcon, PlusIcon, ChevronDownIcon } from '../icons';
import { useLang } from '../i18n';
import { getConnectedLlmModels, type ConnectedModel } from '../lib/integrations';
import { sendChatMessage, type ChatMessage } from '../lib/chat';

type BuiltinModel = 'auto' | 'pro' | 'ultra';
type ModelId = BuiltinModel | string;

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function CenanAI() {
  const { L, lang } = useLang();
  const [text, setText] = useState('');
  const [model, setModel] = useState<ModelId>('auto');
  const [modelOpen, setModelOpen] = useState(false);
  const [connected, setConnected] = useState<ConnectedModel[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

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
  const hasChat = messages.length > 0;

  const send = async (raw?: string) => {
    const prompt = (raw ?? text).trim();
    if (!prompt || sending) return;

    const userMsg: ChatMessage = { id: uid(), role: 'user', content: prompt };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setText('');
    setSending(true);
    setModelOpen(false);

    try {
      const reply = await sendChatMessage({
        prompt,
        modelId: String(model),
        modelLabel: modelLabel(model),
        history: messages,
        lang,
      });
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'assistant', content: reply, model: modelLabel(model) },
      ]);
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          content: lang === 'tr' ? `Mesaj gönderilemedi: ${err}` : `Could not send: ${err}`,
          model: modelLabel(model),
        },
      ]);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className={`ai ${hasChat ? 'ai--chat' : ''}`}>
      {!hasChat && (
        <div className="ai__hero">
          <h1 className="ai__title">{L.aiTitle}</h1>
          <p className="ai__subtitle">{L.aiSubtitle}</p>
        </div>
      )}

      {hasChat && (
        <div className="ai-thread" ref={listRef}>
          {messages.map((m) => (
            <div key={m.id} className={`ai-bubble ai-bubble--${m.role}`}>
              {m.role === 'assistant' && m.model && (
                <span className="ai-bubble__meta">{m.model}</span>
              )}
              <div className="ai-bubble__text">{m.content}</div>
            </div>
          ))}
          {sending && (
            <div className="ai-bubble ai-bubble--assistant">
              <span className="ai-bubble__meta">{modelLabel(model)}</span>
              <div className="ai-bubble__text ai-bubble__typing">
                <i /><i /><i />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="ai-box">
        <textarea
          ref={inputRef}
          className="ai-box__input"
          placeholder={L.aiPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={hasChat ? 2 : 2}
          disabled={sending}
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
            <button
              type="button"
              className={`ai-send ${text.trim() && !sending ? 'is-ready' : ''}`}
              aria-label="send"
              disabled={!text.trim() || sending}
              onClick={() => void send()}
            >
              <SendUpIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {!hasChat && (
        <div className="ai-suggests">
          {suggestions.map((s, i) => (
            <button type="button" className="ai-chip" key={i} onClick={() => void send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
