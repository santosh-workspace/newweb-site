"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BookOpen, Github, Layers, Search } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { projects, projectCategories } from "@/lib/data";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group glass glow-card relative flex h-full flex-col overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Architecture visual header */}
      <div className="relative h-36 overflow-hidden border-b border-border/60">
        <div className="grid-bg absolute inset-0 transition-transform duration-700 group-hover:scale-110" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/15 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Minimal node diagram motif */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 144" aria-hidden>
          <g stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1" fill="none">
            <path d="M60 72 H160 M240 72 H340" strokeDasharray="4 4" className="group-hover:animate-flow-dash" />
            <path d="M160 72 L200 40 L240 72 L200 104 Z" />
          </g>
          {[60, 200, 340].map((x) => (
            <circle key={x} cx={x} cy={x === 200 ? 72 : 72} r="5" fill="hsl(var(--accent))" fillOpacity="0.8" />
          ))}
        </svg>
        <Badge className="absolute left-4 top-4 border-primary/40 bg-background/70 text-primary">
          {project.category}
        </Badge>
        {project.featured && (
          <Badge className="absolute right-4 top-4 border-accent/40 bg-background/70 text-accent">Featured</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-lg font-semibold transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>
        <p className="mb-4 flex gap-2 font-mono text-[11px] leading-relaxed text-muted-foreground/80">
          <Layers className="mt-0.5 size-3.5 shrink-0 text-accent" />
          {project.architecture}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Action row — revealed on hover (always visible on touch) */}
        <div className="mt-auto flex items-center gap-4 border-t border-border/60 pt-4 text-xs font-medium opacity-90 transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-3.5" /> GitHub
          </a>
          <a
            href={project.demo}
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="size-3.5" /> Live Demo
          </a>
          <a
            href={project.caseStudy}
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="size-3.5" /> Case Study
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchCat = category === "All" || p.category === category;
        const q = query.toLowerCase();
        const matchQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.overview.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q));
        return matchCat && matchQuery;
      }),
    [category, query]
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute right-0 top-20 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Infrastructure, shipped"
          description="Selected platforms and automation I've designed, built and run in production."
        />

        {/* Filter + search */}
        <Reveal>
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={category === cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 font-mono text-xs transition-colors",
                    category === cat
                      ? "text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {category === cat && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_0_18px_-4px_hsl(var(--primary)/0.7)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-[220px]">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="h-9 pl-9 text-xs"
                aria-label="Search projects"
              />
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted-foreground">
            No projects match — try another filter.
          </p>
        )}
      </div>
    </section>
  );
}
