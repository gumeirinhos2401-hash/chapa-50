"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SODAS, type Soda } from "@/lib/config";
import { cn } from "@/lib/utils";

export function SodaPicker({
  value,
  onChange,
  name,
  tone = "light",
}: {
  value: Soda;
  onChange: (value: Soda) => void;
  name: string;
  tone?: "light" | "dark";
}) {
  return (
    <fieldset>
      <legend className={cn("mb-2 text-xs font-bold uppercase tracking-wide", tone === "light" ? "text-ink/70" : "text-cream/80")}>
        Refrigerante
      </legend>
      <RadioGroup value={value} onValueChange={(v) => onChange(v as Soda)} className="flex flex-wrap gap-2">
        {SODAS.map((soda) => {
          const id = `${name}-${soda}`;
          return (
            <Label
              key={soda}
              htmlFor={id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-3 text-sm",
                tone === "light"
                  ? "border-ink has-[[data-state=checked]]:bg-ink has-[[data-state=checked]]:text-cream"
                  : "border-cream text-cream has-[[data-state=checked]]:bg-cream has-[[data-state=checked]]:text-ink",
              )}
            >
              <RadioGroupItem id={id} value={soda} />
              {soda}
            </Label>
          );
        })}
      </RadioGroup>
    </fieldset>
  );
}
