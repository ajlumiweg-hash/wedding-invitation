import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import invitationCard from "../assets/invitation-card.png";

function FloatingCard() {
  const [open, setOpen] = useState(false);
  const [showFloating, setShowFloating] = useState(true);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <LayoutGroup>

      {/* =====================================================
          FIXED SMALL PLATE HOLDER
      ===================================================== */}

      <div
        className="
          fixed
          bottom-4
          right-3
          z-[999]
          h-[72px]
          w-[72px]
          pointer-events-none

          sm:bottom-5
          sm:right-5
          sm:h-[80px]
          sm:w-[80px]

          md:bottom-6
          md:right-6
          md:h-[84px]
          md:w-[84px]
        "
      >

        {/* Soft Shadow */}
        <div
          className="
            absolute
            bottom-[2px]
            left-1/2
            h-[8px]
            w-[52px]
            -translate-x-1/2
            rounded-full
            bg-black/45
            blur-md
            sm:w-[58px]
          "
        />

        {/* =================================================
            NAVY PLATE
        ================================================= */}

        <div
          className="
            absolute
            bottom-[5px]
            left-1/2
            h-[18px]
            w-[62px]
            -translate-x-1/2
            rounded-[50%]

            border
            border-[#C89A5A]/45

            bg-gradient-to-b
            from-[#1A3152]
            via-[#102541]
            to-[#08172D]

            shadow-[inset_0_2px_3px_rgba(255,255,255,.12),0_8px_18px_rgba(0,0,0,.45)]

            sm:h-[20px]
            sm:w-[70px]

            md:w-[74px]
          "
        >

          {/* Plate Inner Highlight */}
          <div
            className="
              absolute
              top-[3px]
              left-1/2
              h-[5px]
              w-[42px]
              -translate-x-1/2
              rounded-[50%]
              border-t
              border-[#C89A5A]/30

              sm:w-[48px]
              md:w-[52px]
            "
          />

          {/* Gold Plate Edge */}
          <div
            className="
              absolute
              bottom-[2px]
              left-1/2
              h-[2px]
              w-[48px]
              -translate-x-1/2
              rounded-full
              bg-[#C89A5A]/40
              blur-[0.5px]

              sm:w-[54px]
              md:w-[58px]
            "
          />
        </div>

        {/* =================================================
            SMALL INVITATION CARD
        ================================================= */}

        <AnimatePresence mode="wait">
          {showFloating && !open && (
            <motion.div
              initial={{
                y: 10,
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                y: [0, -3, 0],
                scale: 1,
                opacity: 1,
                rotate: [0, -1, 1, 0],
              }}
              exit={{
                y: -35,
                scale: 0.8,
                opacity: 0,
                rotate: -5,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                },

                y: {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              onClick={() => {
                setShowFloating(false);
                setOpen(true);
              }}
              whileHover={{
                y: -7,
                rotate: -2,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="
                absolute
                bottom-[17px]
                left-1/2
                z-20
                -translate-x-1/2
                cursor-pointer
                pointer-events-auto
              "
            >
              <img
                src={invitationCard}
                alt="Invitation Card"
                draggable={false}
                className="
                  w-[32px]
                  rounded-[3px]
                  select-none
                  shadow-[0_8px_18px_rgba(0,0,0,.5)]

                  sm:w-[36px]

                  md:w-[38px]
                "
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          POPUP
      ===================================================== */}

      <AnimatePresence
        onExitComplete={() => {
          setShowFloating(true);
        }}
      >
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.28,
            }}
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-center
              justify-center

              bg-[#020817]/60

              px-4
              py-8

              sm:px-6
              sm:py-10

              backdrop-blur-xl
            "
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          >

            {/* =================================================
                POPUP CARD
            ================================================= */}

            <motion.div
              initial={{
                scale: 0.15,
                y: 80,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.15,
                y: 80,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                z-20

                flex
                w-full
                items-center
                justify-center

                max-w-[300px]
                max-h-[82vh]

                sm:max-w-[330px]

                md:max-w-[370px]
              "
            >
              <img
                src={invitationCard}
                alt="Invitation"
                draggable={false}
                className="
                  max-h-[82vh]
                  w-auto
                  max-w-full

                  rounded-2xl

                  select-none

                  shadow-[0_25px_80px_rgba(0,0,0,.65)]
                "
              />
            </motion.div>

            {/* =================================================
                CLOSE HINT
            ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 0.85,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 15,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                absolute
                bottom-[max(20px,env(safe-area-inset-bottom))]
                left-1/2
                -translate-x-1/2

                whitespace-nowrap

                px-4

                text-center
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#E7D3AF]

                sm:bottom-8
                sm:text-xs
              "
            >
              Tap anywhere to close
            </motion.p>

          </motion.div>
        )}
      </AnimatePresence>

    </LayoutGroup>
  );
}

export default FloatingCard;