import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import invitationCard from "../assets/invitation-card.png";

function FloatingCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* GIFT BOX */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, 0, 0, -2, 2, -2, 2, 0],
              rotate: [0, 0, 0, -1.5, 1.5, -1.5, 1.5, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              },
              rotate: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              },
            }}
            onClick={() => setOpen(true)}
            whileHover={{
              scale: 1.04,
              y: -4,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="
              fixed bottom-3 right-3 z-[999]
              h-[66px] w-[66px]
              cursor-pointer
              sm:bottom-5 sm:right-5
              sm:h-[74px] sm:w-[74px]
              md:bottom-6 md:right-6
              md:h-[82px] md:w-[82px]
            "
          >
            {/* BOX BODY */}
            <div
              className="
                absolute bottom-[6px] left-1/2 z-[2]
                h-[31px] w-[47px]
                -translate-x-1/2
                overflow-hidden
                rounded-[2px]
                border border-[#946F45]/55
                bg-gradient-to-b
                from-[#101C35]
                via-[#040B1D]
                to-[#020611]
                shadow-[0_10px_22px_rgba(0,0,0,.55)]
                sm:h-[35px] sm:w-[53px]
                md:h-[39px] md:w-[58px]
              "
            >
              {/* BODY TOP LIGHT */}
              <div
                className="
                  absolute top-0 left-0
                  h-[2px] w-full
                  bg-gradient-to-r
                  from-transparent
                  via-[#946F45]/60
                  to-transparent
                "
              />

              {/* VERTICAL RIBBON */}
              <div
                className="
                  absolute top-0 left-1/2
                  h-full w-[6px]
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-[#5E452D]
                  via-[#946F45]
                  to-[#5A422B]
                  shadow-[inset_1px_0_rgba(255,255,255,.12),inset_-1px_0_rgba(0,0,0,.3)]
                "
              />

              {/* HORIZONTAL RIBBON */}
              <div
                className="
                  absolute top-[12px] left-0
                  h-[5px] w-full
                  bg-gradient-to-b
                  from-[#A77D4D]
                  via-[#946F45]
                  to-[#5D432A]
                  shadow-[0_1px_3px_rgba(0,0,0,.35)]
                "
              />

              {/* BODY HIGHLIGHT */}
              <div
                className="
                  absolute top-0 left-0
                  h-full w-[18%]
                  bg-gradient-to-r
                  from-white/[0.04]
                  to-transparent
                "
              />

              {/* BOTTOM EDGE */}
              <div
                className="
                  absolute bottom-0 left-0
                  h-[2px] w-full
                  bg-[#946F45]/25
                "
              />
            </div>

            {/* HIDDEN CARD INSIDE BOX */}
            <div
              className="
                absolute bottom-[13px] left-1/2
                z-[3]
                h-[31px] w-[25px]
                -translate-x-1/2
                overflow-hidden
                rounded-[2px]
              "
            >
              <img
                src={invitationCard}
                alt=""
                draggable={false}
                className="
                  h-auto w-full
                  select-none
                  opacity-0
                "
              />
            </div>

            {/* GIFT BOX LID */}
            <div
              className="
                absolute bottom-[36px] left-1/2
                z-[5]
                h-[10px] w-[52px]
                -translate-x-1/2
                rounded-[2px]
                border border-[#946F45]/65
                bg-gradient-to-b
                from-[#14213B]
                via-[#040B1D]
                to-[#020611]
                shadow-[0_5px_10px_rgba(0,0,0,.5)]
                sm:bottom-[40px]
                sm:h-[11px] sm:w-[58px]
                md:bottom-[44px]
                md:w-[63px]
              "
            >
              {/* LID TOP EDGE */}
              <div
                className="
                  absolute top-0 left-0
                  h-[2px] w-full
                  bg-gradient-to-r
                  from-transparent
                  via-[#946F45]/70
                  to-transparent
                "
              />

              {/* LID RIBBON */}
              <div
                className="
                  absolute top-0 left-1/2
                  h-full w-[6px]
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-[#5E452D]
                  via-[#946F45]
                  to-[#5A422B]
                "
              />

              {/* LID HIGHLIGHT */}
              <div
                className="
                  absolute top-[2px] left-[8%]
                  h-[1px] w-[84%]
                  bg-[#C5A579]/35
                "
              />
            </div>

            {/* BROWNISH GOLD BOW */}
            <div
              className="
                absolute bottom-[41px] left-1/2
                z-[7]
                h-[9px] w-[8px]
                -translate-x-1/2
                sm:bottom-[45px]
                md:bottom-[49px]
              "
            >
              {/* LEFT BOW */}
              <div
                className="
                  absolute right-[1px] top-1/2
                  h-[8px] w-[14px]
                  -translate-y-1/2
                  rotate-[25deg]
                  rounded-[75%_25%_65%_35%]
                  border border-[#946F45]/70
                  bg-gradient-to-br
                  from-[#B08A5C]
                  via-[#946F45]
                  to-[#5A422B]
                  shadow-[0_2px_4px_rgba(0,0,0,.35)]
                "
              />

              {/* RIGHT BOW */}
              <div
                className="
                  absolute left-[1px] top-1/2
                  h-[8px] w-[14px]
                  -translate-y-1/2
                  -rotate-[25deg]
                  rounded-[25%_75%_35%_65%]
                  border border-[#946F45]/70
                  bg-gradient-to-bl
                  from-[#B08A5C]
                  via-[#946F45]
                  to-[#5A422B]
                  shadow-[0_2px_4px_rgba(0,0,0,.35)]
                "
              />

              {/* BOW CENTER */}
              <div
                className="
                  relative
                  h-[7px] w-[7px]
                  rounded-full
                  border border-[#B08A5C]/80
                  bg-gradient-to-br
                  from-[#B08A5C]
                  to-[#6A4C30]
                  shadow-[0_1px_4px_rgba(0,0,0,.45)]
                "
              />
            </div>

            {/* SUBTLE GLOW */}
            <div
              className="
                absolute bottom-0 left-1/2
                -z-[1]
                h-[20px] w-[52px]
                -translate-x-1/2
                rounded-full
                bg-[#946F45]/12
                blur-[14px]
              "
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UNBOXING POPUP */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              px-4 py-8
              sm:px-6 sm:py-10
            "
          >
            {/* CARD */}
            <motion.div
              layoutId="invitation-card"
              initial={{
                scale: 0.15,
                y: 120,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.15,
                y: 120,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative z-20
                flex items-center justify-center
                w-full
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
                "
              />
            </motion.div>

            {/* CLOSE HINT */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.25 }}
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
                text-[#946F45]
                sm:bottom-8
                sm:text-xs
              "
            >
              Tap anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingCard;