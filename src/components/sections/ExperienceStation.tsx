"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StationShell } from "@/components/ui/StationShell";
import { siteContent } from "@/data/siteContent";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

type ExperienceItem = (typeof siteContent.experience.sections)[number]["items"][number];

function ExperienceArticle({
  item,
  i,
  sIdx,
  reduce,
  bordered,
}: {
  item: ExperienceItem;
  i: number;
  sIdx: number;
  reduce: boolean | null;
  bordered: boolean;
}) {
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(undefined, reduce);

  return (
    <div ref={ref} className={`relative min-w-0 ${bordered ? "mt-10 border-t border-white/[0.06] pt-10" : ""}`}>
      <motion.article
      initial={reduce ? false : { opacity: 0, x: -28 }}
      animate={
        reduce === true || latched ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 80,
              damping: 21,
              bounce: 0,
              delay: 0.05 * (sIdx * 2 + i),
            }
      }
      className="relative"
    >
      <span
        className="absolute -left-[25px] top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-white/25 bg-graphite sm:-left-[41px]"
        aria-hidden
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <p className="font-display text-lg text-bone sm:text-xl">{item.org}</p>
          <p className="mt-1 text-sm text-accent">{item.title}</p>
        </div>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {item.dates}
        </p>
      </div>
      <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-accent sm:text-[0.9375rem]">
        {item.bullets.map((b, bi) => (
          <li key={bi} className="flex gap-3">
            <span className="mt-2 h-px w-2 shrink-0 bg-white/30" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
    </div>
  );
}

/**
 * Past roles presented as a vertical “field log” along the tunnel — readable, dense, engineered.
 */
export function ExperienceStation() {
  const reduce = useReducedMotion();
  const { experience } = siteContent;

  return (
    <StationShell id="experience" eyebrow="Station 03" title={experience.title} index={2}>
      <p className="mb-12 max-w-2xl text-pretty text-accent">{experience.intro}</p>

      <div className="space-y-14">
        {experience.sections.map((section, sIdx) => (
          <div key={section.id}>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
                {section.label}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-steel to-transparent" />
            </div>

            <div className="relative border-l border-white/[0.08] pl-6 sm:pl-10">
              {section.items.map((item, i) => (
                <ExperienceArticle
                  key={`${section.id}-${item.org}-${i}`}
                  item={item}
                  i={i}
                  sIdx={sIdx}
                  reduce={reduce}
                  bordered={i > 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </StationShell>
  );
}
