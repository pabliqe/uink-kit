import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Button,
  buttonVariantConfig,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@uink/ui";
import pkg from "../../package.json" with { type: "json" };
import { kitComponentFiles, readLiveTokens, tokensSource, type TokenGroup } from "./kit";
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

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
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

function TokenSwatch({ name, raw, hex }: { name: string; raw: string; hex: string | null }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {hex ? (
        <span
          className="h-9 w-9 shrink-0 rounded-lg border border-border shadow-sm"
          style={{ backgroundColor: hex }}
          title={hex}
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-border text-caption text-muted-foreground">
          —
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate font-mono text-mono-sm text-foreground">{name}</p>
        <p className="truncate font-mono text-caption text-muted-foreground">
          {hex ?? raw}
        </p>
      </div>
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    const initial = readStoredTheme();
    applyTheme(initial);
    return initial;
  });
  const [slider, setSlider] = useState([42]);
  const groups = useLiveTokens(theme);
  const variants = useMemo(
    () => Object.keys(buttonVariantConfig.variant) as Array<keyof typeof buttonVariantConfig.variant>,
    []
  );
  const sizes = useMemo(
    () => Object.keys(buttonVariantConfig.size) as Array<keyof typeof buttonVariantConfig.size>,
    []
  );

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="font-display text-caption font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {pkg.name} · v{pkg.version}
            </p>
            <h1 className="font-display text-display font-semibold tracking-tight">
              UI kit sheet
            </h1>
            <p className="max-w-xl text-body-sm text-muted-foreground">
              Live from <code className="font-mono text-mono-sm text-foreground">src/</code>.
              Edit tokens or primitives and this page updates — HMR in dev, rebuild on deploy.
            </p>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"} theme
          </Button>
        </header>

        <Section eyebrow="Inventory" title="In this kit">
          <div className="flex flex-wrap gap-2">
            {kitComponentFiles.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-mono-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </Section>

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

        <Section eyebrow="Primitives" title="Button matrix">
          <Card>
            <CardContent className="overflow-x-auto pt-6">
              <table className="w-full min-w-[40rem] border-separate border-spacing-3">
                <thead>
                  <tr>
                    <th className="text-left text-caption font-medium text-muted-foreground">
                      variant \ size
                    </th>
                    {sizes.map((size) => (
                      <th
                        key={size}
                        className="text-left font-mono text-caption font-medium text-muted-foreground"
                      >
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant}>
                      <td className="align-middle font-mono text-mono-sm">{variant}</td>
                      {sizes.map((size) => (
                        <td key={size} className="align-middle">
                          <Button variant={variant} size={size}>
                            {size === "icon" || size === "xs" ? "·" : variant}
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Section>

        <Section eyebrow="Composition" title="Stacked primitives">
          <div className="uink-shell p-6">
            <div className="mb-4">
              <h3 className="font-display text-heading font-semibold">
                Shell, card, tabs
              </h3>
              <p className="text-ui text-muted-foreground">
                How the primitives sit together — not a product flow
              </p>
            </div>
            <Tabs defaultValue="slider">
              <TabsList>
                <TabsTrigger value="slider">Slider</TabsTrigger>
                <TabsTrigger value="type">Type</TabsTrigger>
              </TabsList>
              <TabsContent value="slider">
                <Card>
                  <CardHeader>
                    <CardTitle>Value</CardTitle>
                    <CardDescription>Label, slider, tooltip</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="intensity" className="cursor-help">
                          Amount · {slider[0]}
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>Current slider value</TooltipContent>
                    </Tooltip>
                    <Slider
                      id="intensity"
                      value={slider}
                      onValueChange={setSlider}
                      max={100}
                      step={1}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="type">
                <Card>
                  <CardContent className="space-y-3 pt-6">
                    <p className="font-display text-heading font-semibold">
                      Heading on a card
                    </p>
                    <Separator />
                    <p className="text-body-sm text-muted-foreground">
                      Body sits in the lifted surface, not on the shell.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Section>
      </div>
    </TooltipProvider>
  );
}
