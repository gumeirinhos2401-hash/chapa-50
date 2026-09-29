import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-xl border-2 border-ink bg-white px-3 text-base text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream aria-[invalid=true]:border-cherry",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
