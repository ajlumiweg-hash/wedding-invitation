import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-12-06T11:00:00+05:30");

/* =========================================================
   HEART POPPER
========================================================= */

function HeartBurst() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 90 + Math.random() * 220;

        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: Math.random() * 60 - 30,
          delay: Math.random() * 0.25,
          size: 10 + Math.random() * 14,
        };
      }),
    []
  );

  return (
    <>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute left-1/2 top-1/2 select-none"
          style={{
            fontSize: `${h.size}px`,
            color: "#FF0000",
            willChange: "transform, opacity",
          }}
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: h.x,
            y: h.y,
            scale: [0, 1, 1, 0.6],
            rotate: h.rotate,
          }}
          transition={{
            duration: 1.6,
            delay: h.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          ♥
        </motion.span>
      ))}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 2.4, 5],
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E4C28A]/30 blur-xl"
      />
    </>
  );
}

export default function Page3() {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);

  const [revealed, setRevealed] = useState(false);
  const [showRevealPopup, setShowRevealPopup] = useState(false);

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /* =========================================================
     COUNTDOWN
  ========================================================= */

  useEffect(() => {
    if (!revealed) return;

    const update = () => {
      const diff = TARGET_DATE - new Date();

      if (diff <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [revealed]);

  /* =========================================================
     LOVE REVEAL POPUP
  ========================================================= */

  useEffect(() => {
    if (!showRevealPopup) return;

    const timer = setTimeout(() => {
      setShowRevealPopup(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showRevealPopup]);

  /* =========================================================
     SCRATCH
  ========================================================= */

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;

    if (!canvas || !box || revealed) return;

    const ctx = canvas.getContext("2d");

    let drawing = false;
    let scratches = 0;

    /* =====================================================
       LOCK SCROLL WHILE SCRATCHING
    ===================================================== */

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    const previousBodyOverscroll =
      document.body.style.overscrollBehavior;

    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      document.body.style.overscrollBehavior = "none";
      document.documentElement.style.overscrollBehavior = "none";
    };

    const unlockScroll = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;

      document.body.style.overscrollBehavior =
        previousBodyOverscroll;

      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscroll;
    };

    /* =====================================================
       DRAW HEART
    ===================================================== */

    const draw = () => {
      const { width, height } = box.getBoundingClientRect();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, width, height);

      const size = Math.min(width, height);

      const scale = size / 512;

      const x = (width - size) / 2;
      const y = (height - size) / 2;

      const heart = new Path2D();

      heart.moveTo(
        x + 256 * scale,
        y + 425 * scale
      );

      heart.bezierCurveTo(
        x + 220 * scale,
        y + 390 * scale,
        x + 45 * scale,
        y + 270 * scale,
        x + 45 * scale,
        y + 155 * scale
      );

      heart.bezierCurveTo(
        x + 45 * scale,
        y + 75 * scale,
        x + 115 * scale,
        y + 35 * scale,
        x + 180 * scale,
        y + 45 * scale
      );

      heart.bezierCurveTo(
        x + 220 * scale,
        y + 50 * scale,
        x + 245 * scale,
        y + 75 * scale,
        x + 256 * scale,
        y + 105 * scale
      );

      heart.bezierCurveTo(
        x + 267 * scale,
        y + 75 * scale,
        x + 292 * scale,
        y + 50 * scale,
        x + 332 * scale,
        y + 45 * scale
      );

      heart.bezierCurveTo(
        x + 397 * scale,
        y + 35 * scale,
        x + 467 * scale,
        y + 75 * scale,
        x + 467 * scale,
        y + 155 * scale
      );

      heart.bezierCurveTo(
        x + 467 * scale,
        y + 270 * scale,
        x + 292 * scale,
        y + 390 * scale,
        x + 256 * scale,
        y + 425 * scale
      );

      ctx.save();

      ctx.clip(heart);

      const gradient = ctx.createLinearGradient(
        x,
        y,
        x + size,
        y + size
      );

      gradient.addColorStop(0, "#7A1630");
      gradient.addColorStop(0.5, "#420814");
      gradient.addColorStop(1, "#16030A");

      ctx.fillStyle = gradient;

      ctx.fillRect(
        x,
        y,
        size,
        size
      );

      for (let i = 0; i < 80; i++) {
        ctx.beginPath();

        ctx.strokeStyle =
          "rgba(230,190,110,0.22)";

        ctx.lineWidth = 1;

        ctx.moveTo(
          x + Math.random() * size,
          y + Math.random() * size
        );

        ctx.lineTo(
          x + Math.random() * size,
          y + Math.random() * size
        );

        ctx.stroke();
      }

      ctx.restore();

      ctx.strokeStyle =
        "rgba(225,180,100,.85)";

      ctx.lineWidth = 1;

      ctx.shadowBlur = 10;

      ctx.shadowColor =
        "rgba(225,180,100,.6)";

      ctx.stroke(heart);

      ctx.shadowBlur = 0;
    };

    /* =====================================================
       POINTER POSITION
    ===================================================== */

    const point = (e) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x:
          (e.touches?.[0]?.clientX ??
            e.clientX) -
          rect.left,

        y:
          (e.touches?.[0]?.clientY ??
            e.clientY) -
          rect.top,
      };
    };

    /* =====================================================
       SCRATCH
    ===================================================== */

    const scratch = (e) => {
      if (!drawing) return;

      e.preventDefault();

      const { x, y } = point(e);

      ctx.save();

      ctx.globalCompositeOperation =
        "destination-out";

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        Math.max(
          15,
          box.clientWidth * 0.035
        ),
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();

      scratches++;

      if (scratches > 70) {
        unlockScroll();

        setRevealed(true);

        setShowRevealPopup(true);
      }
    };

    /* =====================================================
       START
    ===================================================== */

    const start = (e) => {
      lockScroll();

      drawing = true;

      scratch(e);
    };

    /* =====================================================
       STOP
    ===================================================== */

    const stop = () => {
      drawing = false;
    };

    draw();

    window.addEventListener(
      "resize",
      draw
    );

    canvas.addEventListener(
      "mousedown",
      start
    );

    canvas.addEventListener(
      "mousemove",
      scratch
    );

    window.addEventListener(
      "mouseup",
      stop
    );

    canvas.addEventListener(
      "touchstart",
      start,
      {
        passive: false,
      }
    );

    canvas.addEventListener(
      "touchmove",
      scratch,
      {
        passive: false,
      }
    );

    window.addEventListener(
      "touchend",
      stop
    );

    return () => {
      unlockScroll();

      window.removeEventListener(
        "resize",
        draw
      );

      canvas.removeEventListener(
        "mousedown",
        start
      );

      canvas.removeEventListener(
        "mousemove",
        scratch
      );

      window.removeEventListener(
        "mouseup",
        stop
      );

      canvas.removeEventListener(
        "touchstart",
        start
      );

      canvas.removeEventListener(
        "touchmove",
        scratch
      );

      window.removeEventListener(
        "touchend",
        stop
      );
    };
  }, [revealed]);

  const countdown = [
    [time.days, "DAYS"],
    [time.hours, "HOURS"],
    [time.minutes, "MINUTES"],
    [time.seconds, "SECONDS"],
  ];

  return (
    <section
      className="
        relative
        z-10
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        px-4
        py-8
        text-center
        sm:px-5
        sm:py-10
      "
    >
      <div
        className="
          flex
          w-full
          max-w-[520px]
          flex-col
          items-center
        "
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="w-full text-center"
        >
          <h2
            className="
              font-['Great_Vibes']
              text-[30px]
              leading-none
              text-[#946F45]
              sm:text-[42px]
            "
          >
            Scratch &amp; Reveal
          </h2>

          {/* Decorative Line */}

          <motion.div
            variants={{
              hidden: {
                width: 0,
                opacity: 0,
              },

              show: {
                width: 75,
                opacity: 1,
                transition: {
                  duration: 0.9,
                  ease: "easeOut",
                },
              },
            }}
            className="
              mx-auto
              mb-5
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#946F45]
              to-transparent
              sm:mb-6
            "
          />
        </motion.div>

        {/* =================================================
            HEART
        ================================================= */}

        <motion.div
          ref={boxRef}
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            mx-auto
            -mt-2
            aspect-square
            w-[min(88vw,420px)]
            max-w-[420px]
            translate-x-[5px]
            sm:-mt-3
            sm:w-[min(90vw,420px)]
            md:translate-x-0
          "
        >

          {/* DATE */}

          <div
            className="
              absolute
              inset-0
              z-[1]
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                -translate-y-[11vw]
                text-center
                sm:-translate-y-13
              "
            >

              <div
                className="
                  font-['Cormorant_Garamond']
                  text-[13vw]
                  font-bold
                  leading-none
                  text-[#946F45]
                  drop-shadow-[0_0_8px_rgba(228,194,138,.5)]
                  sm:text-[42px]
                "
              >
                06
              </div>

              <div
                className="
                  mt-1
                  font-['Cormorant_Garamond']
                  text-[5.5vw]
                  font-bold
                  leading-none
                  tracking-[.12em]
                  text-[#946F45]
                  sm:text-[15px]
                "
              >
                December
              </div>

              <div
                className="
                  font-['Cormorant_Garamond']
                  text-[8vw]
                  font-bold
                  leading-none
                  tracking-[.08em]
                  text-[#946F45]
                  sm:text-[15px]
                "
              >
                2026
              </div>

            </div>
          </div>

          {/* SCRATCH */}

          {!revealed && (
            <canvas
              ref={canvasRef}
              className="
                absolute
                inset-0
                z-[2]
                h-full
                w-full
                -translate-y-[8px]
                touch-none
                sm:-translate-y-[10px]
              "
            />
          )}
        </motion.div>

        {/* =================================================
            INSTRUCTION
        ================================================= */}

        {!revealed && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
            }}
            className="
              -mt-2
              w-full
              text-center
              sm:-mt-3
              md:-mt-5
            "
          />
        )}

        {/* =================================================
            COUNTDOWN
        ================================================= */}

        {revealed && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
            className="
              -mt-[17vw]
              w-full
              max-w-[440px]
              px-1
              sm:-mt-1
              sm:px-0
            "
          >

            {/* HEADING */}

            <p
              className="
                mb-4
                text-center
                font-['Montserrat']
                text-[7px]
                font-medium
                uppercase
                tracking-[.30em]
                text-[#946F45]
                sm:mb-5
                sm:text-[9px]
                sm:tracking-[.38em]
              "
            >
              COUNTDOWN TO OUR WEDDING
            </p>

            <div
              className="
                flex
                w-full
                items-center
                justify-center
              "
            >

              {countdown.map(
                ([value, label], index) => (
                  <div
                    key={label}
                    className="
                      relative
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      items-center
                      justify-center
                    "
                  >

                    {/* NUMBER */}

                    <motion.div
                      key={value}
                      initial={{
                        opacity: 0,
                        y: 6,
                        scale: 0.94,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="
                        whitespace-nowrap
                        font-['Cormorant_Garamond']
                        text-[35px]
                        font-normal
                        leading-none
                        tracking-[-.045em]
                        text-[#C99A55]
                        drop-shadow-[0_2px_10px_rgba(201,154,85,.20)]
                        xs:text-[38px]
                        sm:text-[47px]
                      "
                    >
                      {String(value).padStart(
                        2,
                        "0"
                      )}
                    </motion.div>

                    {/* LABEL */}

                    <div
                      className="
                        mt-1
                        whitespace-nowrap
                        font-['Montserrat']
                        text-[5px]
                        font-medium
                        uppercase
                        tracking-[.22em]
                        text-[#A97B42]
                        xs:text-[6px]
                        sm:mt-2
                        sm:text-[7px]
                        sm:tracking-[.32em]
                      "
                    >
                      {label}
                    </div>

                    {/* SEPARATOR */}

                    {index <
                      countdown.length - 1 && (
                      <span
                        className="
                          absolute
                          right-[-1px]
                          top-[11px]
                          font-['Playfair_Display']
                          text-[16px]
                          font-light
                          text-[#946F45]/45
                          sm:top-[17px]
                          sm:right-0
                          sm:text-[23px]
                        "
                      >
                        :
                      </span>
                    )}

                  </div>
                )
              )}

            </div>
          </motion.div>
        )}
      </div>

      {/* =================================================
          LOVE REVEAL POPUP
      ================================================= */}

      <AnimatePresence>
        {showRevealPopup && (
          <motion.div
            className="
              pointer-events-none
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              overflow-hidden
              px-4
              sm:px-6
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.72,
                y: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 1.08,
                y: -10,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 16,
              }}
              className="
                relative
                left-0
                flex
                w-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <HeartBurst />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}