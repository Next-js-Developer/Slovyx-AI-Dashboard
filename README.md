# Solvyx AI — Dashboard & Widget (Next.js)

Ye Next.js frontend `solvyx-ai` FastAPI backend se baat karta hai.

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Browser mein `http://localhost:3000` kholein.

- `/` — landing page
- `/dashboard` — admin dashboard (Overview, Knowledge Base upload, Classifier test, Insights/clustering)
- `/widget` — standalone embeddable chat widget (iframe ke liye)

## Zaroori: Backend pehlay chalayen

Is frontend ko FastAPI backend (`solvyx-ai` folder) ki zaroorat hai `http://localhost:8000` pe chalte hue. Dono terminals alag-alag chalayen:

**Terminal 1 (backend):**
```bash
cd solvyx-ai
uvicorn app.main:app --reload
```

**Terminal 2 (frontend):**
```bash
cd solvyx-dashboard
npm run dev
```

## Structure

```
app/
  page.tsx              - landing page
  dashboard/page.tsx     - admin dashboard (tabs)
  dashboard/OverviewTab.tsx
  widget/page.tsx        - embeddable widget page
  layout.tsx, globals.css
components/
  ChatWidget.tsx          - reusable chat UI
  Sidebar.tsx             - dashboard navigation
  KnowledgeBaseUpload.tsx - RAG document upload
  ClassifierTester.tsx    - supervised ML testing
  InsightsView.tsx        - unsupervised clustering visualization
lib/
  api.ts                  - saari backend API calls yahan hain
```

## Design notes

- Colors: Indigo (primary), Teal (positive), Amber (attention), Coral (urgent) — category-coded taake Billing/Technical/Shipping/Complaint visually distinct hon.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (data/metrics).
- Insights tab mein clustering ko generic bar chart ki jagah "signal tiles" (proportional mosaic) se dikhaya hai — tile ka size cluster size ke mutabiq hai.
<img width="1347" height="646" alt="slovyx" src="https://github.com/user-attachments/assets/7bc60c2c-1193-48fb-a677-4fedae2563d5" />
