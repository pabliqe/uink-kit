import * as React from "react";
import { cn } from "../lib/utils";

export type ShowMoreTextProps = {
  children: React.ReactNode;
  /** Label for the expand control. Defaults to "show more…". */
  moreLabel?: string;
  /** Label for the collapse control. Defaults to "show less". */
  lessLabel?: string;
  className?: string;
};

/**
 * Clamps string copy to two lines with an inline “show more…” control when overflowed.
 * Non-string children are rendered as-is (no clamp).
 */
export function ShowMoreText({
  children,
  moreLabel = "show more…",
  lessLabel = "show less",
  className,
}: ShowMoreTextProps) {
  const textRef = React.useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [needsClamp, setNeedsClamp] = React.useState(false);

  React.useLayoutEffect(() => {
    setExpanded(false);
  }, [children]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    const el = textRef.current;
    if (!el) return;
    setNeedsClamp(el.scrollHeight > el.clientHeight + 1);
  }, [children, expanded]);

  if (typeof children !== "string") {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      <p ref={textRef} className={cn(!expanded && "line-clamp-2")}>
        {children}
      </p>
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
