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
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
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
      ease: "easeOut",
    },
  },
};

function GoldDivider() {
  return (
    <motion.div
      variants={divider}
      className="mt-4 flex items-center justify-center gap-3"
    >
      <span className="h-px w-8 bg-[#6F5034] sm:w-10" />

      <motion.span
        className="text-[9px] text-[#D6A85F] sm:text-[10px]"
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
        ✦
      </motion.span>

      <span className="h-px w-8 bg-[#6F5034] sm:w-10" />
    </motion.div>
  );
}

export default function Page6() {
  return (
    <section className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.35 }}
        className="mx-auto flex w-full max-w-[430px] flex-col items-center justify-center"
      >
        {/* Heart Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex h-[310px] w-[340px] items-center justify-center sm:h-[345px] sm:w-[380px] md:h-[365px] md:w-[400px]"
        >
          {/* Soft Gold Heart Glow */}
          <motion.div
            className="absolute inset-[12%] rounded-full bg-[#D6A85F]/10 blur-3xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{
              opacity: [0.25, 0.5, 0.25],
              scale: [0.95, 1.05, 0.95],
            }}
            viewport={{ once: true }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Heart Outline */}
          <motion.svg
            viewBox="0 0 320 290"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
          >
            <motion.path
              d="M160 258 C145 244 38 180 38 92 C38 42 75 15 116 15 C137 15 153 25 160 46 C167 25 183 15 204 15 C245 15 282 42 282 92 C282 180 175 244 160 258Z"
              stroke="#946F45"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              whileInView={{
                pathLength: 1,
                opacity: 0.9,
              }}
              viewport={{ once: true }}
              transition={{
                pathLength: {
                  duration: 2,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.8,
                },
              }}
            />

            {/* Second subtle heart line */}
            <motion.path
              d="M160 270 C142 253 25 184 25 88 C25 32 67 5 111 5 C135 5 151 17 160 39 C169 17 185 5 209 5 C253 5 295 32 295 88 C295 184 178 253 160 270Z"
              stroke="#6F5034"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="3 7"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.55 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.2,
                duration: 1,
              }}
            />
          </motion.svg>

          {/* Thank You */}
          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.h1
              className="font-['Great_Vibes'] text-[68px] leading-[0.8] text-[#946F45] sm:text-[78px]"
              animate={{
                textShadow: [
                  "0 0 4px rgba(214,168,95,0.15)",
                  "0 0 15px rgba(214,168,95,0.35)",
                  "0 0 4px rgba(214,168,95,0.15)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Thank
            </motion.h1>

            <motion.h1
              className="mt-1 font-['Great_Vibes'] text-[68px] leading-[0.8] text-[#946F45] sm:text-[78px]"
              animate={{
                textShadow: [
                  "0 0 4px rgba(214,168,95,0.15)",
                  "0 0 15px rgba(214,168,95,0.35)",
                  "0 0 4px rgba(214,168,95,0.15)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              You
            </motion.h1>
          </motion.div>

          {/* Tiny Heart */}
          <motion.span
            className="absolute bottom-[14%] z-10 text-[13px] text-[#D6A85F]"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♡
          </motion.span>
        </motion.div>

        {/* Message */}
        <motion.div
          variants={fadeUp}
          className="mt-1 max-w-[280px] text-[11px] leading-[1.75] text-[#946F45] sm:max-w-[310px] sm:text-xs"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <p>Your presence will make</p>
          <p>our celebration even more</p>
          <p>memorable.</p>
        </motion.div>

        {/* Divider */}
        <GoldDivider />

        {/* Final Message */}
        <motion.div
          variants={fadeUp}
          className="mt-5 max-w-[270px] text-[11px] leading-[1.75] text-[#946F45] sm:text-xs"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <p>We look forward to</p>
          <p>celebrating with you.</p>
        </motion.div>

      </motion.div>
    </section>
  );
}