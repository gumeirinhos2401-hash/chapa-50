"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Plus } from "lucide-react";
import { BadgeSticker } from "@/components/badge-sticker";
import { useCart } from "@/components/cart-provider";
import { SafeImage } from "@/components/safe-image";
import { SodaPicker } from "@/components/soda-picker";
import { Button } from "@/components/ui/button";
import { comboParts, comboSavingsCents, type Combo } from "@/data/menu";
import { SODAS, type Soda } from "@/lib/config";
import { formatBRL } from "@/lib/money";
import { cn } from "@/lib/utils";

const stage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

function piece(x: number, y: number): Variants {
  return {
    hidden: { opacity: 0, x, y, scale: 0.5, rotate: x === 0 ? 0 : x > 0 ? 25 : -25 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 260, damping: 15 },
    },
  };
}

export function ComboCard({ combo, large = false }: { combo: Combo; large?: boolean }) {
  const { add } = useCart();
  const { burger, fries, soda } = comboParts(combo);
  const fullPrice = burger.priceCents + fries.priceCents + soda.priceCents;
  const savings = comboSavingsCents(combo);
  const [choice, setChoice] = useState<Soda>(SODAS[0]);
  const burgerRef = useRef<HTMLDivElement>(null);
  const ring = "absolute overflow-hidden rounded-full border-4 border-ink bg-cream shadow-lg";

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border-4 border-ink bg-white shadow-[6px_6px_0_var(--color-ink)]">
      <motion.div
        className={cn("checker relative border-b-4 border-ink", large ? "h-72" : "h-56")}
        variants={stage}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {combo.badge && <BadgeSticker badge={combo.badge} />}
        <motion.div data-reveal variants={piece(-90, 20)} className={cn(ring, "bottom-4 left-4 h-24 w-24", large && "h-28 w-28")}>
          <SafeImage photo={fries.photo} label={fries.name} sizes="112px" />
        </motion.div>
        <motion.div data-reveal variants={piece(90, 20)} className={cn(ring, "bottom-4 right-4 h-24 w-24", large && "h-28 w-28")}>
          <SafeImage photo={soda.photo} label={soda.name} sizes="112px" />
        </motion.div>
        <motion.div
          ref={burgerRef}
          data-reveal
          variants={piece(0, -90)}
          whileHover={{ scale: 1.08, rotate: -6 }}
          className={cn(
            ring,
            "top-4",
            large ? "left-[calc(50%-6rem)] h-48 w-48" : "left-[calc(50%-4.5rem)] h-36 w-36",
          )}
        >
          <SafeImage photo={burger.photo} label={burger.name} sizes="192px" />
        </motion.div>
      </motion.div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className={cn("font-display leading-tight", large ? "text-2xl" : "text-xl")}>{combo.name}</h3>
        <p className="text-sm text-ink/80">{combo.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <s className="text-sm text-ink/60">{formatBRL(fullPrice)}</s>
          <span className="rounded-full bg-ink px-3 py-1 font-bold text-mustard">{formatBRL(combo.priceCents)}</span>
          <span className="rounded-full border-2 border-ink bg-mustard px-3 py-1 text-xs font-bold text-ink">
            Economize {formatBRL(savings)}
          </span>
        </div>
        <SodaPicker value={choice} onChange={setChoice} name={`combo-${combo.id}${large ? "-destaque" : ""}`} />
        <Button
          className="mt-auto"
          aria-label={`Adicionar ${combo.name} (${choice}) ao carrinho`}
          onClick={() =>
            add(
              { itemId: combo.id, name: combo.name, unitPriceCents: combo.priceCents, option: choice },
              { src: burger.photo.src, el: burgerRef.current },
            )
          }
        >
          <Plus className="h-4 w-4" aria-hidden />
          Adicionar combo
        </Button>
      </div>
    </article>
  );
}
