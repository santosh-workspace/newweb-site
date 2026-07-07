"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, staggerItem } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Blog() {
  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the trenches"
          description="Long-form write-ups on cloud architecture, Kubernetes and automation."
        />

        <StaggerGroup className="grid gap-6 md:grid-cols-3" stagger={0.1}>
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={staggerItem}
              className="group glass glow-card flex h-full cursor-pointer flex-col overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1.5"
              data-cursor="hover"
            >
              {/* Cover visual */}
              <div className="relative h-40 overflow-hidden border-b border-border/60">
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
                    post.gradient
                  )}
                />
                <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
                <span className="absolute bottom-4 left-4 font-mono text-5xl font-bold text-foreground/10">
                  {"</>"}
                </span>
                <Badge className="absolute left-4 top-4 border-primary/40 bg-background/70 text-primary">
                  {post.category}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3" /> {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3" /> {post.readingTime}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-accent">
                  Read article
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
