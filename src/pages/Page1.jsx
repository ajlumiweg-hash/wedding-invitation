import { motion } from "framer-motion";

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
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Page1() {
  return (
    <section className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-[430px] flex-col items-center justify-center"
      >

        {/* Bismillah */}
        <motion.p
          variants={fadeUp}
          className="mb-4 font-serif text-[17px] font-medium tracking-wide text-[#946F45] sm:text-lg"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
          className=" mb-8 h-px w-[75px] origin-center bg-gradient-to-r from-transparent via-[#B88A4A] to-transparent"
        />

        {/* Welcome */}
        <motion.h1
          variants={fadeUp}
          className="font-['Great_Vibes'] text-[58px] font-normal leading-none text-[#946F45] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:text-[68px]"
        >
          Welcome
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-5 text-[9px] font-medium tracking-[0.28em] text-[#946F45] sm:text-[10px]"
        >
          TO OUR WEDDING CEREMONY
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
          className="mt-5 h-px w-[75px] origin-center bg-gradient-to-r from-transparent via-[#B88A4A] to-transparent"
        />

        {/* Blessing */}
        <motion.div
          variants={fadeUp}
          className="mt-7 max-w-[270px] text-[11px] font-normal leading-[1.9] text-[#946F45] sm:text-xs"
        >
          <p>With Allah's blessings and endless grace,</p>
          <p>two hearts become one eternal story.</p>

        </motion.div>

{/* Bottom Ornament */}
<motion.div
  variants={{
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }}
  className="mt-8 flex items-center gap-3"
>
  <span className="h-[0.5px] w-8 bg-[#B88A4A]" />

  <motion.span
    className="text-[10px] font-medium text-[#B88A4A]"
    animate={{
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 2.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2.4,
    }}
  >
    ♡
  </motion.span>

  <span className="h-[0.5px] w-8 bg-[#B88A4A]" />
</motion.div>

      </motion.div>
    </section>
  );
}