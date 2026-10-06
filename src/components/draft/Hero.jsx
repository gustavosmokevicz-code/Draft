import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";

const DESKTOP =
  "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/f6242b018_a897aba2-daed-496c-93f4-b341a6982c1b.jpg";
const MOBILE =
  "https://media.base44.com/images/public/6abb0c71c402aa77ed26af98/53e834269_89913e55-3a39-4077-b15a-2d774f602e53.jpg";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Desktop composition (16:9) */}
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 hidden lg:block"
      >
        <Image
          src={DESKTOP}
          alt="DRAFT — sede em Joinville, Santa Catarina"
          className="w-full h-full"
          fittingType="fill"
        />
      </motion.div>

      {/* Mobile composition (9:16) */}
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 block lg:hidden"
      >
        <Image
          src={MOBILE}
          alt="DRAFT — sede em Joinville, Santa Catarina"
          className="w-full h-full"
          fittingType="fill"
        />
      </motion.div>

      {/* fade do rodapé do hero para o preto da próxima seção */}
      <div
        className="absolute inset-x-0 bottom-0 h-[14vh] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0D0D0D)" }}
      />
    </section>
  );
}
