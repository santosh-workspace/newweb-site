"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
}

/** Scroll-triggered reveal: fade + slide + optional blur-to-clear. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  blur = true,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  const offset = 36;
  const from = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(!reduced && from),
      ...(blur && !reduced ? { filter: "blur(8px)" } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduced ? 0.2 : duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Parent for staggered child reveals. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};
