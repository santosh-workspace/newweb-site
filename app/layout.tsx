import type { Metadata, Viewport } from "next";
// Self-hosted variable fonts (no external requests, great for CLS/performance)
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "@fontsource-variable/jetbrains-mono";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Cloud Engineer",
    "DevOps Engineer",
    "Platform Engineer",
    "AWS",
    "Kubernetes",
    "Terraform",
    "Infrastructure as Code",
    site.name,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.tagline,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.social.github, site.social.linkedin, site.social.twitter],
  knowsAbout: ["AWS", "Kubernetes", "Terraform", "DevOps", "Cloud Architecture", "CI/CD"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <LoadingScreen />
          <ScrollProgress />
          <CustomCursor />
          <CommandPalette />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
