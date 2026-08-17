import tokensCss from "../../src/styles/tokens.css?raw";

export type TokenEntry = {
  name: string;
  raw: string;
  hex: string | null;
};

export type TokenGroup = {
  id: string;
  label: string;
  tokens: TokenEntry[];
};

const HSL_CHANNELS = /^-?[\d.]+\s+[\d.]+%\s+[\d.]+%$/;

function tokenNamesFromCss(css: string): string[] {
  const names = new Set<string>();
  for (const match of css.matchAll(/--([a-z0-9-]+)\s*:/gi)) {
    names.add(`--${match[1]}`);
  }
  return [...names];
}

function groupIdFor(name: string): { id: string; label: string } {
  if (name.startsWith("--color-primary")) return { id: "brand", label: "Brand" };
  if (name.startsWith("--color-secondary")) return { id: "secondary", label: "Secondary" };
  if (name.startsWith("--color-neutral")) return { id: "neutral", label: "Neutral" };
  if (name.startsWith("--text-") || name.startsWith("--font-")) {
    return { id: "type", label: "Type" };
  }
  if (name.includes("radius")) return { id: "radius", label: "Radius" };
  if (
    name.includes("shadow") ||
    name.includes("solid") ||
    name.includes("card-edge")
  ) {
    return { id: "elevation", label: "Elevation" };
  }
  return { id: "semantic", label: "Semantic" };
}

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(
    /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/
  );
  if (!match) return null;
  return `#${[match[1], match[2], match[3]]
    .map((n) => Number(n).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function resolveHex(name: string, raw: string): string | null {
  if (!HSL_CHANNELS.test(raw.trim())) return null;
  const probe = document.createElement("div");
  probe.style.backgroundColor = `hsl(var(${name}))`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const hex = rgbToHex(getComputedStyle(probe).backgroundColor);
  probe.remove();
  return hex;
}

export function readLiveTokens(): TokenGroup[] {
  const styles = getComputedStyle(document.documentElement);
  const grouped = new Map<string, TokenGroup>();

  for (const name of tokenNamesFromCss(tokensCss)) {
    const raw = styles.getPropertyValue(name).trim();
    if (!raw) continue;
    const { id, label } = groupIdFor(name);
    let group = grouped.get(id);
    if (!group) {
      group = { id, label, tokens: [] };
      grouped.set(id, group);
    }
    group.tokens.push({
      name,
      raw,
      hex: resolveHex(name, raw),
    });
  }

  const order = [
    "brand",
    "secondary",
    "neutral",
    "semantic",
    "type",
    "radius",
    "elevation",
  ];
  return order
    .map((id) => grouped.get(id))
    .filter((group): group is TokenGroup => Boolean(group));
}

export const kitComponentFiles = Object.keys(
  import.meta.glob("../../src/components/*.tsx")
)
  .map((file) => file.split("/").pop()!.replace(".tsx", ""))
  .sort();

export { tokensCss as tokensSource };
