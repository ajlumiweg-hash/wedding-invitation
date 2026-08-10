import { motion } from "framer-motion";

function Page2() {
  return (
    <section>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-3 -translate-y-[40vh] sm:-translate-y-[40vh] md:-translate-y-[40vh] lg:-translate-y-[35vh] xl:-translate-y-[35vh] 2xl:-translate-y-[34vh]">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Together Forever */}
          <p
            dir="rtl"
            className="text-[18px]  leading-[1.8] text-[#9E6F3D] sm:text-[18px] md:text-[18px] lg:text-[24px] xl:text-[34px] 2xl:text-[41px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: "0 0 25px rgba(158,111,61,0.18)",
            }}
          >
            Together Forever
          </p>

          {/* Third Love Heart */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              scale: [1, 1.18, 1, 1.12, 1],
              rotate: [0, 360],
            }}
            transition={{
              opacity: {
                duration: 0.6,
              },
              scale: {
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3.8,
              },
              rotate: {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 4,
              },
            }}
            className="mt-2 sm:mt-3 text-[#9E6F3D]"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
              textShadow:
                "0 2px 3px rgba(0,0,0,0.3), 0 0 15px rgba(228,194,138,0.35)",
            }}
          >
            ♥
          </motion.div>
        </motion.div>
      </div>

      {/* Names */}
      <div className="absolute inset-x-0 z-10 px-6 text-center top-[25vh] sm:top-[25vh] md:top-[25vh] lg:top-[31vh] xl:top-[31vh] 2xl:top-[33vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Bride */}
          <motion.h1
            className="whitespace-nowrap leading-none text-[#9E6F3D] text-[60px] sm:text-[60px] md:text-[60px] lg:text-[76px] xl:text-[100px] 2xl:text-[120px]"
            style={{ fontFamily: "'Allura', cursive" }}
          >
            Jasmi
          </motion.h1>

          {/* With */}
          <motion.div
            className="mt-3 flex items-center justify-center gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: 1.0 } },
            }}
          >
            <p
              className="my-1 leading-none uppercase text-[#9E6F3D]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.75rem, 2vw, 1.5rem)",
                letterSpacing: "0.3em",
                textShadow: "0 0 12px rgba(228,194,138,0.25)",
              }}
            >
              with
            </p>
          </motion.div>

          {/* Groom */}
          <motion.h1
            className="whitespace-nowrap leading-none text-[#9E6F3D] text-[60px] sm:text-[60px] md:text-[60px] lg:text-[76px] xl:text-[100px] 2xl:text-[120px]"
            style={{ fontFamily: "'Allura', cursive" }}
          >
            Al ameen
          </motion.h1>
        </motion.div>
      </div>



      {/* Wedding Quote */}
      <div className="absolute inset-x-0 z-10 top-[52vh] sm:top-[52vh] md:top-[53vh] lg:top-[56vh] xl:top-[57vh] 2xl:top-[58vh] flex justify-center px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="flex w-full max-w-[700px] items-center justify-center">
          <p className="w-full text-center font-medium italic leading-relaxed text-[#9E6F3D]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.85rem, 1.8vw, 1.5rem)", letterSpacing: "clamp(0.04em, 0.18vw, 0.12em)", textShadow: "0 0 15px rgba(228,194,138,0.2)" }}>
            Two hearts, one beautiful journey
          </p>
        </motion.div>

      </div>

    </section>
  );
}

export default Page2;


      



  