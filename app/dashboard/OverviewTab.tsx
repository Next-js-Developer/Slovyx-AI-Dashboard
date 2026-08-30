"use client";

import { useState } from "react";
import { Share2, Zap, Database, BrainCircuit, Copy, Check } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

const STATS = [
  { label: "Architecture", value: "RAG + Agent", icon: Share2, tint: "bg-indigo-dim text-indigo" },
  { label: "Inference", value: "Groq", icon: Zap, tint: "bg-indigo-dim text-indigo" },
  { label: "Vector Store", value: "ChromaDB", icon: Database, tint: "bg-teal-dim text-teal" },
  { label: "ML Layer", value: "Supervised + Unsupervised", icon: BrainCircuit, tint: "bg-coral-dim text-coral" },
];

const EMBED_SNIPPET = '<iframe src="https://yourdomain.com/widget" width="380" height="560">\n</iframe>';

export default function OverviewTab() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMBED_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 max-w-5xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-ink mb-2">Overview</h1>
        <p className="text-sm text-ink/60 mb-7 max-w-lg leading-relaxed">
          Solvyx AI — ek AI support agent jo policies se jawab deta hai (RAG),
          tickets classify karta hai (supervised ML), aur trending topics
          discover karta hai (unsupervised ML).
        </p>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-line p-5">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${s.tint}`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <p className="text-xs text-ink/40 font-medium">{s.label}</p>
                <p className="font-display font-semibold text-ink mt-0.5">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-line p-6">
          <h3 className="font-display font-semibold text-ink mb-1.5">Embed karne ke liye</h3>
          <p className="text-sm text-ink/60 mb-4">
            Ye widget kisi bhi website mein iframe se daala ja sakta hai:
          </p>
          <div className="relative">
            <pre className="text-xs font-mono bg-paper rounded-xl p-4 text-ink/70 overflow-x-auto whitespace-pre-wrap">
{EMBED_SNIPPET}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-line text-xs font-medium text-ink/70 hover:text-ink hover:border-indigo/40 transition-colors"
            >
              {copied ? <Check size={13} className="text-teal" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <div className="h-[560px]">
        <ChatWidget />
      </div>
    </div>
  );
}