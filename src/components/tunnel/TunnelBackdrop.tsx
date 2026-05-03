"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

const RING_COUNT_FULL = 26;
const RING_COUNT_LITE = 9;
const RING_STEP = 165;

type TunnelBackdropProps = {
  trackRef: React.RefObject<HTMLDivElement>;
  parallaxRef: React.RefObject<HTMLDivElement>;
  lightsRef: React.RefObject<HTMLDivElement>;
  tunnelLite: boolean;
};

/**
 * Fixed full-viewport tunnel: structural rings, rim lighting, subtle haze.
 * GSAP manipulates `trackRef` / `parallaxRef` transforms for depth motion.
 */
export function TunnelBackdrop({
  trackRef,
  parallaxRef,
  lightsRef,
  tunnelLite: lite,
}: TunnelBackdropProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ringCount = lite ? RING_COUNT_LITE : RING_COUNT_FULL;

  const rings = useMemo(
    () =>
      Array.from({ length: ringCount }, (_, i) => ({
        key: i,
        z: -i * RING_STEP,
        scale: 0.72 + i * (lite ? 0.055 : 0.028),
      })),
    [lite, ringCount],
  );

  const particles = useMemo(() => {
    if (lite) return [];
    const count = 28;
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 31) % 100}%`,
      delay: (i % 7) * 0.4,
      size: 1 + (i % 3),
    }));
  }, [lite]);

  const showParticles = mounted && reduceMotion !== true && !lite;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void"
      aria-hidden
    >
      <div
        className={`tunnel-stage absolute inset-0 ${lite ? "tunnel-stage--lite" : ""}`}
      >
        <div className="absolute inset-0 bg-tunnel-vignette bg-center" />
        <div
          className={`absolute inset-0 bg-radial-fog ${lite ? "opacity-60" : "opacity-65"}`}
        />

        <div
          ref={parallaxRef}
          className="tunnel-track absolute left-1/2 top-[42%] h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/35 to-void" />
          {showParticles &&
            particles.map((p) => (
              <span
                key={p.key}
                className="absolute rounded-full bg-fog/25"
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
              className={`tunnel-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[48%] border bg-gradient-to-b from-white/[0.05] via-transparent to-black/25 ${
                lite
                  ? "border-white/[0.13] shadow-[inset_0_0_44px_rgba(0,0,0,0.55)]"
                  : "border-white/[0.1] shadow-[inset_0_0_52px_rgba(0,0,0,0.7)]"
              }`}
              style={{
                width: `${ring.scale * 78}%`,
                height: `${ring.scale * 52}%`,
                transform: `translateZ(${ring.z}px) rotateX(64deg)`,
                opacity: Math.min(lite ? 0.72 : 0.68, 0.12 + ring.key * (lite ? 0.028 : 0.021)),
              }}
            />
          ))}
        </div>

        {/* Rails omitted on lite tunnel — extra 3D layer cost on iOS WebKit */}
        {!lite && (
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
              className="absolute inset-x-[10%] bottom-0 top-[18%] rounded-[2px] opacity-[0.35]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 20px, rgba(255,255,255,0.06) 20px, rgba(255,255,255,0.06) 21px)",
              }}
            />
            <div className="absolute bottom-0 left-[9%] top-0 w-[3px] rounded-sm bg-gradient-to-b from-white/[0.14] via-steel to-black shadow-[inset_1px_0_0_rgba(255,255,255,0.06)]" />
            <div className="absolute bottom-0 right-[9%] top-0 w-[3px] rounded-sm bg-gradient-to-b from-white/[0.14] via-steel to-black shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]" />
          </div>
        </div>
        )}

        <div
          ref={lightsRef}
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ opacity: lite ? 0.26 : 0.32 }}
        >
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/18 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-white/18 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 3px)",
          }}
        />
      </div>
    </div>
  );
}
