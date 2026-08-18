import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export type SegmentedControlVariant = "pill" | "underline";

export type SegmentedControlOption<T extends string = string> = {
  value: T;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
};

const listVariants = cva("grid w-full", {
  variants: {
    variant: {
      pill: "rounded-xl bg-background p-1",
      underline: "rounded-none bg-transparent p-0",
    },
  },
  defaultVariants: {
    variant: "pill",
  },
});

const itemVariants = cva(
  "flex w-full items-center justify-center gap-2 font-medium transition-colors",
  {
    variants: {
      variant: {
        pill: "h-8 rounded-lg border px-3 py-1 text-ui tracking-[0.06em]",
        underline:
          "h-12 rounded-none border-0 border-b-2 px-2 text-ui tracking-[0.1em]",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "pill",
        active: true,
        class: "border-foreground/80 bg-card text-foreground shadow-sm",
      },
      {
        variant: "pill",
        active: false,
        class:
          "border-transparent bg-transparent text-muted-foreground hover:bg-card/60 hover:text-foreground",
      },
      {
        variant: "underline",
        active: true,
        class:
          "border-b-foreground/80 bg-transparent text-foreground shadow-none",
      },
      {
        variant: "underline",
        active: false,
        class:
          "border-transparent bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground",
      },
    ],
    defaultVariants: {
      variant: "pill",
      active: false,
    },
  }
);

export type SegmentedControlProps<T extends string = string> = {
  value: T;
  onValueChange?: (value: T) => void;
  options: readonly SegmentedControlOption<T>[];
  variant?: SegmentedControlVariant;
  /** Force icons on all breakpoints. Default: always on `underline`, md+ on `pill`. */
  showIcons?: boolean;
  className?: string;
} & VariantProps<typeof listVariants>;

/** Product tab chrome: `pill` (Extract / Metadata / Json) and `underline` (Editor / Output). No Radix. */
export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  variant = "pill",
  showIcons,
  className,
}: SegmentedControlProps<T>) {
  const iconsAlways = showIcons ?? variant === "underline";

  return (
    <div
      className={cn(listVariants({ variant }), className)}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
      }}
      role="tablist"
      aria-orientation="horizontal"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange?.(option.value)}
            className={itemVariants({ variant, active })}
          >
            {Icon && option.badge == null ? (
              <Icon
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  iconsAlways ? "inline-block" : "hidden md:inline-block"
                )}
              />
            ) : null}
            {option.badge != null && (
              <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 px-1 text-caption font-bold tabular-nums leading-none">
                {option.badge > 99 ? "99+" : option.badge}
              </span>
            )}
            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
