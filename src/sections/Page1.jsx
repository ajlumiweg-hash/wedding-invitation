import { motion } from "framer-motion";

export default function Page1() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* =========================
          MAIN CONTENT — BISMILLAH
      ========================== */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 -translate-y-[30vh] sm:-translate-y-[30vh] md:-translate-y-[30vh] lg:-translate-y-[25vh] xl:-translate-y-[25vh] 2xl:-translate-y-[24vh]">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full text-center"
        >
          {/* Bismillah */}
          <p
            dir="rtl"
            className="font-bold leading-[1.8] text-[#9E6F3D]"
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "clamp(1.25rem, 3.2vw, 3rem)",
              textShadow: "0 0 25px rgba(158,111,61,0.18)",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>
      </div>


      {/* =========================
          WELCOME CONTENT
      ========================== */}
      <div className="absolute inset-x-0 z-10 top-[28vh] sm:top-[28vh] md:top-[28vh] lg:top-[34vh] xl:top-[34vh] 2xl:top-[36vh] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex w-full flex-col items-center text-center"
        >

          {/* Welcome */}
          <motion.h1
            className="leading-none text-[#9E6F3D]"
            style={{
              fontFamily: "'Allura', cursive",
              fontSize: "clamp(4.2rem, 11vw, 7.5rem)",
              textShadow: "0 2px 5px rgba(0,0,0,0.12)",
            }}
          >
            Welcome
          </motion.h1>


          {/* To Our Wedding Reception */}
          <p
            className="mt-2 max-w-full text-center font-semibold uppercase leading-relaxed text-[#9E6F3D]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.52rem, 1.25vw, 1.5rem)",
              letterSpacing: "clamp(0.16em, 0.38vw, 0.32em)",
              textShadow: "0 0 10px rgba(228,194,138,0.15)",
            }}
          >
            To Our Wedding Reception
          </p>


          {/* Decorative Divider */}
          <motion.div
            className="mt-3 flex w-full max-w-[92vw] items-center justify-center gap-2 sm:gap-3 md:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 1.0,
                },
              },
            }}
          >

            {/* Left Line */}
            <motion.span
              className="h-px flex-1  max-w-[180px] bg-[#9E6F3D] origin-right"
              variants={{
                hidden: {
                  scaleX: 0,
                  opacity: 0,
                },
                visible: {
                  scaleX: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            />

            {/* Heart */}
            <motion.span
              className="shrink-0 text-[#9E6F3D]"
              style={{
                fontSize: "clamp(0.8rem, 1.8vw, 1.5rem)",
                textShadow:
                  "0 0 10px rgba(228,194,138,0.25)",
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: [1, 1.18, 1, 1.12, 1],
              }}
              transition={{
                opacity: {
                  duration: 0.4,
                },
                scale: {
                  delay: 0.4,
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                },
              }}
            >
              ♥
            </motion.span>

            {/* Right Line */}
            <motion.span
              className="h-px flex-1 max-w-[180px] bg-[#9E6F3D] origin-left"
              variants={{
                hidden: {
                  scaleX: 0,
                  opacity: 0,
                },
                visible: {
                  scaleX: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            />

          </motion.div>
        </motion.div>
      </div>


      {/* =========================
          WEDDING STORY
      ========================== */}
      <div className="absolute inset-x-0 z-10 top-[45vh] sm:top-[45vh] md:top-[45vh] lg:top-[55vh] xl:top-[55vh] 2xl:top-[63vh] px-5 sm:px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >

          {/* Line 1 */}
          <p
            className="w-full max-w-[95vw] text-center font-bold uppercase leading-relaxed text-[#9E6F3D]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.58rem, 1.3vw, 1.5rem)",
              letterSpacing: "clamp(0.15em, 0.38vw, 0.32em)",
            }}
          >
            With Allah's blessings
          </p>


          {/* Line 2 */}
          <p
            className="w-full max-w-[95vw] text-center font-bold uppercase leading-relaxed text-[#9E6F3D]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.58rem, 1.3vw, 1.5rem)",
              letterSpacing: "clamp(0.15em, 0.38vw, 0.32em)",
            }}
          >
            and endless grace,
          </p>


          {/* Line 3 */}
          <p
            className="w-full max-w-[95vw] text-center font-bold uppercase leading-relaxed text-[#9E6F3D]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.58rem, 1.3vw, 1.5rem)",
              letterSpacing: "clamp(0.15em, 0.38vw, 0.32em)",
            }}
          >
            two hearts become one
          </p>


          {/* Line 4 */}
          <p
            className="w-full max-w-[95vw] text-center font-bold uppercase leading-relaxed text-[#9E6F3D]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.58rem, 1.3vw, 1.5rem)",
              letterSpacing: "clamp(0.15em, 0.38vw, 0.32em)",
            }}
          >
            eternal story.
          </p>

        </motion.div>
      </div>

    </section>
  );
}

