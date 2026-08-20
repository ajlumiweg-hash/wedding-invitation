import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Background from "./components/Background";
import FloatingCard from "./components/FloatingCard";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";

const PAGES = [Page1, Page2, Page3, Page4, Page5, Page6];
const TOTAL = PAGES.length;
const PER_PAGE = 100 / TOTAL;
const TRANSITION_S = 0.7;

export default function App() {
  const [index, setIndex] = useState(0);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const touchStartY = useRef(null);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef(null);
  const scrollArrowTimer = useRef(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  /* =========================
     PAGE 1–5 SCROLL ARROW
  ========================= */

  useEffect(() => {
    clearTimeout(scrollArrowTimer.current);
    setShowScrollArrow(false);

    if (index < 5) {
      scrollArrowTimer.current = window.setTimeout(() => {
        setShowScrollArrow(true);
      }, 3000);
    }

    return () => {
      clearTimeout(scrollArrowTimer.current);
    };
  }, [index]);

  const goTo = useCallback((next) => {
    if (animatingRef.current) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, next));
    if (clamped === indexRef.current) return;
    animatingRef.current = true;
    setIndex(clamped);
    window.setTimeout(() => {
      animatingRef.current = false;
    }, TRANSITION_S * 1000);
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      setShowScrollArrow(false);

      if (animatingRef.current) return;
      wheelAccum.current += e.deltaY;
      clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = window.setTimeout(() => {
        wheelAccum.current = 0;
      }, 150);
      if (Math.abs(wheelAccum.current) > 35) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        goTo(indexRef.current + dir);
      }
    };

    const onTouchStart = (e) => {
      if (animatingRef.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (touchStartY.current === null || animatingRef.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(delta) > 40) {
        const dir = delta > 0 ? 1 : -1;
        goTo(indexRef.current + dir);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimeout(wheelResetTimer.current);
    };
  }, [goTo]);

  return (
    <>
      <Background />
      <FloatingCard />

      <div className="fixed inset-0 z-10 h-[100svh] w-full overflow-hidden">
        <motion.div
          className="w-full"
          animate={{ y: `${-(index * PER_PAGE)}%` }}
          transition={{ duration: TRANSITION_S, ease: [0.22, 1, 0.36, 1] }}
        >
          {PAGES.map((PageComponent, i) => (
            <section key={i} className="h-[100svh] w-full overflow-y-auto">
              <PageComponent />
            </section>
          ))}
        </motion.div>
      </div>

      {/* PAGE 1–5 SCROLL ARROW */}
      {showScrollArrow && index < 5 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.4 },
            y: {
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="
            fixed
            bottom-8
            left-1/2
            z-[9998]
            -translate-x-1/2
            pointer-events-none
            flex
            flex-col
            items-center
            justify-center
            sm:bottom-10
          "
        >
          <span
            className="
              text-[6px]
              uppercase
              tracking-[0.3em]
              text-[#E4C28A]
              opacity-80
              sm:text-xs
            "
          >
            Scroll
          </span>

          <span
            className="
              mt-1
              text-sm
              leading-none
              text-[#E4C28A]
              sm:text-3xl
            "
          >
            ↓
          </span>
        </motion.div>
      )}
    </>
  );
}