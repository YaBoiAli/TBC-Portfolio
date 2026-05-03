"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

const defaultInView: Pick<UseInViewOptions, "amount" | "margin"> = {
  /** Avoid strict fractional thresholds — flaky on ultrawide / zoomed viewports */
  amount: "some",
  /** Pixel margins only (percent rootMargin is inconsistent across widths) */
  margin: "120px 120px 400px 120px",
};

/** Super-ultrawide / mega-wide — skip gated opacity (IntersectionObserver + blend quirks). */
function shouldRelaxRevealGate(): boolean {
  if (typeof window === "undefined") return false;
  const w = window.innerWidth;
  const h = Math.max(window.innerHeight, 1);
  const ratio = w / h;
  return w >= 4200 || ratio >= 2.33;
}

/**
 * Flip visibility once when the target intersects the viewport, then stay visible.
 * Attach `ref` to a non-transformed wrapper when possible — transforms on the observed
 * node can confuse IntersectionObserver at large widths.
 */
export function useRevealWhenInView<T extends Element>(
  options: Omit<UseInViewOptions, "once"> | undefined,
  prefersReducedMotion: boolean | null,
) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, {
    once: true,
    ...defaultInView,
    ...options,
  });
  const [latched, setLatched] = useState(prefersReducedMotion === true);

  useEffect(() => {
    if (prefersReducedMotion === true) setLatched(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (inView) setLatched(true);
  }, [inView]);

  /** Resize / scroll / orientation: geometry fallback when IO lags (common >~2000px wide). */
  useLayoutEffect(() => {
    if (latched) return;
    let raf = 0;
    const syncIfVisible = () => {
      if (prefersReducedMotion === true || shouldRelaxRevealGate()) {
        setLatched(true);
        return;
      }
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pad = 320;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const visible =
        r.bottom > -pad && r.top < vh + pad && r.right > -pad && r.left < vw + pad;
      if (visible) setLatched(true);
    };
    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncIfVisible);
    };
    syncIfVisible();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("orientationchange", syncIfVisible);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("orientationchange", syncIfVisible);
    };
  }, [latched, prefersReducedMotion]);

  return { ref, latched };
}
