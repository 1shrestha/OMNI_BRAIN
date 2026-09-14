export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-6 text-center">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-indigo-100/60 via-purple-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#F3F0FF] mb-8">
        <span className="text-[11px] font-bold tracking-[0.18em] text-[#5850EC] uppercase">
          Website &nbsp;|&nbsp; Document Intelligence
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] text-[#0A0D14] leading-[1.08] max-w-4xl mx-auto mb-6">
        Point it at anything. <br />
        Ask it <span className="text-[#5850EC]">everything.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[16px] sm:text-[17px] text-slate-500 font-normal max-w-xl mx-auto leading-relaxed mb-10">
        Turn websites and documents into an AI you can actually talk to. Paste a URL or upload a document and let OmniBrain find the answers hidden inside.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#demo"
          className="inline-flex items-center gap-2 bg-[#5850EC] hover:bg-[#4940dc] text-white text-[14px] font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all"
        >
          <span>Try Live Demo</span>
          <span className="text-base leading-none">→</span>
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold px-6 py-3.5 rounded-xl border border-slate-200/80 shadow-sm transition-all"
        >
          See how it works
        </a>
      </div>
    </section>
  );
}