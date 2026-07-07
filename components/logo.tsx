"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  /** Adds orbiting particles + energy pulse rings (hero / loading screen). */
  showcase?: boolean;
  /** Gentle floating + breathing loop. */
  animated?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * The SN brand mark. Renders the user's own logo file (site.logoSrc) —
 * never redrawn — wrapped in tasteful motion: soft glow, breathing,
 * shine sweep on hover, and (in showcase mode) orbiting particles.
 */
export function Logo({ size = 40, showcase = false, animated = true, className }: LogoProps) {
  const reduced = useReducedMotion();
  const orbitR = size * 0.72;

  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: showcase ? size * 1.9 : size, height: showcase ? size * 1.9 : size }}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* Soft glow halo */}
      <div
        aria-hidden
        className={cn(
          "absolute rounded-full bg-primary/25 blur-2xl",
          animated && !reduced && "animate-pulse-glow"
        )}
        style={{ width: size * 1.3, height: size * 1.3 }}
      />

      {showcase && !reduced && (
        <>
          {/* Energy pulse rings */}
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute rounded-full border border-accent/40"
              style={{ width: size * 1.4, height: size * 1.4 }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
            />
          ))}
          {/* Orbiting particles */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            {[0, 120, 240].map((deg) => (
              <span
                key={deg}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.6)]"
                style={{ transform: `rotate(${deg}deg) translateX(${orbitR}px)` }}
              />
            ))}
          </motion.div>
        </>
      )}

      {/* The mark itself — user's uploaded asset, untouched */}
      <motion.div
        className="shine-sweep relative rounded-xl"
        animate={animated && !reduced ? { y: [0, -4, 0], scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={site.logoSrc}
          alt={`${site.name} logo`}
          width={size}
          height={size}
          className="select-none drop-shadow-[0_0_14px_hsl(var(--primary)/0.35)]"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
