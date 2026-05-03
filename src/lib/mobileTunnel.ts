/** Narrow viewports — heavy 3D + ScrollTrigger often crashes or freezes mobile Safari scroll. */
export const MOBILE_TUNNEL_MQ = "(max-width: 768px)";

export function isTunnelLiteDevice(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia(MOBILE_TUNNEL_MQ).matches) return true;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  // iPadOS 13+ desktop UA
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}
