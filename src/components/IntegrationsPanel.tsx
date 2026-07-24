import { useState, type ComponentType } from 'react';
import { useLang } from '../i18n';
import {
  SpotifyIcon,
  OpenAIIcon,
  ClaudeIcon,
  GeminiIcon,
  HomeAssistantIcon,
  GrokIcon,
} from '../icons';

type Kind = 'key' | 'ha' | 'oauth';
type Status = 'idle' | 'ok' | 'error';

type Integration = {
  id: string;
  name: string;
  desc: { tr: string; en: string };
  kind: Kind;
  Icon: ComponentType<{ size?: number }>;
};

const INTEGRATIONS: Integration[] = [
  { id: 'openai', name: 'ChatGPT (OpenAI)', desc: { tr: 'API Anahtarı', en: 'API Key' }, kind: 'key', Icon: OpenAIIcon },
  { id: 'claude', name: 'Claude (Anthropic)', desc: { tr: 'API Anahtarı', en: 'API Key' }, kind: 'key', Icon: ClaudeIcon },
  { id: 'gemini', name: 'Google Gemini', desc: { tr: 'API Anahtarı', en: 'API Key' }, kind: 'key', Icon: GeminiIcon },
  { id: 'homeassistant', name: 'Home Assistant', desc: { tr: 'URL + Uzun Ömürlü Token', en: 'URL + Long-Lived Token' }, kind: 'ha', Icon: HomeAssistantIcon },
  { id: 'spotify', name: 'Spotify', desc: { tr: 'OAuth ile yetkilendirme', en: 'OAuth authorization' }, kind: 'oauth', Icon: SpotifyIcon },
  { id: 'grok', name: 'Grok (xAI)', desc: { tr: 'API Anahtarı', en: 'API Key' }, kind: 'key', Icon: GrokIcon },
];

// Values are kept in state and lightly obfuscated in localStorage.
// NOTE: real secret encryption must happen on the backend; this is a frontend demo.
type IntState = Record<string, { status: Status; a: string; b: string }>;

const STORAGE_KEY = 'cenan.integrations';

function load(): IntState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(atob(raw)) as IntState;
  } catch { /* ignore */ }
  const init: IntState = {};
  INTEGRATIONS.forEach((i) => (init[i.id] = { status: 'idle', a: '', b: '' }));
  return init;
}

function save(state: IntState) {
  try {
    localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(state)));
  } catch { /* ignore */ }
}

export function IntegrationsPanel() {
  const { lang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const [state, setState] = useState<IntState>(load);

  const update = (id: string, patch: Partial<IntState[string]>) => {
    setState((prev) => {
      const next = { ...prev, [id]: { ...prev[id], ...patch } };
      save(next);
      // Notify Cenan AI model picker to refresh connected APIs.
      window.dispatchEvent(new Event('cenan-integrations'));
      return next;
    });
  };

  // Simulated connection test (no backend): a filled key/token counts as success.
  const test = (it: Integration) => {
    const s = state[it.id];
    let ok = false;
    if (it.kind === 'key') ok = s.a.trim().length >= 8;
    else if (it.kind === 'ha') ok = s.a.trim().length > 0 && s.b.trim().length >= 8;
    else ok = s.status === 'ok';
    update(it.id, { status: ok ? 'ok' : 'error' });
  };

  const connectSpotify = (id: string) => {
    // In production this redirects to Spotify's OAuth consent screen.
    window.open('https://accounts.spotify.com/', '_blank', 'noopener');
    update(id, { status: 'ok' });
  };

  const statusLabel = (s: Status) =>
    s === 'ok' ? t('Bağlı', 'Connected') : s === 'error' ? t('Hata', 'Error') : t('Bağlı Değil', 'Not connected');

  return (
    <div className="intg">
      {INTEGRATIONS.map((it) => {
        const s = state[it.id];
        const cls = s.status === 'ok' ? 'ok' : s.status === 'error' ? 'err' : 'idle';
        return (
          <div key={it.id} className={`intg-card intg--${it.id}`}>
            <span className="intg-ico">
              <it.Icon size={26} />
            </span>

            <div className="intg-main">
              <div className="intg-nameline">
                <span className="intg-name">{it.name}</span>
                <span className={`intg-status ${cls}`}>{statusLabel(s.status)}</span>
              </div>
              <div className="intg-fields">
                {it.kind === 'key' && (
                  <input
                    className="intg-input"
                    type="password"
                    placeholder={t('API Anahtarı', 'API Key')}
                    value={s.a}
                    onChange={(e) => update(it.id, { status: 'idle', a: e.target.value })}
                  />
                )}
                {it.kind === 'ha' && (
                  <>
                    <input
                      className="intg-input"
                      type="text"
                      placeholder="http://homeassistant.local:8123"
                      value={s.a}
                      onChange={(e) => update(it.id, { status: 'idle', a: e.target.value })}
                    />
                    <input
                      className="intg-input"
                      type="password"
                      placeholder={t('Uzun Ömürlü Token', 'Long-Lived Token')}
                      value={s.b}
                      onChange={(e) => update(it.id, { status: 'idle', b: e.target.value })}
                    />
                  </>
                )}
                {it.kind === 'oauth' && (
                  <span className="intg-hint">{it.desc[lang]}</span>
                )}
              </div>
            </div>

            <div className="intg-right">
              {it.kind === 'oauth' ? (
                <button type="button" className="set-btn set-btn--primary" onClick={() => connectSpotify(it.id)}>
                  {t('Spotify ile Bağlan', 'Connect Spotify')}
                </button>
              ) : (
                <button type="button" className="set-btn" onClick={() => test(it)}>
                  {t('Bağlantıyı Test Et', 'Test connection')}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
