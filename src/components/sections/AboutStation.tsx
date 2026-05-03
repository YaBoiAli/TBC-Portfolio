"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StationShell } from "@/components/ui/StationShell";
import { siteContent } from "@/data/siteContent";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

export function AboutStation() {
  const reduce = useReducedMotion();
  const words = siteContent.about.headline.split(" ");
  const { ref: headlineRef, latched } = useRevealWhenInView<HTMLHeadingElement>(
    { amount: 0.12, margin: "0px 0px 18% 0px" },
    reduce,
  );

  return (
    <StationShell
      id="about"
      eyebrow="Station 01"
      title={siteContent.about.title}
      index={0}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Identity
          </p>
          <motion.h3
            ref={headlineRef}
            className="mt-4 font-display text-2xl text-bone sm:text-3xl"
            initial="hidden"
            animate={reduce === true || latched ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reduce ? 0 : 0.06 },
              },
            }}
          >
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mr-[0.35em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </motion.h3>
          <p className="mt-6 max-w-prose text-pretty text-accent">{siteContent.about.body}</p>
        </div>
        <div className="relative border border-white/[0.06] bg-steel/30 p-6 font-mono text-[11px] text-muted">
          <div className="pointer-events-none absolute -left-px top-8 h-16 w-px bg-gradient-to-b from-white/30 to-transparent" />
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-[10px] uppercase tracking-[0.25em]">
            <span>Status</span>
            <span className="text-bone/80">Nominal</span>
          </div>
          <dl className="mt-4 space-y-3">
            <div className="flex justify-between gap-4">
              <dt>Callsign</dt>
              <dd className="text-bone/90">{siteContent.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Role</dt>
              <dd className="text-right text-bone/90">{siteContent.role}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Mode</dt>
              <dd className="text-bone/90">Build → Measure → Cut</dd>
            </div>
          </dl>
        </div>
      </div>
    </StationShell>
  );
}
