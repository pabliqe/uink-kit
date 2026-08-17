import { useMemo, useState, type ReactNode } from "react";
import {
  Button,
  buttonVariantConfig,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownFilter,
  Label,
  Separator,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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

function TabsSpecimen() {
  return (
    <Specimen id="tabs" name="Tabs" description="Two panels; only the active content shows">
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one" className="text-body-sm text-muted-foreground">
          First panel.
        </TabsContent>
        <TabsContent value="two" className="text-body-sm text-muted-foreground">
          Second panel.
        </TabsContent>
      </Tabs>
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
  "dropdown-filter": () => <DropdownFilterSpecimen />,
  label: () => <LabelSpecimen />,
  separator: () => <SeparatorSpecimen />,
  slider: () => <SliderSpecimen />,
  tabs: () => <TabsSpecimen />,
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
