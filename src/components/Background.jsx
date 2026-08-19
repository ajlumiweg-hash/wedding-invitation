import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import mosque from "../assets/mosque.png";

const dustStars = Array.from({ length: 55 }, (_, i) => ({
  id: `dust-${i}`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 65}%`,
  size: Math.random() * 1.2 + 0.5,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
}));

const heroStars = Array.from({ length: 8 }, (_, i) => ({
  id: `hero-${i}`,
  left: `${8 + Math.random() * 84}%`,
  top: `${5 + Math.random() * 45}%`,
  size: Math.random() * 1.2 + 2,
  delay: Math.random() * 4,
  duration: 5 + Math.random() * 3,
}));

export default function Background() {
  const background = (
    <div className="pointer-events-none fixed inset-0 z-0 h-[100lvh] w-screen overflow-hidden bg-[#030817]" style={{ transform: "translateZ(0)" }}>

      {/* =========================
          PURE DEEP NAVY BASE
      ========================= */}
      <div className="absolute inset-0 bg-[#030817]" />

      {/* =========================
          SUBTLE NAVY DEPTH
      ========================= */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(20,31,60,0.28),transparent_48%),linear-gradient(180deg,#030817_0%,#040B1D_55%,#020612_100%)]" />

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(85,67,42,0.07),transparent_42%)]" />
      </motion.div>

      {/* =========================
          DARK GOLD STAR DUST
      ========================= */}
      <div className="absolute inset-0">
        {dustStars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-[#8A683F]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 2.5}px rgba(148,111,69,0.45)`,
            }}
            animate={{
              opacity: [0.12, 0.55, 0.12],
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
            className="absolute rounded-full bg-[#A47A47]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 3}px rgba(164,122,71,0.55)`,
            }}
            animate={{
              opacity: [0.25, 0.8, 0.25],
              scale: [0.9, 1.18, 0.9],
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
          DARK ANTIQUE GOLD MOON
      ========================= */}
      <motion.div
        className="absolute right-5 top-8 h-8 w-8 rounded-full bg-[#8B683F]"
        animate={{
          y: [-2, 3, -2],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute -right-2 -top-1 h-7 w-7 rounded-full bg-[#030817]" />
      </motion.div>

      {/* =========================
          DISTANT MOSQUE GLOW
      ========================= */}
      <div className="absolute bottom-0 left-1/2 h-40 w-[65%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_bottom,rgba(148,111,69,0.06),transparent_72%)]" />

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
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[#020612] via-[#030817]/75 to-transparent" />

      {/* =========================
          CLEAN CINEMATIC VIGNETTE
      ========================= */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(1,5,15,0.62)_100%)]" />

      {/* =========================
          CRYSTAL CLEAR TOP DARKNESS
      ========================= */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,5,15,0.18),transparent_35%,transparent_70%,rgba(1,5,15,0.2))]" />
    </div>
  );

  return createPortal(background, document.body);
}