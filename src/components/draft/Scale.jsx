import { useRef, useEffect, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

const VIDEO_SRC =
  "https://media.base44.com/videos/public/6abb0c71c402aa77ed26af98/dee988c7a_Connecting_Joinville_to_internat_20261001215235.mp4";
const POSTER =
  "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/d69057fa6_9232f951-ab03-453d-bcae-b6f6395d4787.png";

/* ===== CONFIGURAÇÃO (edite aqui) ===== */
const ROUTES = [
  { destino: "SÃO PAULO", inicio: 0.0, fim: 2.5 },
  { destino: "ÍNDIA", inicio: 2.5, fim: 5.5 },
  { destino: "CHINA", inicio: 5.5, fim: 8.0 },
];

const EARTH_SIZE = "min(78vw, 68vh)"; // diâmetro do globo (desktop)
const EARTH_SIZE_MOBILE = "115vw"; // diâmetro do globo (mobile)
const WRAPPER_SCALE = 1.4; // wrapper ~140% do globo (fade só no preto)

// Faixas de scroll (frações de 0..1)
const RANGE = { s1: 0.15, t1End: 0.4, s2: 0.6, t2End: 0.85 };
const TEXT_PARALLAX = 0.12; // texto se move 1.12x em relação à Terra
const EASE = [0.22, 1, 0.36, 1];
const AMBER = "#C8743A";

const SUBTITLE =
  "De Joinville para o mundo. Cada rota é planejada para mover produtos, pessoas e confiança entre mercados distantes.";

const EDGE_H =
  "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)";
const EDGE_V =
  "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)";
const EARTH_MASK = `${EDGE_H}, ${EDGE_V}`;

export default function Scale() {
  const containerRef = useRef(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSet, setActiveSet] = useState([true, false, false]); // vídeos a tocar
  const topBlockRef = useRef(null);
  const routeTextRef = useRef(null);
  const [topH, setTopH] = useState(0);
  const [routeH, setRouteH] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  // Posição contínua da trilha (0..2 slides)
  const pos = useTransform(
    smooth,
    [0, RANGE.s1, RANGE.t1End, RANGE.s2, RANGE.t2End, 1],
    [0, 0, 1, 1, 2, 2]
  );
  const trackX = useTransform(pos, (v) => -v * 100); // vw
  const trackStyle = useMotionTemplate`translate3d(${trackX}vw,0,0)`;

  // Parallax por slide: zera no repouso (pos == i), cresce durante a transição
  const par0 = useTransform(pos, (v) => -(v - 0) * 100 * TEXT_PARALLAX);
  const par1 = useTransform(pos, (v) => -(v - 1) * 100 * TEXT_PARALLAX);
  const par2 = useTransform(pos, (v) => -(v - 2) * 100 * TEXT_PARALLAX);
  const parStyles = [
    useMotionTemplate`translate3d(${par0}vw,0,0)`,
    useMotionTemplate`translate3d(${par1}vw,0,0)`,
    useMotionTemplate`translate3d(${par2}vw,0,0)`,
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mede a altura do bloco de título e do texto da rota para posicionar a rota
  // e a Terra com espaçamentos precisos (subtítulo ↔ rota ↔ globo).
  useLayoutEffect(() => {
    const measure = () => {
      if (topBlockRef.current) setTopH(topBlockRef.current.offsetHeight);
      if (routeTextRef.current) setRouteH(routeTextRef.current.offsetHeight);
    };
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (topBlockRef.current) ro.observe(topBlockRef.current);
      if (routeTextRef.current) ro.observe(routeTextRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Atualiza slide dominante + vídeos ativos
  useEffect(() => {
    return pos.on("change", (v) => {
      const dom = Math.min(2, Math.max(0, Math.round(v)));
      const frac = v - Math.floor(v);
      const nearRest = frac < 0.08 || frac > 0.92;
      const set = ROUTES.map((_, i) =>
        nearRest ? i === dom : i === Math.floor(v) || i === Math.ceil(v)
      );
      setActiveSet(set);
    });
  }, [pos]);

  const earthSize = isMobile ? EARTH_SIZE_MOBILE : EARTH_SIZE;

  /* ---------- prefers-reduced-motion: rotas empilhadas ---------- */
  if (reduce) {
    return (
      <section id="conexoes" className="relative bg-[#0A0A0A] text-white overflow-x-clip">
        <div className="px-6 pt-24 pb-28 flex flex-col items-center text-center">
          <span
            className="block uppercase text-white/45 mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", letterSpacing: "0.3em" }}
          >
            03 — Conexões
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 6vw, 3.4rem)",
              color: "#F5EFE8",
              letterSpacing: "0.2em",
              lineHeight: 1.1,
            }}
          >
            NOSSAS CONEXÕES
          </h2>
          <div className="mt-8" style={{ width: 40, height: 1, background: "#A8957E" }} />
          <p
            className="mt-6 max-w-[480px] mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.8, color: "#CFC8C0" }}
          >
            {SUBTITLE}
          </p>
          <div className="mt-16 flex flex-col gap-24 w-full items-center">
            {ROUTES.map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-5">
                <div
                  className="flex items-center justify-center gap-3 flex-wrap"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.95rem, 4vw, 1.4rem)",
                    color: "#FFFFFF",
                    letterSpacing: "0.2em",
                    textWrap: "balance",
                  }}
                >
                  <span>JOINVILLE</span>
                  <Arrow />
                  <span>{r.destino}</span>
                </div>
                <StaticEarth size={earthSize} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- experiência de scroll horizontal ---------- */
  return (
    <section
      id="conexoes"
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white overflow-x-clip"
      style={{ height: isMobile ? "450vh" : "500vh" }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          ["--earth-size"]: earthSize,
        }}
      >
        {/* brilho âmbar respirando no topo */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 w-[80vw] max-w-[900px] h-[40vh] z-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(200,116,58,0.16), rgba(122,63,29,0.06) 45%, transparent 72%)",
          }}
          animate={{ opacity: [0.4, 0.75, 0.4], x: ["-6%", "6%", "-6%"] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* degradê superior: do preto aos tons âmbar */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] z-0"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0A 0%, rgba(122,63,29,0.06) 50%, rgba(200,116,58,0.04) 70%, transparent 100%)",
          }}
        />

        {/* TOPO FIXO (não anima com o scroll) */}
        <div ref={topBlockRef} className="relative z-20 flex flex-col items-center justify-center text-center px-6 pt-20 lg:pt-24">
          <span
            className="block uppercase text-white/45 mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", letterSpacing: "0.3em" }}
          >
            03 — Conexões
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="leading-[1.1]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4.2vw, 4rem)",
              color: "#F5EFE8",
              letterSpacing: isMobile ? "0.2em" : "0.3em",
              whiteSpace: isMobile ? "normal" : "nowrap",
              textWrap: "balance",
            }}
          >
            NOSSAS CONEXÕES
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            style={{ width: 40, height: 1, background: "#A8957E", transformOrigin: "left center" }}
            className="mt-7"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            className="mt-6 max-w-[320px] lg:max-w-[480px] mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.8, color: "#CFC8C0" }}
          >
            {SUBTITLE}
          </motion.p>
        </div>

        {/* TRILHA HORIZONTAL (3 slides) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            maskImage: EDGE_H,
            WebkitMaskImage: EDGE_H,
          }}
        >
          <motion.div
            className="flex h-full"
            style={{ transform: trackStyle, willChange: "transform" }}
          >
            {ROUTES.map((r, i) => (
              <div
                key={i}
                className="relative w-screen h-full flex-shrink-0"
              >
                {/* texto da rota (parallax 1.12x, zera no repouso) */}
                <motion.div
                  ref={i === 0 ? routeTextRef : undefined}
                  className="absolute inset-x-0 flex flex-col items-center text-center px-6"
                  style={{
                    transform: parStyles[i],
                    top: topH ? `calc(${topH}px + clamp(32px, 6vh, 64px))` : "38vh",
                  }}
                >
                  <div
                    className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(0.95rem, 1.7vw, 1.4rem)",
                      color: "#FFFFFF",
                      letterSpacing: "0.28em",
                      lineHeight: 1.2,
                      textWrap: "balance",
                    }}
                  >
                    <span>JOINVILLE</span>
                    <Arrow />
                    <span>{r.destino}</span>
                  </div>
                </motion.div>

                {/* Terra em vídeo (topo a ~clamp(16px,3vh,32px) abaixo da rota) */}
                <div
                  className="absolute left-1/2"
                  style={{
                    top:
                      topH && routeH
                        ? `calc(${topH}px + clamp(32px, 6vh, 64px) + ${routeH}px + clamp(16px, 3vh, 32px) + var(--earth-size) / 2)`
                        : `calc(38vh + 28px + clamp(16px, 3vh, 32px) + var(--earth-size) / 2)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <EarthVideo route={r} active={activeSet[i]} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ===== Terra em vídeo (sem bordas) ===== */
function EarthVideo({ route, active }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      try {
        if (v.currentTime < route.inicio || v.currentTime >= route.fim) v.currentTime = route.inicio;
      } catch (e) {}
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, route]);

  const onTime = () => {
    const v = ref.current;
    if (!v) return;
    if (v.currentTime >= route.fim) v.currentTime = route.inicio;
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: `calc(var(--earth-size) * ${WRAPPER_SCALE})`,
        height: `calc(var(--earth-size) * ${WRAPPER_SCALE})`,
        backgroundColor: "#0A0A0A",
        isolation: "isolate",
        WebkitMaskImage: EARTH_MASK,
        maskImage: EARTH_MASK,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <video
        ref={ref}
        src={VIDEO_SRC}
        poster={POSTER}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onTimeUpdate={onTime}
        className="pointer-events-none select-none"
        style={{
          width: "var(--earth-size)",
          height: "var(--earth-size)",
          objectFit: "contain",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

/* ===== Terra estática (reduced motion) ===== */
function StaticEarth({ size }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: `calc(${size} * ${WRAPPER_SCALE})`,
        height: `calc(${size} * ${WRAPPER_SCALE})`,
        backgroundColor: "#0A0A0A",
        isolation: "isolate",
        WebkitMaskImage: EARTH_MASK,
        maskImage: EARTH_MASK,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        style={{ width: size, height: size, objectFit: "contain", mixBlendMode: "screen" }}
      />
    </div>
  );
}

/* ===== Seta fina âmbar ===== */
function Arrow() {
  return (
    <svg width="52" height="14" viewBox="0 0 52 14" fill="none" className="inline-block align-middle" aria-hidden="true">
      <line x1="2" y1="7" x2="42" y2="7" stroke={AMBER} strokeWidth="1.2" />
      <path d="M38 3 L44 7 L38 11" stroke={AMBER} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
