import { useMemo } from "react";
import { motion } from "framer-motion";

export default function Popper() {
  const particles = useMemo(() => {
    const createSide = (side) =>
      Array.from({ length: 22 }, (_, i) => ({
        id: `${side}-${i}`,
        side,
        angle:
          side === "left"
            ? -48 + Math.random() * 96
            : 132 + Math.random() * 96,
        distance: 100 + Math.random() * 150,
        size: 3 + Math.random() * 4,
        delay: Math.random() * 0.08,
        rotation: Math.random() * 360,
      }));

    return [
      ...createSide("left"),
      ...createSide("right"),
    ];
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* LEFT POPPER */}
      <div className="absolute left-0 top-1/2">
        {particles
          .filter((p) => p.side === "left")
          .map((p) => {
            const radians = (p.angle * Math.PI) / 180;

            return (
              <motion.span
                key={p.id}
                className="absolute block rounded-[1px]"
                style={{
                  width: p.size,
                  height: p.size * 1.8,
                  background:
                    Math.random() > 0.5
                      ? "#E4C28A"
                      : "#F7E7C1",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: Math.cos(radians) * p.distance,
                  y: Math.sin(radians) * p.distance,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.7],
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 1.05,
                  delay: p.delay,
                  ease: [0.12, 0.8, 0.25, 1],
                }}
              />
            );
          })}
      </div>

      {/* RIGHT POPPER */}
      <div className="absolute right-0 top-1/2">
        {particles
          .filter((p) => p.side === "right")
          .map((p) => {
            const radians = (p.angle * Math.PI) / 180;

            return (
              <motion.span
                key={p.id}
                className="absolute block rounded-[1px]"
                style={{
                  width: p.size,
                  height: p.size * 1.8,
                  background:
                    Math.random() > 0.5
                      ? "#E4C28A"
                      : "#F7E7C1",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: Math.cos(radians) * p.distance,
                  y: Math.sin(radians) * p.distance,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.7],
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 1.05,
                  delay: p.delay,
                  ease: [0.12, 0.8, 0.25, 1],
                }}
              />
            );
          })}
      </div>
    </div>
  );
}