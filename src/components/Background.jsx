import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FloatingCard from "./FloatingCard";
import Stars from "./Stars";

import Page1 from "../sections/Page1";
import Page2 from "../sections/Page2";
import Page3 from "../sections/Page3";
import Page4 from "../sections/Page4";
import Page5 from "../sections/Page5";
import Page6 from "../sections/Page6";

const TOTAL_PAGES = 6;

const pages = [
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
];

const pageAnimation = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.99,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  exit: {
    opacity: 0,
    y: -40,
    scale: 1.01,
  },
};

function Background() {
  const [currentPage, setCurrentPage] = useState(0);

  const wheelLocked = useRef(false);

  useEffect(() => {
    const handleWheel = ({ deltaY }) => {
      if (Math.abs(deltaY) < 15 || wheelLocked.current) return;

      wheelLocked.current = true;

      setCurrentPage((prev) =>
        deltaY > 0
          ? Math.min(prev + 1, TOTAL_PAGES - 1)
          : Math.max(prev - 1, 0)
      );

      setTimeout(() => {
        wheelLocked.current = false;
      }, 500);
    };

    // 📱 Mobile swipe
    let touchStartY = 0;

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (wheelLocked.current) return;

      const touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Ignore very small finger movements
      if (Math.abs(deltaY) < 50) return;

      wheelLocked.current = true;

      setCurrentPage((prev) =>
        deltaY > 0
          ? Math.min(prev + 1, TOTAL_PAGES - 1)
          : Math.max(prev - 1, 0)
      );

      setTimeout(() => {
        wheelLocked.current = false;
      }, 500);
    };

    // Desktop
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Mobile
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const CurrentPage = pages[currentPage];

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Fixed Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">

        {/* Night Sky */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at top,
                rgba(22,48,95,.18) 0%,
                transparent 45%
              ),
              radial-gradient(
                ellipse at bottom,
                rgba(12,26,55,.22) 0%,
                transparent 60%
              ),
              linear-gradient(
                180deg,
                #08122D 0%,
                #060F26 30%,
                #030918 70%,
                #01040D 100%
              )
            `,
          }}
        />

        {/* Stars */}
        <div className="absolute inset-0">
          <Stars />
        </div>

        {/* Soft Edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,.30) 100%)",
          }}
        />
      </div>

      {/* Page Content */}
      <main className="relative z-10 min-h-screen">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="absolute inset-0 min-h-screen"
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CurrentPage />
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Floating Card */}
      <FloatingCard />

    </div>
  );
}

export default Background;