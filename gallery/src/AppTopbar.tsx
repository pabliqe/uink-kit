import { useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Menu, Moon, Sun, X } from "lucide-react";
import {
  Button,
  Separator,
} from "@uink/ui";
import type { Theme } from "./theme";

const GITHUB_URL = "https://github.com/pabliqe/uink-kit";
const CONTACT_URL = "https://uink.agency/contact";

type AppTopbarProps = {
  title: string;
  version: string;
  theme: Theme;
  onToggleTheme: () => void;
  cta?: ReactNode;
};

export function AppTopbar({
  title,
  version,
  theme,
  onToggleTheme,
  cta,
}: AppTopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeLabel = theme === "dark" ? "Light Mode" : "Dark Mode";

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }
    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("touchstart", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("touchstart", onPointerDown);
    };
  }, [mobileMenuOpen]);

  const themeToggle = (mobile = false) => (
    <Button
      variant="ghost"
      size={mobile ? "default" : "icon"}
      className={mobile ? "w-full justify-start gap-2" : undefined}
      onClick={() => {
        onToggleTheme();
        if (mobile) setMobileMenuOpen(false);
      }}
      aria-label={themeLabel}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {mobile ? themeLabel : null}
    </Button>
  );

  const contactLink = (mobile = false) => (
    <Button
      variant="ghost"
      size={mobile ? "default" : "sm"}
      className={mobile ? "w-full justify-start gap-2" : "gap-2"}
      asChild
    >
      <a
        href={CONTACT_URL}
        target="_blank"
        rel="noreferrer"
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        {mobile ? <ExternalLink className="h-4 w-4" /> : null}
        Contact us
        {!mobile ? <ExternalLink className="h-4 w-4" /> : null}
      </a>
    </Button>
  );

  const defaultCta = (
    <Button variant="blue" size="sm" className="gap-2" asChild>
      <a href={GITHUB_URL} target="_blank" rel="noreferrer">
        GitHub
        <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <a
          href="https://uink.agency"
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 shrink-0 overflow-hidden rounded-md shadow-solid [--solid-glow:var(--color-primary)] transition-transform hover:scale-105"
        >
          <img
            src="/icon-512x512.png"
            alt="UINK Tools"
            className="h-full w-full object-cover"
          />
        </a>
        <div className="hidden min-w-0 leading-tight md:block">
          <p className="truncate font-display text-base font-semibold tracking-tight text-foreground">
            {title}
          </p>
          <p className="mt-0.5 flex items-center gap-2 text-caption leading-tight">
            <span className="font-medium uppercase tracking-widest text-muted-foreground">
              UINK Tools
            </span>
            <Separator orientation="vertical" className="h-2.5" />
            <span className="font-bold uppercase tracking-widest text-secondary-blue">
              v{version}
            </span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden items-center gap-2 lg:flex">
          {cta ?? defaultCta}
          {themeToggle()}
          <Separator orientation="vertical" className="mx-1 h-8" />
          {contactLink()}
        </div>

        <div className="lg:hidden">{cta ?? defaultCta}</div>

        <div className="relative lg:hidden" ref={menuRef}>
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-haspopup="menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
          {mobileMenuOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-border bg-card p-2 shadow-card"
            >
              <div className="flex flex-col gap-1">
                {themeToggle(true)}
                {contactLink(true)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
