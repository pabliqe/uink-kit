# @uink/ui

Shared UI package for **UINK Tools** (`uink-brand-tokens`, `uink-brand-persona`, `uink-map2`, and other `uink-*` apps).

This repo (`uink-kit`) is the source of truth. Apps keep a `vendor/uink-ui` snapshot for Netlify.

## What’s inside

- `tokens.css` — HSL brand/neutral tokens + shadcn semantic bridge + elevation
- `tailwind-preset` — Tailwind theme extension + `tailwindcss-animate`
- Primitives: `Button`, `Card`, `Tooltip`, `Separator`, `Tabs`, `Slider`, `Label`
- `cn()` helper

## Surfaces

Both themes use a **darker canvas + lighter cards** elevation:

| Token / class | Role |
|---------------|------|
| `--background` / `bg-background` | Page / panel canvas (recessed) |
| `--card` / `bg-card` | Lifted fill |
| `.uink-shell` | Dark rounded panel: canvas fill + edge + glow |
| `.uink-card` / `<Card>` | Light card on a shell: fill + edge + glow |
| `bg-background` inside a card | Sunken wells (inputs, dropzones) |
| `shadow-solid` / `.uink-solid` / `--solid-glow` | Raised filled buttons (brand / blue / destructive) |

`shadow-card` maps to `--shadow-card` if you need the glow without the full `.uink-card` chrome.

## Consumer setup (Vite + React + Tailwind)

Local / Netlify (vendored snapshot — preferred until a private registry exists):

```bash
# From an app repo
rsync -a --delete \
  --exclude node_modules --exclude .git --exclude package-lock.json --exclude VENDOR.md \
  ../uink-kit/ vendor/uink-ui/
```

```json
"@uink/ui": "file:./vendor/uink-ui"
```

Sibling link during local iteration:

```bash
npm install file:../uink-kit
```

```js
// tailwind.config.js
const uinkPreset = require("@uink/ui/tailwind-preset");

module.exports = {
  presets: [uinkPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@uink/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
```

```css
/* global.css */
@import "@uink/ui/tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
import { Button, Card, TooltipProvider } from "@uink/ui";
```

Ensure Vite can transpile the linked package (default for `file:` installs). Theme: set `data-theme` and `.dark` on `<html>`.

## Out of scope

Product logic, Gemini, ReactFlow map chrome, Internet es Cool editorial system.
