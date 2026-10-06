import Nav from "@/components/draft/Nav";
import Hero from "@/components/draft/Hero";
import DraftManifesto from "@/components/draft/DraftManifesto";
import Solutions from "@/components/draft/Solutions";
import Scale from "@/components/draft/Scale";
import Differentials from "@/components/draft/Differentials";
import Contact from "@/components/draft/Contact";
import Footer from "@/components/draft/Footer";

export default function Home() {
  return (
    <div className="text-white overflow-x-clip bg-[#0A0A0A]">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <DraftManifesto />
        <Solutions />
        <Scale />
        <Differentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
