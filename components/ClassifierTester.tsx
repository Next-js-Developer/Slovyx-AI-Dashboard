"use client";

import { useState } from "react";
import { classifyMessage, retrainClassifier } from "@/lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  Billing: "bg-amber-dim text-amber",
  Technical: "bg-indigo-dim text-indigo",
  Shipping: "bg-teal-dim text-teal",
  Complaint: "bg-coral-dim text-coral",
  General: "bg-paper text-ink/70",
};

export default function ClassifierTester() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trainOutput, setTrainOutput] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  async function handleClassify() {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const data = await classifyMessage(message);
      setResult(data.result);
    } catch {
      setResult("Error — backend check karein.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRetrain() {
    setIsTraining(true);
    setTrainOutput(null);
    try {
      const data = await retrainClassifier();
      setTrainOutput(`Accuracy: ${(data.accuracy * 100).toFixed(1)}% (${data.test_examples} test examples)`);
    } catch {
      setTrainOutput("Training fail ho gaya.");
    } finally {
      setIsTraining(false);
    }
  }

  // Result string se category name nikaal kar color badge dikhane ke liye
  const categoryMatch = result?.match(/Category:\s*(\w+)/);
  const categoryName = categoryMatch?.[1];

  return (
    <div className="bg-white rounded-2xl border border-line p-6 max-w-xl">
      <h2 className="font-display font-semibold text-lg text-ink mb-1">Ticket Classifier</h2>
      <p className="text-sm text-ink/60 mb-5">
        Supervised ML model (TF-IDF + Logistic Regression) — kisi bhi message
        ki category predict karta hai.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Test message likhein, jaise: 'mera order abhi tak nahi aaya'"
        rows={3}
        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo resize-none"
      />

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleClassify}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-indigo text-white text-sm font-medium hover:bg-indigo/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Predicting..." : "Classify"}
        </button>
        <button
          onClick={handleRetrain}
          disabled={isTraining}
          className="px-4 py-2 rounded-lg border border-line text-ink text-sm font-medium hover:bg-paper disabled:opacity-50 transition-colors"
        >
          {isTraining ? "Training..." : "Retrain Model"}
        </button>
      </div>

      {result && (
        <div className="mt-4 flex items-center gap-2">
          {categoryName && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[categoryName] || "bg-paper text-ink"}`}>
              {categoryName}
            </span>
          )}
          <span className="text-sm font-mono text-ink/60">{result}</span>
        </div>
      )}

      {trainOutput && (
        <p className="mt-3 text-xs font-mono text-ink/50">{trainOutput}</p>
      )}
    </div>
  );
}
