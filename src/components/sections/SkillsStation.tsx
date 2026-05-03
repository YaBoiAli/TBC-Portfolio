"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Cpu } from "lucide-react";
import { StationShell } from "@/components/ui/StationShell";
import { siteContent } from "@/data/siteContent";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

type SkillGroup = (typeof siteContent.skills.groups)[number];

function SkillMetricRow({
  label,
  i,
  reduce,
}: {
  label: string;
  i: number;
  reduce: boolean | null;
}) {
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(
    { amount: 0.12, margin: "0px 0px 16% 0px" },
    reduce,
  );

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3"
      initial={reduce ? false : { opacity: 0, x: -10 }}
      animate={
        reduce === true || latched ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
      }
      transition={{ delay: reduce ? 0 : 0.05 * i, duration: 0.45 }}
    >
      <Activity className="h-3.5 w-3.5 text-bone/60" strokeWidth={1.25} />
      <div className="h-px flex-1 bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/80">
        {label}
      </span>
    </motion.div>
  );
}

function SkillGroupCard({
  group,
  i,
  reduce,
}: {
  group: SkillGroup;
  i: number;
  reduce: boolean | null;
}) {
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(
    { amount: 0.12, margin: "0px 0px 14% 0px" },
    reduce,
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={
        reduce === true || latched ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
      }
      transition={{ duration: 0.55, delay: reduce ? 0 : 0.07 * i }}
      className="border border-white/[0.07] bg-graphite/45 p-5"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        {group.label}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-accent">
        {group.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-px w-3 bg-white/25" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function SkillsStation() {
  const reduce = useReducedMotion();

  return (
    <StationShell id="skills" eyebrow="Station 05" title={siteContent.skills.title} index={4}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:items-stretch">
        <div className="relative flex flex-col justify-between border border-white/[0.06] bg-steel/25 p-6">
          <div className="flex items-center gap-3 text-muted">
            <Cpu className="h-4 w-4" strokeWidth={1.25} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Systems board
            </span>
          </div>
          <div className="mt-8 space-y-4">
            {["Throughput", "Reliability", "Clarity"].map((label, i) => (
              <SkillMetricRow key={label} label={label} i={i} reduce={reduce} />
            ))}
          </div>
          <p className="mt-8 text-xs text-muted">
            Dashboard metaphor only — no fake charts. Replace rows with metrics you actually own.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {siteContent.skills.groups.map((group, i) => (
            <SkillGroupCard key={group.label} group={group} i={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </StationShell>
  );
}
