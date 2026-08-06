import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


import Stars from "./Stars";
import FloatingCard from "./FloatingCard";
import Page1 from "../sections/Page1";
import Page2 from "../sections/Page2";
import Page3 from "../sections/Page3";
import Page4 from "../sections/Page4";
import Page5 from "../sections/Page5";
import Page6 from "../sections/Page6";

function Background() {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const wheelLocked = useRef(false);

  /* =========================
     WHEEL PAGE NAVIGATION
  ========================= */

const TOTAL_PAGES = 6;

useEffect(() => {
  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 15) return;

    if (wheelLocked.current) return;

    wheelLocked.current = true;

    setCurrentPage((prev) => {
      if (event.deltaY > 0) {
        return Math.min(prev + 1, TOTAL_PAGES - 1);
      }

      return Math.max(prev - 1, 0);
    });

    setTimeout(() => {
      wheelLocked.current = false;
    }, 500);
  };

  window.addEventListener("wheel", handleWheel, {
    passive: true,
  });

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
}, []);

  /* =========================
     BACKGROUND PARALLAX
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* =========================
          FIXED BACKGROUND
      ========================= */}

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
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        >
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

      {/* =========================
          PAGE CONTENT
      ========================= */}

      <main className="relative z-10 min-h-screen">

        <AnimatePresence mode="wait">

          {/* ================= PAGE 1 ================= */}

          {currentPage === 0 && (
            <motion.div
              key="page1"
              className="absolute inset-0 min-h-screen"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.99,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 1.01,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Page1 />
            </motion.div>
          )}

          {/* ================= PAGE 2 ================= */}

          {currentPage === 1 && (
            <motion.div
              key="page2"
              className="absolute inset-0 min-h-screen"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.99,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 1.01,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Page2 />
            </motion.div>
          )}

          {/* ================= PAGE 3 ================= */}

          {currentPage === 2 && (
            <motion.div
              key="page3"
              className="absolute inset-0 min-h-screen"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.99,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 1.01,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Page3 />
            </motion.div>
          )}

          {currentPage === 3 && (
            <motion.div
              key="page4"
              className="absolute inset-0 min-h-screen"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.99,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 1.01,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Page4 />
            </motion.div>
          )}

  {currentPage === 4 && (
  <motion.div
    key="page5"
    className="absolute inset-0 min-h-screen"
    initial={{
      opacity: 0,
      y: 40,
      scale: 0.99,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -40,
      scale: 1.01,
    }}
    transition={{
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    <Page5 />
  </motion.div>
)}

{currentPage === 5 && (
  <motion.div
    key="page6"
    className="absolute inset-0 min-h-screen"
    initial={{
      opacity: 0,
      y: 40,
      scale: 0.99,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -40,
      scale: 1.01,
    }}
    transition={{
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    <Page6 />
  </motion.div>
)}

        </AnimatePresence>

      </main>

       <FloatingCard />
    </div>
  );
}

export default Background;