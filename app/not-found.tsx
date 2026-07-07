import Link from "next/link";
import { TerminalSquare, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="grid-bg mask-radial absolute inset-0" aria-hidden />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Error 404</p>
        <h1 className="mt-4 font-display text-7xl font-bold text-gradient sm:text-9xl">404</h1>
        <div className="glass mx-auto mt-8 max-w-md rounded-xl p-5 text-left font-mono text-xs leading-relaxed text-muted-foreground">
          <p className="flex items-center gap-2 text-foreground">
            <TerminalSquare className="size-4 text-accent" /> kubectl get page
          </p>
          <p className="mt-2">Error from server (NotFound):</p>
          <p>pages &ldquo;{"<requested-route>"}&rdquo; not found in namespace &ldquo;production&rdquo;</p>
          <p className="mt-2 text-emerald-400">Hint: the resource may have been rescheduled to /</p>
        </div>
        <Link href="/" className="mt-8 inline-block">
          <Button size="lg">
            <Home />
            Return to homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}
