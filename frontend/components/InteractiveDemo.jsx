"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function InteractiveDemo() {
  const [selectedSource, setSelectedSource] = useState("Q3-financial-report.pdf");
  const [activeStep, setActiveStep] = useState(0); // 0: Idle, 1: Scrape, 2: Embed, 3: Ready
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [isStreamingChat, setIsStreamingChat] = useState(false);

  const sampleSources = [
    "docs.your-api.com",
    "acme-industrial.com",
    "Q3-financial-report.pdf",
  ];

  // 1. Live SSE call for document analysis
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setActiveStep(1);
    setStreamedAnswer("");

    try {
      const response = await fetch("http://localhost:5000/api/documents/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: selectedSource, type: "pdf" }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.replace("data: ", "").trim());

              if (data.step === "scrape" && data.status === "in_progress") setActiveStep(1);
              if (data.step === "embed" && data.status === "in_progress") setActiveStep(2);
              if (data.step === "chat" && data.status === "ready") {
                setActiveStep(3);
                setIsAnalyzing(false);
              }
            } catch {
              // Ignore malformed partial chunks
            }
          }
        }
      }
    } catch (err) {
      console.error("Analyze error:", err);
      setIsAnalyzing(false);
    }
  };

  // 2. Live SSE call for chat token stream
  const handleSend = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || isStreamingChat) return;

    setIsStreamingChat(true);
    setStreamedAnswer("");

    try {
      const response = await fetch("http://localhost:5000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage, document_ids: ["doc_1"] }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.replace("data: ", "").trim());
              if (data.token) {
                setStreamedAnswer((prev) => prev + data.token);
              }
              if (data.done) {
                setIsStreamingChat(false);
              }
            } catch {
              // Ignore partial stream frames
            }
          }
        }
      }
    } catch (err) {
      console.error("Chat streaming error:", err);
      setIsStreamingChat(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-7 md:p-9 text-left">
      <div className="space-y-3">
        <p className="text-[11px] font-mono tracking-wider text-slate-400 uppercase font-medium">
          STEP 1 — GIVE IT SOMETHING TO READ
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-800 focus:outline-none focus:border-slate-400 shadow-sm"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-[#4338CA] hover:bg-[#3730A3] disabled:opacity-70 text-white font-medium px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm min-w-[120px]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {sampleSources.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedSource(chip)}
              className={`text-xs font-mono px-3 py-1 rounded-md border transition-all ${
                selectedSource === chip
                  ? "bg-slate-100 border-slate-400 text-slate-900 font-semibold"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Stepper Pipeline */}
      <div className="grid grid-cols-3 gap-6 border-t border-slate-100 mt-8 pt-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                activeStep > 1
                  ? "bg-emerald-500 text-white"
                  : activeStep === 1
                  ? "bg-indigo-600 text-white animate-pulse"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {activeStep > 1 ? <Check className="h-3 w-3 stroke-[3]" /> : "1"}
            </div>
            <span className="text-sm font-semibold text-slate-900">Scrape</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">Reads and parses the content</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                activeStep > 2
                  ? "bg-emerald-500 text-white"
                  : activeStep === 2
                  ? "bg-indigo-600 text-white animate-pulse"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {activeStep > 2 ? <Check className="h-3 w-3 stroke-[3]" /> : "2"}
            </div>
            <span className="text-sm font-semibold text-slate-900">Embed</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">Chunks it into searchable vectors</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                activeStep === 3 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              3
            </div>
            <span className="text-sm font-semibold text-slate-900">Chat</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">Ready for your questions</p>
        </div>
      </div>

      {/* Chat Section */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-center">
          <button
            onClick={() => setChatMessage("Summarize the key figures in this document.")}
            className="text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full transition-all"
          >
            Summarize the key figures in this document.
          </button>
        </div>

        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            disabled={activeStep < 3}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder={activeStep < 3 ? "Run 'Analyze' to unlock chat..." : "Ask a follow-up question..."}
            className="w-full bg-[#FAF9F5]/70 border border-slate-200 rounded-xl pl-4 pr-20 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={activeStep < 3 || !chatMessage.trim() || isStreamingChat}
            className="absolute right-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40"
          >
            {isStreamingChat ? "Streaming..." : "Send"}
          </button>
        </form>

        {streamedAnswer && (
          <div className="p-4 bg-[#3B82F6] text-white rounded-xl text-sm leading-relaxed shadow-sm font-normal">
            {streamedAnswer}
          </div>
        )}
      </div>
    </div>
  );
}