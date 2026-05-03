"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StationShell } from "@/components/ui/StationShell";
import { siteContent } from "@/data/siteContent";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

type ProjectEntry = (typeof siteContent.projects)[number];

function ProjectArticle({
  project,
  i,
  reduce,
}: {
  project: ProjectEntry;
  i: number;
  reduce: boolean | null;
}) {
  const { ref, latched } = useRevealWhenInView<HTMLElement>(
    { amount: 0.12, margin: "0px 0px 14% 0px" },
    reduce,
  );

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={
        reduce === true || latched ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
      }
      transition={{
        duration: reduce ? 0 : 0.65,
        delay: reduce ? 0 : 0.06 * i,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden border border-white/[0.07] bg-graphite/50"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.03] blur-3xl transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />

      <div className="relative flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
              Module {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-xl text-bone sm:text-2xl">{project.name}</h3>
          </div>
          <Link
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-bone/80 transition-all duration-300 hover:border-white/25 hover:text-bone"
            aria-label={`Open ${project.name}`}
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>

        <p className="text-sm leading-relaxed text-accent">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-white/[0.06] bg-steel/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-muted">
          <span className="font-mono uppercase tracking-[0.22em]">{project.label}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent mx-4" />
          <span className="text-bone/70">Resource</span>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
        layout
      />
    </motion.article>
  );
}

export function ProjectsStation() {
  const reduce = useReducedMotion();

  return (
    <StationShell id="projects" eyebrow="Station 04" title="Engineering modules" index={3}>
      <p className="mb-10 max-w-2xl text-pretty text-accent">
        Selected builds presented as illuminated bays along the bore. Hover to engage depth and
        lighting — each module is a discrete system, not a generic card.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {siteContent.projects.map((project, i) => (
          <ProjectArticle key={project.id} project={project} i={i} reduce={reduce} />
        ))}
      </div>
    </StationShell>
  );
}
