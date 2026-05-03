"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

/**
 * Flip visibility once when the target intersects the viewport, then stay visible.
 * Mitigates flaky IntersectionObserver / scroll-edge churn that can fight Framer's whileInView.
 */
export function useRevealWhenInView<T extends Element>(
  options: Omit<UseInViewOptions, "once"> | undefined,
  prefersReducedMotion: boolean | null,
) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { ...options, once: true });
  const [latched, setLatched] = useState(prefersReducedMotion === true);

  useEffect(() => {
    if (prefersReducedMotion === true) setLatched(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (inView) setLatched(true);
  }, [inView]);

  return { ref, latched };
}
