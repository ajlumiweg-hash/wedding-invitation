import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-12-06T11:00:00+05:30");
const INITIAL_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function Page3() {
  const canvasRef = useRef(null);
  const scratchContainerRef = useRef(null);
  const scratchedPixels = useRef(0);

  const [revealed, setRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    if (!revealed) return;

    const updateCountdown = () => {
      const diff = TARGET_DATE - Date.now();

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = scratchContainerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      Object.assign(canvas.style, {
        width: `${width}px`,
        height: `${height}px`,
      });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#9E6F3D";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,.08)";

      for (let i = 0; i < 150; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      scratchedPixels.current = 0;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () =>
      window.removeEventListener("resize", resizeCanvas);
  }, []);

  const revealComplete = () => {
    if (revealed) return;

    setRevealed(true);

    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const scratch = (e) => {
    if (revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { left, top } = canvas.getBoundingClientRect();
    const point = e.touches?.[0] || e;

    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(point.clientX - left, point.clientY - top, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (++scratchedPixels.current > 55) revealComplete();
  };

  const startScratch = () => setIsScratching(true);
  const stopScratch = () => setIsScratching(false);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-[#9E6F3D]">

      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 text-[10px] uppercase tracking-[.4em]"
      >
        A little surprise
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .2 }}
        className="text-3xl font-serif font-semibold"
      >
        Scratch & Reveal
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: .8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: .4, duration: .8 }}
        className="relative mt-7"
      >
        <div className="relative flex h-[220px] w-[250px] items-center justify-center">

            <svg
            viewBox="0 0 512 512"
            className="absolute h-[220px] w-[220px]"
            >
            <defs>
                <linearGradient id="heart" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7A1630" />
                <stop offset="60%" stopColor="#4B0B1B" />
                <stop offset="100%" stopColor="#23040D" />
                </linearGradient>
            </defs>

            <path
                fill="url(#heart)"
                d="M256 464S32 320 32 160C32 90 90 32 160 32c44 0 82 24 96 60 14-36 52-60 96-60 70 0 128 58 128 128 0 160-224 304-224 304Z"
            />
            </svg>


          <div className="relative z-10 font-serif font-bold leading-tight">
            <div className="text-4xl">06</div>
            <div className="text-3xl">December</div>
            <div className="text-3xl">2026</div>
          </div>

          {!revealed && (
            <div
            ref={scratchContainerRef}
            className="absolute inset-0 z-20 overflow-hidden"
            style={{
                clipPath:
                "path('M128 228C18 146-15 78 24 32C54-3 111 9 128 56C145 9 202-3 232 32C271 78 238 146 128 228Z')",
            }}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-pointer touch-none"
                onMouseDown={startScratch}
                onMouseUp={stopScratch}
                onMouseLeave={stopScratch}
                onMouseMove={(e) => isScratching && scratch(e)}
                onTouchStart={startScratch}
                onTouchEnd={stopScratch}
                onTouchMove={scratch}
              />
            </div>
          )}
        </div>
      </motion.div>

      {!revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-1"
        >
          <p className="text-xs italic tracking-wide font-serif">
            ✦ Scratch the heart to reveal our date ✦
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: .8 }}
        className="mt-5 flex items-center gap-3"
      >
        <span className="h-[2px] w-16 bg-[#9E6F3D]" />
        <span className="text-xl">♥</span>
        <span className="h-[2px] w-16 bg-[#9E6F3D]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-5 text-sm font-serif"
      >
        Countdown to Our Reception
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: revealed ? 1 : 0.35, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-4 flex"
      >
        {[
          ["days", timeLeft.days],
          ["hours", timeLeft.hours],
          ["min", timeLeft.minutes],
          ["sec", timeLeft.seconds],
        ].map(([label, value]) => (
          <CountdownBox
            key={label}
            label={label}
            value={value}
          />
        ))}
      </motion.div>
    </section>
  );
}

const CountdownBox = ({ value, label }) => (
  <div className="flex h-[60px] w-[68px] flex-col items-center justify-center border border-[#9E6F3D]">
    <span className="text-lg font-semibold">
      {String(value).padStart(2, "0")}
    </span>

    <span className="text-[9px] uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default Page3;