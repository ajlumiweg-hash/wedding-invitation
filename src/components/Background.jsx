import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import FloatingCard from "./FloatingCard";
import Stars from "./Stars";

import Page1 from "../sections/Page1";
import Page2 from "../sections/Page2";
import Page3 from "../sections/Page3";
import Page4 from "../sections/Page4";
import Page5 from "../sections/Page5";
import Page6 from "../sections/Page6";

/* ==========================================================================
   Constants
=========================================================================== */

const pages = [Page1, Page2, Page3, Page4, Page5, Page6];

/* ==========================================================================
   Page Animation
=========================================================================== */

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

  transition: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  },
};

/* ==========================================================================
   Background Component
=========================================================================== */

function Background() {
  const [scrollY, setScrollY] = useState(0);

  const scrollRef = useRef(null);

  /* ==========================================================================
     Background Parallax
  =========================================================================== */

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(scrollContainer.scrollTop);
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* =====================================================================
          Fixed Background
      ====================================================================== */}

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

      {/* =====================================================================
          Native Scroll + Snap Container
      ====================================================================== */}

      <main
        ref={scrollRef}
        className="
          relative z-10
          h-[100dvh]
          w-full
          overflow-y-auto
          overflow-x-hidden
          snap-y snap-mandatory
          scroll-smooth
          overscroll-y-contain
        "
      >
        {pages.map((Page, index) => (
          <section
            key={index}
            className="
              relative
              h-[100dvh]
              min-h-[100dvh]
              w-full
              shrink-0
              snap-start snap-always
              overflow-hidden
            "
          >
            <motion.div
              initial={pageAnimation.initial}
              whileInView={pageAnimation.animate}
              viewport={{
                once: true,
                amount: 0.6,
              }}
              transition={pageAnimation.transition}
              className="h-full w-full"
            >
              <Page />
            </motion.div>
          </section>
        ))}
      </main>

      {/* =====================================================================
          Floating Card
      ====================================================================== */}

      <FloatingCard />
    </div>
  );
}

export default Background;