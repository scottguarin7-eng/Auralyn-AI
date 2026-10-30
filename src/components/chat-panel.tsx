"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, BrainCircuit, Copy, Loader2, Sparkles } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hello! I’m NeuralGlass AI. I can improve prompts, explain code, analyze ideas, and help you build faster.",
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.text },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `I encountered an error: ${error.message}`
              : "I encountered an unexpected error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function copyText(content: string) {
    navigator.clipboard.writeText(content);
  }

  return (
    <section className="glass flex min-h-[570px] flex-col rounded-3xl">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
            <BrainCircuit size={22} />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0d1022] bg-emerald-400" />
          </div>
          <div>
            <h2 className="font-semibold">AI Workspace</h2>
            <p className="text-xs text-slate-400">Gemini neural response engine</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          Online
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/20"
                  : "border border-white/10 bg-white/[0.06] text-slate-200"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>

              {message.role === "assistant" && (
                <button
                  onClick={() => copyText(message.content)}
                  className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-white"
                >
                  <Copy size={13} />
                  Copy
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Loader2 className="animate-spin" size={16} />
            Neural Engine is thinking...
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {["Improve this prompt", "Explain this code", "Brainstorm ideas"].map(
            (suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 transition hover:border-violet-400/40 hover:text-white"
              >
                {suggestion}
              </button>
            ),
          )}
        </div>

        <form
          onSubmit={submit}
          className="flex items-end gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(event);
              }
            }}
            placeholder="Ask anything..."
            rows={2}
            className="min-h-12 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-slate-600"
          />

          <button
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowUp size={18} />}
          </button>
        </form>

        <p className="mt-3 text-center text-[11px] text-slate-600">
          NeuralGlass may make mistakes. Verify important information.
        </p>
      </div>
    </section>
  );
}
