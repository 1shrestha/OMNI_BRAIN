import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveDemo from "@/components/InteractiveDemo";
import PipelineGrid from "@/components/PipelineGrid";
import FeaturesSection from "@/components/FeaturesSection";
import MetricsStrip from "@/components/MetricsStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <InteractiveDemo />
      </section>
      <PipelineGrid />
      <FeaturesSection />
      <MetricsStrip />
    </main>
  );
}