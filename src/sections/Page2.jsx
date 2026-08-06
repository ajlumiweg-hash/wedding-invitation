import { motion } from "framer-motion";

function Page2() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-[#9E6F3D] text-center overflow-hidden">

      {/* Top Ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-xl mb-8"
      >
        ✦
      </motion.div>

      {/* Small Text */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-xs tracking-[0.4em] uppercase mb-7"
      >
        Two hearts
      </motion.p>

      {/* Jasmi */}
      <motion.h1
        initial={{
          opacity: 0,
          y: -120,
          rotate: -8,
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: 0,
        }}
        transition={{
          duration: 1.1,
          delay: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-8xl leading-none font-normal"
        style={{
          fontFamily: "'Dream Avenue', cursive",
        }}
      >
        Jasmi
      </motion.h1>

      {/* With */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center gap-4 my-6"
      >
        <span className="w-14 h-px bg-[#9E6F3D]" />

        <span className="font-serif italic text-lg">
          with
        </span>

        <span className="w-14 h-px bg-[#9E6F3D]" />
      </motion.div>

      {/* Al Ameen */}
      <motion.h2
        initial={{
          opacity: 0,
          y: -120,
          rotate: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: 0,
        }}
        transition={{
          duration: 1.1,
          delay: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-7xl leading-none font-normal"
        style={{
          fontFamily: "'Dream Avenue', cursive",
        }}
      >
        Al Ameen
      </motion.h2>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 0.9,
          delay: 2.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center gap-3 mt-10"
      >
        <span className="w-16 h-[2px] bg-[#9E6F3D]" />

        <span className="text-xl">
          ✦
        </span>

        <span className="w-16 h-[2px] bg-[#9E6F3D]" />
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-9 max-w-sm"
      >
        <p className="font-serif italic text-lg leading-relaxed">
          “When two hearts are written
          <br />
          in the same destiny,
          <br />
          every path leads them home.”
        </p>
      </motion.div>

      {/* Bottom Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 3.3,
        }}
        className="mt-9 text-[10px] tracking-[0.35em] uppercase"
      >
        A beautiful beginning
      </motion.p>

    </section>
  );
}

export default Page2;