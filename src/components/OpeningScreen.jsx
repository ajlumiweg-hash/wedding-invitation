import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lockerSound from "../assets/locker.m4a";


/* =========================================================
   PREMIUM MIDNIGHT NAVY + CHAMPAGNE GOLD
========================================================= */

const dust = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 1.4 + 0.5,
  delay: Math.random() * 6,
  duration: 5 + Math.random() * 5,
}));

const rimTicks = Array.from({ length: 48 }, (_, i) => i);

function makeShards(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 90 + Math.random() * 260;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rot: (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 340),
      size: 5 + Math.random() * 13,
      delay: Math.random() * 0.22,
      duration: 0.8 + Math.random() * 0.6,
      warm: Math.random() > 0.4,
    };
  });
}

function makePetals(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 220;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * 0.6 + 40,
      rot: Math.random() * 360,
      delay: 0.05 + Math.random() * 0.5,
      duration: 1.1 + Math.random() * 0.7,
      w: 6 + Math.random() * 5,
      h: 9 + Math.random() * 8,
    };
  });
}

export default function OpeningScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [pressed, setPressed] = useState(false);

  const shards = useMemo(() => makeShards(34), []);
  const petals = useMemo(() => makePetals(16), []);

  useEffect(() => {
    if (step !== 2) return;
    const t = setTimeout(() => setStep(3), 620);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 3) return;
    const t = setTimeout(() => onComplete(), 950);
    return () => clearTimeout(t);
  }, [step, onComplete]);

  const breakSeal = () => {
    if (step !== 1 || pressed) return;
    const audio = new Audio(lockerSound);
    audio.currentTime = 1;
    audio.play().catch(() => {});
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      setStep(2);
    }, 260);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#020611]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: "1400px" }}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(170deg,#020611_0%,#061126_42%,#081832_58%,#01040C_100%)]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#173967]/[0.10] blur-[145px]"
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A866]/[0.035] blur-[120px]"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {dust.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full bg-[#C6A866]"
            style={{
              left: d.x,
              top: d.y,
              width: `${d.size}px`,
              height: `${d.size}px`,
              boxShadow: `0 0 ${d.size * 3}px rgba(198,168,102,0.38)`,
            }}
            animate={{ opacity: [0.04, 0.32, 0.04], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,3,10,0.42)_62%,rgba(0,2,7,0.92)_100%)]" />
      </div>

      {/* CARD FRAME */}
      <div className="pointer-events-none absolute inset-[18px] sm:inset-[28px]">
        {[
          "left-0 top-0 border-l border-t rounded-tl-[3px]",
          "right-0 top-0 border-r border-t rounded-tr-[3px]",
          "left-0 bottom-0 border-l border-b rounded-bl-[3px]",
          "right-0 bottom-0 border-r border-b rounded-br-[3px]",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute h-10 w-10 border-[#A88A52]/35 ${cls}`}
            animate={{ opacity: step >= 3 ? 0 : [0.28, 0.52, 0.28] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* MAIN COLUMN */}
      <div
        className="relative z-10 flex h-full w-full max-w-[420px] flex-col items-center justify-center px-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatePresence>
          {step < 3 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[11%] flex flex-col items-center text-center"
            >
              <p className="font-['Cinzel_Decorative'] text-[9px] font-medium uppercase tracking-[0.42em] text-[#D7BD84]/75 sm:text-[11px]">
                The&nbsp;Beginning&nbsp;of&nbsp;Forever
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-9 bg-gradient-to-r from-transparent to-[#8E713D]/60" />
                <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#C6A866]/65">
                  <path
                    d="M6 0 C6 3.5 8.5 6 12 6 C8.5 6 6 8.5 6 12 C6 8.5 3.5 6 0 6 C3.5 6 6 3.5 6 0Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="h-px w-9 bg-gradient-to-l from-transparent to-[#8E713D]/60" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D SEAL STAGE */}
        <div
          className="relative flex h-[268px] w-[268px] items-center justify-center sm:h-[336px] sm:w-[336px]"
          style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute left-1/2 top-[58%] h-[205px] w-[205px] -translate-x-1/2 rounded-full bg-black/80 blur-[38px]"
            animate={
              step >= 3
                ? { scale: [1, 1.15, 0.5], opacity: [0.65, 0.3, 0] }
                : { scale: [1, 1.04, 1], opacity: [0.58, 0.72, 0.58] }
            }
            transition={{ duration: 4, repeat: step < 3 ? Infinity : 0, ease: "easeInOut" }}
            style={{ transform: "translateZ(-90px)" }}
          />

          <motion.div
            className="absolute h-[250px] w-[250px] rounded-full bg-[#173B69]/[0.12] blur-[60px] sm:h-[318px] sm:w-[318px]"
            animate={{
              opacity: step >= 2 ? [0.18, 0.4, 0.18] : [0.07, 0.15, 0.07],
              scale: step >= 2 ? [1, 1.1, 1] : [1, 1.03, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(-40px)" }}
          />

          {step < 3 && (
            <motion.svg
              viewBox="0 0 300 300"
              className="absolute h-[236px] w-[236px] sm:h-[300px] sm:w-[300px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ transform: "translateZ(42px)", transformStyle: "preserve-3d" }}
            >
              {rimTicks.map((i) => {
                const a = (Math.PI * 2 * i) / rimTicks.length;
                const r1 = 144;
                const r2 = i % 4 === 0 ? 132 : 138;
                const x1 = 150 + Math.cos(a) * r1;
                const y1 = 150 + Math.sin(a) * r1;
                const x2 = 150 + Math.cos(a) * r2;
                const y2 = 150 + Math.sin(a) * r2;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#C6A866"
                    strokeOpacity={i % 4 === 0 ? 0.52 : 0.22}
                    strokeWidth={i % 4 === 0 ? 1.3 : 0.7}
                  />
                );
              })}
            </motion.svg>
          )}

          <motion.button
            type="button"
            aria-label="Break the seal to enter"
            onClick={breakSeal}
            animate={
              step >= 3
                ? {
                    scale: [1, 1.05, 0.9, 0.3],
                    opacity: [1, 1, 0.6, 0],
                    rotateX: [0, 5, -8, 20],
                    rotateY: [0, -6, 7, -15],
                  }
                : pressed
                ? { scale: 0.9, rotateX: 8, rotateY: -8 }
                : step === 1
                ? { scale: [1, 1.012, 1], rotateX: [2, -2, 2], rotateY: [-3, 3, -3] }
                : { scale: 1.02, rotateX: 0, rotateY: 0 }
            }
            transition={
              step >= 3
                ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                : pressed
                ? { duration: 0.18 }
                : step === 1
                ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
            className="absolute z-20 h-[214px] w-[214px] cursor-pointer rounded-full outline-none sm:h-[278px] sm:w-[278px]"
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 31% 22%, #21466F 0%, #17365D 18%, #0E2444 42%, #08162F 68%, #030A17 100%)",
                boxShadow:
                  "inset 0 3px 8px rgba(177,205,235,0.13), inset 0 -25px 38px rgba(0,0,0,0.82), 0 22px 45px rgba(0,0,0,0.82), 0 5px 0 #020711, 0 9px 0 #01040A, 0 0 24px rgba(20,55,96,0.18)",
                transform: "translateZ(0px)",
              }}
            />
            <div
              className="absolute inset-[5px] rounded-full border border-[#E1C98F]/70"
              style={{
                boxShadow: "0 1px 0 rgba(255,238,192,0.45), inset 0 0 8px rgba(198,168,102,0.10)",
                transform: "translateZ(8px)",
              }}
            />
            <div
              className="absolute inset-[8px] rounded-full border-[3px] border-[#6A512A]/60"
              style={{ transform: "translateZ(3px)" }}
            />
            <div
              className="absolute inset-[12px] rounded-full border border-[#C6A866]/60"
              style={{
                transform: "translateZ(11px)",
                boxShadow: "0 0 7px rgba(198,168,102,0.12), inset 0 0 8px rgba(198,168,102,0.07)",
              }}
            />
            <div
              className="absolute inset-[18px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 28%, #17375E 0%, #0E2443 38%, #07152C 72%, #030A17 100%)",
                boxShadow: "inset 0 5px 12px rgba(106,143,185,0.10), inset 0 -18px 24px rgba(0,0,0,0.58)",
                transform: "translateZ(14px)",
              }}
            />
            <div
              className="absolute inset-[23px] rounded-full border border-[#D6BA7B]/28"
              style={{ transform: "translateZ(18px)" }}
            />

            <motion.div
              className="pointer-events-none absolute left-[14%] top-[9%] h-[43%] w-[65%] rounded-full bg-[#A9C7E8]/[0.055] blur-[13px]"
              animate={{ x: [-3, 8, -3], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(21px) rotate(-18deg)" }}
            />
            <motion.div
              className="pointer-events-none absolute left-[18%] top-[18%] h-[18%] w-[22%] rounded-full bg-[#F3DDA8]/[0.10] blur-[8px]"
              animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(24px) rotate(-22deg)" }}
            />

            {/* =================================================
                FLAT LUXURY AJ 
            ================================================== */}
<motion.span
  className="relative z-10 inline-block font-['Cormorant_Garamond'] text-[118px] font-medium leading-[0.72] tracking-[-0.06em] text-[#E7CF98] sm:text-[148px]"
  animate={{ y: [0, -1, 0], scale: [1, 1.008, 1] }}
  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
  style={{
    fontStyle: "normal",
    textShadow: "0 1px 0 rgba(255,244,211,0.65), 0 2px 5px rgba(0,0,0,0.5)",
    transform: "translate(2%, -6%)",
  }}
>
  AJ
</motion.span>
            {step === 1 && (
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E6D39E]/20"
                animate={{ scale: [0.7, 1.7], opacity: [0.4, 0] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
                style={{ transform: "translate(-50%, -50%) translateZ(30px)" }}
              />
            )}

            {step >= 2 && (
              <svg
                viewBox="0 0 200 200"
                className="pointer-events-none absolute inset-0 z-30"
                style={{ transform: "translateZ(40px)" }}
              >
                {[
                  "M100 100 L88 26 L96 8",
                  "M100 100 L150 40 L168 22",
                  "M100 100 L172 108 L192 118",
                  "M100 100 L146 168 L160 188",
                  "M100 100 L58 172 L44 190",
                  "M100 100 L26 96 L6 90",
                  "M100 100 L44 44 L28 30",
                ].map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="#01050D"
                    strokeWidth={i % 2 === 0 ? 1.6 : 1.1}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.88 }}
                    transition={{ duration: 0.32, delay: i * 0.02, ease: "easeOut" }}
                  />
                ))}
              </svg>
            )}

            {step >= 2 && (
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3E6C5] blur-[22px]"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.3, 1.4, 2] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transform: "translate(-50%, -50%) translateZ(50px)" }}
              />
            )}
          </motion.button>

          {step >= 3 && (
            <motion.div
              className="pointer-events-none absolute z-[60] h-[90px] w-[90px] rounded-full bg-[#E8D19A] blur-[38px]"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 2.4] }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </div>

        <AnimatePresence>
          {step === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-[13%] font-['Cinzel_Decorative'] text-[9px] font-medium uppercase tracking-[0.38em] text-[#946F45] sm:text-[10px]"
            >
              Break the Seal
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {step >= 2 && (
        <div className="pointer-events-none absolute inset-0 z-[200] overflow-hidden">
          {shards.map((s) => (
            <motion.span
              key={`shard-${s.id}`}
              className="absolute left-1/2 top-1/2 rounded-[1px]"
              style={{
                width: `${s.size}px`,
                height: `${s.size * 0.7}px`,
                background: s.warm
                  ? "linear-gradient(135deg,#F0D9A3,#C6A866)"
                  : "linear-gradient(135deg,#80673B,#382A16)",
                boxShadow: "0 0 6px rgba(198,168,102,0.36)",
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{
                x: [0, s.x * 0.4, s.x],
                y: [0, s.y * 0.4 - 8, s.y + 40],
                opacity: [0, 1, 0.9, 0],
                scale: [0.2, 1, 0.85, 0.4],
                rotate: [0, s.rot * 0.4, s.rot],
              }}
              transition={{ duration: s.duration, delay: s.delay, ease: [0.16, 0.85, 0.3, 1] }}
            />
          ))}

          {petals.map((p) => (
            <motion.span
              key={`petal-${p.id}`}
              className="absolute left-1/2 top-1/2 rounded-[60%_10%]"
              style={{
                width: `${p.w}px`,
                height: `${p.h}px`,
                background: "linear-gradient(160deg,#D9BBA2,#8C6848)",
                opacity: 0.72,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: p.rot }}
              animate={{
                x: [0, p.x * 0.5, p.x],
                y: [0, p.y * 0.5, p.y + 70],
                opacity: [0, 0.85, 0.55, 0],
                rotate: [p.rot, p.rot + 140, p.rot + 260],
                scale: [0.3, 1, 0.9],
              }}
              transition={{ duration: p.duration + 0.4, delay: p.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
