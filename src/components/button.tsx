import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const buttonVariantConfig = {
  variant: {
    // text-white (not text-background): custom fontSize tokens like text-ui
    // can be misclassified by tailwind-merge as colors and drop text-* color classes.
    // shadow-solid: inset highlight + tinted glow (set --solid-glow on the element).
    brand:
      "bg-primary text-white shadow-solid [--solid-glow:var(--color-primary)] hover:bg-primary-hover hover:shadow-solid-hover focus-visible:ring-primary",
    blue: "bg-secondary-blue text-white shadow-solid [--solid-glow:var(--color-secondary-blue)] hover:bg-secondary-blue-hover hover:shadow-solid-hover focus-visible:ring-secondary-blue",
    destructive:
      "bg-destructive text-destructive-foreground shadow-solid [--solid-glow:var(--destructive)] hover:bg-destructive/90 hover:shadow-solid-hover",
    outline:
      "border border-input bg-background shadow-sm hover:bg-muted hover:text-foreground",
    ghost: "hover:bg-accent/10 hover:text-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    // Do not repeat text-ui here — twMerge may drop variant text-* color utilities.
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-9 w-9",
    xs: "h-7 w-7",
  },
} as const;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-ui font-medium transition-[color,background-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: buttonVariantConfig,
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
