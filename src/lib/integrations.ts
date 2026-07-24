/** Shared helpers for reading connected API integrations from localStorage. */

export type IntegrationId = 'openai' | 'claude' | 'gemini' | 'homeassistant' | 'spotify' | 'grok';

type IntState = Record<string, { status: string; a: string; b: string }>;

const STORAGE_KEY = 'cenan.integrations';

export type ConnectedModel = {
  id: IntegrationId;
  label: string;
};

const LLM_MODELS: ConnectedModel[] = [
  { id: 'openai', label: 'ChatGPT' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'claude', label: 'Claude' },
  { id: 'grok', label: 'Grok' },
];

export function loadIntegrationState(): IntState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(atob(raw)) as IntState;
  } catch {
    /* ignore */
  }
  return {};
}

/** Returns LLM providers whose connection test succeeded, for model picker ordering. */
export function getConnectedLlmModels(): ConnectedModel[] {
  const state = loadIntegrationState();
  return LLM_MODELS.filter((m) => state[m.id]?.status === 'ok');
}
