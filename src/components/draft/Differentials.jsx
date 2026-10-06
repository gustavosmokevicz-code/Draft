import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";

const ITEMS = [
  {
    n: "01",
    title: "Precisão",
    desc: "Processos inteligentes que reduzem complexidade em cada etapa.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/d71077219_generated_image.png",
  },
  {
    n: "02",
    title: "Conexão",
    desc: "Pessoas, mercados e destinos aproximados por uma operação só.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/9fb46451e_generated_image.png",
  },
  {
    n: "03",
    title: "Estrutura",
    desc: "Infraestrutura que acompanha diferentes escalas de demanda.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/c8fc4d85b_generated_94df1b92.jpg",
  },
  {
    n: "04",
    title: "Confiança",
    desc: "O que nos move — relacionamentos construídos no longo prazo.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/394e11053_generated_image.png",
  },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="text-white py-28 lg:py-40 px-6 lg:px-12 border-t border-white/10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 lg:mb-24">
          <div className="lg:col-span-5">
            <span className="block w-10 h-px bg-bronze mb-6" />
            <span className="text-[10px] tracking-luxe uppercase text-white/45 mb-5 block">04 — Diferenciais</span>
            <Reveal>
              <h2 className="font-heading font-extrabold uppercase text-white text-[14vw] sm:text-[9vw] lg:text-[5.4vw] leading-[0.9]">
                Por que
                <br />
                DRAFT?
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:items-end">
            <Reveal delay={0.1}>
              <p className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-[42ch]">
                Uma operação construída sobre princípios que sustentam cada conexão —
                do detalhe à escala global.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {ITEMS.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.06}>
              <div className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5 mb-5">
                  <Image
                    src={it.img}
                    alt={`${it.title} — DRAFT`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    fittingType="fill"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                  <span className="absolute top-4 left-4 font-heading font-bold text-bronze text-sm tracking-luxe">
                    {it.n}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold uppercase text-white text-xl lg:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed max-w-[30ch]">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
