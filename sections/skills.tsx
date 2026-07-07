"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, staggerItem } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

/** 3D tilt card with glow + icon rotation on hover. */
function SkillCard({ category }: { category: SkillCategory }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const Icon = category.icon;

  return (
    <motion.div variants={staggerItem} style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="group glass glow-card relative h-full overflow-hidden rounded-xl p-6"
      >
        {/* Animated gradient wash */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            category.accent
          )}
        />
        <div className="relative" style={{ transform: "translateZ(24px)" }}>
          <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted/50 transition-transform duration-500 group-hover:rotate-[12deg] group-hover:border-primary/40">
            <Icon className="size-5 text-primary" />
          </span>
          <h3 className="mb-3 font-display text-base font-semibold">{category.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
          {/* Progress shimmer line */}
          <div className="mt-5 h-px w-full overflow-hidden rounded bg-border">
            <div className="h-full w-0 bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out group-hover:w-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-accent/5 blur-[120px]" />
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="A toolbox built for production"
          description="Eight disciplines, one goal: infrastructure that ships itself and stays up."
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {skillCategories.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
