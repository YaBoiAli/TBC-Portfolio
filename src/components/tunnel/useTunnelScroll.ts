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
  /** From viewport sync — must update GSAP when crossing mobile breakpoint */
  tunnelLite: boolean;
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
 * 7. On iPhone / narrow viewports we skip ScrollTrigger + Z scrub — avoids WebKit crashes and
 *    broken scroll (GPU/memory pressure from body-linked 3D animation).
 */
export function useTunnelScroll({
  trackRef,
  parallaxRef,
  lightsRef,
  tunnelLite,
}: TunnelScrollBindings) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      gsap.set(track, { clearProps: "transform" });
      return;
    }

    if (tunnelLite) {
      const parallax = parallaxRef?.current;
      const lights = lightsRef?.current;
      gsap.set(track, { z: -1200, force3D: true });
      if (parallax) gsap.set(parallax, { z: -420, force3D: true });
      if (lights) gsap.set(lights, { opacity: 0.26 });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        gsap.set(track, { clearProps: "transform" });
        if (parallax) gsap.set(parallax, { clearProps: "transform" });
        ScrollTrigger.refresh();
      };
    }

    const parallax = parallaxRef?.current;
    const lights = lightsRef?.current;

    const ctx = gsap.context(() => {
      const depth = -5600;

      gsap.set(track, { z: 0, force3D: true });
      if (parallax) gsap.set(parallax, { z: 0, force3D: true });
      if (lights) gsap.set(lights, { opacity: 0.28 });

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
        tl.to(parallax, { z: depth * 0.36, duration: 1 }, 0);
      }
    }, track);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [lightsRef, parallaxRef, trackRef, tunnelLite]);
}
