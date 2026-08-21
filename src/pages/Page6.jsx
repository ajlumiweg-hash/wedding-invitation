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
  const GOOGLE_CALENDAR_URL =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Wedding+Reception" +
    "&dates=20261206T063000Z%2F20261206T073000Z" +
    "&details=We+look+forward+to+celebrating+with+you.+Your+presence+will+make+our+celebration+even+more+memorable." +
    "&location=Ayisha+Convention+Centre%2C+Mevaram+Road%2C+near+AKMHSS%2C+Mylapure%2C+Umayanalloor%2C+Thazhuthala%2C+Kerala+691020";

  return (
    <section className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.35 }}
        className="mx-auto flex w-full max-w-[430px] flex-col items-center justify-center"
      >

        {/* Thank You - Animate Once When Section Appears */}
        <motion.div
          className="p-5 flex items-center justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.16,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {"Thank You".split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 18,
                  scale: 0.8,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                  },
                },
              }}
              className="font-['Great_Vibes'] text-[58px] leading-none text-[#946F45] sm:text-[78px]"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
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

        {/* ADD TO GOOGLE CALENDAR */}
        <motion.a
          variants={fadeUp}
          href={GOOGLE_CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
            mt-7
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#946F45]/70
            bg-[#946F45]/10
            px-5
            py-2
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-[#946F45]
            transition-colors
            duration-300
            hover:bg-[#946F45]/10
            sm:mt-8
            sm:px-6
            sm:py-2.5
            sm:text-[10px]
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <span className="text-[14px] leading-none">
            ♡
          </span>

          <span className="flex">
            {"Add to Google Calendar".split("").map((letter, index) => (
              <motion.span
                key={index}
                animate={{
                  opacity: [0.35, 1, 0.35],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.045,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </span>
        </motion.a>

      </motion.div>
    </section>
  );
}