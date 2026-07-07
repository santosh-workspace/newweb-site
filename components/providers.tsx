"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
