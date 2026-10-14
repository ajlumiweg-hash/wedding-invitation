import { useMemo } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import mosque from "../assets/mosque.png";

export default function Background() {
  // computed once (memoized) so re-renders never re-randomize or cause jank
  const dustStars = useMemo(
    () =>
      Array.from({ length: 200 }, (_, i) => ({
        id: `dust-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.2 + 0.5,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        driftX: (Math.random() - 0.5) * 22,
        driftY: (Math.random() - 0.5) * 22,
      })),
    []
  );

  const heroStars = useMemo(
    () =>
      Array.from({ length: 66 }, (_, i) => ({
        id: `hero-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.2 + 2,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 3,
        driftX: (Math.random() - 0.5) * 30,
        driftY: (Math.random() - 0.5) * 30,
      })),
    []
  );

  const background = (
    <div className="pointer-events-none fixed top-0 left-0 right-0 h-[100svh] z-0 overflow-hidden bg-[#07152F]">
      {/* =========================
          PURE DEEP NAVY BASE
      ========================= */}
      <div className="absolute inset-0 bg-[#07152F]" />

      {/* =========================
          CORNER L MOTIFS
      ========================= */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 44 44"
        className="absolute top-4 right-4 z-10 rotate-90 opacity-55 sm:top-6 sm:right-6"
      >
        <path
          d="M2 22 L2 2 L22 2"
          fill="none"
          stroke="#C8D8FF"
          strokeWidth="0.75"
        />
        <circle cx="2" cy="2" r="2" fill="#C8D8FF" />
      </svg>

      <svg
        width="36"
        height="36"
        viewBox="0 0 44 44"
        className="absolute bottom-4 left-4 z-10 -rotate-90 opacity-55 sm:bottom-6 sm:left-6"
      >
        <path
          d="M2 22 L2 2 L22 2"
          fill="none"
          stroke="#C8D8FF"
          strokeWidth="0.75"
        />
        <circle cx="2" cy="2" r="2" fill="#C8D8FF" />
      </svg>

      <svg
        width="36"
        height="36"
        viewBox="0 0 44 44"
        className="absolute bottom-4 right-4 z-10 rotate-180 opacity-55 sm:bottom-6 sm:right-6"
      >
        <path
          d="M2 22 L2 2 L22 2"
          fill="none"
          stroke="#C8D8FF"
          strokeWidth="0.75"
        />
        <circle cx="2" cy="2" r="2" fill="#C8D8FF" />
      </svg>

      {/* =========================
          SUBTLE NAVY DEPTH
      ========================= */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(23,43,104,0.18),transparent_48%),linear-gradient(180deg,#050B1C_0%,#091631_55%,#050B1C_100%)]" />

      {/* =========================
          VERY SOFT ATMOSPHERE
      ========================= */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(110,168,245,0.05),transparent_42%)]" />
      </motion.div>

      {/* =========================
          SUBTLE STAR DUST
      ========================= */}
      <div className="absolute inset-0">
        {dustStars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-[#8FAFEA]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 2.5}px rgba(200,216,255,0.35)`,
              willChange: "transform, opacity",
            }}
            animate={{
              opacity: [0.12, 0.55, 0.12],
              x: [0, star.driftX, 0],
              y: [0, star.driftY, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* =========================
          PREMIUM HERO STARS
      ========================= */}
      <div className="absolute inset-0">
        {heroStars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-[#C8D8FF]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 3}px rgba(200,216,255,0.45)`,
              willChange: "transform, opacity",
            }}
            animate={{
              opacity: [0.25, 0.8, 0.25],
              scale: [0.9, 1.18, 0.9],
              x: [0, star.driftX, 0],
              y: [0, star.driftY, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* =========================
          DISTANT MOSQUE GLOW
      ========================= */}
      <div className="absolute bottom-0 left-1/2 h-40 w-[65%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_bottom,rgba(200,216,255,0.06),transparent_72%)]" />

      {/* =========================
          DISTANT MOSQUE
      ========================= */}
      <motion.img
        src={mosque}
        alt=""
        className="absolute bottom-[4%] left-1/2 w-[55%] max-w-[225px] -translate-x-1/2 opacity-65 sm:w-[46%] sm:max-w-[255px] md:w-[38%] md:max-w-[285px]"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 0.65,
          y: [0, -1.5, 0],
        }}
        transition={{
          opacity: {
            duration: 1.8,
            ease: "easeOut",
          },
          y: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          },
        }}
      />

      {/* =========================
          BOTTOM NAVY DEPTH
      ========================= */}
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[#050B1C] via-[#050B1C]/75 to-transparent" />

      {/* =========================
          PREMIUM DARK EDGE SHADOW
      ========================= */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.55)_100%)]" />

      {/* =========================
          EXTRA DARK FOUR CORNERS
      ========================= */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.32)_0%,transparent_30%),linear-gradient(225deg,rgba(0,0,0,0.32)_0%,transparent_30%),linear-gradient(45deg,rgba(0,0,0,0.32)_0%,transparent_30%),linear-gradient(315deg,rgba(0,0,0,0.32)_0%,transparent_30%)]" />

      {/* =========================
          CRYSTAL CLEAR TOP DARKNESS
      ========================= */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,28,0.18),transparent_35%,transparent_70%,rgba(5,11,28,0.2))]" />
    </div>
  );

  return createPortal(background, document.body);
}
