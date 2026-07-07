"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, staggerItem } from "@/components/reveal";
import { certifications } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials that back the craft"
          description="Validated across AWS, Azure, Kubernetes and Terraform."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={staggerItem}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="shine-sweep glass glow-card group relative flex items-center gap-5 rounded-xl p-6"
            >
              {/* Badge placeholder */}
              <div
                className={cn(
                  "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-gradient-to-br",
                  cert.accent
                )}
                aria-hidden
              >
                <span className="font-display text-sm font-bold tracking-wide text-foreground">{cert.badge}</span>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background">
                  <BadgeCheck className="size-4 text-accent" />
                </span>
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold leading-snug">{cert.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Award className="size-3.5 text-primary" />
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
