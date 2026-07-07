"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Send, Twitter } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

type FormState = "idle" | "sending" | "sent";

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Github, label: "GitHub", value: "github.com/…", href: site.social.github },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/…", href: site.social.linkedin },
  { icon: MapPin, label: "Location", value: site.location, href: undefined },
];

export function Contact() {
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    try {
      if (endpoint) {
        const data = Object.fromEntries(new FormData(e.currentTarget));
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // No endpoint configured — simulate for the demo
        await new Promise((r) => setTimeout(r, 1400));
      }
      setState("sent");
      setTimeout(() => setState("idle"), 4000);
    } catch {
      setState("idle");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-t from-primary/10 to-transparent blur-3xl"
      />
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something reliable"
          description="Have a platform to scale, a migration to plan, or a role to fill? My inbox is open."
        />

        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Channels */}
          <Reveal direction="right">
            <ul className="space-y-4">
              {channels.map((c) => {
                const inner = (
                  <span className="glass glow-card flex items-center gap-4 rounded-xl p-4 transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
                      <c.icon className="size-4 text-primary" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="text-sm text-foreground">{c.value}</span>
                    </span>
                  </span>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Github, href: site.social.github, label: "GitHub" },
                { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: site.social.twitter, label: "Twitter / X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.5)]"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.1}>
            <form onSubmit={onSubmit} className="glass rounded-2xl p-6 sm:p-8" aria-label="Contact form">
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Ada Lovelace" required autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="ada@example.com" required autoComplete="email" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="Platform migration, hiring, consulting…" required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <Textarea id="message" name="message" placeholder="Tell me about your infrastructure…" required />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={state !== "idle"}>
                <AnimatePresence mode="wait" initial={false}>
                  {state === "idle" && (
                    <motion.span
                      key="idle"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                    </motion.span>
                  )}
                  {state === "sending" && (
                    <motion.span
                      key="sending"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      <Loader2 className="size-4 animate-spin" />
                      Transmitting…
                    </motion.span>
                  )}
                  {state === "sent" && (
                    <motion.span
                      key="sent"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckCircle2 className="size-4" />
                      Delivered — I&apos;ll reply soon
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
