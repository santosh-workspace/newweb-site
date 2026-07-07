/**
 * Central site configuration.
 * Swap placeholder links/paths here — everything else picks them up.
 */
export const site = {
  name: "Santosh Nagargoje",
  initials: "SN",
  role: "Cloud & DevOps Engineer",
  tagline:
    "I design, automate and scale secure cloud infrastructure using AWS, Kubernetes, Terraform and modern DevOps practices.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://santoshnagargoje.dev",
  email: "hello@santoshnagargoje.dev", // placeholder — replace
  location: "Pune, India", // placeholder — replace
  /**
   * LOGO — drop your uploaded logo file into /public and point this at it.
   * Prefer SVG; PNG with transparency works too (e.g. "/logo.png").
   */
  logoSrc: "/logo.svg",
  resumeHref: "/resume.pdf",
  social: {
    github: "https://github.com/santosh-nagargoje", // placeholder — replace
    linkedin: "https://linkedin.com/in/santosh-nagargoje", // placeholder — replace
    twitter: "https://x.com/santosh_cloud", // placeholder — replace
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;
