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
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const touchStartY = useRef(null);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef(null);

  useEffect(() => {
    indexRef.current = index;
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
    </>
  );
}