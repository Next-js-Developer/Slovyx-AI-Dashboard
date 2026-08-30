"use client";

import { useState } from "react";
import { fetchInsights, Cluster } from "@/lib/api";

const TILE_COLORS = [
  { bg: "bg-indigo", dim: "bg-indigo-dim", text: "text-indigo" },
  { bg: "bg-teal", dim: "bg-teal-dim", text: "text-teal" },
  { bg: "bg-amber", dim: "bg-amber-dim", text: "text-amber" },
  { bg: "bg-coral", dim: "bg-coral-dim", text: "text-coral" },
];

export default function InsightsView() {
  const [clusters, setClusters] = useState<Cluster[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Cluster | null>(null);

  async function handleRun() {
    setLoading(true);
    setSelected(null);
    try {
      const data = await fetchInsights(4);
      setClusters(data.clusters);
      setTotal(data.total_messages);
    } catch {
      setClusters(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-line p-6">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="font-display font-semibold text-lg text-ink">Topic Signals</h2>
            <p className="text-sm text-ink/60 mt-1">
              Unsupervised clustering (K-Means) — bina labels ke, customer
              messages khud apne aap topics mein group ho jate hain. Bara
              tile = zyada common topic.
            </p>
          </div>
          <button
            onClick={handleRun}
            disabled={loading}
            className="shrink-0 px-4 py-2 rounded-lg bg-indigo text-white text-sm font-medium hover:bg-indigo/90 disabled:opacity-50 transition-colors"
          >
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>
        </div>

        {clusters && (
          <>
            <p className="text-xs font-mono text-ink/40 mt-4 mb-3">
              {total} messages analyzed &middot; {clusters.length} clusters found
            </p>

            {/* Signature element: proportional mosaic tiles instead of a bar chart */}
            <div className="flex flex-wrap gap-2">
              {clusters.map((c, i) => {
                const color = TILE_COLORS[i % TILE_COLORS.length];
                const weight = Math.max(c.size / total, 0.12);
                return (
                  <button
                    key={c.cluster_id}
                    onClick={() => setSelected(c)}
                    style={{ flexBasis: `${weight * 100}%` }}
                    className={`signal-tile grow min-w-[140px] text-left rounded-xl p-4 border border-line ${color.dim} hover:shadow-md`}
                  >
                    <div className={`text-2xl font-display font-bold ${color.text}`}>{c.size}</div>
                    <div className="text-xs font-mono text-ink/60 mt-1 truncate">
                      {c.top_words.slice(0, 3).join(", ")}
                    </div>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="mt-5 p-4 rounded-xl bg-paper border border-line">
                <p className="text-xs font-mono text-ink/40 mb-2 uppercase tracking-wide">
                  Cluster {selected.cluster_id} · sample messages
                </p>
                <ul className="space-y-1.5">
                  {selected.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-ink/80">— {ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {!clusters && !loading && (
          <p className="text-sm text-ink/40 mt-6">
            "Run Analysis" dabayein — training data ke messages ko topics mein group karega.
          </p>
        )}
      </div>
    </div>
  );
}
