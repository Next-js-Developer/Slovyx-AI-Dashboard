"use client";

import { useState } from "react";
import { uploadDocument } from "@/lib/api";

export default function KnowledgeBaseUpload() {
  const [status, setStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setStatus(null);
    try {
      const result = await uploadDocument(file);
      setStatus(`✓ "${result.filename}" se ${result.chunks_created} chunks knowledge base mein add hue.`);
    } catch {
      setStatus("Upload fail ho gaya — backend chal raha hai check karein.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-line p-6 max-w-xl">
      <h2 className="font-display font-semibold text-lg text-ink mb-1">Knowledge Base</h2>
      <p className="text-sm text-ink/60 mb-5">
        Policy documents (.txt, .md) upload karein — ye chunk aur embed ho kar
        ChromaDB mein store hongay, agent RAG search se inhein use karega.
      </p>

      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-line rounded-xl py-10 cursor-pointer hover:border-indigo hover:bg-indigo-dim/40 transition-colors">
        <span className="text-sm font-medium text-ink">
          {isUploading ? "Uploading..." : "Document choose karein"}
        </span>
        <span className="text-xs text-ink/40">.txt ya .md files</span>
        <input
          type="file"
          accept=".txt,.md"
          onChange={handleFile}
          className="hidden"
          disabled={isUploading}
        />
      </label>

      {status && (
        <div className="mt-4 text-sm px-3.5 py-2.5 rounded-lg bg-teal-dim text-teal font-medium">
          {status}
        </div>
      )}
    </div>
  );
}
