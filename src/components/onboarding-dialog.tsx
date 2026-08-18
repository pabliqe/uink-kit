import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";

export type OnboardingSlide = {
  /** Heading shown in the slide. */
  title: string;
  /** Body copy. Supports a string or any ReactNode for rich copy. */
  description: React.ReactNode;
  /** Optional bullet points shown below the description. */
  bullets?: string[];
  /** Optional hero image src. When provided it spans the top edge of the dialog. */
  imageSrc?: string;
  /** Alt text for the hero image. */
  imageAlt?: string;
  /** Override the "Next" button label on this slide. */
  ctaLabel?: string;
};

export type OnboardingDialogProps = {
  /** Controlled open state. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: OnboardingSlide[];
  /** Called when the user completes the last slide. */
  onComplete?: () => void;
  /** Called when the user closes / skips. Defaults to onOpenChange(false). */
  onSkip?: () => void;
  /** Zero-based index of the slide to start on. */
  initialSlide?: number;
  /** Label for the final CTA. Defaults to "Get started". */
  completeCTALabel?: string;
  /** Label for the skip / close action. Pass null to hide it. */
  skipLabel?: string | null;
  /** Extra class name on the dialog content. */
  className?: string;
};

/**
 * Multi-step welcome/onboarding dialog.
 *
 * Kit owns: overlay, slide layout, hero area, dot indicators, prev/next controls.
 * App owns: slide data, copy, assets, analytics, and the onComplete handler.
 */
export function OnboardingDialog({
  open,
  onOpenChange,
  slides,
  onComplete,
  onSkip,
  initialSlide = 0,
  completeCTALabel = "Get started",
  skipLabel = "Skip",
  className,
}: OnboardingDialogProps) {
  const [index, setIndex] = React.useState(initialSlide);

  // Reset to initialSlide whenever the dialog opens.
  React.useEffect(() => {
    if (open) setIndex(initialSlide);
  }, [open, initialSlide]);

  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const isFirst = index === 0;

  function handleNext() {
    if (isLast) {
      onComplete?.();
      onOpenChange(false);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handlePrev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function handleSkip() {
    onSkip ? onSkip() : onOpenChange(false);
  }

  if (!slide) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideClose
        className={cn("overflow-hidden p-0 max-w-lg", className)}
        // Prevent close-on-overlay-click for multi-step flows so users don't
        // lose their progress by accident. They can still skip via the button.
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Hero image — bleeds to all edges */}
        {slide.imageSrc && (
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt ?? ""}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content area */}
        <div className="flex flex-col gap-4 p-6">
          <DialogTitle className="text-heading font-semibold">
            {slide.title}
          </DialogTitle>

          <DialogDescription asChild>
            <div className="text-body-sm text-muted-foreground">
              {typeof slide.description === "string" ? (
                <p>{slide.description}</p>
              ) : (
                slide.description
              )}
              {slide.bullets && slide.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 list-disc pl-4">
                  {slide.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </DialogDescription>

          {/* Dot indicators */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 py-1">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index
                      ? "w-4 bg-foreground"
                      : "w-1.5 bg-foreground/25"
                  )}
                />
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex gap-2">
              {skipLabel !== null && (
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  {skipLabel}
                </Button>
              )}
              {!isFirst && (
                <Button variant="outline" size="sm" onClick={handlePrev}>
                  Back
                </Button>
              )}
            </div>
            <Button variant="brand" size="sm" onClick={handleNext}>
              {isLast ? completeCTALabel : (slide.ctaLabel ?? "Next")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
