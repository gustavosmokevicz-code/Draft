import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DraftLogo from "@/components/draft/DraftLogo";

const LINKS = [
  { label: "SOLUÇÕES", href: "#solucoes" },
  { label: "CONEXÕES", href: "#conexoes" },
  { label: "DIFERENCIAIS", href: "#diferenciais" },
  { label: "CONTATO", href: "#contato" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? {} : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-obsidian/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
        <a href="#top" className="group inline-flex items-center" aria-label="Draft">
          <DraftLogo />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-luxe uppercase text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="group inline-flex items-center gap-2 text-[11px] tracking-luxe uppercase text-white hover:text-white/80 transition-colors"
        >
          Fale conosco
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </motion.header>
  );
}
