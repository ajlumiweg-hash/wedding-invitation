import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningScreen from "./components/OpeningScreen";
import backgroundMusic from "./assets/backgroundmusic.m4a";
import Background from "./components/Background";
import Popper from "./components/Popper";
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

/* =========================
   ONE-TIME PAPER BURST
========================= */

const papers = Array.from({ length: 32 }, (_, i) => {
  const angle = (Math.PI * 2 * i) / 32;
  const distance = 120 + Math.random() * 130;

  return {
    id: i,
    side: i % 2 === 0 ? "left" : "right",
    startY: Math.random() * 90 - 45,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotate: Math.random() * 720 - 360,
    delay: Math.random() * 0.35,
    width: 4 + Math.random() * 5,
    height: 7 + Math.random() * 8,
  };
});

function PaperBurst() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {papers.map((paper) => (
        <motion.span
          key={paper.id}
          initial={{
            opacity: 0,
            left: paper.side === "left" ? "-8vw" : "108vw",
            top: `${50 + paper.startY}%`,
            x: 0,
            y: 0,
            scale: 0.3,
            rotate: paper.rotate,
          }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            left: "50%",
            top: "50%",
            x: paper.x,
            y: paper.y,
            scale: [0.3, 1, 1.1, 0.8, 0],
            rotate: [
              paper.rotate,
              paper.rotate + 180,
              paper.rotate + 360,
              paper.rotate + 540,
            ],
          }}
          transition={{
            duration: 2.8,
            delay: paper.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute rounded-[1px] bg-[#E4C28A] shadow-[0_0_8px_rgba(228,194,138,0.65)]"
          style={{
            width: `${paper.width}px`,
            height: `${paper.height}px`,
          }}
        />
      ))}

      {/* Center Flash */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0.9, 0.5, 0],
          scale: [0, 1, 1.8, 2.8],
        }}
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease: "easeOut",
        }}
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E4C28A]/30 blur-xl"
      />
    </div>
  );
}

