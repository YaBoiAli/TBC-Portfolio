"use client";

import { motion, useReducedMotion } from "framer-motion";

type TunnelTransitProps = {
  label: string;
  sector: string;
};

/** Visual breathing room between stations — implies travel through empty bore. */
export function TunnelTransit({ label, sector }: TunnelTransitProps) {
  const reduce = useReducedMotion();

  return (
    <div className="relative z-10 flex min-h-[38vh] flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.05, margin: "0px 0px 30% 0px" }}
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
