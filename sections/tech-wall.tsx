"use client";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { techLogos } from "@/lib/data";

/** Infinite dual-row marquee of technology logos, pausing on hover. */
export function TechWall() {
  const half = Math.ceil(techLogos.length / 2);
  const rows = [techLogos.slice(0, half), techLogos.slice(half)];

  return (
    <section id="stack" className="relative overflow-hidden py-24 sm:py-28">
      <div className="container">
        <SectionHeading eyebrow="Stack" title="Technologies I work with daily" />
      </div>

      <Reveal>
        <div className="space-y-6">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="pause-on-hover relative overflow-hidden"
              style={{
                maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
              }}
            >
              <div
                className="animate-marquee flex w-max items-center gap-4 pr-4"
                style={rowIdx === 1 ? { animationDirection: "reverse", animationDuration: "46s" } : undefined}
              >
                {[...row, ...row].map((tech, i) => (
                  <div
                    key={`${tech.name}-${i}`}
                    className="glass group flex items-center gap-3 rounded-xl px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                    data-cursor="hover"
                    style={{ "--brand": tech.color } as React.CSSProperties}
                  >
                    <tech.icon
                      className="size-6 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-[color:var(--brand)]"
                      aria-hidden
                    />
                    <span className="whitespace-nowrap font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
