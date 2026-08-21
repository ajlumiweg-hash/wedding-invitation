import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hand from "../assets/hand.png";
import lockerSound from "../assets/locker.m4a";
/* =========================================================
   BACKGROUND STAR FIELD
========================================================= */

const stars = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 78}%`,
  size: Math.random() * 1.5 + 0.6,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
}));

/* =========================================================
   OPENING SCREEN
========================================================= */

export default function OpeningScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [rotation, setRotation] = useState(-180);
  const [rotateCount, setRotateCount] = useState(0);
  const [unlocking, setUnlocking] = useState(false);

  /* =========================================================
     STEP 2 → CRACK
  ========================================================= */

  useEffect(() => {
    if (step !== 2) return;

    const timer = setTimeout(() => {
      setStep(3);
    }, 260);

    return () => clearTimeout(timer);
  }, [step]);

  /* =========================================================
     STEP 3 → WEBSITE
  ========================================================= */

  useEffect(() => {
    if (step !== 3) return;

    const timer = setTimeout(() => {
      onComplete();
    }, 760);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  /* =========================================================
     3 TAP ROTATION
  ========================================================= */

const rotateLock = () => {
  if (step !== 1 || unlocking) return;

  const nextCount = rotateCount + 1;

  // Play lock sound on every tap
  const audio = new Audio(lockerSound);
  audio.currentTime = 1;
  audio.play().catch(() => {});

  setUnlocking(true);
  setRotateCount(nextCount);

  setRotation(-180 + nextCount * 60);

  setTimeout(() => {
    setUnlocking(false);

    if (nextCount === 3) {
      setStep(2);
    }
  }, 620);
};

  return (
    <motion.div
      className="
        fixed
        inset-0
        z-[10000]
        flex
        h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#030817]
      "
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* PURE DEEP NAVY BASE */}

        <div className="absolute inset-0 bg-[#030817]" />

        {/* NAVY DEPTH */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_25%,rgba(20,31,60,0.28),transparent_48%),linear-gradient(180deg,#030817_0%,#040B1D_55%,#020612_100%)]
          "
        />

        {/* =================================================
            SOFT ATMOSPHERE
        ================================================= */}

        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.32, 0.5, 0.32],
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_30%_18%,rgba(85,67,42,0.07),transparent_42%)]
            "
          />
        </motion.div>

        {/* =================================================
            STARS
        ================================================= */}

        <div className="absolute inset-0">

          {stars.map((star) => (
            <motion.span
              key={star.id}
              className="
                absolute
                rounded-full
                bg-[#A47A47]
              "
              style={{
                left: star.x,
                top: star.y,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: `0 0 ${
                  star.size * 3
                }px rgba(164,122,71,0.65)`,
              }}
              animate={{
                opacity: [0.12, 0.7, 0.12],
                scale: [0.8, 1.25, 0.8],
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

        {/* =================================================
            SPECIAL STAR SPARKLES
        ================================================= */}

        {[0, 1, 2, 3, 4].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute"
            style={{
              left: `${12 + i * 19}%`,
              top: `${12 + (i % 3) * 17}%`,
            }}
            animate={{
              opacity: [0.15, 0.8, 0.15],
              scale: [0.7, 1.15, 0.7],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className="
                block
                h-[5px]
                w-[5px]
                rotate-45
                border
                border-[#A47A47]/70
              "
            />
          </motion.div>
        ))}

        {/* =================================================
            CENTER ATMOSPHERIC GOLD
        ================================================= */}

        <motion.div
          animate={{
            opacity:
              step >= 2
                ? [0.08, 0.22, 0.08]
                : [0.035, 0.075, 0.035],

            scale:
              step >= 2
                ? [1, 1.14, 1]
                : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[390px]
            w-[390px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#946F45]/[0.055]
            blur-[105px]
          "
        />

        {/* =================================================
            BOTTOM DARK DEPTH
        ================================================= */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[35%]
            bg-gradient-to-t
            from-[#020612]
            via-[#030817]/75
            to-transparent
          "
        />

        {/* =================================================
            DARK VIGNETTE
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(1,5,15,0.68)_100%)]
          "
        />

        {/* =================================================
            CINEMATIC DEPTH
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(1,5,15,0.16),transparent_35%,transparent_70%,rgba(1,5,15,0.22))]
          "
        />
      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          max-w-[420px]
          flex-col
          items-center
          justify-center
          px-6
        "
      >

        {/* =================================================
            TOP TITLE
        ================================================= */}

        <AnimatePresence>
          {step < 3 && (
            <motion.div
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                top-[10%]
                flex
                flex-col
                items-center
                text-center
              "
            >
              <p
                className="
                  font-['Cormorant_Garamond']
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.52em]
                  text-[#A47A47]/75
                  sm:text-[12px]
                "
              >
                The&nbsp;Beginning&nbsp;of&nbsp;Forever
              </p>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    h-px
                    w-8
                    bg-gradient-to-r
                    from-transparent
                    to-[#8A683F]/55
                  "
                />

                <span
                  className="
                    h-[3px]
                    w-[3px]
                    rotate-45
                    bg-[#A47A47]/60
                  "
                />

                <div
                  className="
                    h-px
                    w-8
                    bg-gradient-to-l
                    from-transparent
                    to-[#8A683F]/55
                  "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* =================================================
            MEDALLION AREA
        ================================================= */}

        <div
          className="
            relative
            flex
            h-[272px]
            w-[272px]
            items-center
            justify-center
            sm:h-[344px]
            sm:w-[344px]
          "
        >

          {/* =================================================
              SOFT GOLD AURA
          ================================================= */}

          <motion.div
            animate={{
              opacity:
                step >= 2
                  ? [0.12, 0.3, 0.12]
                  : 0.09,

              scale:
                step >= 2
                  ? [1, 1.08, 1]
                  : 1,
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              h-[256px]
              w-[256px]
              rounded-full
              bg-[#946F45]/[0.07]
              blur-[58px]
              sm:h-[326px]
              sm:w-[326px]
            "
          />

          {/* =================================================
              HAIRLINE HALO
          ================================================= */}

          <div
            className="
              absolute
              h-[248px]
              w-[248px]
              rounded-full
              border
              border-[#8A683F]/20
              sm:h-[316px]
              sm:w-[316px]
            "
          />


          {/* =================================================
              SINGLE MEDALLION
          ================================================= */}

          <motion.div
            animate={
              step >= 3
                ? {
                    scale: [1, 0.96, 0.78, 0.42, 0.12],
                    opacity: [1, 1, 0.85, 0.4, 0],
                    filter: [
                      "blur(0px)",
                      "blur(0px)",
                      "blur(1px)",
                      "blur(4px)",
                      "blur(10px)",
                    ],
                  }
                : {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  }
            }
            transition={
              step >= 3
                ? {
                    duration: 0.76,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : {
                    duration: 0.35,
                  }
            }
            className="
              absolute
              z-20
              h-[240px]
              w-[240px]
              rounded-full
              sm:h-[312px]
              sm:w-[312px]
            "
          >

            {/* =================================================
                OUTER MEDALLION
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#A47A47]/70
                bg-[#030817]
                shadow-[inset_0_0_42px_rgba(0,0,0,.96),0_0_22px_rgba(148,111,69,.1),0_10px_40px_rgba(0,0,0,.55)]
              "
            />

            {/* RING 2 */}

            <div
              className="
                absolute
                inset-[9px]
                rounded-full
                border
                border-[#8A683F]/45
              "
            />

            {/* RING 3 */}

            <div
              className="
                absolute
                inset-[18px]
                rounded-full
                border
                border-[#8A683F]/24
              "
            />

            {/* INNER RING */}

            <div
              className="
                absolute
                inset-[31px]
                rounded-full
                border
                border-[#A47A47]/38
              "
            />

            {/* DARK INNER SURFACE */}

            <div
              className="
                absolute
                inset-[36px]
                rounded-full
                bg-[#030817]
                shadow-[inset_0_0_38px_rgba(0,0,0,.9)]
              "
            />

            {/* FINE INNER RIM */}

            <div
              className="
                absolute
                inset-[36px]
                rounded-full
                border
                border-[#C49A5B]/10
              "
            />


            {/* =================================================
                AJ
            ================================================= */}

            {step < 3 && (
              <motion.div
                animate={{
                  rotate: rotation,

                  scale:
                    step === 2
                      ? 1.04
                      : 1,
                }}
                transition={{
                  rotate: {
                    duration: unlocking
                      ? 0.62
                      : 0.5,

                    ease: [0.22, 1, 0.36, 1],
                  },

                  scale: {
                    duration: 0.5,
                  },
                }}
                className="
                  absolute
                  inset-0
                  z-10
                  flex
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    -mt-2
                    font-['Great_Vibes']
                    text-[86px]
                    leading-none
                    tracking-wide
                    text-[#A47A47]
                    drop-shadow-[0_2px_10px_rgba(0,0,0,.95)]
                    sm:text-[114px]
                  "
                >
                  AJ
                </span>
              </motion.div>
            )}


            {/* =================================================
                VERTICAL CRACK
            ================================================= */}

            {step >= 2 && (
              <motion.div
                initial={{
                  scaleY: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleY: 1,
                  opacity: [0, 1, 0.9],
                }}
                transition={{
                  duration: 0.28,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-1/2
                  top-[7%]
                  z-50
                  h-[86%]
                  w-[1px]
                  -translate-x-1/2
                  origin-center
                  rotate-[4deg]
                  bg-gradient-to-b
                  from-transparent
                  via-[#C49A5B]
                  to-transparent
                  shadow-[0_0_8px_rgba(196,154,91,.65)]
                "
              />
            )}


            {/* =================================================
                CRACK CENTER FLASH
            ================================================= */}

            {step >= 2 && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.25,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.25, 1, 1.7],
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-40
                  h-[50px]
                  w-[50px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#A47A47]/20
                  blur-[27px]
                "
              />
            )}


            {/* =================================================
                FINAL INWARD PULL
            ================================================= */}

            {step >= 3 && (
              <>
                <motion.div
                  initial={{
                    scaleY: 1,
                    opacity: 1,
                  }}
                  animate={{
                    scaleY: 0.08,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.68,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    left-1/2
                    top-[12%]
                    z-[70]
                    h-[76%]
                    w-[2px]
                    -translate-x-1/2
                    origin-center
                    bg-gradient-to-b
                    from-transparent
                    via-[#E0BC79]
                    to-transparent
                    shadow-[0_0_14px_rgba(224,188,121,.85)]
                  "
                />

                {/* INNER LIGHT */}

                <motion.div
                  initial={{
                    opacity: 0.8,
                    scale: 1,
                  }}
                  animate={{
                    opacity: [0.8, 0.9, 0],
                    scale: [1, 0.55, 0.08],
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    z-[80]
                    h-[110px]
                    w-[110px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#A47A47]/25
                    blur-[35px]
                  "
                />
              </>
            )}
          </motion.div>


          {/* =================================================
              FINAL CENTER LIGHT
          ================================================= */}

          {step >= 3 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.15,
              }}
              animate={{
                opacity: [0, 0.85, 0],
                scale: [0.15, 0.7, 1.8],
              }}
              transition={{
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                z-[90]
                h-[75px]
                w-[75px]
                rounded-full
                bg-[#A47A47]/25
                blur-[32px]
              "
            />
          )}
        </div>


        {/* =====================================================
            TAP INSTRUCTION
            NO TEXT / NO COUNT
            FINGER TAP ICON ONLY
        ===================================================== */}

        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-[8%]
                flex
                flex-col
                items-center
              "
            >

              {/* =================================================
                  PREMIUM FINGER TAP BUTTON
              ================================================= */}
<motion.button
  type="button"
  onClick={rotateLock}
  whileTap={{ scale: 0.88 }}
  className="
    relative
    mt-2
    flex
    h-[82px]
    w-[82px]
    cursor-pointer
    items-center
    justify-center
    bg-transparent
    outline-none
  "
>
  {/* HAND IMAGE */}

  <motion.img
    src={hand}
    alt=""
className="
  relative
  z-10
  translate-y-[10px]
  h-[54px]
  w-[54px]
  object-contain
  drop-shadow-[0_2px_8px_rgba(164,122,71,.35)]
"
    animate={{
      y: [0, -4, 0],
      scale: [1, 1.04, 1],
    }}
    transition={{
      duration: 1.4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* TAP RIPPLE */}

  <motion.span
    className="
      absolute
      left-1/2
      top-1/2
      h-[34px]
      w-[34px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      border
      border-[#C49A5B]/45
    "
    animate={{
      scale: [0.75, 1.65, 0.75],
      opacity: [0.55, 0, 0.55],
    }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
</motion.button>

            </motion.div>
          )}

        </AnimatePresence>


        {/* =====================================================
            FINAL PARTICLES
        ===================================================== */}

        {step >= 2 && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              overflow-hidden
            "
          >
            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  text-[10px]
                  text-[#A47A47]/55
                "
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0.3,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  x:
                    Math.cos(i * 0.78) *
                    (45 + i * 8),
                  y:
                    Math.sin(i * 0.78) *
                    (45 + i * 8),
                  scale: [0.3, 0.9, 0.2],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.025,
                  ease: "easeOut",
                }}
              >
                ·
              </motion.span>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}