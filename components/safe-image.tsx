"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/data/menu";
import { cn } from "@/lib/utils";

export function SafeImage({
  photo,
  label,
  sizes,
  priority = false,
  className,
}: {
  photo: Photo;
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div role="img" aria-label={photo.alt} className={cn("checker absolute inset-0 flex items-center justify-center", className)}>
        <span className="rounded-lg bg-ink px-3 py-1 text-center font-display text-sm text-cream">{label}</span>
      </div>
    );
  }

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
