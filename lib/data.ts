import {
  Cloud,
  Container,
  FileCode2,
  GitBranch,
  Terminal,
  Activity,
  Network,
  ShieldCheck,
} from "lucide-react";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiHelm,
  SiTerraform,
  SiAnsible,
  SiJenkins,
  SiGithubactions,
  SiPython,
  SiGnubash,
  SiPrometheus,
  SiGrafana,
  SiNginx,
  SiArgo,
  SiGit,
  SiLinux,
  SiGithub,
} from "react-icons/si";
import type {
  SkillCategory,
  Experience,
  Project,
  Certification,
  TechLogo,
  BlogPost,
  Testimonial,
  Stat,
} from "@/types";

/* --------------------------------- Skills --------------------------------- */
export const skillCategories: SkillCategory[] = [
  { title: "Cloud Platforms", icon: Cloud, accent: "from-sky-500/20 to-blue-500/5", skills: ["AWS", "Azure", "GCP"] },
  { title: "Containers", icon: Container, accent: "from-cyan-500/20 to-teal-500/5", skills: ["Docker", "Kubernetes", "Helm"] },
  { title: "Infrastructure as Code", icon: FileCode2, accent: "from-violet-500/20 to-purple-500/5", skills: ["Terraform", "CloudFormation", "Ansible"] },
  { title: "CI/CD", icon: GitBranch, accent: "from-emerald-500/20 to-green-500/5", skills: ["GitHub Actions", "Jenkins", "Azure DevOps"] },
  { title: "Programming", icon: Terminal, accent: "from-amber-500/20 to-orange-500/5", skills: ["Python", "Bash", "PowerShell"] },
  { title: "Monitoring", icon: Activity, accent: "from-rose-500/20 to-pink-500/5", skills: ["Prometheus", "Grafana", "CloudWatch", "ELK"] },
  { title: "Networking", icon: Network, accent: "from-blue-500/20 to-indigo-500/5", skills: ["VPC", "Route53", "Load Balancers", "VPN", "DNS"] },
  { title: "Security", icon: ShieldCheck, accent: "from-teal-500/20 to-cyan-500/5", skills: ["IAM", "Secrets Manager", "WAF", "Security Groups"] },
];

/* ------------------------------- Experience -------------------------------- */
export const experiences: Experience[] = [
  {
    company: "NimbusScale Technologies",
    position: "Senior Cloud Engineer",
    duration: "2023 — Present",
    location: "Remote",
    achievements: [
      "Architected a multi-account AWS landing zone with Terraform, onboarding 14 product teams with guardrails, SSO and centralized logging.",
      "Cut monthly cloud spend by 38% through rightsizing, Savings Plans and automated off-hours scheduling.",
      "Led migration of 40+ microservices to Amazon EKS with GitOps (ArgoCD), reducing deploy time from 45 min to under 5.",
    ],
    technologies: ["AWS", "Terraform", "EKS", "ArgoCD", "Python"],
  },
  {
    company: "Vectra Cloud Systems",
    position: "DevOps Engineer",
    duration: "2021 — 2023",
    location: "Pune, India",
    achievements: [
      "Built enterprise CI/CD platform on GitHub Actions serving 200+ repositories with reusable workflows and OIDC-based deploys.",
      "Introduced Prometheus + Grafana observability stack; MTTR dropped from 2 hours to 20 minutes.",
      "Automated disaster recovery drills across two AWS regions, achieving a verified RTO of 15 minutes.",
    ],
    technologies: ["GitHub Actions", "Kubernetes", "Prometheus", "Grafana", "Bash"],
  },
  {
    company: "Cloudline Infotech",
    position: "Cloud Support Engineer",
    duration: "2019 — 2021",
    location: "Pune, India",
    achievements: [
      "Managed 300+ EC2 workloads and VPC networking for enterprise clients with 99.95% uptime SLAs.",
      "Scripted routine operations in Python/Bash, eliminating ~30 hours of manual toil per week.",
      "Hardened IAM policies and security groups across accounts, passing SOC 2 audit with zero findings.",
    ],
    technologies: ["AWS", "EC2", "IAM", "Python", "Linux"],
  },
];

