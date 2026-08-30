import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-xl bg-indigo flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-display font-bold text-lg">S</span>
        </div>
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Solvyx AI</h1>
        <p className="text-sm text-ink/60 mb-6">
          RAG + AI Agent + Supervised/Unsupervised ML — support intelligence platform.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-indigo text-white text-sm font-medium hover:bg-indigo/90 transition-colors"
          >
            Open Dashboard
          </Link>
          <Link
            href="/widget"
            className="px-5 py-2.5 rounded-lg border border-line text-ink text-sm font-medium hover:bg-white transition-colors"
          >
            View Widget
          </Link>
        </div>
      </div>
    </div>
  );
}
