export default function PipelineGrid() {
  const steps = [
    {
      num: "01",
      title: "Scrape",
      desc: "OmniBrain fetches the page or document and pulls out the real content — text, structure, and context — while stripping the noise around it."
    },
    {
      num: "02",
      title: "Embed",
      desc: "Content is split into chunks and converted into vectors, stored so anything relevant can be found in milliseconds, not skimmed by hand."
    },
    {
      num: "03",
      title: "Chat",
      desc: "Ask a question in plain language. OmniBrain finds the relevant chunks and answers grounded in what it actually read — not a guess."
    }
  ];

  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-100">
      <div className="mb-12">
        <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">The Pipeline</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
          Three steps, same order, every time.
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          This is exactly what just ran above — no shortcuts, no black box.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item) => (
          <div key={item.num} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-500">
              {item.num}
            </span>
            <h3 className="font-bold text-slate-900 text-lg mt-4 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}