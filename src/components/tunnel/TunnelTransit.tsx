"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRevealWhenInView } from "@/hooks/useRevealWhenInView";

type TunnelTransitProps = {
  label: string;
  sector: string;
};

/** Visual breathing room between stations — implies travel through empty bore. */
export function TunnelTransit({ label, sector }: TunnelTransitProps) {
  const reduce = useReducedMotion();
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(
    { amount: 0.12, margin: "0px 0px 24% 0px" },
    reduce,
  );

  return (
    <div className="relative z-10 flex min-h-[38vh] flex-col items-center justify-center px-6 py-16">
      <motion.div
        ref={ref}
        initial={reduce ? false : { opacity: 0, scaleX: 0.3 }}
        animate={
          reduce === true || latched
            ? { opacity: 1, scaleX: 1 }
            : { opacity: 0, scaleX: 0.3 }
        }
        transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.42em] text-muted">
        {sector}
      </p>
      <p className="mt-2 text-xs text-steel">{label}</p>
    </div>
  );
}
