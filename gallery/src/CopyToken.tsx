import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@uink/ui";

export function CopyToken({
  name,
  value,
  swatch,
}: {
  name: string;
  value: string;
  swatch?: string | null;
}) {
  const [copied, setCopied] = useState<"name" | "value" | null>(null);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async (which: "name" | "value") => {
    await navigator.clipboard.writeText(which === "name" ? name : value);
    setCopied(which);
  };

  return (
    <div className="flex min-w-0 items-center gap-3">
      {swatch ? (
        <button
          type="button"
          onClick={() => copy("value")}
          title="Copy token value"
          aria-label={`Copy value ${value}`}
          className="h-9 w-9 shrink-0 rounded-lg border border-border shadow-sm"
          style={{ backgroundColor: swatch }}
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-border text-caption text-muted-foreground">
          —
        </span>
      )}
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => copy("name")}
          title="Copy token name"
          aria-label={`Copy name ${name}`}
          className={cn(
            "flex w-full min-w-0 items-center gap-1.5 truncate rounded-md text-left font-mono text-mono-sm text-foreground hover:underline",
            copied === "name" && "text-secondary-blue"
          )}
        >
          {copied === "name" ? <Check className="h-3 w-3 shrink-0" /> : null}
          <span className="truncate">{copied === "name" ? "Copied name" : name}</span>
        </button>
        <button
          type="button"
          onClick={() => copy("value")}
          title="Copy token value"
          aria-label={`Copy value ${value}`}
          className={cn(
            "flex w-full min-w-0 items-center gap-1.5 truncate rounded-md text-left font-mono text-caption text-muted-foreground hover:underline",
            copied === "value" && "text-secondary-blue"
          )}
        >
          {copied === "value" ? <Check className="h-3 w-3 shrink-0" /> : null}
          <span className="truncate">{copied === "value" ? "Copied value" : value}</span>
        </button>
      </div>
    </div>
  );
}
