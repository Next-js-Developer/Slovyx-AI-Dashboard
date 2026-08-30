"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import KnowledgeBaseUpload from "@/components/KnowledgeBaseUpload";
import ClassifierTester from "@/components/ClassifierTester";
import InsightsView from "@/components/InsightsView";
import OverviewTab from "./OverviewTab";

export default function DashboardPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="flex bg-paper min-h-screen">
      <Sidebar active={tab} onSelect={setTab} />
      <main className="flex-1 p-8">
        {tab === "overview" && <OverviewTab />}
        {tab === "knowledge" && <KnowledgeBaseUpload />}
        {tab === "classifier" && <ClassifierTester />}
        {tab === "insights" && <InsightsView />}
      </main>
    </div>
  );
}
