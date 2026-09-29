import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-ink px-3 py-1 font-display text-xs leading-none",
  {
    variants: {
      variant: {
        mustard: "bg-mustard text-ink",
        pool: "bg-pool text-ink",
        cherry: "bg-cherry text-cream",
      },
    },
    defaultVariants: { variant: "mustard" },
  },
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
