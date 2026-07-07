"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Compass, Rocket, ShieldCheck, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, staggerItem } from "@/components/reveal";
import { stats } from "@/lib/data";
import { site } from "@/lib/site";

/* ------------------------------ Animated stats ------------------------------ */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Number((value * eased).toFixed(value % 1 !== 0 ? 2 : 0)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gradient animate-shine sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability first",
    text: "Infrastructure should be boring — predictable, observable and recoverable by design.",
  },
  {
    icon: Rocket,
    title: "Automate everything",
    text: "If it's done twice by hand, it becomes code. Toil is a bug, not a duty.",
  },
  {
    icon: Compass,
    title: "Cost is a feature",
    text: "Great architecture respects the bill. Efficiency and performance can coexist.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Engineering calm into complex systems"
          description="Six years of turning fragile, manual infrastructure into automated platforms teams can trust."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Photo placeholder + orbit decoration */}
          <Reveal direction="right">
            <div className="relative mx-auto max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-xl"
              />
              <div className="glass relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl">
                <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <UserRound className="size-10 text-primary" />
                  </span>
                  <p className="px-8 font-mono text-xs leading-relaxed text-muted-foreground">
                    Professional photo
                    <br />
                    placeholder — 4:5
                  </p>
                </div>
                {/* Corner ticks, blueprint style */}
                {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
                  <span key={pos} className={`absolute ${pos} h-3 w-3 border border-accent/50`} aria-hidden />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  I started in cloud support, watching production systems fail at 3 a.m. — and became obsessed with
                  the question of why they had to. That curiosity took me from racking troubleshooting tickets to
                  architecting the platforms other engineers build on.
                </p>
                <p>
                  Today I design multi-account AWS foundations, run Kubernetes platforms at scale, and codify
                  everything in Terraform. My work sits at the intersection of{" "}
                  <span className="text-foreground">infrastructure, automation and developer experience</span> —
                  making the right way the easy way.
                </p>
                <p>
                  My mission is simple: <span className="text-foreground">ship reliable infrastructure, automatically</span>.
                  Systems that scale without drama, recover without heroics, and cost what they should.
                </p>
              </div>
            </Reveal>

            {/* Values */}
            <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-3">
              {values.map((v) => (
                <motion.div key={v.title} variants={staggerItem} className="glass glow-card rounded-xl p-5">
                  <v.icon className="mb-3 size-5 text-accent" />
                  <h3 className="mb-1.5 font-display text-sm font-semibold">{v.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{v.text}</p>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>

        {/* Animated statistics */}
        <StaggerGroup className="mt-20 grid grid-cols-2 gap-6 border-y border-border/60 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={staggerItem} className="text-center">
              <CountUp value={s.value} suffix={s.suffix} />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal>
          <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
            Currently based in {site.location} · working with teams worldwide
          </p>
        </Reveal>
      </div>
    </section>
  );
}
