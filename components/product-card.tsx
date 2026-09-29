"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { BadgeSticker } from "@/components/badge-sticker";
import { useCart } from "@/components/cart-provider";
import { SafeImage } from "@/components/safe-image";
import { SodaPicker } from "@/components/soda-picker";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/data/menu";
import { SODAS, type Soda } from "@/lib/config";
import { formatBRL } from "@/lib/money";

export function ProductCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [soda, setSoda] = useState<Soda>(SODAS[0]);
  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      data-reveal
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -10, rotate: -1.5 }}
      whileTap={{ y: -6, rotate: -1.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className="group flex flex-col overflow-hidden rounded-3xl border-4 border-ink bg-white shadow-[6px_6px_0_var(--color-ink)] transition-shadow duration-300 hover:shadow-[12px_14px_0_var(--color-ink)]"
    >
      <div ref={photoRef} className="relative aspect-[4/3] overflow-hidden border-b-4 border-ink">
        <SafeImage
          photo={item.photo}
          label={item.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        {item.badge && <BadgeSticker badge={item.badge} />}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-ink px-3 py-1 font-bold text-mustard">{formatBRL(item.priceCents)}</span>
        </div>
        <p className="text-sm text-ink/80">{item.description}</p>
        {item.needsSoda && <SodaPicker value={soda} onChange={setSoda} name={`soda-${item.id}`} />}
        <Button
          className="mt-auto"
          aria-label={`Adicionar ${item.name}${item.needsSoda ? ` (${soda})` : ""} ao carrinho`}
          onClick={() =>
            add(
              {
                itemId: item.id,
                name: item.name,
                unitPriceCents: item.priceCents,
                option: item.needsSoda ? soda : undefined,
              },
              { src: item.photo.src, el: photoRef.current },
            )
          }
        >
          <Plus className="h-4 w-4" aria-hidden />
          Adicionar
        </Button>
      </div>
    </motion.article>
  );
}
