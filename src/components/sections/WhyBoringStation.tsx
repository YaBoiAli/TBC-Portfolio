"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cog, Gauge, Layers3, type LucideIcon } from "lucide-react";
import { StationShell } from "@/components/ui/StationShell";
import { siteContent } from "@/data/siteContent";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

const accents: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: Layers3, label: "Systems", text: "Interdependencies, not heroics." },
  { icon: Gauge, label: "Velocity", text: "Cadence with control." },
  { icon: Cog, label: "Hardware mindset", text: "Software that meets reality." },
];

function AccentCard({
  item,
  i,
  reduce,
}: {
  item: (typeof accents)[number];
  i: number;
  reduce: boolean | null;
}) {
  const Icon = item.icon;
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(
    { amount: 0.12, margin: "0px 0px 14% 0px" },
    reduce,
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={
        reduce === true || latched ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      transition={{
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : 0.08 * i,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex gap-4 border border-white/[0.06] bg-steel/25 px-4 py-4"
    >
      <motion.div
        aria-hidden
        className="mt-0.5 text-muted transition-colors group-hover:text-bone"
        animate={
          reduce ? undefined : {
              rotate: [0, 1.5, -1.5, 0],
            }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.4,
        }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.25} />
      </motion.div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          {item.label}
        </p>
        <p className="mt-1 text-sm text-bone/90">{item.text}</p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

export function WhyBoringStation() {
  const reduce = useReducedMotion();
  const { ref: titleRef, latched: titleLatched } = useRevealWhenInView<HTMLHeadingElement>(
    { amount: 0.12, margin: "0px 0px 18% 0px" },
    reduce,
  );
  const { ref: bodyRef, latched: bodyLatched } = useRevealWhenInView<HTMLParagraphElement>(
    { amount: 0.12, margin: "0px 0px 18% 0px" },
    reduce,
  );

  return (
    <StationShell id="why" eyebrow="Station 02" title={siteContent.whyBoring.title} index={1}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <motion.h3
            ref={titleRef}
            className="font-display text-2xl leading-snug text-bone sm:text-3xl"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={
              reduce === true || titleLatched
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -16 }
            }
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteContent.whyBoring.headline}
          </motion.h3>
          <motion.p
            ref={bodyRef}
            className="mt-6 max-w-prose text-pretty text-accent"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={
              reduce === true || bodyLatched
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{ duration: reduce ? 0 : 0.75, delay: reduce ? 0 : 0.12 }}
          >
            {siteContent.whyBoring.body}
          </motion.p>
        </div>

        <div className="space-y-4">
          {accents.map((item, i) => (
            <AccentCard key={item.label} item={item} i={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </StationShell>
  );
}