/* --------------------------------- Projects -------------------------------- */
export const projects: Project[] = [
  {
    title: "AWS Three-Tier Architecture",
    overview: "Production-grade three-tier web platform with high availability across multiple AZs.",
    architecture: "CloudFront → ALB → Auto Scaling EC2 → RDS Multi-AZ, provisioned end-to-end with Terraform.",
    category: "AWS",
    tech: ["AWS", "Terraform", "ALB", "RDS", "CloudFront"],
    github: "https://github.com/santosh-nagargoje/aws-three-tier",
    demo: "#",
    caseStudy: "#",
    featured: true,
  },
  {
    title: "Terraform Landing Zone",
    overview: "Multi-account AWS foundation with org-wide guardrails, SSO and centralized audit logging.",
    architecture: "AWS Organizations + Control Tower patterns codified as reusable Terraform modules.",
    category: "IaC",
    tech: ["Terraform", "AWS Organizations", "IAM", "CloudTrail"],
    github: "https://github.com/santosh-nagargoje/tf-landing-zone",
    demo: "#",
    caseStudy: "#",
    featured: true,
  },
  {
    title: "Amazon EKS Platform",
    overview: "Opinionated Kubernetes platform with autoscaling, ingress, secrets and golden-path templates.",
    architecture: "EKS + Karpenter + ALB Ingress + External Secrets, bootstrapped via Terraform and Helm.",
    category: "Kubernetes",
    tech: ["EKS", "Karpenter", "Helm", "Terraform"],
    github: "https://github.com/santosh-nagargoje/eks-platform",
    demo: "#",
    caseStudy: "#",
    featured: true,
  },
  {
    title: "GitOps with ArgoCD",
    overview: "Declarative continuous delivery — every cluster change flows through Git pull requests.",
    architecture: "App-of-apps pattern, ApplicationSets per environment, automated drift detection.",
    category: "CI/CD",
    tech: ["ArgoCD", "Kubernetes", "Kustomize", "GitHub"],
    github: "https://github.com/santosh-nagargoje/gitops-argocd",
    demo: "#",
    caseStudy: "#",
  },
  {
    title: "Enterprise CI/CD",
    overview: "Reusable pipeline library powering 200+ repos with security scanning and OIDC deploys.",
    architecture: "GitHub Actions reusable workflows + composite actions + environment protection rules.",
    category: "CI/CD",
    tech: ["GitHub Actions", "Docker", "Trivy", "AWS OIDC"],
    github: "https://github.com/santosh-nagargoje/enterprise-cicd",
    demo: "#",
    caseStudy: "#",
  },
  {
    title: "Monitoring Platform",
    overview: "Unified observability stack: metrics, logs, traces and on-call alerting for 40+ services.",
    architecture: "Prometheus federation + Grafana + Loki + Alertmanager routed to Slack/PagerDuty.",
    category: "Observability",
    tech: ["Prometheus", "Grafana", "Loki", "Alertmanager"],
    github: "https://github.com/santosh-nagargoje/monitoring-platform",
    demo: "#",
    caseStudy: "#",
  },
  {
    title: "Multi-Region Disaster Recovery",
    overview: "Active-passive DR across two AWS regions with a verified 15-minute recovery objective.",
    architecture: "Route53 failover + cross-region RDS replicas + S3 CRR, orchestrated by Step Functions.",
    category: "AWS",
    tech: ["Route53", "RDS", "S3 CRR", "Step Functions"],
    github: "https://github.com/santosh-nagargoje/multi-region-dr",
    demo: "#",
    caseStudy: "#",
  },
  {
    title: "Secure Kubernetes Platform",
    overview: "Zero-trust hardening for EKS: policy-as-code, runtime security and encrypted service mesh.",
    architecture: "OPA Gatekeeper + Falco + mTLS via Istio, with CIS benchmark automation.",
    category: "Kubernetes",
    tech: ["OPA", "Falco", "Istio", "Kyverno"],
    github: "https://github.com/santosh-nagargoje/secure-k8s",
    demo: "#",
    caseStudy: "#",
  },
  {
    title: "Cloud Cost Optimization",
    overview: "FinOps tooling that surfaced and eliminated 38% of monthly cloud waste automatically.",
    architecture: "Cost Explorer APIs + Lambda schedulers + Slack digests, deployed with CDK.",
    category: "IaC",
    tech: ["Lambda", "Cost Explorer", "CDK", "Python"],
    github: "https://github.com/santosh-nagargoje/cloud-finops",
    demo: "#",
    caseStudy: "#",
  },
];

