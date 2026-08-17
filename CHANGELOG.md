# Changelog

## [0.2.0]
- Persist darker canvas (`--background`) and lighter cards (`--card`) in both themes
- Add `.uink-shell` (dark rounded panel) and `.uink-card` / `<Card>` (light card on that canvas)
- Add `--card-edge`, `--card-edge-alpha`, `--shadow-card`, and `--radius-card`
- Map Tailwind `shadow-card` and `rounded-xl` to the card surface tokens
- Add `--shadow-solid` / `--shadow-solid-hover` (tinted glow for filled surfaces)
- Wire brand / blue / destructive `Button` variants to `shadow-solid` via `--solid-glow`
- Map Tailwind `shadow-solid` and `shadow-solid-hover`
- Set `color-scheme: dark` under `[data-theme="dark"]`

## [0.1.0]
- Initial tokens, Tailwind preset, and primitives (`Button`, `Tooltip`, `Separator`, `Tabs`, `Slider`, `Label`)
