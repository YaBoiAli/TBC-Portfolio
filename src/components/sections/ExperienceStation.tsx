"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import { StationShell } from "@/components/ui/StationShell";

/**
 * Past roles presented as a vertical “field log” along the tunnel — readable, dense, engineered.
 */
export function ExperienceStation() {
  const reduce = useReducedMotion();
  const { experience } = siteContent;

  return (
    <StationShell
      id="experience"
      eyebrow="Station 03"
      title={experience.title}
      index={2}
    >
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
                <motion.article
                  key={`${section.id}-${item.org}-${i}`}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.02, margin: "0px 0px 20% 0px" }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    delay: reduce ? 0 : 0.06 * (sIdx * 2 + i),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative ${i > 0 ? "mt-10 border-t border-white/[0.06] pt-10" : ""}`}
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
                        <span
                          className="mt-2 h-px w-2 shrink-0 bg-white/30"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </StationShell>
  );
}
