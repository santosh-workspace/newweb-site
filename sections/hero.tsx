"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const ROLES = ["Cloud Engineer", "DevOps Engineer", "Platform Engineer"];

/* ------------------------------ Typing effect ------------------------------ */
function TypedRoles() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(ROLES[0]);
      return;
    }
    const current = ROLES[roleIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), 1800);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % ROLES.length);
          }
        }
      },
      deleting ? 40 : 75
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx, reduced]);

  return (
    <span className="text-gradient animate-shine">
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-accent" aria-hidden />
    </span>
  );
}

/* --------------------- Animated network topology canvas --------------------- */
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }
    let nodes: Node[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(Math.floor((w * h) / 26000), 60);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
      }));
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const LINK = 130;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.14 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden />;
}

/* ------------------------------- Mouse glow -------------------------------- */
function MouseGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]"
      style={{ x: sx, y: sy }}
    />
  );
}

/* ----------------------------- Terminal window ------------------------------ */
const TERMINAL_LINES = [
  { prompt: true, text: "terraform apply -auto-approve" },
  { prompt: false, text: "✓ aws_eks_cluster.platform: Creation complete [2m14s]" },
  { prompt: false, text: "✓ Apply complete! 47 resources added." },
  { prompt: true, text: "kubectl get nodes" },
  { prompt: false, text: "3 nodes Ready · v1.31 · zone-spread ✓" },
  { prompt: true, text: "echo $MISSION" },
  { prompt: false, text: '"Ship reliable infrastructure, automatically."' },
];

function TerminalIntro() {
  const [visibleLines, setVisibleLines] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisibleLines(TERMINAL_LINES.length);
      return;
    }
    if (visibleLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 520 + Math.random() * 300);
    return () => clearTimeout(t);
  }, [visibleLines, reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 3.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="glass w-full max-w-md rounded-xl shadow-2xl shadow-primary/5"
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">santosh@cloud ~ zsh</span>
      </div>
      <div className="min-h-[192px] space-y-1.5 p-4 font-mono text-[12px] leading-relaxed">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={line.prompt ? "text-foreground" : "text-muted-foreground"}
          >
            {line.prompt && <span className="mr-2 text-accent">❯</span>}
            <span className={!line.prompt && line.text.startsWith("✓") ? "text-emerald-400" : undefined}>
              {line.text}
            </span>
          </motion.p>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-accent/80" aria-hidden />
        )}
      </div>
    </motion.div>
  );
}

/* ---------------------------------- Hero ----------------------------------- */
export function Hero() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 2.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      {/* Layered background */}
      <div className="grid-bg mask-radial absolute inset-0" aria-hidden />
      <NetworkCanvas />
      <MouseGlow />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-accent/5 to-transparent blur-3xl"
      />

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="mb-6 flex items-center gap-4">
            <Logo size={52} showcase />
            <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </p>
          </motion.div>

          <motion.p variants={item} className="mb-3 font-mono text-sm text-accent">
            Hi, I&apos;m <span className="text-foreground">{site.name}</span> —
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <TypedRoles />
            <br />
            <span className="text-foreground/90">building on solid ground.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button size="lg" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>
                <FolderGit2 />
                View Projects
              </Button>
            </Magnetic>
            <Magnetic>
              <a href={site.resumeHref} download>
                <Button variant="outline" size="lg">
                  <Download className="group-hover:translate-y-0.5" />
                  Download Resume
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail />
                Contact Me
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <div className="hidden justify-end lg:flex">
          <TerminalIntro />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
      >
        <motion.span
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
