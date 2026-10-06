import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";

const BG =
  "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/c5d0e0c1c_generated_image.png";

export default function Contact() {
  return (
    <section id="contato" className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image src={BG} alt="Estrada ao pôr do sol — DRAFT" className="w-full h-full object-cover" fittingType="fill" />
        <div className="absolute inset-0 bg-obsidian/55" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12 py-32 lg:py-52">
        <div className="max-w-[640px]">
          <span className="block w-10 h-px bg-bronze mb-6" />
          <span className="text-[10px] tracking-luxe uppercase text-white/55 mb-5 block">05 — Contato</span>
          <Reveal>
            <h2 className="font-heading font-extrabold uppercase text-white text-[15vw] sm:text-[10vw] lg:text-[6vw] leading-[0.9]">
              Vamos
              <br />
              movimentar.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-white/75 text-lg lg:text-xl leading-relaxed max-w-[42ch]">
              Da nossa operação em Joinville para destinos cada vez mais conectados.
              Conte sua próxima jornada com a DRAFT.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="mailto:contato@draft.com.br"
              className="group mt-10 inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-[11px] tracking-luxe uppercase text-white hover:bg-white hover:text-obsidian transition-colors duration-300"
            >
              Fale conosco
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
