import * as React from "react";
import { cn } from "../lib/utils";

export type ShowMoreTextProps = {
  children: React.ReactNode;
  /** Label for the expand control. Defaults to "show more…". */
  moreLabel?: string;
  /** Label for the collapse control. Defaults to "show less". */
  lessLabel?: string;
  /** When this value changes, collapse back to the clamped state. */
  resetKey?: React.Key;
  className?: string;
};

/**
 * Clamps block copy (paragraph, bullets, etc.) to two lines with an inline
 * “show more…” control when the content overflows.
 */
export function ShowMoreText({
  children,
  moreLabel = "show more…",
  lessLabel = "show less",
  resetKey,
  className,
}: ShowMoreTextProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [needsClamp, setNeedsClamp] = React.useState(false);

  React.useLayoutEffect(() => {
    setExpanded(false);
  }, [resetKey, children]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    const el = contentRef.current;
    if (!el) return;
    setNeedsClamp(el.scrollHeight > el.clientHeight + 1);
  }, [resetKey, children, expanded]);

  return (
    <div className={className}>
      <div ref={contentRef} className={cn(!expanded && "line-clamp-2")}>
        {children}
      </div>
      {needsClamp && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-1 text-left text-ui font-medium text-foreground/80 underline-offset-2 hover:text-foreground hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </div>
  );
}
