/**
 * Ek jagah jahan se saari FastAPI backend calls hoti hain.
 * NEXT_PUBLIC_ prefix zaroori hai taake ye variable browser (client-side)
 * mein bhi available ho — Next.js sirf isi prefix wale env vars ko
 * frontend bundle mein bhejta hai (security ke liye — baqi sab server-only).
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ChatResponse {
  session_id: string;
  reply: string;
}

export async function sendChatMessage(
  sessionId: string | null,
  message: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`);
  return res.json();
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/api/ingest`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return res.json() as Promise<{ filename: string; chunks_created: number }>;
}

export async function classifyMessage(message: string) {
  const res = await fetch(`${API_URL}/api/classify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`Classify failed: ${res.status}`);
  return res.json() as Promise<{ result: string }>;
}

export async function retrainClassifier() {
  const res = await fetch(`${API_URL}/api/train-classifier`, { method: "POST" });
  if (!res.ok) throw new Error(`Training failed: ${res.status}`);
  return res.json() as Promise<{ accuracy: number; test_examples: number; report: string }>;
}

export interface Cluster {
  cluster_id: number;
  size: number;
  top_words: string[];
  examples: string[];
}

export async function fetchInsights(nClusters: number = 4) {
  const res = await fetch(`${API_URL}/api/insights`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: null, n_clusters: nClusters }),
  });
  if (!res.ok) throw new Error(`Insights failed: ${res.status}`);
  return res.json() as Promise<{ clusters: Cluster[]; total_messages: number }>;
}
