import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const divider = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   LETTER BY LETTER
========================================================= */

const letter = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   WITH — SIDE ENTRY
========================================================= */

const withAnimation = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   LIGHTWEIGHT PAPER POPPER (perf-tuned, memoized)
========================================================= */

function useConfettiParticles(count, spreadMin, spreadMax) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = spreadMin + Math.random() * (spreadMax - spreadMin);

        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: Math.random() * 720 - 360,
          delay: Math.random() * 0.3,
          width: 3 + Math.random() * 4,
          height: 7 + Math.random() * 8,
          scale: 0.7 + Math.random() * 0.5,
          color: Math.random() > 0.5 ? "#E4C28A" : "#D6A85F",
        };
      }),
    [count, spreadMin, spreadMax]
  );
}

function useSparks(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count;

        return {
          id: i,
          x: Math.cos(angle) * (110 + Math.random() * 120),
          y: Math.sin(angle) * (110 + Math.random() * 120),
          delay: i * 0.02,
        };
      }),
    [count]
  );
}

function NamePopper({ active }) {
  // hooks always run — particles are computed once and reused
  const paper = useConfettiParticles(42, 220, 520);
  const sparks = useSparks(14);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* paper pieces */}
      {paper.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/2 block rounded-[1px]"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            background: p.color,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: p.x,
            y: p.y,
            scale: [0, p.scale, p.scale, 0.3],
            rotate: p.rotate,
          }}
          transition={{
            duration: 1.9,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* soft golden burst glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0.7, 0], scale: [0, 1, 4.5, 8] }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E4C28A]/30 blur-2xl"
      />

      {/* quick flash */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0, 2.2, 6] }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7E7C1] blur-md"
      />

      {/* sparks */}
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute left-1/2 top-1/2 block h-[3px] w-[3px] rounded-full bg-[#F7E7C1]"
          style={{ willChange: "transform, opacity" }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.6, 0],
            x: s.x,
            y: s.y,
          }}
          transition={{
            duration: 0.9,
            delay: 0.05 + s.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

function AnimatedDivider() {
  return (
    <motion.div
      variants={divider}
      initial="hidden"
      animate="show"
      className="mt-5 flex items-center gap-3 text-[#B8894F]"
    >
      <span className="h-px w-8 bg-[#6F5034] sm:w-10" />

      <motion.span
        className="text-[10px] text-[#D6A85F]"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.4,
        }}
      >
        ♡
      </motion.span>

      <span className="h-px w-8 bg-[#6F5034] sm:w-10" />
    </motion.div>
  );
}

function AnimatedName({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

export default function Page2() {
  const pageRef = useRef(null);
  const triggeredRef = useRef(false);

  const isInView = useInView(pageRef, {
    amount: 0.65,
    once: true,
  });

  const [started, setStarted] = useState(false);
  const [showNamePopper, setShowNamePopper] = useState(false);

  useEffect(() => {
    if (!isInView || triggeredRef.current) return;
    triggeredRef.current = true;

    // popper fires first...
    setShowNamePopper(true);

    // ...then the names reveal shortly after, while it's still settling
    const nameTimer = window.setTimeout(() => {
      setStarted(true);
    }, 380);

    const popperTimer = window.setTimeout(() => {
      setShowNamePopper(false);
    }, 2200);

    return () => {
      window.clearTimeout(nameTimer);
      window.clearTimeout(popperTimer);
    };
  }, [isInView]);

  return (
    <section
      ref={pageRef}
      className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center"
    >
      <NamePopper active={showNamePopper} />

      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="mx-auto flex w-full max-w-[560px] flex-col items-center justify-center"
      >
        {/* Together Forever */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center"
        >
          <p className="font-serif text-[17px] tracking-wide text-[#946F45] sm:text-lg md:text-xl">
            Together Forever
          </p>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          variants={{
            hidden: { width: 0, opacity: 0 },
            show: {
              width: 75,
              opacity: 1,
              transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className="mb-5 h-px bg-gradient-to-r from-transparent via-[#946F45] to-transparent"
        />

        {/* Bride */}
        <motion.div className="mt-8 flex flex-col items-center sm:mt-10">
          <h1 className="font-['Great_Vibes'] text-[68px] leading-none text-[#946F45] sm:text-[80px] md:text-[94px]">
            {started && <AnimatedName>Jasmi</AnimatedName>}
          </h1>
        </motion.div>

        {/* With */}
        <motion.div
          initial="hidden"
          animate={started ? "show" : "hidden"}
          variants={withAnimation}
          className="mt-5 flex flex-col items-center sm:mt-4"
        >
          <p className="text-[9px] font-medium tracking-[0.28em] text-[#946F45] sm:text-[10px] md:text-[11px]">
            WITH
          </p>
        </motion.div>

        {/* Groom */}
        <motion.div className="mt-6 flex flex-col items-center sm:mt-7">
          <h1 className="font-['Great_Vibes'] text-[68px] leading-none text-[#946F45] sm:text-[80px] md:text-[94px]">
            {started && <AnimatedName>Al Ameen</AnimatedName>}
          </h1>

          {started && <AnimatedDivider />}
        </motion.div>

        {/* Bottom Writing */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex flex-col items-center font-serif text-[11px] leading-[1.9] text-[#946F45] sm:mt-7 sm:text-xs md:text-sm"
        >
          <p>Two hearts, one</p>
          <p>beautiful journey</p>
        </motion.div>
      </motion.div>
    </section>
  );
}