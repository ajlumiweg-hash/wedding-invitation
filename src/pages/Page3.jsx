import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-12-06T11:00:00+05:30");

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

  /* COUNTDOWN — only runs after the scratch card is revealed */
  useEffect(() => {
    if (!revealed) return;

    const update = () => {
      const diff = TARGET_DATE - new Date();

      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  /* LOVE REVEAL POPUP */
  useEffect(() => {
    if (!showRevealPopup) return;

    const timer = setTimeout(() => {
      setShowRevealPopup(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showRevealPopup]);

  /* SCRATCH */
  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box || revealed) return;

    const ctx = canvas.getContext("2d");
    let drawing = false;
    let scratches = 0;

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

      heart.moveTo(x + 256 * scale, y + 425 * scale);
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
      ctx.fillRect(x, y, size, size);

      for (let i = 0; i < 80; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(230,190,110,0.22)";
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

      ctx.strokeStyle = "rgba(225,180,100,.85)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(225,180,100,.6)";
      ctx.stroke(heart);
      ctx.shadowBlur = 0;
    };

    const point = (e) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: (e.touches?.[0]?.clientX ?? e.clientX) - rect.left,
        y: (e.touches?.[0]?.clientY ?? e.clientY) - rect.top,
      };
    };

    const scratch = (e) => {
      if (!drawing) return;

      e.preventDefault();

      const { x, y } = point(e);

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        Math.max(15, box.clientWidth * 0.035),
        0,
        Math.PI * 2
      );

      ctx.fill();
      ctx.restore();

      scratches++;

      if (scratches > 70) {
        setRevealed(true);
        setShowRevealPopup(true);
      }
    };

    const start = (e) => {
      drawing = true;
      scratch(e);
    };

    const stop = () => {
      drawing = false;
    };

    draw();

    window.addEventListener("resize", draw);
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", scratch);
    window.addEventListener("mouseup", stop);

    canvas.addEventListener("touchstart", start, {
      passive: false,
    });

    canvas.addEventListener("touchmove", scratch, {
      passive: false,
    });

    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("resize", draw);
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", scratch);
      window.removeEventListener("mouseup", stop);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", scratch);
      window.removeEventListener("touchend", stop);
    };
  }, [revealed]);

  const countdown = [
    [time.days, "DAYS"],
    [time.hours, "HOURS"],
    [time.minutes, "MINUTES"],
    [time.seconds, "SECONDS"],
  ];

  return (
    <section className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center">

      <div className="flex w-full max-w-[520px] flex-col items-center">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="font-['Great_Vibes'] text-[32px] text-[#D6A85F] sm:text-[42px]">
            Scratch &amp; Reveal
          </h2>

          {/* Decorative Line */}
          <motion.div
            variants={{
              hidden: { width: 0, opacity: 0 },
              show: {
                width: 75,
                opacity: 1,
                transition: {
                  duration: 0.9,
                  ease: "easeOut",
                },
              },
            }}
            className="mb-6 h-px bg-gradient-to-r from-transparent via-[#946F45] to-transparent"
          />
        </motion.div>

        {/* HEART */}
        <motion.div
          ref={boxRef}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-3 aspect-square w-[90vw] max-w-[420px] translate-x-1 md:translate-x-0"
        >

          {/* DATE */}
          <div className="absolute inset-0 z-[1] flex items-center justify-center">
            <div className="-translate-y-13 text-center">

              <div className="font-['Cinzel'] text-[34px] leading-none text-[#E4C28A] drop-shadow-[0_0_8px_rgba(228,194,138,.5)] sm:text-[42px]">
                06
              </div>

              <div className="mt-1 font-['Cinzel'] text-[12px] tracking-[.12em] text-[#D6A85F] sm:text-[15px]">
                December
              </div>

              <div className="font-['Cinzel'] text-[12px] tracking-[.08em] text-[#D6A85F] sm:text-[15px]">
                2026
              </div>

            </div>
          </div>

          {/* SCRATCH */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-[2] h-full w-full touch-none"
            />
          )}
        </motion.div>

        {/* INSTRUCTION — shown only until the card is scratched */}
        {!revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="-mt-3 text-center sm:-mt-5"
          >

            {/* Decorative Line */}
            <motion.div
              variants={{
                hidden: { width: 0, opacity: 0 },
                show: {
                  width: 75,
                  opacity: 1,
                  transition: {
                    duration: 0.9,
                    ease: "easeOut",
                  },
                },
              }}
              className="mb-6 h-px bg-gradient-to-r from-transparent via-[#946F45] to-transparent"
            />

            <p className="font-['Cinzel'] text-[10px] text-[#D6A85F] sm:text-[11px]">
              Scratch the heart
            </p>

            <p className="font-['Cinzel'] text-[8px] tracking-wide text-[#A97B42] sm:text-[9px]">
              to reveal our date
            </p>

          </motion.div>
        )}

        {/* COUNTDOWN */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
            className="w-full max-w-[440px] -mt-30 sm:-mt-1"
          >

            <p className="mb-4 text-center font-['Cinzel'] text-[9px] tracking-[.25em] text-[#B8894F] sm:text-[10px]">
              COUNTDOWN TO OUR RECEPTION
            </p>

            <div className="flex w-full items-center justify-center">

              {countdown.map(([value, label], index) => (
                <div
                  key={label}
                  className="relative flex flex-1 flex-col items-center justify-center"
                >

                  {/* NUMBER */}
                  <motion.div
                    key={value}
                    initial={{
                      opacity: 0,
                      y: 6,
                      scale: 0.92,
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
                    className="font-['Bodoni_Moda'] text-[34px] font-medium leading-none tracking-[-.04em] text-[#D6A85F] drop-shadow-[0_0_12px_rgba(214,168,95,.28)] sm:text-[43px]"
                  >
                    {String(value).padStart(2, "0")}
                  </motion.div>

                  {/* LABEL */}
                  <div className="mt-2 font-['Cinzel'] text-[6px] tracking-[.25em] text-[#A97B42] sm:text-[7px]">
                    {label}
                  </div>

                  {/* SEPARATOR */}
                  {index < countdown.length - 1 && (
                    <span className="absolute right-0 top-[14px] font-['Bodoni_Moda'] text-[20px] text-[#946F45]/70 sm:top-[18px] sm:text-[25px]">
                      :
                    </span>
                  )}

                </div>
              ))}

            </div>

          </motion.div>
        )}

      </div>

      {/* ❤️ LOVE REVEAL POPUP */}
      <AnimatePresence>
        {showRevealPopup && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
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
              className="flex flex-col items-center justify-center text-center"
            >


              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.5,
                }}
                className="mt-2 font-['Cinzel'] text-[9px] tracking-[.35em] text-[#D6A85F] sm:text-[11px]"
              >
                REVEALED
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  scale: [0.8, 1.18, 1],
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.55,
                }}
                className="mt-3 text-[22px] drop-shadow-[0_0_12px_rgba(214,168,95,.5)]"
              >
                ♥
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}