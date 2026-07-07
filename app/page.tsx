import dynamic from "next/dynamic";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Experience } from "@/sections/experience";
import { Projects } from "@/sections/projects";

// Below-the-fold sections are code-split for a lighter initial bundle
const Architecture = dynamic(() => import("@/sections/architecture").then((m) => m.Architecture));
const Certifications = dynamic(() => import("@/sections/certifications").then((m) => m.Certifications));
const TechWall = dynamic(() => import("@/sections/tech-wall").then((m) => m.TechWall));
const Blog = dynamic(() => import("@/sections/blog").then((m) => m.Blog));
const Testimonials = dynamic(() => import("@/sections/testimonials").then((m) => m.Testimonials));
const Contact = dynamic(() => import("@/sections/contact").then((m) => m.Contact));

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Architecture />
      <Certifications />
      <TechWall />
      <Blog />
      <Testimonials />
      <Contact />
    </main>
  );
}
