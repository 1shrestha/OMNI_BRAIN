export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#3B82F6] ring-4 ring-blue-100" />
          <span className="font-extrabold text-xl tracking-tight text-black">OmniBrain</span>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-10 text-[14px] font-medium text-slate-600">
          <a href="#demo" className="text-slate-900 hover:text-black transition-colors">
            Live demo
          </a>
          <a href="#how-it-works" className="hover:text-black transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-black transition-colors">
            Features
          </a>
        </nav>

        {/* Right Action */}
        <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[14px] font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100">
          Try it now
        </button>
      </div>
    </header>
  );
}