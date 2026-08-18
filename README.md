# @uink/ui

Shared UI package for **UINK Tools** (`uink-brand-tokens`, `uink-brand-persona`, `uink-map2`, and other `uink-*` apps).

This repo (`uink-kit`) is the source of truth. Apps install it from GitHub at build time.

## What’s inside

- `tokens.css` — HSL brand/neutral tokens + shadcn semantic bridge + elevation
- `tailwind-preset` — Tailwind theme extension + `tailwindcss-animate`
- Primitives: `Button`, `Card`, `Tooltip`, `Separator`, `Tabs`, `SegmentedControl`, `Slider`, `Label`, `DropdownFilter`
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

```json
"@uink/ui": "git+https://github.com/pabliqe/uink-kit.git#main"
```

Netlify `npm install` clones this repo (must stay **public**).

```bash
npm install git+https://github.com/pabliqe/uink-kit.git#main
# or: npm install file:../uink-kit
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
import { Button, Card, DropdownFilter, TooltipProvider } from "@uink/ui";
```

Ensure Vite can transpile the linked package (default for `file:` installs). Theme: set `data-theme` and `.dark` on `<html>`.

## UI kit sheet

A living catalog lives in `gallery/`. It imports primitives from `src/` and reads token names from `tokens.css` at runtime, so edits to styles or components update the page (Vite HMR locally; Netlify rebuild on `main`).

```bash
npm run gallery          # http://localhost:5177
npm run gallery:build
```

## Out of scope

Product logic, Gemini, ReactFlow map chrome, Internet es Cool editorial system.
