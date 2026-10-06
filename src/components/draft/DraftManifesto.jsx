import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";

const MAN_IMG =
  "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/23ee17695_WhatsAppImage2026-09-30at210526.jpeg";

const EASE = [0.22, 1, 0.36, 1];
const LINE1 = "DRAFT EM".split("");
const LINE2 = "MOVIMENTO".split("");

const letter = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export default function DraftManifesto() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const smoothTitle = useSpring(scrollYProgress, { stiffness: 70, damping: 30 });

  const rotateX = useTransform(smooth, [0, 1], [20, 0]);
  const scale = useTransform(smooth, [0, 1], isMobile ? [0.8, 0.95] : [1.05, 1]);
  const yImg = useTransform(smooth, [0, 1], [0, -60]);
  const yTitle = useTransform(smoothTitle, [0, 1], [0, -100]);

  const lsStart = isMobile ? "0.18em" : "0.3em";
  const lsEnd = isMobile ? "0.22em" : "0.4em";
  const container = {
    hidden: { letterSpacing: lsStart },
    show: {
      letterSpacing: lsEnd,
      transition: {
        letterSpacing: { duration: 1.8, ease: EASE, delay: 3.1 },
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section ref={ref} id="manifesto" className="relative overflow-hidden overflow-x-clip">
      {/* brilho âmbar respirando atrás do título */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 w-[80vw] max-w-[900px] h-[58vh]"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(200,116,58,0.16), transparent 70%)" }}
        animate={reduce ? {} : { opacity: [0.4, 0.75, 0.4], x: ["-6%", "6%", "-6%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* bloco tipográfico DRAFT */}
      <motion.div
        style={{ y: yTitle, willChange: "transform" }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 lg:pt-44 lg:pb-20"
      >
        <div className="relative inline-block">
          <motion.h2
            variants={container}
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
            {LINE1.map((l, i) => (
              <motion.span key={`a-${i}`} variants={letter} style={{ display: "inline-block" }}>
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
            <br />
            {LINE2.map((l, i) => (
              <motion.span key={`b-${i}`} variants={letter} style={{ display: "inline-block" }}>
                {l}
              </motion.span>
            ))}
          </motion.h2>

          {/* reflexo âmbar que desliza sobre o texto */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              aria-hidden
              className="absolute inset-y-0 w-[30%]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,221,180,0.55), transparent)", mixBlendMode: "screen" }}
              animate={reduce ? {} : { x: ["-130%", "430%"] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.4, delay: 5 }}
            />
          </div>
        </div>

        {/* linha divisória fina */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 3.3, duration: 0.9, ease: EASE }}
          style={{ width: 40, height: 1, background: "#A8957E", transformOrigin: "left center" }}
          className="mt-10"
        />

        {/* subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 3.7, duration: 0.9, ease: EASE }}
          className="mt-8 max-w-[320px] lg:max-w-[420px] mx-auto"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.8, color: "#CFC8C0" }}
        >
          Precisão não acontece por acaso. Ela está em cada etapa, em cada
          detalhe do movimento que conecta origem e destino.
        </motion.p>
      </motion.div>

      {/* imagem emergindo do preto, sem emendas — efeito scroll 3D sem moldura */}
      <div style={{ perspective: "1000px" }} className="relative w-full">
        <motion.div
          style={{
            rotateX,
            scale,
            y: yImg,
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-[66vh] lg:h-[86vh]"
        >
          <div
            className="relative w-full h-full"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
            }}
          >
            <Image
              src={MAN_IMG}
              alt="Profissional DRAFT operando máquina com precisão"
              className="w-full h-full object-cover"
              fittingType="fill"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
