import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider"
    className={cn(
      "relative flex w-full touch-none items-center select-none",
      "data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      data-slider-track
      className="relative h-1 w-full grow overflow-hidden rounded-full bg-foreground/15"
    >
      <SliderPrimitive.Range
        data-slider-range
        className="absolute h-full bg-foreground/70"
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      data-slider-thumb
      className="block h-4 w-4 rounded-full border-2 border-secondary bg-secondary shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
