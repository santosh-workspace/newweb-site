# Santosh Nagargoje — Cloud Engineer Portfolio

Premium, animated portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP and Lenis smooth scroll.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it yours

1. **Logo** — drop your logo file into `public/` (e.g. `logo.png` or `logo.svg`) and set `logoSrc` in `lib/site.ts`. Also replace `app/icon.svg` (favicon) with your mark. The current gold "SN" files are interim placeholders.
2. **Identity & links** — edit `lib/site.ts` (name, email, location, GitHub, LinkedIn, resume path).
3. **Content** — everything (skills, experience, projects, certifications, blog, testimonials, stats) lives in `lib/data.ts`.
4. **Resume** — replace `public/resume.pdf`.
5. **Photo** — swap the placeholder card in `sections/about.tsx` with your photo (4:5 ratio).
6. **Env** — copy `.env.example` to `.env.local`; set `NEXT_PUBLIC_SITE_URL` and optionally `NEXT_PUBLIC_CONTACT_ENDPOINT` (Formspree / API Gateway) to make the contact form send for real.

## Structure

```
app/          layout, page, 404, robots, sitemap, manifest, favicon
components/   navbar, footer, logo, cursor, loading screen, command palette, ui/*
sections/     hero, about, skills, experience, projects, architecture, certifications, tech-wall, blog, testimonials, contact
lib/          site.ts (config), data.ts (content), utils.ts
hooks/        use-active-section, use-mounted
styles/       globals.css (design tokens + utilities)
types/        shared TypeScript interfaces
```

## Features

Dark-by-default theme with light toggle · ⌘K command palette · custom cursor (auto-off on touch/reduced-motion) · Lenis smooth scroll · loading screen · scroll progress · animated architecture diagram · project search + filtering · typing hero + terminal intro · SEO (OG, Twitter, JSON-LD, sitemap, robots) · WCAG-minded (focus rings, aria labels, reduced-motion support).

## Deployment

**Vercel** — `vercel` or import the repo; zero config. Set `NEXT_PUBLIC_SITE_URL` in project env vars.

**AWS Amplify** — connect the repo; build command `npm run build`, output handled by the Next.js SSR provider automatically.

**S3 + CloudFront (static export)** — add `output: "export"` to `next.config.ts`, run `npm run build`, then sync `out/` to S3 and front it with CloudFront (default root object `index.html`, custom error responses → `404.html`).
