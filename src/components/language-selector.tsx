import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { Button, type ButtonProps } from "./button";

export type UiLang = "en" | "es";

export const UI_LANGS = ["en", "es"] as const;

const SHORT_LABEL: Record<UiLang, string> = {
  en: "ENG",
  es: "ESP",
};

const DEFAULT_LABELS = {
  changeLanguage: "Change language",
  en: "English",
  es: "Español",
} as const;

export type LanguageSelectorLabels = {
  changeLanguage?: string;
  en?: string;
  es?: string;
};

export type LanguageSelectorProps = {
  value: UiLang;
  onValueChange: (lang: UiLang) => void;
  /** Override aria/title and menu item copy. Defaults: English / Español. */
  labels?: LanguageSelectorLabels;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  /** Stretch the trigger and menu to the container (mobile chrome menus). */
  fullWidth?: boolean;
  className?: string;
  id?: string;
};

export function isUiLang(value: unknown): value is UiLang {
  return value === "en" || value === "es";
}

/** Same EN/ES heuristic as uink-map2 and uink-brand-persona. */
export function detectBrowserLang(): UiLang {
  if (typeof navigator !== "undefined" && navigator.languages.length > 0) {
    const isSpanish = navigator.languages.some((code) =>
      code.toLowerCase().startsWith("es")
    );
    return isSpanish ? "es" : "en";
  }
  return "en";
}

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

function Check({ className }: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type MenuBox = {
  top: number;
  right?: number;
  left?: number;
  width?: number;
};

/** Topbar EN/ES switcher. Kit owns chrome; the app owns dictionaries and persistence. */
export function LanguageSelector({
  value,
  onValueChange,
  labels: labelOverrides,
  variant = "ghost",
  size = "sm",
  fullWidth = false,
  className,
  id,
}: LanguageSelectorProps) {
  const autoId = React.useId();
  const buttonId = id ?? autoId;
  const listId = `${buttonId}-listbox`;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [menuBox, setMenuBox] = React.useState<MenuBox | null>(null);

  const labels = {
    changeLanguage:
      labelOverrides?.changeLanguage ?? DEFAULT_LABELS.changeLanguage,
    en: labelOverrides?.en ?? DEFAULT_LABELS.en,
    es: labelOverrides?.es ?? DEFAULT_LABELS.es,
  };

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
      if (fullWidth) {
        setMenuBox({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
        return;
      }
      setMenuBox({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
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
  }, [open, listId, fullWidth]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-flex",
        fullWidth && "w-full",
        className
      )}
    >
      <Button
        ref={buttonRef}
        type="button"
        id={buttonId}
        variant={variant}
        size={size}
        className={cn("gap-2", fullWidth && "w-full justify-between")}
        aria-label={labels.changeLanguage}
        title={labels.changeLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {SHORT_LABEL[value]}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </Button>
      {open && menuBox && typeof document !== "undefined"
        ? createPortal(
            <ul
              id={listId}
              role="listbox"
              aria-labelledby={buttonId}
              style={{
                top: menuBox.top,
                right: menuBox.right,
                left: menuBox.left,
                width: menuBox.width,
              }}
              className="fixed z-50 min-w-32 rounded-md border border-border bg-card p-1 shadow-card"
            >
              {UI_LANGS.map((code) => {
                const selected = code === value;
                return (
                  <li key={code} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm text-foreground hover:bg-muted"
                      onClick={() => {
                        onValueChange(code);
                        setOpen(false);
                        buttonRef.current?.focus();
                      }}
                    >
                      <span>{labels[code]}</span>
                      {selected ? (
                        <Check className="h-3.5 w-3.5 shrink-0" />
                      ) : null}
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
