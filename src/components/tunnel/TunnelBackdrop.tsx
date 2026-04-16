"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

const RING_COUNT = 26;
const RING_STEP = 165;

type TunnelBackdropProps = {
  trackRef: React.RefObject<HTMLDivElement>;
  parallaxRef: React.RefObject<HTMLDivElement>;
  lightsRef: React.RefObject<HTMLDivElement>;
};

/**
 * Fixed full-viewport tunnel: structural rings, rim lighting, subtle haze.
 * GSAP manipulates `trackRef` / `parallaxRef` transforms for depth motion.
 */
export function TunnelBackdrop({
  trackRef,
  parallaxRef,
  lightsRef,
}: TunnelBackdropProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => ({
        key: i,
        z: -i * RING_STEP,
        scale: 0.72 + i * 0.028,
      })),
    [],
  );

  const particles = useMemo(() => {
    const count = 28;
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 31) % 100}%`,
      delay: (i % 7) * 0.4,
      size: 1 + (i % 3),
    }));
  }, []);

  const showParticles = mounted && reduceMotion !== true;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void"
      aria-hidden
    >
      <div className="tunnel-stage absolute inset-0">
        <div className="absolute inset-0 bg-tunnel-vignette bg-center" />
        <div className="absolute inset-0 bg-radial-fog opacity-50" />

        <div
          ref={parallaxRef}
          className="tunnel-track absolute left-1/2 top-[42%] h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/25 to-void" />
          {showParticles &&
            particles.map((p) => (
              <span
                key={p.key}
                className="absolute rounded-full bg-fog/15"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animation: `pulse-slow ${6 + (p.key % 5)}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            ))}
        </div>

        <div
          ref={trackRef}
          className="tunnel-track absolute left-1/2 top-[42%] h-[140vh] w-[140vw] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {rings.map((ring) => (
            <div
              key={ring.key}
              className="tunnel-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[48%] border border-white/[0.028] bg-gradient-to-b from-transparent via-transparent to-transparent shadow-[inset_0_0_60px_rgba(0,0,0,0.88)]"
              style={{
                width: `${ring.scale * 78}%`,
                height: `${ring.scale * 52}%`,
                transform: `translateZ(${ring.z}px) rotateX(64deg)`,
                opacity: Math.min(0.55, 0.08 + ring.key * 0.018),
              }}
            />
          ))}
        </div>

        {/* Static rail corridor: steel runners + sleepers (not on the moving track — no “breathing” glow). */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] flex items-end justify-center pb-[6vh] sm:pb-[8vh]"
          aria-hidden
        >
          <div
            className="relative h-[min(38vh,320px)] w-[min(88vw,640px)]"
            style={{
              transform: "perspective(820px) rotateX(72deg)",
              transformOrigin: "50% 100%",
            }}
          >
            <div
              className="absolute inset-x-[10%] bottom-0 top-[18%] rounded-[2px] opacity-[0.22]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 20px, rgba(255,255,255,0.06) 20px, rgba(255,255,255,0.06) 21px)",
              }}
            />
            <div className="absolute bottom-0 left-[9%] top-0 w-[3px] rounded-sm bg-gradient-to-b from-white/[0.08] via-steel to-black shadow-[inset_1px_0_0_rgba(255,255,255,0.04)]" />
            <div className="absolute bottom-0 right-[9%] top-0 w-[3px] rounded-sm bg-gradient-to-b from-white/[0.08] via-steel to-black shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]" />
          </div>
        </div>

        <div
          ref={lightsRef}
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ opacity: 0.22 }}
        >
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 3px)",
          }}
        />
      </div>
    </div>
  );
}
