import { useRef, useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const EASE = [0.22, 1, 0.36, 1];

const SOLUTIONS = [
  {
    name: "Linhas de Montagem",
    subtitle:
      "Corredor central, estações equilibradas e esteira integrada — ritmo que sustenta a produção.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/c82a23af5_a6ea7897-94b2-4ff9-a216-2c8822774db2.jpg",
  },
  {
    name: "Células Robotizadas",
    subtitle:
      "Robôs cercados por segurança e precisão — ciclos repetíveis que elevam a qualidade.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/112140d2b_90d3cdaa-83f3-4718-a589-2142c0b3f0c4.png",
  },
  {
    name: "Acabadoras Tanque e Filler",
    subtitle:
      "Enchimento e acabamento sob controle — higiene e exatidão no volume de cada envase.",
    img: "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/f2ea8ed14_d95d9758-8000-4868-b131-c869174cbc92.png",
  },
];

const TITLE_L1 = "NOSSAS".split("");
const TITLE_L2 = "SOLUÇÕES".split("");

const titleLetter = {
  hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const slideVariants = {
  enter: (d) => ({ opacity: 0, filter: "blur(10px)", x: d * 60 }),
  center: { opacity: 1, filter: "blur(0px)", x: 0 },
  exit: (d) => ({ opacity: 0, x: -d * 60 }),
};

export default function Solutions() {
  const [[index, dir], setState] = useState([0, 1]);
  const reduce = useReducedMotion();
  const touchX = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const lsStart = isMobile ? "0.18em" : "0.3em";
  const lsEnd = isMobile ? "0.22em" : "0.4em";
  const titleContainer = {
    hidden: { letterSpacing: lsStart },
    show: {
      letterSpacing: lsEnd,
      transition: {
        letterSpacing: { duration: 1.8, ease: EASE, delay: 0.6 },
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const go = (i) => setState(([cur]) => [i, i > cur ? 1 : i < cur ? -1 : 1]);
  const nextS = () => setState(([cur]) => [cur + 1 >= SOLUTIONS.length ? 0 : cur + 1, 1]);
  const prevS = () => setState(([cur]) => [cur - 1 < 0 ? SOLUTIONS.length - 1 : cur - 1, -1]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) nextS();
    else if (dx > 40) prevS();
    touchX.current = null;
  };

  const slide = SOLUTIONS[index];

  // agrupa letras por palavra (sem quebrar no meio da palavra) mantendo o stagger
  const nameWords = slide.name.split(" ");
  let _idx = 0;
  const wordData = nameWords.map((w) => {
    const start = _idx;
    _idx += w.length;
    return { word: w, start };
  });

  return (
    <section id="solucoes" className="relative overflow-hidden overflow-x-clip">
      {/* brilho âmbar respirando no topo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 w-[80vw] max-w-[900px] h-[44vh]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(200,116,58,0.16), rgba(122,63,29,0.06) 45%, transparent 72%)",
        }}
        animate={reduce ? {} : { opacity: [0.4, 0.75, 0.4], x: ["-6%", "6%", "-6%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* degradê superior: do preto aos tons da imagem */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(to bottom, #0D0D0D 0%, rgba(122,63,29,0.06) 50%, rgba(200,116,58,0.04) 70%, transparent 100%)",
        }}
      />

      {/* bloco de título da seção */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-12 lg:pt-44 lg:pb-16">
        <div className="relative inline-block">
          <motion.h2
            variants={titleContainer}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="leading-[1.1]"
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 9vw, 6.5rem)",
              color: "#F5EFE8",
              display: "inline-block",
              textAlign: "center",
              whiteSpace: "nowrap",
              paddingLeft: lsEnd,
            }}
          >
            {TITLE_L1.map((l, i) => (
              <motion.span key={`s-${i}`} variants={titleLetter} style={{ display: "inline-block" }}>
                {l}
              </motion.span>
            ))}
            <br />
            {TITLE_L2.map((l, i) => (
              <motion.span key={`t-${i}`} variants={titleLetter} style={{ display: "inline-block" }}>
                {l}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE }}
          style={{ width: 40, height: 1, background: "#A8957E", transformOrigin: "left center" }}
          className="mt-10"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
          className="mt-8 max-w-[320px] lg:max-w-[440px] mx-auto"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#CFC8C0",
          }}
        >
          Três frentes que sustentam a operação DRAFT — do chão de fábrica à
          distribuição.
        </motion.p>
      </div>

      {/* carrossel */}
      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="relative w-full h-[60vh] lg:h-[82vh]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskComposite: "source-in",
          }}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-0"
            >
              {slide.img ? (
                <Image
                  src={slide.img}
                  alt={`${slide.name} — DRAFT`}
                  className="w-full h-full object-cover"
                  fittingType="fill"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 45%, rgba(200,116,58,0.10), transparent 70%), #0A0A0A",
                  }}
                />
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(13,13,13,0.55), transparent 28%)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* setas */}
        <button
          onClick={prevS}
          aria-label="Solução anterior"
          className="group absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 lg:w-14 lg:h-14"
        >
          <ChevronLeft
            strokeWidth={1}
            className="w-6 h-6 lg:w-7 lg:h-7 text-[#F5EFE8]/70 group-hover:text-[#F5EFE8] group-hover:drop-shadow-[0_0_10px_rgba(200,116,58,0.55)] transition-all duration-300"
          />
        </button>
        <button
          onClick={nextS}
          aria-label="Próxima solução"
          className="group absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 lg:w-14 lg:h-14"
        >
          <ChevronRight
            strokeWidth={1}
            className="w-6 h-6 lg:w-7 lg:h-7 text-[#F5EFE8]/70 group-hover:text-[#F5EFE8] group-hover:drop-shadow-[0_0_10px_rgba(200,116,58,0.55)] transition-all duration-300"
          />
        </button>
      </div>

      {/* nome + subtítulo da solução */}
      <div className="relative z-10 min-h-[150px] lg:min-h-[180px] text-center px-6 pt-10 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3
              className="leading-[1.15]"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                color: "#F5EFE8",
                letterSpacing: "0.06em",
                textAlign: "center",
                textWrap: "balance",
                overflowWrap: "normal",
                wordBreak: "normal",
                paddingLeft: "0.06em",
              }}
            >
              {wordData.map(({ word, start }, wi) => (
                <Fragment key={wi}>
                  <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {word.split("").map((ch, ci) => (
                      <motion.span
                        key={ci}
                        initial={{ y: 16, opacity: 0, filter: "blur(6px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, delay: 0.1 + (start + ci) * 0.04, ease: EASE }}
                        style={{ display: "inline-block" }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                  {wi < wordData.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
              className="mt-4 max-w-[320px] lg:max-w-[520px] mx-auto"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#CFC8C0",
              }}
            >
              {slide.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* indicador */}
      <div
        className="flex items-center justify-center gap-3 pb-20 lg:pb-28 px-6"
        style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.2em" }}
      >
        <span style={{ color: "#F5EFE8", fontSize: "13px" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ width: 28, height: 1, background: "rgba(245,239,232,0.3)" }} />
        <span style={{ color: "rgba(245,239,232,0.4)", fontSize: "13px" }}>
          {String(SOLUTIONS.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
