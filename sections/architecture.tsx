"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Interactive deployment-flow diagram:
 * GitHub → Actions → Terraform → AWS → VPC → ALB → ASG → EC2 → RDS →
 * CloudFront → Route53 → CloudWatch, laid out as a serpentine.
 * Node entrances are staggered with GSAP ScrollTrigger; data packets
 * travel the connectors via SMIL animateMotion; connector dashes flow via CSS.
 */

interface Node {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
}

// Serpentine grid: 4 rows × 3 columns (viewBox 800×640)
const NODES: Node[] = [
  { id: "github", label: "GitHub", sub: "source", x: 140, y: 80 },
  { id: "actions", label: "GitHub Actions", sub: "ci/cd", x: 400, y: 80 },
  { id: "terraform", label: "Terraform", sub: "iac", x: 660, y: 80 },
  { id: "aws", label: "AWS", sub: "cloud", x: 660, y: 240 },
  { id: "vpc", label: "VPC", sub: "network", x: 400, y: 240 },
  { id: "alb", label: "App Load Balancer", sub: "ingress", x: 140, y: 240 },
  { id: "asg", label: "Auto Scaling", sub: "elasticity", x: 140, y: 400 },
  { id: "ec2", label: "EC2", sub: "compute", x: 400, y: 400 },
  { id: "rds", label: "RDS", sub: "database", x: 660, y: 400 },
  { id: "cloudfront", label: "CloudFront", sub: "edge cdn", x: 660, y: 560 },
  { id: "route53", label: "Route53", sub: "dns", x: 400, y: 560 },
  { id: "cloudwatch", label: "CloudWatch", sub: "observability", x: 140, y: 560 },
];

const NODE_W = 168;
const NODE_H = 64;

function edgePath(a: Node, b: Node): string {
  // Horizontal neighbours connect edge-to-edge; vertical ones top-to-bottom.
  if (a.y === b.y) {
    const dir = b.x > a.x ? 1 : -1;
    return `M ${a.x + (dir * NODE_W) / 2} ${a.y} L ${b.x - (dir * NODE_W) / 2} ${b.y}`;
  }
  return `M ${a.x} ${a.y + NODE_H / 2} L ${b.x} ${b.y - NODE_H / 2}`;
}

export function Architecture() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".arch-node", {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "center center",
        stagger: 0.08,
        duration: 0.55,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.from(".arch-edge", {
        opacity: 0,
        stagger: 0.06,
        duration: 0.4,
        delay: 0.3,
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const edges = NODES.slice(0, -1).map((n, i) => ({
    id: `${n.id}-${NODES[i + 1].id}`,
    d: edgePath(n, NODES[i + 1]),
  }));

  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Architecture"
          title="From commit to CloudWatch"
          description="How a change flows through the platforms I build — every hop automated, observable and reversible."
        />

        <Reveal>
          <div ref={rootRef} className="glass relative overflow-hidden rounded-2xl p-4 sm:p-8">
            <div className="grid-bg absolute inset-0 opacity-50" aria-hidden />
            <svg
              viewBox="0 0 800 640"
              className="relative w-full"
              role="img"
              aria-label="Deployment flow diagram from GitHub through AWS to CloudWatch"
            >
              <defs>
                <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <filter id="node-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connectors with flowing dashes */}
              {edges.map((e) => (
                <path
                  key={e.id}
                  id={`edge-${e.id}`}
                  d={e.d}
                  className="arch-edge animate-flow-dash"
                  fill="none"
                  stroke="url(#edge-grad)"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              ))}

              {/* Data packets traveling each hop */}
              {edges.map((e, i) => (
                <circle key={`pkt-${e.id}`} r="4" fill="#06B6D4" filter="url(#node-glow)" opacity="0.9">
                  <animateMotion dur="2.2s" begin={`${i * 0.55}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#edge-${e.id}`} />
                  </animateMotion>
                </circle>
              ))}

              {/* Nodes */}
              {NODES.map((n, i) => (
                <g key={n.id} className="arch-node" data-cursor="hover">
                  <rect
                    x={n.x - NODE_W / 2}
                    y={n.y - NODE_H / 2}
                    width={NODE_W}
                    height={NODE_H}
                    rx="12"
                    fill="hsl(var(--card))"
                    stroke={i === 0 || i === NODES.length - 1 ? "hsl(var(--accent))" : "hsl(var(--border))"}
                    strokeOpacity="0.9"
                    strokeWidth="1.25"
                  />
                  <circle cx={n.x - NODE_W / 2 + 18} cy={n.y} r="3.5" fill="#3B82F6">
                    <animate
                      attributeName="opacity"
                      values="1;0.35;1"
                      dur="2.4s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={n.x + 8}
                    y={n.y - 3}
                    textAnchor="middle"
                    className="fill-[hsl(var(--foreground))] font-display"
                    fontSize="14"
                    fontWeight="600"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x + 8}
                    y={n.y + 16}
                    textAnchor="middle"
                    className="fill-[hsl(var(--muted-foreground))]"
                    fontSize="10"
                    fontFamily="monospace"
                    letterSpacing="2"
                  >
                    {n.sub.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="relative mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> data packet
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-6 bg-gradient-to-r from-primary to-accent" /> deployment flow
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> healthy node
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
