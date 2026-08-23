import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function OpeningScreen({ onComplete, onOpenMusic}) {
  const [popping, setPopping] = useState(false);
  const [closing, setClosing] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        top: (i * 37) % 100,
        left: (i * 61) % 100,
        size: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1.4,
        delay: (i % 8) * 0.4,
        duration: 3.2 + (i % 5) * 0.6,
      })),
    []
  );

  const confetti = useMemo(() => {
    const colors = ["#946F45", "#C9A661", "#F3DFAE"];
    return Array.from({ length: 34 }).map((_, i) => {
      const angle = (i / 34) * Math.PI * 2 + ((i % 5) * 0.18);
      const distance = 170 + (i % 6) * 46;
      return {
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        rot: (i * 53) % 360,
        size: i % 3 === 0 ? 11 : 7,
        color: colors[i % colors.length],
        delay: (i % 7) * 0.02,
      };
    });
  }, []);

  // lock background scroll while this screen is mounted
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleOpen = () => {
    if (popping) return;
    onComplete?.();
    setPopping(true);
    window.setTimeout(() => setClosing(true), 750);
  };

  return (
    <motion.div
      onClick={handleOpen}
      initial={{ opacity: 1 }}
      animate={closing ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (closing) onComplete?.();
      }}
      className="fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-between overflow-hidden bg-[#030817] py-[6vh] text-[#946F45] select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,500;1,400&family=Marcellus&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-label { font-family: 'Marcellus', serif; }
        .font-monogram { font-family: 'Bodoni Moda', serif; }

        @keyframes drawDiamond { from { stroke-dashoffset: 416; } to { stroke-dashoffset: 0; } }
        @keyframes drawDiamondInner { from { stroke-dashoffset: 320; } to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseRing { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinSlowReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,-12px); } }
        @keyframes twinkle { 0%,100% { opacity: .15; transform: scale(0.8); } 50% { opacity: .9; transform: scale(1.15); } }
        @keyframes shimmerText {
          0% { background-position: -160% 0; }
          100% { background-position: 260% 0; }
        }
        @keyframes haloGlow { 0%,100% { opacity: .06; } 50% { opacity: .14; } }
        @keyframes confettiBurst {
          0% { transform: translate(0,0) rotate(0deg) scale(0.3); opacity: 1; }
          65% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(1); opacity: 0; }
        }

        .reveal { animation: fadeUp 1.1s cubic-bezier(.22,1,.36,1) both; }
        .spin-slow { animation: spinSlow 34s linear infinite; }
        .spin-slow-rev { animation: spinSlowReverse 26s linear infinite; }
        .halo { animation: haloGlow 6s ease-in-out infinite; }

        .confetti-piece {
          position: absolute;
          border-radius: 1px;
          opacity: 0;
          animation: confettiBurst 0.9s cubic-bezier(.16,1,.3,1) forwards;
        }

        .monogram-wrap {
          position: relative;
          width: clamp(210px, 64vw, 260px);
          height: clamp(210px, 64vw, 260px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .monogram-wrap svg.layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .shimmer-text {
          background-image: linear-gradient(
            100deg,
            #946F45 30%,
            #946F45 42%,
            #F3DFAE 50%,
            #946F45 58%,
            #946F45 70%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmerText 3.6s ease-in-out infinite;
        }
      `}</style>

      {/* ambient halo behind everything */}
      <div
        className="halo pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #946F45 0%, transparent 70%)" }}
      />

      {/* floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#C9A661",
            animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite, drift ${p.duration + 2}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* corner motifs */}
      <CornerMotif className="absolute top-4 left-4 sm:top-6 sm:left-6" />
      <CornerMotif className="absolute top-4 right-4 rotate-90 sm:top-6 sm:right-6" />
      <CornerMotif className="absolute bottom-4 left-4 -rotate-90 sm:bottom-6 sm:left-6" />
      <CornerMotif className="absolute bottom-4 right-4 rotate-180 sm:bottom-6 sm:right-6" />

      {/* paper-popper confetti burst on tap */}
      {popping && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
          {confetti.map((c, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                "--tx": `${c.tx}px`,
                "--ty": `${c.ty}px`,
                "--rot": `${c.rot}deg`,
                width: `${c.size}px`,
                height: `${c.size * 1.6}px`,
                background: c.color,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* content vanishes instantly the moment it's tapped */}
      {!popping && (
        <>
          <p className="reveal font-label px-6 text-center text-[9px] tracking-[0.4em] uppercase text-[#946F45]/70 sm:text-[10px] sm:tracking-[0.5em]">
            You are invited
          </p>

          <div className="relative flex flex-col items-center px-6 text-center">
            <div className="reveal monogram-wrap" style={{ animationDelay: "0.2s" }}>
              <svg viewBox="0 0 170 170" className="layer spin-slow opacity-70">
                <circle
                  cx="85" cy="85" r="82"
                  fill="none" stroke="#946F45" strokeWidth="0.4"
                  strokeDasharray="2 6"
                />
              </svg>

              <svg viewBox="0 0 170 170" className="layer spin-slow-rev opacity-50">
                <circle
                  cx="85" cy="85" r="70"
                  fill="none" stroke="#C9A661" strokeWidth="0.4"
                  strokeDasharray="1 9"
                />
              </svg>

              <svg viewBox="0 0 170 170" className="layer">
                <rect
                  x="33" y="33" width="104" height="104"
                  transform="rotate(45 85 85)"
                  fill="none" stroke="#946F45" strokeWidth="0.75"
                  strokeDasharray="416"
                  style={{ animation: "drawDiamond 2.4s ease-out 0.3s both" }}
                />
                <rect
                  x="45" y="45" width="80" height="80"
                  transform="rotate(45 85 85)"
                  fill="none" stroke="#C9A661" strokeWidth="0.4"
                  strokeDasharray="320" opacity="0.6"
                  style={{ animation: "drawDiamondInner 1.9s ease-out 0.8s both, pulseRing 3.4s ease-in-out 2.7s infinite" }}
                />
              </svg>

              <h1
                className="font-monogram shimmer-text relative italic leading-none tracking-wide"
                style={{ fontSize: "clamp(38px, 11.5vw, 60px)", fontWeight: 500 }}
              >
                A
                <span
                  className="mx-1 align-middle not-italic opacity-60"
                  style={{ fontSize: "clamp(14px, 4.5vw, 20px)" }}
                >
                  &amp;
                </span>
                J
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 text-center">
            <p
              className="reveal font-label text-[10px] tracking-[0.35em] uppercase text-[#C9A661] mb-1 sm:text-[11px] sm:tracking-[0.4em]"
              style={{ animationDelay: "0.65s" }}
            >
              Tap to open
            </p>
            <p
              className="reveal font-display italic text-[13px] text-[#946F45]/60 sm:text-sm"
              style={{ animationDelay: "0.8s" }}
            >
              our wedding invitation
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}

function CornerMotif({ className = "" }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 44 44"
      className={className}
      opacity="0.55"
    >
      <path
        d="M2 22 L2 2 L22 2"
        fill="none"
        stroke="#946F45"
        strokeWidth="0.75"
      />
      <circle cx="2" cy="2" r="2" fill="#C9A661" />
    </svg>
  );
}
