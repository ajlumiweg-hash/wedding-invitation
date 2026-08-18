import { motion } from "framer-motion";
import mosque from "../assets/mosque.png";

const dustStars = Array.from({ length: 55 }, (_, i) => ({
  id: `dust-${i}`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 65}%`,
  size: Math.random() * 1.4 + 0.6,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
}));

const heroStars = Array.from({ length: 8 }, (_, i) => ({
  id: `hero-${i}`,
  left: `${8 + Math.random() * 84}%`,
  top: `${5 + Math.random() * 45}%`,
  size: Math.random() * 1.5 + 2.5,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 3,
}));

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#040B1D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(111,80,52,0.10),transparent_50%),linear-gradient(180deg,#040B1D_0%,#040B1D_60%,#030817_100%)]" />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(148,111,69,0.10),transparent_45%)]" />
      </motion.div>

      <div className="absolute inset-0">
        {dustStars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-[#D6A85F]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 3}px #F0C878`,
            }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {heroStars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-[#F0C878]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 5}px #F0C878`,
            }}
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [0.8, 1.4, 0.8],
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

      <motion.div
        className="absolute right-5 top-8 h-8 w-8 rounded-full bg-[#B8894F]"
        animate={{ y: [-2, 3, -2] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute -right-2 -top-1 h-7 w-7 rounded-full bg-[#040B1D]" />
      </motion.div>

      <div className="absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_bottom,rgba(214,168,95,0.08),transparent_70%)]" />

      <motion.img
        src={mosque}
        alt=""
        className="absolute bottom-[4%] left-1/2 w-[58%] max-w-[240px] -translate-x-1/2 opacity-80 sm:w-[48%] sm:max-w-[270px] md:w-[40%] md:max-w-[300px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.8, y: [0, -2, 0] }}
        transition={{
          opacity: { duration: 1.6, ease: "easeOut" },
          y: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.6,
          },
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#040B1D] via-[#040B1D]/70 to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,11,29,0.55)_100%)]" />
    </div>
  );
}