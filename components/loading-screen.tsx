"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const DURATION_MS = 1900;

/**
 * Premium boot sequence: background fade → logo reveal + glow →
 * circular progress sweep → drifting cloud particles → hero handoff.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      // ease-out curve so the bar feels "alive"
      setProgress(1 - Math.pow(1 - p, 2.2));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const R = 46;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0B1220]"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-label="Loading"
          role="status"
        >
          {/* Drifting particles */}
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute h-1 w-1 rounded-full bg-sky-400/50"
              style={{ left: `${(i * 137) % 100}%`, top: `${(i * 73) % 100}%` }}
              animate={{ y: [-6, -26], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: "easeOut" }}
            />
          ))}

          <div className="relative flex items-center justify-center">
            {/* Circular progress */}
            <svg className="absolute h-36 w-36 -rotate-90" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r={R} fill="none" stroke="hsla(217,50%,30%,0.35)" strokeWidth="1.5" />
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="url(#loader-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
              />
              <defs>
                <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Logo size={64} animated={false} />
            </motion.div>
          </div>

          <motion.p
            className="mt-10 font-mono text-xs tracking-[0.35em] text-slate-400"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {site.initials} · PROVISIONING {Math.round(progress * 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
