"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, site } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((l) => l.href.slice(1)), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-border/60 py-2 shadow-lg shadow-black/10" : "py-4"
        )}
      >
        <nav className="container flex items-center justify-between" aria-label="Primary">
          <Link href="#" aria-label="Home" className="flex items-center gap-3">
            <Logo size={36} />
            <span className="hidden font-display text-sm font-semibold tracking-wide sm:block">
              {site.name.split(" ")[0]}
              <span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-primary to-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
              className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground md:flex"
              aria-label="Open command palette"
            >
              <Command className="size-3" /> K
            </button>
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-background/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container flex items-center justify-between py-4">
              <Logo size={36} animated={false} />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <motion.ul
              className="container mt-8 flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border/60 py-4 font-display text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
