"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  User,
  Wrench,
  Briefcase,
  FolderGit2,
  Workflow,
  Newspaper,
  Mail,
  Download,
  Github,
  Linkedin,
  SunMoon,
  CornerDownLeft,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: React.ElementType;
  action: () => void;
}

/** ⌘K / Ctrl+K command palette: jump to sections, toggle theme, open links. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const go = useCallback((hash: string) => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      { id: "about", label: "Go to About", hint: "Section", icon: User, action: () => go("#about") },
      { id: "skills", label: "Go to Skills", hint: "Section", icon: Wrench, action: () => go("#skills") },
      { id: "experience", label: "Go to Experience", hint: "Section", icon: Briefcase, action: () => go("#experience") },
      { id: "projects", label: "Go to Projects", hint: "Section", icon: FolderGit2, action: () => go("#projects") },
      { id: "architecture", label: "Go to Architecture", hint: "Section", icon: Workflow, action: () => go("#architecture") },
      { id: "blog", label: "Go to Blog", hint: "Section", icon: Newspaper, action: () => go("#blog") },
      { id: "contact", label: "Go to Contact", hint: "Section", icon: Mail, action: () => go("#contact") },
      {
        id: "theme",
        label: "Toggle Light / Dark Mode",
        hint: "Action",
        icon: SunMoon,
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setOpen(false);
        },
      },
      {
        id: "resume",
        label: "Download Resume",
        hint: "Action",
        icon: Download,
        action: () => {
          window.open(site.resumeHref, "_blank");
          setOpen(false);
        },
      },
      {
        id: "github",
        label: "Open GitHub Profile",
        hint: "Link",
        icon: Github,
        action: () => {
          window.open(site.social.github, "_blank");
          setOpen(false);
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn Profile",
        hint: "Link",
        icon: Linkedin,
        action: () => {
          window.open(site.social.linkedin, "_blank");
          setOpen(false);
        },
      },
    ],
    [go, resolvedTheme, setTheme]
  );

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [commands, query]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[index]?.action();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="glass w-full max-w-lg overflow-hidden rounded-xl border-border bg-card/95 shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results.</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id} role="option" aria-selected={i === index}>
                  <button
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      i === index ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-muted"
                    )}
                    onMouseEnter={() => setIndex(i)}
                    onClick={cmd.action}
                  >
                    <cmd.icon className="size-4 shrink-0 text-primary" />
                    <span className="flex-1">{cmd.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {cmd.hint}
                    </span>
                    {i === index && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
