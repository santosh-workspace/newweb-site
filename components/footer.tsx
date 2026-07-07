import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.social.github, icon: Github },
  { label: "LinkedIn", href: site.social.linkedin, icon: Linkedin },
  { label: "Twitter / X", href: site.social.twitter, icon: Twitter },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-center gap-8 py-14 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <Logo size={34} />
          <div>
            <p className="font-display text-sm font-semibold">{site.name}</p>
            <p className="font-mono text-[11px] text-muted-foreground">{site.role}</p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.5)]"
              >
                <s.icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
