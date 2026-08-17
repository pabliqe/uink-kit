import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";

export type DropdownFilterProps = {
  id?: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Compact “bold value + chevron” menu (PATTTTERNS #379), not a full-width select box. */
export function DropdownFilter({
  id,
  value,
  options,
  onChange,
  disabled,
  className,
}: DropdownFilterProps) {
  const autoId = React.useId();
  const buttonId = id ?? autoId;
  const listId = `${buttonId}-listbox`;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [menuBox, setMenuBox] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  React.useEffect(() => {
    if (!open) return;

    function close() {
      setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      const menu = document.getElementById(listId);
      if (menu?.contains(target)) return;
      close();
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        buttonRef.current?.focus();
      }
    }

    function onReposition() {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuBox({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }

    onReposition();
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, listId]);

  return (
    <div ref={rootRef} className={cn("relative min-w-0", className)}>
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex min-w-0 max-w-full items-center gap-1 rounded-md py-0.5 text-left outline-none ring-ring",
          "font-semibold text-foreground hover:text-secondary-blue",
          "focus-visible:ring-1 disabled:opacity-50"
        )}
      >
        <span className="min-w-0 truncate">{value}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && menuBox && typeof document !== "undefined"
        ? createPortal(
            <ul
              id={listId}
              role="listbox"
              aria-labelledby={buttonId}
              style={{ top: menuBox.top, left: menuBox.left }}
              className="fixed z-50 max-h-60 min-w-[12rem] max-w-[min(calc(100vw-1.5rem),20rem)] overflow-y-auto rounded-lg border border-border bg-card py-1 shadow-card"
            >
              {options.map((option) => {
                const selected = option === value;
                return (
                  <li key={option} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={cn(
                        "flex w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted",
                        selected && "font-semibold text-secondary-blue"
                      )}
                      onClick={() => {
                        onChange(option);
                        setOpen(false);
                        buttonRef.current?.focus();
                      }}
                    >
                      <span className="whitespace-normal">{option}</span>
                    </button>
                  </li>
                );
              })}
            </ul>,
            document.body
          )
        : null}
    </div>
  );
}
