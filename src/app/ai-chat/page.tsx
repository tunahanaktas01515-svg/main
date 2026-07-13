"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { simulateAiReply } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChatPage() {
  const { t, locale } = useLanguage();
  const { user, consumeCredit } = useAuth();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onSend = async (e: FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || loading) return;
    setError(null);
    if (!user) {
      setError(t("analyze.loginRequired"));
      return;
    }
    if (user.aiCredits <= 0) {
      setError(t("analyze.noCredits"));
      return;
    }
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    if (!consumeCredit()) {
      setError(t("analyze.noCredits"));
      setLoading(false);
      return;
    }
    setMessages((m) => [
      ...m,
      { role: "assistant", content: simulateAiReply(q, locale) },
    ]);
    setLoading(false);
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-3xl flex-col">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-white">
            {t("chat.title")}
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">{t("chat.subtitle")}</p>
          {user && (
            <p className="mt-1 text-xs text-[var(--accent-cyan)]">
              {t("nav.credits")}: {user.aiCredits}
            </p>
          )}
        </div>

        <div className="mb-4 min-h-[360px] space-y-3 rounded-3xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-4">
          {messages.length === 0 && (
            <p className="py-16 text-center text-sm text-[var(--text-muted)]">
              {t("chat.placeholder")}
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-[#041018]">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[rgba(47,140,255,0.2)] text-white"
                    : "bg-black/30 text-[var(--text-muted)]"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <p className="text-sm text-[var(--accent-cyan)]">{t("chat.thinking")}</p>
          )}
        </div>

        {error && (
          <p className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}{" "}
            {!user && (
              <Link href="/auth?mode=login" className="underline">
                {t("nav.login")}
              </Link>
            )}
            {error === t("analyze.noCredits") && (
              <Link href="/pricing" className="ms-2 underline">
                {t("nav.pricing")}
              </Link>
            )}
          </p>
        )}

        <form onSubmit={onSend} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="flex-1 rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.8)] px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm disabled:opacity-60"
          >
            <Send size={16} />
            {t("chat.send")}
          </button>
        </form>
      </div>
    </div>
  );
}