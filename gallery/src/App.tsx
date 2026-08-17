import { useEffect, useState, type ReactNode } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TooltipProvider,
} from "@uink/ui";
import pkg from "../../package.json" with { type: "json" };
import { AppTopbar } from "./AppTopbar";
import { CopyToken } from "./CopyToken";
import {
  kitComponentFiles,
  readLiveTokens,
  tokensSource,
  type TokenGroup,
} from "./kit";
import { ComponentCatalog, CompositionSpecimen } from "./Specimens";
import { applyTheme, readStoredTheme, type Theme } from "./theme";

function useLiveTokens(theme: Theme) {
  const [groups, setGroups] = useState<TokenGroup[]>([]);

  useEffect(() => {
    const refresh = () => setGroups(readLiveTokens());
    refresh();
    const onHot = () => refresh();
    import.meta.hot?.on("vite:afterUpdate", onHot);
    return () => import.meta.hot?.off("vite:afterUpdate", onHot);
  }, [theme, tokensSource]);

  return groups;
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleCase(file: string) {
  return file
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type NavItem = {
  id: string;
  title: string;
  children?: { id: string; title: string }[];
};

const kitSections: NavItem[] = [
  { id: "tokens", title: "Tokens" },
  { id: "scale", title: "Scale" },
  { id: "elevation", title: "Elevation" },
  {
    id: "components",
    title: "Components",
    children: kitComponentFiles.map((file) => ({
      id: file,
      title: titleCase(file),
    })),
  },
  { id: "composition", title: "Composition" },
];

const kitLinks = kitSections.flatMap((section) =>
  section.children?.length ? section.children : [section]
);

function Section({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  children: ReactNode;
}) {
  const headingId = id ?? slugify(title);
  return (
    <section id={headingId} className="scroll-mt-28 space-y-4">
      <header className="space-y-1">
        <p className="font-display text-caption font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="font-display text-title font-semibold tracking-tight">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

function KitOutline({ className }: { className?: string }) {
  return (
    <nav aria-label="In this kit" className={className}>
      <p className="font-display text-caption font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Inventory
      </p>
      <p className="mt-1 font-display text-heading font-semibold tracking-tight">
        In this kit
      </p>
      <ul className="mt-4 flex flex-col gap-1">
        {kitSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block rounded-lg border border-transparent px-3 py-1.5 font-display text-ui text-foreground transition-colors hover:border-border hover:bg-card"
            >
              {section.title}
            </a>
            {section.children ? (
              <ul className="mt-1 ml-2 flex flex-col gap-0.5 border-l border-border pl-2">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className="block rounded-lg px-2 py-1 font-mono text-mono-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TokenSwatch({ name, raw, hex }: { name: string; raw: string; hex: string | null }) {
  return <CopyToken name={name} value={hex ?? raw} swatch={hex} />;
}

export function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    const initial = readStoredTheme();
    applyTheme(initial);
    return initial;
  });
  const groups = useLiveTokens(theme);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <TooltipProvider>
      <AppTopbar
        title="UINK Design System"
        version={pkg.version}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-24 xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-12">
        <aside className="hidden xl:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-1">
            <KitOutline />
          </div>
        </aside>
        <div className="space-y-12">
        <header className="space-y-2">
          <p className="font-display text-caption font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {pkg.name} · v{pkg.version}
          </p>
          <h1 className="font-display text-display font-semibold tracking-tight">
            UI kit sheet
          </h1>
          <p className="max-w-xl text-body-sm text-muted-foreground">
            Live from <code className="font-mono text-mono-sm text-foreground">src/</code>.
            Click a token name or value to copy it. Edit tokens or primitives and this page updates.
          </p>
        </header>

        <div className="xl:hidden">
          <Section eyebrow="Inventory" title="In this kit">
            <div className="flex flex-wrap gap-2">
              {kitLinks.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 font-display text-ui hover:bg-muted"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </Section>
        </div>

        <Section eyebrow="Foundations" title="Tokens">
          <div className="grid gap-6 lg:grid-cols-2">
            {groups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle>{group.label}</CardTitle>
                  <CardDescription>
                    Resolved from CSS on the current theme
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {group.tokens.map((token) => (
                    <TokenSwatch key={token.name} {...token} />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section eyebrow="Type" title="Scale">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <p className="font-display text-display font-semibold">Display · Chivo</p>
              <p className="font-display text-title font-semibold">Title · section heads</p>
              <p className="font-display text-heading font-semibold">Heading · card titles</p>
              <p className="text-body">Body · 18px reading text</p>
              <p className="text-body-sm">Body sm · default UI copy</p>
              <p className="text-ui">UI · 14px compact chrome</p>
              <p className="text-caption text-muted-foreground">Caption · metadata floor</p>
            </CardContent>
          </Card>
        </Section>

        <Section eyebrow="Surfaces" title="Elevation">
          <div className="uink-shell space-y-4 p-6">
            <p className="text-ui text-muted-foreground">.uink-shell · recessed canvas</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>.uink-card on the shell</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-background p-3 text-ui text-muted-foreground">
                    Sunken well · bg-background
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col justify-center gap-3">
                <Button variant="brand">Brand solid</Button>
                <Button variant="blue">Blue solid</Button>
                <Button variant="destructive">Destructive solid</Button>
              </div>
            </div>
          </div>
        </Section>

        <Section eyebrow="Kit" title="Components">
          <ComponentCatalog files={kitComponentFiles} />
        </Section>

        <Section eyebrow="Together" title="Composition">
          <CompositionSpecimen />
        </Section>
        </div>
      </div>
    </TooltipProvider>
  );
}
