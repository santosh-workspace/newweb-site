import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_20px_-6px_hsl(var(--primary)/0.7)] hover:shadow-[0_0_32px_-6px_hsl(var(--primary)/0.9)] hover:brightness-110",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_24px_-8px_hsl(var(--primary)/0.6)]",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        accent:
          "bg-accent text-accent-foreground shadow-[0_0_20px_-6px_hsl(var(--accent)/0.7)] hover:shadow-[0_0_32px_-6px_hsl(var(--accent)/0.9)] hover:brightness-110",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
