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
    <section className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-10 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-[430px] flex-col items-center justify-center"
      >

        {/* Bismillah */}
        <motion.p
          variants={fadeUp}
          className="mb-5 font-serif text-[17px] tracking-wide text-[#946F45] sm:text-lg"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          variants={{
            hidden: { width: 0, opacity: 0 },
            show: {
              width: 75,
              opacity: 1,
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
          className="mb-6 h-px bg-gradient-to-r from-transparent via-[#946F45] to-transparent"
        />

        {/* Welcome */}
        <motion.h1
          variants={fadeUp}
          className="font-['Great_Vibes'] text-[58px] leading-none text-[#946F45] sm:text-[68px]"
        >
          Welcome
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-5 text-[9px] font-medium tracking-[0.28em] text-[#6F5034] sm:text-[10px]"
        >
          TO OUR WEDDING RECEPTION
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            show: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="mt-7 h-px w-20 bg-gradient-to-r from-transparent via-[#B8894F] to-transparent"
        />

        {/* Blessing */}
        <motion.div
          variants={fadeUp}
          className="mt-7 max-w-[270px] text-[11px] leading-[1.9] text-[#946F45] sm:text-xs"
        >
          <p>With Allah's blessings</p>
          <p>and endless grace,</p>
          <p>two hearts become one</p>
          <p>eternal story.</p>
        </motion.div>

        {/* Bottom Ornament — idle pulse keeps it alive after entrance */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="mt-8 flex items-center gap-3 text-[#B8894F]"
        >
          <span className="h-px w-8 bg-[#6F5034]" />
          <motion.span
            className="text-[10px] text-[#D6A85F]"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
          >
            ✦
          </motion.span>
          <span className="h-px w-8 bg-[#6F5034]" />
        </motion.div>

      </motion.div>
    </section>
  );
}