export const projectCategories = ["All", "AWS", "Kubernetes", "IaC", "CI/CD", "Observability"] as const;

/* ------------------------------ Certifications ----------------------------- */
export const certifications: Certification[] = [
  { title: "AWS Solutions Architect — Associate", issuer: "Amazon Web Services", year: "2024", badge: "SAA", accent: "from-orange-500/30 to-amber-500/10" },
  { title: "AWS SysOps Administrator", issuer: "Amazon Web Services", year: "2024", badge: "SOA", accent: "from-orange-500/30 to-amber-500/10" },
  { title: "AWS Developer — Associate", issuer: "Amazon Web Services", year: "2023", badge: "DVA", accent: "from-orange-500/30 to-amber-500/10" },
  { title: "HashiCorp Terraform Associate", issuer: "HashiCorp", year: "2023", badge: "TFA", accent: "from-violet-500/30 to-purple-500/10" },
  { title: "Certified Kubernetes Administrator", issuer: "CNCF", year: "2024", badge: "CKA", accent: "from-blue-500/30 to-cyan-500/10" },
  { title: "Azure Administrator — AZ-104", issuer: "Microsoft", year: "2023", badge: "AZ", accent: "from-sky-500/30 to-blue-500/10" },
];

/* -------------------------------- Tech wall -------------------------------- */
export const techLogos: TechLogo[] = [
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Azure", icon: VscAzure, color: "#0078D4" },
  { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "GitHub", icon: SiGithub, color: "#E6EDF3" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Helm", icon: SiHelm, color: "#0F1689" },
  { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
  { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
  { name: "Grafana", icon: SiGrafana, color: "#F46800" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "ArgoCD", icon: SiArgo, color: "#EF7B4D" },
  { name: "Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "Ansible", icon: SiAnsible, color: "#EE0000" },
  { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
];

/* ---------------------------------- Blog ----------------------------------- */
export const blogPosts: BlogPost[] = [
  {
    title: "Designing a Multi-Account AWS Landing Zone That Scales",
    category: "AWS",
    readingTime: "8 min read",
    date: "Jun 12, 2026",
    excerpt: "Guardrails, SSO and account vending — the foundation every growing platform team needs.",
    gradient: "from-blue-600/30 via-sky-500/10 to-transparent",
  },
  {
    title: "GitOps in Production: Lessons From 2,000 ArgoCD Syncs",
    category: "Kubernetes",
    readingTime: "6 min read",
    date: "May 3, 2026",
    excerpt: "Drift detection, app-of-apps, and the failure modes nobody warns you about.",
    gradient: "from-cyan-600/30 via-teal-500/10 to-transparent",
  },
  {
    title: "Terraform Modules Your Team Will Actually Reuse",
    category: "IaC",
    readingTime: "7 min read",
    date: "Mar 21, 2026",
    excerpt: "Interface design, versioning discipline and testing strategies for shared modules.",
    gradient: "from-violet-600/30 via-purple-500/10 to-transparent",
  },
];

/* ------------------------------- Testimonials ------------------------------ */
export const testimonials: Testimonial[] = [
  {
    quote: "Santosh rebuilt our entire delivery pipeline. Deploys went from a Friday-afternoon gamble to a non-event we run twenty times a day.",
    name: "Priya Deshmukh",
    role: "VP of Engineering",
    company: "NimbusScale Technologies",
  },
  {
    quote: "The rare engineer who thinks about cost, security and developer experience at the same time. Our AWS bill dropped by a third — and the platform got faster.",
    name: "Daniel Kovács",
    role: "CTO",
    company: "Vectra Cloud Systems",
  },
  {
    quote: "His Terraform landing zone became the blueprint for every new team we onboard. Documentation so clean the auditors complimented it.",
    name: "Ananya Rao",
    role: "Head of Platform",
    company: "Cloudline Infotech",
  },
  {
    quote: "Calm under incident pressure, methodical in design reviews. Santosh raises the engineering bar of every team he joins.",
    name: "Marcus Bell",
    role: "Director of SRE",
    company: "NimbusScale Technologies",
  },
];

/* ---------------------------------- Stats ---------------------------------- */
export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 120, suffix: "+", label: "Infrastructure Deployments" },
  { value: 38, suffix: "%", label: "Avg. Cloud Cost Reduction" },
  { value: 99.95, suffix: "%", label: "Uptime Maintained" },
];
