import { Linkedin, Instagram } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Conexões", href: "#conexoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 text-white border-t border-white/10 px-6 lg:px-12 py-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="font-heading font-extrabold tracking-tight text-xl">
            DRAFT<span className="text-bronze">.</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] tracking-luxe uppercase text-white/55">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/55 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-white/55 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-[10px] tracking-luxe uppercase text-white/40">
          <span>© {new Date().getFullYear()} DRAFT. Todos os direitos reservados.</span>
          <span className="flex items-center gap-3">
            <span className="block w-8 h-px bg-white/30" />
            Logística é movimento.
          </span>
        </div>
      </div>
    </footer>
  );
}
