"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#why", label: "Why" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#resume", label: "Resume" },
];

/**
 * Minimal sticky navigation + scroll progress derived from viewport travel.
 */
export function NavProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.15,
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-white/10 via-white/60 to-white/20"
        style={{ scaleX }}
      />
      <nav className="pointer-events-auto mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-8 sm:py-4">
        <Link
          href="#"
          className="shrink-0 font-display text-xs tracking-[0.18em] text-bone/90 transition hover:text-bone"
        >
          TB
          <span className="text-muted"> / PORTFOLIO</span>
        </Link>
        <div className="-mx-1 flex gap-4 overflow-x-auto pb-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:mx-0 sm:overflow-visible sm:pb-0 sm:gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 px-1 transition hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
