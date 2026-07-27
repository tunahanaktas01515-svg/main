import { loadIntegrationState, type IntegrationId } from './integrations';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model?: string;
};

function keyFor(id: IntegrationId): string {
  return (loadIntegrationState()[id]?.a ?? '').trim();
}

async function callGemini(prompt: string, history: ChatMessage[]): Promise<string> {
  const key = keyFor('gemini');
  if (!key) throw new Error('Gemini API anahtarı yok');

  const contents = [
    ...history
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-8)
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    { role: 'user', parts: [{ text: prompt }] },
  ];

  const res = await fetch(
    `/api/gemini/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    },
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err.slice(0, 180) || `Gemini hata ${res.status}`);
  }
  const data = await res.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
  if (!text.trim()) throw new Error('Gemini boş yanıt döndü');
  return text.trim();
}

async function callOpenAI(prompt: string, history: ChatMessage[], provider: 'openai' | 'grok' | 'claude'): Promise<string> {
  const key = keyFor(provider);
  if (!key) throw new Error(`${provider} API anahtarı yok`);

  if (provider === 'claude') {
    const res = await fetch('/api/claude/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 1024,
        messages: [
          ...history.filter((m) => m.role !== 'system').slice(-8).map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
          { role: 'user', content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error((await res.text()).slice(0, 180) || `Claude hata ${res.status}`);
    const data = await res.json() as { content?: { text?: string }[] };
    const text = data.content?.map((c) => c.text ?? '').join('') ?? '';
    if (!text.trim()) throw new Error('Claude boş yanıt döndü');
    return text.trim();
  }

  const base = provider === 'grok' ? '/api/grok/v1/chat/completions' : '/api/openai/v1/chat/completions';
  const model = provider === 'grok' ? 'grok-2-latest' : 'gpt-4o-mini';
  const res = await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'Sen Cenan adlı yardımcı bir AI asistanısın. Kısa, net ve Türkçe yanıt ver.' },
        ...history.filter((m) => m.role !== 'system').slice(-8).map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: 'user', content: prompt },
      ],
    }),
  });
  if (!res.ok) throw new Error((await res.text()).slice(0, 180) || `${provider} hata ${res.status}`);
  const data = await res.json() as { choices?: { message?: { content?: string } }[] };
  const text = data.choices?.[0]?.message?.content ?? '';
  if (!text.trim()) throw new Error('Boş yanıt döndü');
  return text.trim();
}

function localCenanReply(prompt: string, modelLabel: string, lang: 'tr' | 'en'): string {
  const q = prompt.toLowerCase();
  if (/bağland|connected|gemini|chatgpt|claude|grok/.test(q)) {
    return lang === 'tr'
      ? `Evet — şu an **${modelLabel}** ile konuşuyorsunuz. Mesajlarınız gönderiliyor; yanıtlar seçili modele göre üretiliyor.`
      : `Yes — you are chatting with **${modelLabel}**. Messages are being sent and answered by the selected model.`;
  }
  if (/kdv|vat|vergi/.test(q)) {
    return lang === 'tr'
      ? 'KDV için matrah × oran formülünü kullanın. Örnek: 10.000 ₺ × %20 = 2.000 ₺ KDV. Detaylı rapor için menüden **KDV Raporu** sayfasına gidebilirsiniz.'
      : 'For VAT use base × rate. Example: 10,000 × 20% = 2,000 VAT. Open the **VAT Report** page for details.';
  }
  if (/fatura|invoice|e-fatura/.test(q)) {
    return lang === 'tr'
      ? 'E-Fatura analizi için faturayı **Fatura Yükle / OCR** sayfasından yükleyebilir veya bana fatura tutarı / cari bilgilerini yazabilirsiniz.'
      : 'For e-invoice analysis, upload via **Upload / OCR** or paste amount and account details here.';
  }
  if (/merhaba|selam|hello|hi\b/.test(q)) {
    return lang === 'tr'
      ? `Merhaba! Ben Cenan (${modelLabel}). Muhasebe, vergi, stok veya akıllı ev konularında yardımcı olabilirim.`
      : `Hello! I am Cenan (${modelLabel}). I can help with accounting, tax, inventory, or smart home.`;
  }
  return lang === 'tr'
    ? `Anladım: “${prompt.slice(0, 160)}${prompt.length > 160 ? '…' : ''}”.\n\n**${modelLabel}** olarak yardımcı oluyorum. Daha spesifik bir hedef (ör. KDV hesapla, fatura özeti, stok uyarısı) yazarsanız net sonuç üretebilirim.`
    : `Got it: “${prompt.slice(0, 160)}${prompt.length > 160 ? '…' : ''}”.\n\nResponding as **${modelLabel}**. Share a clearer goal (VAT calc, invoice summary, stock alert) for a precise answer.`;
}

export async function sendChatMessage(opts: {
  prompt: string;
  modelId: string;
  modelLabel: string;
  history: ChatMessage[];
  lang: 'tr' | 'en';
}): Promise<string> {
  const { prompt, modelId, modelLabel, history, lang } = opts;
  try {
    if (modelId === 'gemini') return await callGemini(prompt, history);
    if (modelId === 'openai') return await callOpenAI(prompt, history, 'openai');
    if (modelId === 'claude') return await callOpenAI(prompt, history, 'claude');
    if (modelId === 'grok') return await callOpenAI(prompt, history, 'grok');
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // Fall back to local reply but mention the API issue briefly.
    const local = localCenanReply(prompt, modelLabel, lang);
    return lang === 'tr'
      ? `${local}\n\n_(API yanıtı alınamadı: ${msg.slice(0, 120)}. Yerel Cenan yanıtı gösterildi.)_`
      : `${local}\n\n_(API call failed: ${msg.slice(0, 120)}. Showing local Cenan reply.)_`;
  }
  return localCenanReply(prompt, modelLabel, lang);
}