export default function App() {
  const [opening, setOpening] = useState(true);
  const backgroundMusicRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  /* =========================
     ONE-TIME PAPER EFFECT
  ========================= */

  const [showPaperBurst, setShowPaperBurst] = useState(false);

  /* =========================
     SETTINGS
  ========================= */

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contentScale, setContentScale] = useState(1);
  const [muted, setMuted] = useState(false);

  const settingsRef = useRef(null);

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

  /* =========================
     BACKGROUND MUSIC
  ========================= */

  const handleOpeningComplete = useCallback(() => {
    setIndex(0);
    indexRef.current = 0;

    const audio = backgroundMusicRef.current;

    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.45;

      /* KEEP THE CURRENT MUTE STATE */
      audio.muted = muted;

      if (!muted) {
        audio.play().catch(() => {});
      }
    }

    setOpening(false);

    /* Start paper burst only after opening screen */
    setShowPaperBurst(true);

    /* Remove paper burst completely after 3 seconds */
    window.setTimeout(() => {
      setShowPaperBurst(false);
    }, 3000);
  }, [muted]);

  /* =========================
     WEBSITE VISIBILITY MUSIC
  ========================= */

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = backgroundMusicRef.current;

      if (!audio) return;

      if (document.visibilityState === "hidden") {
        audio.pause();
      } else {
        if (!opening && !muted) {
          audio.play().catch(() => {});
        }
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [opening, muted]);

  /* =========================
     MUSIC MUTE / UNMUTE
  ========================= */

  const toggleMute = () => {
    const audio = backgroundMusicRef.current;

    if (!audio) return;

    const nextMuted = !muted;

    audio.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted && !opening) {
      audio.play().catch(() => {});
    }
  };

  /* =========================
     CONTENT ZOOM
  ========================= */

  const decreaseScale = () => {
    setContentScale((current) =>
      Math.max(1, Number((current - 0.05).toFixed(2)))
    );
  };

  const increaseScale = () => {
    setContentScale((current) =>
      Math.min(1.15, Number((current + 0.05).toFixed(2)))
    );
  };

  /* =========================
     CLOSE SETTINGS ON OUTSIDE CLICK
  ========================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, []);

  /* =========================
     SCROLL / TOUCH
  ========================= */

  useEffect(() => {
    const onWheel = (e) => {
      if (opening) return;

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
      if (opening) return;

      if (animatingRef.current) return;

      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (opening) {
        touchStartY.current = null;
        return;
      }

      if (
        touchStartY.current === null ||
        animatingRef.current
      ) {
        return;
      }

      const delta =
        touchStartY.current -
        e.changedTouches[0].clientY;

      touchStartY.current = null;

      if (Math.abs(delta) > 40) {
        const dir = delta > 0 ? 1 : -1;

        goTo(indexRef.current + dir);
      }
    };

    window.addEventListener("wheel", onWheel, {
      passive: true,
    });

    window.addEventListener(
      "touchstart",
      onTouchStart,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      onTouchEnd,
      { passive: true }
    );

    return () => {
      window.removeEventListener("wheel", onWheel);

      window.removeEventListener(
        "touchstart",
        onTouchStart
      );

      window.removeEventListener(
        "touchend",
        onTouchEnd
      );

      clearTimeout(wheelResetTimer.current);
    };
  }, [goTo, opening]);

  return (
    <>
      {/* BACKGROUND MUSIC */}

      <audio
        ref={backgroundMusicRef}
        src={backgroundMusic}
        loop
        preload="auto"
      />

      <Background />

      <FloatingCard />

      {opening && (
        <OpeningScreen
          onComplete={handleOpeningComplete}
        />
      )}

      {/* ONE-TIME PAPER POPUP */}
      {showPaperBurst && <PaperBurst />}

      {/* =====================================================
          MAIN PAGE CONTENT
          ONLY THIS CONTENT IS ZOOMED
      ===================================================== */}

      <div className="fixed inset-0 z-10 h-[100svh] w-full overflow-hidden">
        <motion.div
          className="w-full"
          animate={{
            y: `${-(index * PER_PAGE)}%`,
          }}
          transition={{
            duration: TRANSITION_S,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {PAGES.map((PageComponent, i) => (
            <section
              key={i}
              className="h-[100svh] w-full overflow-y-auto"
            >
              <div
                className="min-h-full w-full"
                style={{
                  transform: `scale(${contentScale})`,
                  transformOrigin: "center center",
                }}
              >
                <PageComponent />
              </div>
            </section>
          ))}
        </motion.div>
      </div>

      {/* =====================================================
          SETTINGS
      ===================================================== */}

      <div
        ref={settingsRef}
        className="
          pointer-events-auto
          fixed
          left-3
          top-3
          z-[999999]
          sm:left-5
          sm:top-5
        "
      >
        {/* SETTINGS BUTTON */}

        <motion.button
          type="button"
          onClick={() =>
            setSettingsOpen((current) => !current)
          }
          whileTap={{ scale: 0.9 }}
          className="
            pointer-events-auto
            flex
            h-[27px]
            w-[27px]
            items-center
            justify-center
            rounded-full
            border
            border-[#A47A47]/30
            bg-[#030817]/70
            text-[13px]
            text-[#C49A5B]/75
            shadow-[0_2px_12px_rgba(0,0,0,.35)]
            backdrop-blur-sm
            outline-none
            sm:h-[30px]
            sm:w-[30px]
            sm:text-[14px]
          "
          aria-label="Settings"
        >
          ⚙
        </motion.button>

        {/* SETTINGS DROPDOWN */}

        <AnimatePresence>
          {settingsOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: -5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -5,
              }}
              transition={{
                duration: 0.18,
              }}
              className="
                pointer-events-auto
                absolute
                left-0
                top-[34px]
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[#A47A47]/25
                bg-[#030817]/90
                px-2
                py-1.5
                shadow-[0_5px_20px_rgba(0,0,0,.45)]
                backdrop-blur-md
              "
            >
              {/* ZOOM OUT */}

              <motion.button
                type="button"
                onClick={decreaseScale}
                whileTap={{ scale: 0.85 }}
                className="
                  flex
                  h-[27px]
                  w-[27px]
                  items-center
                  justify-center
                  rounded-full
                  text-[10px]
                  font-semibold
                  text-[#C49A5B]/80
                  outline-none
                "
                aria-label="Zoom out"
              >
                A−
              </motion.button>

              {/* ZOOM IN */}

              <motion.button
                type="button"
                onClick={increaseScale}
                whileTap={{ scale: 0.85 }}
                className="
                  flex
                  h-[27px]
                  w-[27px]
                  items-center
                  justify-center
                  rounded-full
                  text-[10px]
                  font-semibold
                  text-[#C49A5B]/80
                  outline-none
                "
                aria-label="Zoom in"
              >
                A+
              </motion.button>

              {/* MUSIC */}

              <motion.button
                type="button"
                onClick={toggleMute}
                whileTap={{ scale: 0.85 }}
                className="
                  flex
                  h-[27px]
                  w-[27px]
                  items-center
                  justify-center
                  rounded-full
                  text-[12px]
                  text-[#C49A5B]/80
                  outline-none
                "
                aria-label={
                  muted
                    ? "Unmute music"
                    : "Mute music"
                }
              >
                {muted ? "🔇" : "🔊"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          PAGE 1–5 SCROLL ARROW
      ===================================================== */}

      {showScrollArrow && index < 5 && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: [0, 6, 0],
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            opacity: {
              duration: 0.4,
            },
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