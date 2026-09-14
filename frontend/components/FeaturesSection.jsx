"use client";

import { useState } from "react";

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("Documents");

  const tabs = [
    { name: "Documents", desc: "Upload PDFs alongside websites, same index" },
    { name: "Chat", desc: "Ask follow-ups, get grounded answers" },
    { name: "Simulation", desc: "Run scenarios against your indexed content" },
    { name: "Analytics", desc: "See what's been analyzed and how it's used" }
  ];

  const documents = [
    {
      type: "PDF",
      title: "Q3-financial-report.pdf",
      meta: "41 chunks indexed • 12 pages",
      status: "Ready",
      isReady: true
    },
    {
      type: "DOC",
      title: "employee-handbook.docx",
      meta: "18 chunks indexed • 6 pages",
      status: "Ready",
      isReady: true
    },
    {
      type: "...",
      title: "product-specs.pdf",
      meta: "Uploading: 64%",
      status: "Processing",
      isReady: false
    }
  ];

  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-100">
      <div className="mb-12">
        <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Beyond One Page</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
          Everything that happens after &quot;analyze.&quot;
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Four things OmniBrain does with what it&apos;s read.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Side Tab Selector */}
        <div className="md:col-span-5 space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                activeTab === tab.name
                  ? "bg-slate-100 border-l-4 border-indigo-600"
                  : "hover:bg-slate-50 border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <span className={`h-2 w-2 rounded-full ${activeTab === tab.name ? "bg-indigo-600" : "bg-slate-300"}`} />
                {tab.name}
              </div>
              <p className="text-xs text-slate-500 mt-1 pl-4">{tab.desc}</p>
            </button>
          ))}
        </div>

        {/* Right Side Doc List Card */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                  {doc.type}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{doc.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{doc.meta}</p>
                </div>
              </div>

              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                doc.isReady 
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                  : "bg-indigo-50 text-indigo-600 border border-indigo-200 animate-pulse"
              }`}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}