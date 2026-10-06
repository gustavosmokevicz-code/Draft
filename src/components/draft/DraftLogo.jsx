import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOGO_SRC =
  "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/c04281479_WhatsAppImage2026-10-03at112319.jpeg";

let cachedSrc = null;

// Converte o fundo preto da logo em transparência: alpha proporcional à
// luminosidade do pixel (preto -> transparente, azul/cromado -> opaco),
// preservando as cores originais.
function processLogo(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.fetchPriority = "high";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const m = Math.max(px[i], px[i + 1], px[i + 2]);
          px[i + 3] = m < 6 ? 0 : Math.min(255, m * 1.7);
        }
        ctx.putImageData(data, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function DraftLogo() {
  const [src, setSrc] = useState(cachedSrc);
  const [useBlend, setUseBlend] = useState(false);

  useEffect(() => {
    if (src || useBlend) return;
    let alive = true;
    processLogo(LOGO_SRC)
      .then((dataUrl) => {
        if (!alive) return;
        cachedSrc = dataUrl;
        setSrc(dataUrl);
      })
      .catch(() => {
        if (alive) setUseBlend(true);
      });
    return () => {
      alive = false;
    };
  }, [src, useBlend]);

  const imgSrc = src || (useBlend ? LOGO_SRC : null);
  if (!imgSrc) return null;

  return (
    <span
      className="inline-block overflow-hidden aspect-[1.9/1] h-[42px] md:h-[56px] w-auto align-middle"
      style={{ lineHeight: 0 }}
    >
      <motion.img
        src={imgSrc}
        alt="Draft"
        draggable={false}
        loading="eager"
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="block w-full h-full object-cover object-[50%_51%] transition-[filter] duration-300 group-hover:brightness-110"
        style={useBlend ? { mixBlendMode: "screen" } : undefined}
      />
    </span>
  );
}
