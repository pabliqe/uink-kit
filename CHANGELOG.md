# Changelog

## [0.3.0]
- Add `DropdownFilter` — compact bold value + chevron menu (PATTTTERNS #379), not a boxed `<select>`

## [0.2.0]
- Persist darker canvas (`--background`) and lighter cards (`--card`) in both themes
- Add `.uink-shell` (dark rounded panel) and `.uink-card` / `<Card>` (light card on that canvas)
- Add `--card-edge`, `--card-edge-alpha`, `--shadow-card`, and `--radius-card`
- Map Tailwind `shadow-card` and `rounded-xl` to the card surface tokens
- Add `.uink-solid` and Tailwind `shadow-solid` (tinted glow; set `--solid-glow` on the element so it is not baked at `:root`)
- Wire brand / blue / destructive `Button` variants to solid glow via `--solid-glow`
- Set `color-scheme: dark` under `[data-theme="dark"]`
- Add a living `gallery/` kit sheet (tokens from CSS, primitives from `src/`)
- Slider thumb uses the same fill as the range (`--slider-fill`)
- Gallery lists each exported primitive as its own specimen (not a stacked stand-in)

## [0.1.0]
- Initial tokens, Tailwind preset, and primitives (`Button`, `Tooltip`, `Separator`, `Tabs`, `Slider`, `Label`)
