"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";
import { Download, FileText, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export function ResumeFinale() {
  const reduce = useReducedMotion();
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(
    { amount: 0.12, margin: "0px 0px 18% 0px" },
    reduce,
  );

  return (
    <section
      id="resume"
      className="relative z-10 mx-auto max-w-6xl px-5 py-32 sm:px-8 lg:px-12"
    >
      <motion.div
        ref={ref}
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={
          reduce === true || latched ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
        }
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-sm border border-white/[0.12] bg-gradient-to-b from-graphite/95 via-tunnel to-void px-6 py-14 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_40px_120px_rgba(0,0,0,0.75)] sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-40 w-[120%] -translate-x-1/2 bg-gradient-to-b from-white/[0.06] to-transparent blur-3xl md:block" />

        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
          Final destination
        </p>
        <h2 className="mt-4 font-display text-3xl tracking-tight text-bone sm:text-4xl">
          {siteContent.resume.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-accent sm:text-base">
          {siteContent.resume.subline}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Link
            href={siteContent.resume.viewUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 border border-white/[0.14] bg-bone px-6 py-3 text-sm font-medium text-void transition hover:bg-white"
          >
            <FileText className="h-4 w-4" strokeWidth={1.25} />
            View portfolio
          </Link>
          <Link
            href={siteContent.resume.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/[0.12] px-6 py-3 text-sm text-bone transition hover:border-white/30 hover:bg-white/[0.04]"
          >
            <Download className="h-4 w-4" strokeWidth={1.25} />
            Download PDF
          </Link>
          <Link
            href={siteContent.links.email}
            className="inline-flex items-center justify-center gap-2 border border-white/[0.12] px-6 py-3 text-sm text-bone transition hover:border-white/30 hover:bg-white/[0.04]"
          >
            <Mail className="h-4 w-4" strokeWidth={1.25} />
            Email
          </Link>
          <Link
            href={siteContent.resume.phoneTel}
            className="inline-flex items-center justify-center gap-2 border border-white/[0.12] px-6 py-3 text-sm text-bone transition hover:border-white/30 hover:bg-white/[0.04]"
          >
            <Phone className="h-4 w-4" strokeWidth={1.25} />
            {siteContent.resume.phoneDisplay}
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 border-t border-white/[0.08] pt-8 text-sm text-muted">
          <Link
            href={siteContent.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-bone"
          >
            GitHub
          </Link>
          <Link
            href={siteContent.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-bone"
          >
            LinkedIn
          </Link>
          <Link
            href={siteContent.links.portfolio}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-bone"
          >
            Portfolio (short link)
          </Link>
        </div>
      </motion.div>

      <p className="mt-10 text-center text-[11px] text-muted">
        © {new Date().getFullYear()} {siteContent.name}. Crafted as a tunnel-forward portfolio
        concept.
      </p>
    </section>
  );
}
