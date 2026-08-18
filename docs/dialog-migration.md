# Dialog Unification — Migration Guide

`uink-kit` now ships two dialog building blocks:

| Export | Purpose |
|--------|---------|
| `Dialog`, `DialogContent`, `DialogHeader`, `DialogBody`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogTrigger`, `DialogOverlay`, `DialogPortal` | Low-level primitive. Use for any ad-hoc modal (prompt viewer, confirmation, etc.). |
| `OnboardingDialog` | Multi-step welcome/onboarding shell. Owns the overlay, hero image slot, slide layout, dot indicators, and previous/next controls. App owns slide data and copy. |

---

## `uink-brand-tokens` — WelcomeModal migration

Replace `src/components/WelcomeModal.jsx` with the snippet below.
The kit handles the shell; you keep only the slide data and the `onComplete` side-effect.

```jsx
// src/components/WelcomeModal.jsx
import { OnboardingDialog } from "@uink/ui";

/** Returns the CDN/public URL for a given media asset name. */
function mediaUrl(name) {
  return `/assets/onboarding/${name}`;
}

const SLIDES = [
  {
    title: "Welcome to Brand Tokens",
    description: "Extract, manage, and export design tokens from your brand.",
    imageSrc: mediaUrl("step-1.png"),
    imageAlt: "Brand token extraction overview",
    ctaLabel: "Next",
  },
  {
    title: "Paste your brand URL",
    description: "Drop in any public URL and we'll scrape the visual vocabulary.",
    imageSrc: mediaUrl("step-2.png"),
    imageAlt: "URL input step",
    ctaLabel: "Next",
  },
  {
    title: "Export your tokens",
    description: "Download CSS variables, Figma tokens, or a Tailwind preset.",
    imageSrc: mediaUrl("step-3.png"),
    imageAlt: "Export step",
  },
];

export function WelcomeModal({ open, onOpenChange, onComplete }) {
  return (
    <OnboardingDialog
      open={open}
      onOpenChange={onOpenChange}
      slides={SLIDES}
      onComplete={onComplete}
      completeCTALabel="Get started"
      skipLabel="Skip intro"
    />
  );
}
```

**Remove from the file:**
- All raw Radix `Dialog*` imports
- Local overlay, content, animation, and indicator markup
- The step-tracking state (now inside `OnboardingDialog`)

---

## `uink-map2` — WelcomeDialog migration

Replace the custom `Modal` wrapper in `src/components/WelcomeDialog.jsx` with a
single-slide `OnboardingDialog`. This preserves the hero image and CTA while
adopting the shared shell.

```jsx
// src/components/WelcomeDialog.jsx
import { OnboardingDialog } from "@uink/ui";

const SLIDES = [
  {
    title: "Welcome to UINK Map",
    description:
      "Explore and navigate your brand's visual language across markets and personas.",
    imageSrc: "/assets/welcome-hero.png",
    imageAlt: "UINK Map overview",
  },
];

export function WelcomeDialog({ open, onOpenChange, onComplete }) {
  return (
    <OnboardingDialog
      open={open}
      onOpenChange={onOpenChange}
      slides={SLIDES}
      onComplete={onComplete}
      completeCTALabel="Explore map"
      skipLabel={null}
    />
  );
}
```

**Remove from the file:**
- The hand-rolled `Modal` component and its `createPortal` / direct DOM calls
- Local `backdrop`, `card`, and close-button markup
- Any inline styles for the overlay or content card

---

## `uink-brand-persona` — Prompt modal migration

The persona prompt viewer is a simple content-plus-copy modal, not an onboarding
flow. Use the low-level `Dialog` primitive directly.

```tsx
// Inside PersonaBuilder.tsx — replace the custom role="dialog" block
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Button,
} from "@uink/ui";

// In JSX, replace the custom modal markup with:
<Dialog open={promptOpen} onOpenChange={setPromptOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>{activePrompt?.title ?? "Prompt"}</DialogTitle>
    </DialogHeader>
    <DialogBody className="max-h-[60vh] overflow-y-auto">
      <pre className="whitespace-pre-wrap text-body-sm font-mono text-foreground">
        {activePrompt?.content}
      </pre>
    </DialogBody>
    <DialogFooter>
      <Button
        variant="outline"
        onClick={() => navigator.clipboard.writeText(activePrompt?.content ?? "")}
      >
        Copy
      </Button>
      <Button variant="brand" onClick={() => setPromptOpen(false)}>
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Remove from `PersonaBuilder.tsx`:**
- The `<div role="dialog" …>` block and its backdrop div
- Any `useEffect` that manages `document.body` overflow for the modal
- Local `promptModalOpen` / `setPromptModalOpen` if renamed to `promptOpen`

---

## Success checklist

- [ ] `uink-brand-tokens` `WelcomeModal` uses `OnboardingDialog` — no local Radix imports
- [ ] `uink-map2` `WelcomeDialog` uses `OnboardingDialog` — no local portal/modal code
- [ ] `uink-brand-persona` prompt modal uses `Dialog` primitive — no `role="dialog"` div
- [ ] All three apps still pass their own `onComplete` / copy handlers (app-owned logic stays local)
- [ ] No product copy, asset paths, or analytics calls were moved into `uink-kit`
