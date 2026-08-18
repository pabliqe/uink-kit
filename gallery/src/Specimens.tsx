import { useMemo, useState, type ReactNode } from "react";
import { Code2, FileText, Package, ScanSearch, SlidersHorizontal } from "lucide-react";
import {
  Button,
  buttonVariantConfig,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownFilter,
  Label,
  OnboardingDialog,
  SegmentedControl,
  Separator,
  Slider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@uink/ui";

function Specimen({
  id,
  name,
  description,
  children,
}: {
  id: string;
  name: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-heading">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

function ButtonSpecimen() {
  const variants = useMemo(
    () =>
      Object.keys(buttonVariantConfig.variant) as Array<
        keyof typeof buttonVariantConfig.variant
      >,
    []
  );
  const sizes = useMemo(
    () =>
      Object.keys(buttonVariantConfig.size) as Array<
        keyof typeof buttonVariantConfig.size
      >,
    []
  );

  return (
    <Specimen id="button" name="Button" description="Variants × sizes from buttonVariantConfig">
      <div className="overflow-x-auto">
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
      </div>
    </Specimen>
  );
}

function CardSpecimen() {
  return (
    <Specimen id="card" name="Card" description="Header, content, and footer slots">
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description on the lifted surface</CardDescription>
        </CardHeader>
        <CardContent className="text-body-sm text-muted-foreground">
          Content sits in the card, not on the page canvas.
        </CardContent>
        <CardFooter>
          <p className="text-caption text-muted-foreground">Footer slot</p>
        </CardFooter>
      </Card>
    </Specimen>
  );
}

function DropdownFilterSpecimen() {
  const options = [
    "Maya",
    "Online Value Shopper",
    "es-AR",
    "Other…",
  ] as const;
  const [value, setValue] = useState<string>(options[0]);
  return (
    <Specimen
      id="dropdown-filter"
      name="DropdownFilter"
      description="Bold value + chevron; menu is not a full-width select box"
    >
      <div className="space-y-1.5">
        <Label htmlFor="dropdown-filter-demo">Name</Label>
        <DropdownFilter
          id="dropdown-filter-demo"
          value={value}
          options={options}
          onChange={setValue}
        />
      </div>
    </Specimen>
  );
}

function LabelSpecimen() {
  return (
    <Specimen id="label" name="Label" description="Form caption; pairs with controls">
      <div className="space-y-2">
        <Label htmlFor="label-demo">Amount</Label>
        <p id="label-demo" className="text-body-sm text-muted-foreground">
          Labels mark a control. They are not headings.
        </p>
      </div>
    </Specimen>
  );
}

function SeparatorSpecimen() {
  return (
    <Specimen id="separator" name="Separator" description="Horizontal rule">
      <div className="space-y-3">
        <p className="text-body-sm">Above</p>
        <Separator />
        <p className="text-body-sm">Below</p>
      </div>
    </Specimen>
  );
}

function SliderSpecimen() {
  const [value, setValue] = useState([42]);
  return (
    <Specimen id="slider" name="Slider" description="Range; thumb matches --slider-fill">
      <div className="space-y-3">
        <Label htmlFor="slider-demo">Amount · {value[0]}</Label>
        <Slider
          id="slider-demo"
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
        />
      </div>
    </Specimen>
  );
}

function SegmentedControlSpecimen() {
  const [pill, setPill] = useState("extract");
  const [underline, setUnderline] = useState("editor");

  return (
    <Specimen
      id="segmented-control"
      name="SegmentedControl"
      description="Product tabs: pill (in-panel) and underline (full-width workspace)"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-caption font-medium text-muted-foreground">pill</p>
          <SegmentedControl
            variant="pill"
            value={pill}
            onValueChange={setPill}
            options={[
              { value: "extract", label: "Extract", icon: ScanSearch },
              { value: "metadata", label: "Metadata", icon: FileText },
              { value: "json", label: "Json", icon: Code2 },
            ]}
          />
        </div>
        <div className="space-y-2 border-b border-border/70">
          <p className="text-caption font-medium text-muted-foreground">underline</p>
          <SegmentedControl
            variant="underline"
            value={underline}
            onValueChange={setUnderline}
            options={[
              { value: "editor", label: "Editor", icon: SlidersHorizontal },
              { value: "output", label: "Output", icon: Package },
            ]}
          />
        </div>
      </div>
    </Specimen>
  );
}

function DialogSpecimen() {
  const [open, setOpen] = useState(false);
  return (
    <Specimen
      id="dialog"
      name="Dialog"
      description="Low-level primitive: overlay, content, header, body, footer, close"
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Example dialog</DialogTitle>
            <DialogDescription>
              Title + description in the header. Body content below.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-body-sm text-muted-foreground">
              App-owned content goes here. The kit owns the overlay, surface,
              motion, and close button.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="brand" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Specimen>
  );
}

const ONBOARDING_SLIDES = [
  {
    title: "Welcome to the product",
    description:
      "This is the first slide. The kit owns the shell; the app owns the copy and assets.",
    ctaLabel: "Next",
  },
  {
    title: "What you can do",
    description: "A second slide demonstrating multi-step navigation.",
    bullets: ["Feature A — described concisely", "Feature B — one line each", "Feature C — no fluff"],
    ctaLabel: "Almost there",
  },
  {
    title: "You're ready",
    description:
      "Clicking Get started closes the dialog and calls onComplete.",
  },
] as const;

function OnboardingDialogSpecimen() {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  return (
    <Specimen
      id="onboarding-dialog"
      name="OnboardingDialog"
      description="Multi-step welcome flow: slides, dot indicators, prev/next, hero image support"
    >
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => { setCompleted(false); setOpen(true); }}>
          Open onboarding
        </Button>
        {completed && (
          <p className="text-caption text-muted-foreground">onComplete called ✓</p>
        )}
      </div>
      <OnboardingDialog
        open={open}
        onOpenChange={setOpen}
        slides={ONBOARDING_SLIDES as unknown as import("@uink/ui").OnboardingSlide[]}
        onComplete={() => setCompleted(true)}
      />
    </Specimen>
  );
}

function TooltipSpecimen() {
  return (
    <Specimen id="tooltip" name="Tooltip" description="Hover or focus the label">
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="cursor-help w-fit">Hover me</Label>
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </Specimen>
  );
}

const specimenByFile: Record<string, () => ReactNode> = {
  button: () => <ButtonSpecimen />,
  card: () => <CardSpecimen />,
  dialog: () => <DialogSpecimen />,
  "dropdown-filter": () => <DropdownFilterSpecimen />,
  label: () => <LabelSpecimen />,
  "onboarding-dialog": () => <OnboardingDialogSpecimen />,
  separator: () => <SeparatorSpecimen />,
  "segmented-control": () => <SegmentedControlSpecimen />,
  slider: () => <SliderSpecimen />,
  tooltip: () => <TooltipSpecimen />,
};

export function ComponentCatalog({ files }: { files: string[] }) {
  return (
    <div className="space-y-6">
      {files.map((file) => {
        const render = specimenByFile[file];
        if (render) return <div key={file}>{render()}</div>;
        return (
          <Specimen
            key={file}
            id={file}
            name={file}
            description="In src/components — add a specimen when you need a demo"
          >
            <p className="text-ui text-muted-foreground">No specimen yet.</p>
          </Specimen>
        );
      })}
    </div>
  );
}

export function CompositionSpecimen() {
  const [value, setValue] = useState([42]);
  return (
    <div className="uink-shell p-6">
      <p className="mb-4 text-ui text-muted-foreground">
        Shell → card. Not a product flow.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Together</CardTitle>
          <CardDescription>Label + slider on a card in a shell</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="composition-slider">Amount · {value[0]}</Label>
          <Slider
            id="composition-slider"
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
          />
        </CardContent>
      </Card>
    </div>
  );
}
