"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTO_MS = 6500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [go, paused]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-primary/5 blur-[110px]" />
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title="What teams say" />

        <Reveal>
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="glass relative overflow-hidden rounded-2xl px-8 py-12 sm:px-14">
              <Quote className="absolute left-6 top-6 size-10 text-primary/15" aria-hidden />
              <div className="relative min-h-[190px] sm:min-h-[150px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.figure
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: 40 * direction, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -40 * direction, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <blockquote className="text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 font-display text-sm font-bold text-foreground"
                      >
                        {current.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{current.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          {current.role} · {current.company}
                        </p>
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
