import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import invitationCard from "../assets/invitation-card.png";
import giftSealed from "../assets/gift_sealed.png";
import giftUnsealed from "../assets/gift_unsealed.png";

function FloatingCard() {
  const [open, setOpen] = useState(false);
  const [openedOnce, setOpenedOnce] = useState(false);

  const closePopup = () => {
    setOpen(false);
    setOpenedOnce(true);
  };

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === "Escape") {
        closePopup();
      }
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
            animate={
              openedOnce
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, 0, -2, 2, -2, 2, 0],
                    rotate: [0, 0, -1.5, 1.5, -1.5, 1.5, 0],
                  }
            }
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            transition={
              openedOnce
                ? {
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }
                : {
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
                  }
            }
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
            <img
              src={openedOnce ? giftUnsealed : giftSealed}
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