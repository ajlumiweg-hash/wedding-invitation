import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-12-06T11:00:00+05:30");

const INITIAL_TIME = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function Page3() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [revealed, setRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [showPopper, setShowPopper] = useState(false);

  const scratchCount = useRef(0);

  /* =========================
     COUNTDOWN
  ========================= */

  useEffect(() => {
    if (!revealed) return;

    const updateCountdown = () => {
      const diff = TARGET_DATE.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft(INITIAL_TIME);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [revealed]);

  /* =========================
     DRAW HEART SCRATCH CARD
  ========================= */

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const drawHeart = () => {
      const rect = container.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, width, height);

      /*
        HEART COORDINATES
        0 - 512
      */

      const scale = Math.min(width, height) / 512;

      const heartWidth = 512 * scale;
      const heartHeight = 512 * scale;

      const offsetX = (width - heartWidth) / 2;
      const offsetY = (height - heartHeight) / 2;

      ctx.save();

      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      /* =========================
         HEART SHAPE
      ========================= */

      const heart = new Path2D();

      heart.moveTo(256, 464);

      heart.bezierCurveTo(
        235,
        445,
        45,
        315,
        45,
        165
      );

      heart.bezierCurveTo(
        45,
        90,
        105,
        40,
        170,
        40
      );

      heart.bezierCurveTo(
        210,
        40,
        242,
        60,
        256,
        94
      );

      heart.bezierCurveTo(
        270,
        60,
        302,
        40,
        342,
        40
      );

      heart.bezierCurveTo(
        407,
        40,
        467,
        90,
        467,
        165
      );

      heart.bezierCurveTo(
        467,
        315,
        277,
        445,
        256,
        464
      );

      heart.closePath();

      /* =========================
         HEART GOLD SURFACE
      ========================= */

      const gradient = ctx.createLinearGradient(
        80,
        50,
        430,
        460
      );

      gradient.addColorStop(0, "#E4C28A");
      gradient.addColorStop(0.45, "#C89A5A");
      gradient.addColorStop(1, "#9E6F3D");

      ctx.fillStyle = gradient;
      ctx.fill(heart);

      /* =========================
         GOLD TEXTURE
      ========================= */

      ctx.save();

      ctx.clip(heart);

      for (let i = 0; i < 180; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 2 + 0.3;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${
          Math.random() * 0.12
        })`;

        ctx.fill();
      }

      ctx.restore();

      ctx.restore();

      scratchCount.current = 0;
    };

    drawHeart();

    const resizeObserver = new ResizeObserver(drawHeart);

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /* =========================
     REVEAL
  ========================= */

  const revealComplete = () => {
    if (revealed) return;

    setIsScratching(false);

    /*
      Scratch completely disappear
    */

    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    /*
      Reveal first
    */

    setRevealed(true);

    /*
      Small delay → popper
    */

    setTimeout(() => {
      setShowPopper(true);
    }, 350);

    /*
      Hide popper
    */

    setTimeout(() => {
      setShowPopper(false);
    }, 2600);
  };

  /* =========================
     SCRATCH
  ========================= */

  const scratch = (event) => {
    if (revealed) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const point =
      event.touches?.[0] ||
      event.changedTouches?.[0] ||
      event;

    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    const ctx = canvas.getContext("2d");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = "destination-out";

    /*
      Scratch brush
    */

    const brushSize = Math.max(
      24,
      Math.min(38, rect.width * 0.075)
    );

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      brushSize,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    scratchCount.current += 1;

    /*
      Enough scratching
    */

    if (scratchCount.current >= 75) {
      revealComplete();
    }
  };

  const startScratch = () => {
    if (!revealed) {
      setIsScratching(true);
    }
  };

  const stopScratch = () => {
    setIsScratching(false);
  };

  /* =========================
     POPPER PARTICLES
  ========================= */

  const particles = Array.from(
    { length: 22 },
    (_, index) => ({
      id: index,
      x: Math.random() * 160 - 80,
      y: Math.random() * -180 - 40,
      rotate: Math.random() * 360,
      delay: Math.random() * 0.2,
    })
  );

  return (
    <section
      className="
        relative
        min-h-[100dvh]
        w-full
        overflow-hidden
        flex
        flex-col
        items-center
        justify-center
        px-4
        py-8
        text-center
        text-[#9E6F3D]
      "
    >
      {/* =========================
          CONTENT WRAPPER
      ========================= */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-[900px]
          flex-col
          items-center
          justify-center
        "
      >

        {/* =========================
            TITLE
        ========================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            whitespace-nowrap
            text-[42px]
            leading-none
            sm:text-[52px]
            md:text-[68px]
            lg:text-[78px]
            xl:text-[88px]
          "
          style={{
            fontFamily: "'Allura', cursive",
          }}
        >
          Scratch & Reveal
        </motion.h1>

        {/* =========================
            DECORATIVE LINE
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            delay: 0.45,
            duration: 0.8,
          }}
          className="
            mt-4
            flex
            items-center
            gap-3
            sm:mt-5
          "
        >
          <span className="h-px w-12 bg-[#9E6F3D] sm:w-16 md:w-20" />

          <span className="text-sm sm:text-base">
            ✦
          </span>

          <span className="h-px w-12 bg-[#9E6F3D] sm:w-16 md:w-20" />
        </motion.div>

        {/* =========================
            HEART AREA
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-8
            flex
            h-[310px]
            w-[310px]
            items-center
            justify-center
            sm:mt-10
            sm:h-[360px]
            sm:w-[360px]
            md:h-[420px]
            md:w-[420px]
            lg:h-[460px]
            lg:w-[460px]
          "
        >
          {/* HEART SHADOW */}

          <div
            className="
              absolute
              inset-[7%]
              rounded-full
              bg-black/30
              blur-xl
            "
          />

          {/* DATE CONTENT */}

          <div
            className="
              relative
              z-[2]
              flex
              flex-col
              items-center
              justify-center
              leading-none
              text-[#9E6F3D]
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            <span
              className="
                text-5xl
                font-semibold
                sm:text-6xl
                md:text-7xl
              "
            >
              06
            </span>

            <span
              className="
                mt-2
                text-2xl
                sm:text-3xl
                md:text-4xl
              "
            >
              December
            </span>

            <span
              className="
                mt-2
                text-3xl
                sm:text-4xl
                md:text-5xl
              "
            >
              2026
            </span>
          </div>

          {/* =========================
              SCRATCH CANVAS
          ========================= */}

          {!revealed && (
            <div
              ref={containerRef}
              className="
                absolute
                inset-0
                z-[5]
                flex
                items-center
                justify-center
              "
            >
              <canvas
                ref={canvasRef}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  touch-none
                  select-none
                  cursor-pointer
                  drop-shadow-[0_12px_25px_rgba(0,0,0,0.35)]
                "
                onMouseDown={startScratch}
                onMouseUp={stopScratch}
                onMouseLeave={stopScratch}
                onMouseMove={(e) => {
                  if (isScratching) {
                    scratch(e);
                  }
                }}
                onTouchStart={startScratch}
                onTouchEnd={stopScratch}
                onTouchMove={scratch}
              />

              {/* SCRATCH LABEL */}

              <div
                className="
                  pointer-events-none
                  absolute
                  z-[10]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-white
                "
                style={{
                  textShadow:
                    "0 2px 8px rgba(0,0,0,.35)",
                }}
              >
                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    sm:text-xs
                    md:text-sm
                  "
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  Scratch The Heart
                </span>

                <span
                  className="
                    mt-1
                    text-[9px]
                    italic
                    sm:text-[10px]
                  "
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  Reveal our special date
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* =========================
            INSTRUCTION
        ========================= */}

        {!revealed && (
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.1,
              duration: 0.8,
            }}
            className="
              mt-5
              px-4
              text-[10px]
              italic
              tracking-[0.08em]
              sm:mt-6
              sm:text-xs
              md:text-sm
            "
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            ✦ Scratch the heart to reveal our date ✦
          </motion.p>
        )}

        {/* =========================
            POPPER
        ========================= */}

        <AnimatePresence>
          {showPopper && (
            <div
              className="
                pointer-events-none
                absolute
                top-[38%]
                left-1/2
                z-50
              "
            >
              {particles.map((particle) => (
                <motion.span
                  key={particle.id}
                  initial={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 0,
                    x: particle.x,
                    y: particle.y,
                    scale: 1,
                    rotate: particle.rotate,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    block
                    h-2
                    w-2
                    rounded-full
                    bg-[#9E6F3D]
                  "
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* =========================
            COUNTDOWN
        ========================= */}

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 1,
              }}
              className="
                mt-8
                flex
                w-full
                flex-col
                items-center
                sm:mt-10
                md:mt-12
              "
            >
              {/* Divider */}

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >
                <span className="h-px w-12 bg-[#9E6F3D] sm:w-16" />

                <span className="text-lg">
                  ♥
                </span>

                <span className="h-px w-12 bg-[#9E6F3D] sm:w-16" />
              </div>

              <p
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Countdown to Our Reception
              </p>

              {/* COUNTDOWN BOXES */}

              <div
                className="
                  mt-5
                  grid
                  w-full
                  max-w-[560px]
                  grid-cols-4
                  gap-2
                  sm:mt-6
                  sm:gap-4
                "
              >
                <CountdownBox
                  label="Days"
                  value={timeLeft.days}
                />

                <CountdownBox
                  label="Hours"
                  value={timeLeft.hours}
                />

                <CountdownBox
                  label="Minutes"
                  value={timeLeft.minutes}
                />

                <CountdownBox
                  label="Seconds"
                  value={timeLeft.seconds}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* =========================
   COUNTDOWN BOX
========================= */

function CountdownBox({ value, label }) {
  return (
    <div
      className="
        flex
        min-h-[70px]
        flex-col
        items-center
        justify-center
        sm:min-h-[82px]
        md:min-h-[95px]
      "
    >
      <span
        className="
          text-2xl
          font-semibold
          leading-none
          sm:text-3xl
          md:text-4xl
        "
        style={{
          fontFamily:
            "'Cormorant Garamond', serif",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>

      <span
        className="
          mt-2
          text-[8px]
          uppercase
          tracking-[0.18em]
          sm:text-[9px]
          md:text-[10px]
        "
        style={{
          fontFamily:
            "'Cormorant Garamond', serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default Page3;