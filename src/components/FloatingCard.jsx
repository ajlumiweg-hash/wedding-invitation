import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import invitationCard from "../assets/invitation-card.png";

function FloatingCard() {
  const [open, setOpen] = useState(false);
  const [showFloating, setShowFloating] = useState(true);
  const cardVariants = {
    closed: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
    },
    open: {
        x: "calc(50vw - 48px)",
        y: "calc(-50vh + 160px)",
        scale: 6.8,
        opacity: 0,
        transition: {
        duration: 0.45,
        ease: "easeInOut",
        },
    },
  };


  useEffect(() => {
    const handleKeyDown = ({ key }) => key === "Escape" && setOpen(false);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <LayoutGroup>

      {/* =========================
            FIXED HOLDER
      ========================= */}

      <div className="fixed bottom-5 right-5 z-[999] h-[130px] w-[96px] pointer-events-none">

        {/* Plate */}

        <div className="absolute bottom-0 left-1/2 h-[20px] w-[90px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#D4B07A] via-[#BC8B4F] to-[#8E6035] shadow-[0_12px_25px_rgba(0,0,0,.45)]">

          <div className="absolute top-[2px] left-1/2 h-[5px] w-[58px] -translate-x-1/2 rounded-full bg-white/25" />

        </div>

        {/* Shadow */}

        <div className="absolute bottom-[2px] left-1/2 h-[10px] w-[60px] -translate-x-1/2 rounded-full bg-black/30 blur-md" />

        {/* Floating Card */}

        <AnimatePresence mode="wait">
          {showFloating && !open && (
            <motion.div

              onClick={() => {
                setShowFloating(false);
                setOpen(true);
              }}
                variants={cardVariants}
                animate={open ? "open" : "closed"}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                y: -10,
                rotate: -2,
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-[10px] left-1/2 -translate-x-1/2 cursor-pointer pointer-events-auto"
            >
              <img
                src={invitationCard}
                alt="Invitation Card"
                draggable={false}
                className="w-[58px] rounded-md select-none shadow-[0_18px_45px_rgba(0,0,0,.35)] sm:w-[64px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* =========================
              POPUP
      ========================= */}

      <AnimatePresence onExitComplete={() => setShowFloating(true)}>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setOpen(false)}
className="fixed inset-0 z-[9999] flex items-center justify-center px-5 py-10 sm:px-8 sm:py-12 backdrop-blur-xl"
style={{
  WebkitBackdropFilter: "blur(10px)",
  backdropFilter: "blur(10px)",
}}
          >


            {/* Flying Card */}

<motion.div
  initial={{ scale: 0.15, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.15, opacity: 0 }}
  transition={{
    type: "spring",
    stiffness: 180,
    damping: 22,
  }}
  onClick={(e) => e.stopPropagation()}
className="relative z-20 flex items-center justify-center w-full max-h-[78vh]"
>
  <img
    src={invitationCard}
    alt="Invitation"
    draggable={false}
    className="w-full max-w-[310px] rounded-2xl select-none"
  />
</motion.div>
            {/* Close Hint */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 px-4 text-center text-[10px] uppercase tracking-[0.22em] text-[#E7D3AF] sm:bottom-8 sm:text-xs whitespace-nowrap"
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