"use client";

import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TunnelBackdrop } from "@/components/tunnel/TunnelBackdrop";
import { useTunnelScroll } from "@/components/tunnel/useTunnelScroll";
import { useTunnelLiteSync } from "@/hooks/useTunnelLiteSync";
import { TunnelTransit } from "@/components/tunnel/TunnelTransit";
import { NavProgress } from "@/components/nav/NavProgress";
import { HeroEntrance } from "@/components/sections/HeroEntrance";
import { AboutStation } from "@/components/sections/AboutStation";
import { WhyBoringStation } from "@/components/sections/WhyBoringStation";
import { ExperienceStation } from "@/components/sections/ExperienceStation";
import { ProjectsStation } from "@/components/sections/ProjectsStation";
import { SkillsStation } from "@/components/sections/SkillsStation";
import { ResumeFinale } from "@/components/sections/ResumeFinale";

/**
 * Root client assembly: fixed tunnel backdrop + scroll-driven GSAP depth + content stations.
 */
export function TunnelExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<HTMLDivElement>(null);
  const tunnelLite = useTunnelLiteSync();

  useTunnelScroll({ trackRef, parallaxRef, lightsRef, tunnelLite });

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <TunnelBackdrop
        trackRef={trackRef}
        parallaxRef={parallaxRef}
        lightsRef={lightsRef}
        tunnelLite={tunnelLite}
      />
      <NavProgress />
      <main className="relative z-[15] isolate">
        <HeroEntrance />
        <TunnelTransit sector="Transit" label="Advancing through reinforced bore" />
        <AboutStation />
        <TunnelTransit sector="Sector 1 — complete" label="Continuing descent" />
        <WhyBoringStation />
        <TunnelTransit sector="Mid-tunnel" label="Structural integrity nominal" />
        <ExperienceStation />
        <TunnelTransit sector="Approach" label="Engineering bays ahead" />
        <ProjectsStation />
        <TunnelTransit sector="Deep sector" label="Systems bay alignment" />
        <SkillsStation />
        <TunnelTransit sector="Terminal approach" label="Endstate lighting engaged" />
        <ResumeFinale />
      </main>
    </>
  );
}
