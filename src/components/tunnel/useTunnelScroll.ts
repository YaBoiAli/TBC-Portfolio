"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type TunnelScrollBindings = {
  /** 3D group: translateZ simulates forward travel through stacked rings */
  trackRef: React.RefObject<HTMLElement>;
  /** Slower Z motion for haze / secondary structure */
  parallaxRef?: React.RefObject<HTMLElement>;
  /** Subtle edge lines (fixed opacity; not scrubbed with scroll) */
  lightsRef?: React.RefObject<HTMLElement>;
};

/**
 * Tunnel scroll logic (GSAP + ScrollTrigger):
 *
 * 1. ScrollTrigger watches `document.body` from top→bottom of the viewport journey.
 * 2. The tunnel `track` holds 3D rings on negative Z; animating `z` negative moves the
 *    entire structure toward the viewer — the illusion of advancing through a bore.
 * 3. `scrub: 1` maps scroll position to timeline time with light smoothing (cinematic,
 *    not springy).
 * 4. `parallaxRef` moves at a fraction of the main Z for parallax fog.
 * 5. Rim lights stay fixed opacity (no scroll-driven brightening — avoids a “breathing” highlight).
 * 6. If `prefers-reduced-motion` is on, we skip transforms entirely.
 */
export function useTunnelScroll({
  trackRef,
  parallaxRef,
  lightsRef,
}: TunnelScrollBindings) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      gsap.set(track, { clearProps: "transform" });
      return;
    }

    const parallax = parallaxRef?.current;
    const lights = lightsRef?.current;

    const ctx = gsap.context(() => {
      const depth = -4400;

      gsap.set(track, { z: 0, force3D: true });
      if (parallax) gsap.set(parallax, { z: 0, force3D: true });
      if (lights) gsap.set(lights, { opacity: 0.22 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { z: depth, duration: 1 }, 0);
      if (parallax) {
        tl.to(parallax, { z: depth * 0.34, duration: 1 }, 0);
      }
    }, track);

    return () => {
      ctx.revert();
    };
  }, [lightsRef, parallaxRef, trackRef]);
}
