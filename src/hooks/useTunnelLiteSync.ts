"use client";

import { useLayoutEffect, useState } from "react";
import { MOBILE_TUNNEL_MQ, isTunnelLiteDevice } from "@/lib/mobileTunnel";

/**
 * Keeps “lite tunnel” vs full ScrollTrigger track in sync when the viewport crosses the
 * mobile breakpoint or orientation changes — avoids a stuck / mismatched scroll rig after resize.
 */
export function useTunnelLiteSync() {
  const [lite, setLite] = useState(false);

  useLayoutEffect(() => {
    const sync = () => setLite(isTunnelLiteDevice());
    sync();
    const mq = window.matchMedia(MOBILE_TUNNEL_MQ);
    mq.addEventListener("change", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  return lite;
}
