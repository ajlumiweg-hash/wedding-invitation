import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-12-06T11:00:00+05:30");
const INITIAL_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function Page3() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const scratchCount = useRef(0);

  const [revealed, setRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [breaking, setBreaking] = useState(false);
  const [showShards, setShowShards] = useState(false);

  /* COUNTDOWN */

  useEffect(() => {
    if (!revealed) return;

    const updateCountdown = () => {
      const diff = TARGET_DATE.getTime() - Date.now();

      if (diff <= 0) return setTimeLeft(INITIAL_TIME);

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

  /* DRAW HEART SCRATCH CARD */

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const drawHeart = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      /* HEART COORDINATES 0 - 512 */

      const scale = Math.min(width, height) / 512;
      const heartWidth = 512 * scale;
      const heartHeight = 512 * scale;
      const offsetX = (width - heartWidth) / 2;
      const offsetY = (height - heartHeight) / 2;

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      /* HEART SHAPE */

      const heart = new Path2D();

      heart.moveTo(256, 464);
      heart.bezierCurveTo(235, 445, 45, 315, 45, 165);
      heart.bezierCurveTo(45, 90, 105, 40, 170, 40);
      heart.bezierCurveTo(210, 40, 242, 60, 256, 94);
      heart.bezierCurveTo(270, 60, 302, 40, 342, 40);
      heart.bezierCurveTo(407, 40, 467, 90, 467, 165);
      heart.bezierCurveTo(467, 315, 277, 445, 256, 464);
      heart.closePath();

      /* HEART RED 3D SURFACE */

      const gradient = ctx.createLinearGradient(70, 40, 420, 460);

      gradient.addColorStop(0, "#FF6B87");
      gradient.addColorStop(0.4, "#F0284F");
      gradient.addColorStop(0.75, "#C4123A");
      gradient.addColorStop(1, "#7C0A28");

      ctx.fillStyle = gradient;
      ctx.fill(heart);

      /* GLOSSY 3D HIGHLIGHT */

      ctx.save();
      ctx.clip(heart);

      const glossGradient = ctx.createRadialGradient(
        190, 150, 10,
        190, 150, 210
      );

      glossGradient.addColorStop(0, "rgba(255,255,255,0.55)");
      glossGradient.addColorStop(0.35, "rgba(255,255,255,0.14)");
      glossGradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = glossGradient;
      ctx.fillRect(0, 0, 512, 512);

      const rimGradient = ctx.createRadialGradient(
        256, 300, 120,
        256, 300, 320
      );

      rimGradient.addColorStop(0, "rgba(0,0,0,0)");
      rimGradient.addColorStop(1, "rgba(90,0,20,0.35)");

      ctx.fillStyle = rimGradient;
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 60; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 1.6 + 0.3;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.18})`;
        ctx.fill();
      }

      ctx.restore();
      ctx.restore();
      scratchCount.current = 0;
    };

    drawHeart();

    const resizeObserver = new ResizeObserver(drawHeart);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  /* REVEAL */

  const revealComplete = () => {
    if (revealed || breaking) return;

    setIsScratching(false);

    /* SHATTER: heart blasts into pieces first, date + countdown
       only mount once the blast has actually played out. */

    setBreaking(true);
    setShowShards(true);

    setTimeout(() => {
      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      setBreaking(false);
      setRevealed(true);
    }, 650);

    setTimeout(() => setShowShards(false), 1500);
  };

  /* SCRATCH */

  const scratch = (event) => {
    if (revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = event.touches?.[0] || event.changedTouches?.[0] || event;
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";

    /* SCRATCH BRUSH */

    const brushSize = Math.max(24, Math.min(38, rect.width * 0.075));

    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    scratchCount.current += 1;

    /* ENOUGH SCRATCHING */

    if (scratchCount.current >= 75) revealComplete();
  };

  const startScratch = () => {
    if (!revealed) setIsScratching(true);
  };

  const stopScratch = () => setIsScratching(false);

  /* SHATTER SHARD PARTICLES */

  const shardColors = ["#FF6B87", "#F0284F", "#C4123A", "#7C0A28"];

  const shards = Array.from({ length: 26 }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 160;

    return {
      id: index,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: Math.random() * 540 - 270,
      size: 8 + Math.random() * 16,
      color: shardColors[index % shardColors.length],
      delay: Math.random() * 0.08,
    };
  });

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 text-center text-[#9E6F3D]">
      {/* CONTENT WRAPPER */}

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center justify-center">
        {/* TITLE */}
        {/* FIX: fluid clamp() font-size instead of fixed breakpoint jumps,
            so "Scratch & Reveal" never overflows narrow (320-360px) screens
            while whitespace-nowrap is kept for the calligraphy look. */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap leading-none"
          style={{
            fontFamily: "'Allura', cursive",
            fontSize: "clamp(30px, 10vw, 88px)",
          }}
        >
          Scratch & Reveal
        </motion.h1>

        {/* DECORATIVE LINE */}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-4 flex items-center justify-center gap-3 sm:mt-5"
        >
          <span className="h-px w-10 bg-[#9E6F3D] sm:w-16 md:w-20" />
          <span className="text-sm sm:text-base">✦</span>
          <span className="h-px w-10 bg-[#9E6F3D] sm:w-16 md:w-20" />
        </motion.div>

        {/* HEART AREA */}
        {/* FIX: clamp()-based square sizing replaces the fixed px jumps
            (310/360/420/460), so the heart scales smoothly and never
            gets clipped by px-4 padding on small phones (320-360px). */}

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-8 flex aspect-square w-full items-center justify-center sm:mt-10"
          style={{
            width: "clamp(240px, 78vw, 460px)",
            maxWidth: "460px",
          }}
        >
          {/* HEART SHADOW / GLOW */}

          <div className="absolute inset-[7%] rounded-full bg-[#F0284F]/25 blur-2xl" />

          {/* DATE CONTENT */}
          {/* FIX: the heart shape tapers to a point at the bottom, so
              dead-centering this block (old code) pushed "2026" past
              the shape's edge. Anchored higher (top-[40%]) and sized
              down a touch so the whole stack stays inside the wide
              part of the heart at every screen size. */}

          <div
            className="absolute left-1/2 top-[40%] z-[2] flex w-full max-w-[62%] -translate-x-1/2 -translate-y-1/2 flex-col items-center leading-none text-[#9E6F3D]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-[clamp(30px,7.6vw,60px)] font-semibold">
              06
            </span>

            <span className="mt-1.5 whitespace-nowrap text-[clamp(14px,3.4vw,28px)]">
              December
            </span>

            <span className="mt-1.5 text-[clamp(16px,4vw,34px)]">
              2026
            </span>
          </div>

          {/* SCRATCH CANVAS */}
          {/* FIX: on shatter this whole layer scales up + fades so the
              gold... now red heart visually "blasts apart" instead of
              just vanishing, matching the shard burst below it. */}

          {!revealed && (
            <motion.div
              ref={containerRef}
              animate={
                breaking
                  ? { scale: 1.15, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-[5] flex items-center justify-center"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full touch-none select-none cursor-pointer drop-shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
                onMouseDown={startScratch}
                onMouseUp={stopScratch}
                onMouseLeave={stopScratch}
                onMouseMove={(e) => isScratching && scratch(e)}
                onTouchStart={startScratch}
                onTouchEnd={stopScratch}
                onTouchMove={scratch}
              />

              {/* SCRATCH LABEL */}

              <div
                className="pointer-events-none absolute z-[10] flex flex-col items-center justify-center px-4 text-center text-white"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,.35)" }}
              >
                <span
                  className="text-[clamp(9px,2.4vw,14px)] font-bold uppercase tracking-[0.28em]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Scratch The Heart
                </span>

                <span
                  className="mt-1 text-[clamp(8px,2vw,11px)] italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Reveal our special date
                </span>
              </div>
            </motion.div>
          )}

          {/* SHATTER BURST */}
          {/* FIX: replaces the old gold dot "popper" with red heart
              shards that fly outward from the heart's exact center the
              moment scratching completes - date/countdown only mount
              after this plays out (see revealComplete's setTimeout). */}

          <AnimatePresence>
            {showShards && (
              <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
                {shards.map((shard) => (
                  <motion.span
                    key={shard.id}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                    animate={{
                      opacity: 0,
                      x: shard.x,
                      y: shard.y,
                      scale: 1,
                      rotate: shard.rotate,
                    }}
                    transition={{
                      duration: 1.1,
                      delay: shard.delay,
                      ease: "easeOut",
                    }}
                    className="absolute block rounded-sm"
                    style={{
                      width: shard.size,
                      height: shard.size,
                      backgroundColor: shard.color,
                      boxShadow: "0 0 8px rgba(240,40,79,0.6)",
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* INSTRUCTION */}

        {!revealed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-5 max-w-[320px] px-4 text-[clamp(10px,2.6vw,15px)] italic tracking-[0.08em] sm:mt-6 sm:max-w-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ✦ Scratch the heart to reveal our date ✦
          </motion.p>
        )}

        {/* COUNTDOWN */}
        {/* FIX: grid width now scales with clamp() and gets a min gap +
            side padding so the 4 boxes don't crowd/overflow on very
            narrow phones. */}

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-8 flex w-full flex-col items-center px-2 sm:mt-10 md:mt-12"
            >
              {/* DIVIDER */}

              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#9E6F3D] sm:w-16" />
                <span className="text-lg">♥</span>
                <span className="h-px w-10 bg-[#9E6F3D] sm:w-16" />
              </div>

              <p
                className="text-center text-sm sm:text-base md:text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Countdown to Our Reception
              </p>

              {/* COUNTDOWN BOXES */}

              <div
                className="mt-5 grid w-full grid-cols-4 gap-2 sm:mt-6 sm:gap-4"
                style={{ maxWidth: "clamp(280px, 90vw, 560px)" }}
              >
                <CountdownBox label="Days" value={timeLeft.days} />
                <CountdownBox label="Hours" value={timeLeft.hours} />
                <CountdownBox label="Minutes" value={timeLeft.minutes} />
                <CountdownBox label="Seconds" value={timeLeft.seconds} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* COUNTDOWN BOX */

function CountdownBox({ value, label }) {
  return (
    <div className="flex min-h-[64px] flex-col items-center justify-center sm:min-h-[82px] md:min-h-[95px]">
      <span
        className="text-[clamp(20px,6vw,40px)] font-semibold leading-none"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {String(value).padStart(2, "0")}
      </span>

      <span
        className="mt-2 text-[clamp(7px,1.8vw,10px)] uppercase tracking-[0.18em]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default Page3;
