import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { ShowMoreText } from "./show-more-text";

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
  /** Label for the description expand control. Defaults to "show more…". */
  showMoreLabel?: string;
  /** Label for the description collapse control. Defaults to "show less". */
  showLessLabel?: string;
  /** Extra class name on the dialog content. */
  className?: string;
};

/**
 * Multi-step welcome/onboarding dialog.
 *
 * Kit owns: overlay, slide layout, hero area, floating close, dot indicators,
 * prev/next controls, and two-line description clamp with show more/less.
 * App owns: slide data, copy, assets, analytics, and the onComplete handler.
 *
 * Overlay click and the floating close control always dismiss the dialog.
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
  showMoreLabel = "show more…",
  showLessLabel = "show less",
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

  function handleDismiss() {
    if (onSkip) onSkip();
    else onOpenChange(false);
  }

  if (!slide) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideClose
        className={cn("overflow-hidden p-0 max-w-lg", className)}
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-opacity hover:bg-background hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label={skipLabel || "Close"}
        >
          <X className="h-4 w-4" />
        </button>

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
                <ShowMoreText
                  moreLabel={showMoreLabel}
                  lessLabel={showLessLabel}
                >
                  {slide.description}
                </ShowMoreText>
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
                <Button variant="ghost" size="sm" onClick={handleDismiss}>
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
