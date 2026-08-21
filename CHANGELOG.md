# Changelog

## [0.6.3]
- `OnboardingDialog`: clamp description **and** bullets together behind “show more…”
- `ShowMoreText`: clamp any block content (not only strings); add `resetKey`

## [0.6.2]
- `OnboardingDialog`: overlay click always dismisses; add floating top-right close control
- Clamp string descriptions to two lines with localized `showMoreLabel` / `showLessLabel`
- Export `ShowMoreText` for reuse outside onboarding

## [0.6.1]
- Portal `LanguageSelector` menu to `document.body` (same pattern as `DropdownFilter`) so it is not clipped by app stacking contexts

## [0.6.0]
- Add `LanguageSelector` — topbar EN/ES switcher (ENG / ESP trigger, English / Español menu) shared by `uink-map2` and `uink-brand-persona`
- Export `UiLang`, `UI_LANGS`, `detectBrowserLang()`, and `isUiLang()` so apps share the same two-language heuristic

## [0.5.0]
- Add `Dialog` primitive — low-level modal shell (overlay, content, header, body, footer, title, description, close)
- Add `OnboardingDialog` — multi-step welcome pattern (slides, hero image, dot indicators, prev/next, skip/complete callbacks)
- Gallery specimens for both new components
- See `docs/dialog-migration.md` for migration instructions for `uink-brand-tokens`, `uink-map2`, and `uink-brand-persona`

## [0.4.0]
- Add `SegmentedControl` — product tabs with `pill` (in-panel) and `underline` (full-width workspace); no Radix

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
