"use client";

import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { NeonSign } from "@/components/neon-sign";

export function Header() {
  const { count, bump, cartIconRef, setOpen } = useCart();
  const label = `Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`;

  return (
    <header className="sticky top-0 z-40 border-b-4 border-cherry bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#topo" aria-label="Chapa 50, voltar ao topo" className="rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pool/50">
          <NeonSign size="sm" />
        </a>
        <button
          ref={cartIconRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={label}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cherry text-cream transition-colors hover:bg-cherry-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pool/50"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          {count > 0 && (
            <motion.span
              key={bump}
              aria-hidden
              initial={{ scale: 1.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 14 }}
              className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-ink bg-mustard px-1 text-xs font-bold text-ink"
            >
              {count}
            </motion.span>
          )}
        </button>
      </div>
    </header>
  );
}
