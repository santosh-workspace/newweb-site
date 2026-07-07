import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient classes
  skills: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export type ProjectCategory = "AWS" | "Kubernetes" | "IaC" | "CI/CD" | "Observability";

export interface Project {
  title: string;
  overview: string;
  architecture: string;
  category: ProjectCategory;
  tech: string[];
  github: string;
  demo: string;
  caseStudy: string;
  featured?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  badge: string; // short code rendered inside the badge placeholder
  accent: string;
}

export interface TechLogo {
  name: string;
  icon: IconType;
  color: string;
}

export interface BlogPost {
  title: string;
  category: string;
  readingTime: string;
  date: string;
  excerpt: string;
  gradient: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
