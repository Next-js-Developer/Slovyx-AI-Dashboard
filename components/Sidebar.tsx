"use client";

import { Home, BookOpen, Layers, BarChart3 } from "lucide-react";

interface SidebarProps {
  active: string;
  onSelect: (tab: string) => void;
}

const TABS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  { id: "classifier", label: "Classifier", icon: Layers },
  { id: "insights", label: "Insights", icon: BarChart3 },
];

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-line bg-white h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo flex items-center justify-center shrink-0">
            <span className="text-white font-display font-bold text-lg">S</span>
          </div>
          <div>
            <p className="font-display font-semibold text-ink leading-tight">Solvyx AI</p>
            <p className="text-xs text-ink/40 leading-tight">AI Support Agent</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-dim text-indigo"
                  : "text-ink/60 hover:bg-paper hover:text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-line">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal" />
          <div>
            <p className="text-xs font-semibold text-teal leading-tight">Agent Online</p>
            <p className="text-[11px] text-ink/40 leading-tight">All systems operational</p>
          </div>
        </div>
        <p className="text-[11px] font-mono text-ink/30 mt-3">RAG + Agents + ML</p>
      </div>
    </aside>
  );
}