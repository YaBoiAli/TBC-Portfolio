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
  const { ref, latched } = useRevealWhenInView<HTMLDivElement>(undefined, reduce);

  return (
    <div
      ref={ref}
      className="relative z-10 flex min-h-[38vh] flex-col items-center justify-center px-6 py-16"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scaleX: 0.12 }}
        animate={
          reduce === true || latched
            ? { opacity: 1, scaleX: 1 }
            : { opacity: 0, scaleX: 0.12 }
        }
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 58, damping: 22, mass: 0.75, bounce: 0 }
        }
        className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.42em] text-muted">
        {sector}
      </p>
      <p className="mt-2 text-xs text-steel">{label}</p>
    </div>
  );
}
