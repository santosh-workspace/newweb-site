"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="The journey so far"
          description="From support tickets to platform architecture — each role sharpened the same instinct: automate the pain away."
        />

        <div ref={trackRef} className="relative mx-auto max-w-3xl">
          {/* Timeline spine — draws itself as you scroll */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-border sm:left-1/2" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-primary via-accent to-primary"
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol className="space-y-14">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <li key={exp.company} className="relative">
                  {/* Node dot */}
                  <span
                    aria-hidden
                    className="absolute left-4 top-2 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center sm:left-1/2"
                  >
                    <span className="absolute h-full w-full animate-ping rounded-full bg-primary/40" />
                    <span className="relative h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
                  </span>

                  <Reveal direction={left ? "right" : "left"} className="pl-12 sm:pl-0">
                    <div
                      className={`sm:w-[calc(50%-2.5rem)] ${left ? "sm:mr-auto" : "sm:ml-auto"}`}
                    >
                      <div className="glass glow-card rounded-xl p-6">
                        <p className="mb-1 font-mono text-xs text-accent">{exp.duration}</p>
                        <h3 className="font-display text-lg font-semibold">{exp.position}</h3>
                        <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="size-3.5 text-primary" /> {exp.company}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" /> {exp.location}
                          </span>
                        </p>
                        <ul className="mb-4 space-y-2">
                          {exp.achievements.map((a) => (
                            <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
