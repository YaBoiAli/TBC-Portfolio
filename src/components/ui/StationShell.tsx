"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

type StationShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  /** Optional index for staggered entrance */
  index?: number;
};

/**
 * Frames each “station” as an illuminated engineering panel recessed into the tunnel.
 */
export function StationShell({
  id,
  eyebrow,
  title,
  children,
  index = 0,
}: StationShellProps) {
  const reduce = useReducedMotion();
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(
    { amount: 0.12, margin: "0px 0px 12% 0px" },
    reduce,
  );

  return (
    <section
      id={id}
      className="relative z-10 mx-auto flex min-h-[min(100vh,880px)] max-w-6xl flex-col justify-center px-5 py-28 sm:px-8 lg:px-12"
    >
      <motion.div
        ref={ref}
        initial={reduce ? false : { opacity: 0, y: 36 }}
        animate={
          reduce === true || latched ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }
        }
        transition={{
          duration: reduce ? 0 : 0.85,
          delay: reduce ? 0 : 0.05 * index,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-graphite/95 p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_24px_80px_rgba(0,0,0,0.65)] md:bg-graphite/40 md:backdrop-blur-md"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-6 top-0 h-px w-24 bg-gradient-to-r from-white/50 to-transparent" />
        <div className="relative bg-tunnel/90 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                {eyebrow}
              </p>
              <h2 className="font-display mt-2 text-3xl tracking-tight text-bone sm:text-4xl lg:text-[2.4rem]">
                {title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-steel/80 to-transparent sm:ml-10 sm:block" />
          </header>
          <div className="text-sm leading-relaxed text-accent sm:text-base">{children}</div>
        </div>
      </motion.div>
    </section>
  );
}
