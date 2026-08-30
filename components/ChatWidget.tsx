"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MoreHorizontal } from "lucide-react";
import { sendChatMessage } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hi! Main Solvyx AI hoon. Aap ka sawal poochein — main policies, orders, ya kisi bhi masle mein madad kar sakti hoon." },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendChatMessage(sessionId, text);
      setSessionId(data.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — backend chal raha hai check karein." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-4 bg-ink text-white">
        <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
        <span className="font-display font-semibold text-sm tracking-tight">Solvyx AI</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[11px] font-mono bg-white/10 text-white/70 px-2.5 py-1 rounded-full">
            RAG + Groq
          </span>
          <MoreHorizontal size={16} className="text-white/40" />
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 bg-white">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-indigo text-white rounded-br-md"
                : "mr-auto bg-indigo-dim/60 text-ink rounded-bl-md"
            }`}
          >
            {m.content}
          </div>
        ))}
        {isTyping && (
          <div className="mr-auto flex gap-1 px-4 py-3.5 bg-indigo-dim/60 rounded-2xl rounded-bl-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-line bg-white">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Apna sawal likhein..."
            className="flex-1 px-4 py-2.5 text-sm rounded-full border border-line bg-paper focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="w-10 h-10 shrink-0 rounded-full bg-indigo text-white flex items-center justify-center hover:bg-indigo/90 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[11px] text-ink/30 mt-2.5">
          Powered by Solvyx AI &middot; RAG + Groq
        </p>
      </div>
    </div>
  );
}