"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteContent } from "@/data/siteContent";

/**
 * Fullscreen tunnel mouth — near-black, engineered typography, scroll affordance.
 * Audio is implied only (no autoplay per brief).
 */
export function HeroEntrance() {
  const reduce = useReducedMotion();

  return (
    <header className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-16 pt-32 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.45em] text-muted"
        >
          Personal portfolio — not affiliated
        </motion.p>

        <div className="mt-6">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 1.05,
              delay: reduce ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-bone"
          >
            {siteContent.name}
          </motion.h1>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.45 }}
          className="mt-4 max-w-xl text-sm text-accent sm:text-base"
        >
          <span className="text-bone/90">{siteContent.role}</span>
          <span className="mx-2 text-steel">/</span>
          {siteContent.heroSubline}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.65 }}
          className="mt-8 font-display text-xs uppercase tracking-[0.3em] text-muted"
        >
          {siteContent.tagline}
        </motion.p>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        initial={reduce ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{
          delay: reduce ? 0 : 1.1,
          duration: reduce ? 0 : 0.8,
          repeat: reduce ? 0 : Infinity,
          repeatType: "reverse",
          repeatDelay: 0.4,
        }}
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em]">
          Scroll to enter
        </span>
        <ChevronDown className="h-4 w-4 opacity-70" strokeWidth={1.25} />
      </motion.div>
    </header>
  );
}
