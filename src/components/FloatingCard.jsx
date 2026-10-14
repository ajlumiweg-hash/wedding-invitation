import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import invitationCard from "../assets/invitation-card.png";
import giftSealed from "../assets/gift_sealed.png";
import giftUnsealed from "../assets/gift_unsealed.png";

function FloatingCard() {
  const [open, setOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [openedOnce, setOpenedOnce] = useState(false);

  const closePopup = () => {
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!openedOnce) {
        setShowArrow(true);
      }
    }, 25000);

    return () => clearTimeout(timer);
  }, [openedOnce]);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setOpenedOnce(true);
    setShowArrow(false);
  };

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
              y: [0, 0, -2, 2, -2, 2, 0],
              rotate: [0, 0, -1.5, 1.5, -1.5, 1.5, 0],
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
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              },
              rotate: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              },
            }}
            onClick={handleOpen}
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
              sm:h-[64px] sm:w-[64px]
              md:bottom-6 md:right-6
              md:h-[62px] md:w-[62px]
            "
          >
            {/* ARROW — appears after 10 seconds */}
            <AnimatePresence>
              {showArrow && !openedOnce && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, 5, 0],
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.4,
                    },
                    y: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -top-2
                    left-1/2
                    z-20
                    -translate-x-1/2
                    text-[15px]
                    leading-none
                    text-[#ae8960]
                    drop-shadow-[0_0_8px_rgba(196,154,91,.45)]
                    sm:-top-9
                    sm:text-[24px]
                  "
                >
                  ↓
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={giftSealed}
              alt=""
              draggable={false}
              className="h-full w-full object-contain select-none"
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
            onClick={closePopup}
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              backdrop-blur-md
              px-4 py-8
              sm:px-6 sm:py-10
            "
          >
            {/* UNSEALED GIFT */}
            <motion.img
              src={giftUnsealed}
              alt=""
              draggable={false}
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                pointer-events-none
                absolute
                bottom-4
                right-4
                z-10
                h-[66px]
                w-[66px]
                object-contain
                select-none
                sm:bottom-6
                sm:right-6
                sm:h-[64px]
                sm:w-[64px]
                md:bottom-7
                md:right-7
                md:h-[72px]
                md:w-[72px]
              "
            />

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