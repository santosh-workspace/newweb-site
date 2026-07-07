import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className={cn("mb-14 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <span className="mr-2 text-primary">//</span>
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
    </Reveal>
  );
}
