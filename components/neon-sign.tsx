"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const WORD = "CHAPA";
const STEP = 0.12;

export function NeonSign({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <span
      role="img"
      aria-label="Chapa 50"
      className={cn(
        "inline-flex items-baseline gap-2 font-display leading-none",
        size === "lg" ? "text-5xl sm:text-7xl" : "text-2xl",
      )}
    >
      <span className="neon-text" aria-hidden>
        {WORD.split("").map((letter, i) => (
          <motion.span
            key={i}
            data-reveal
            className="inline-block"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + i * STEP, duration: 0.05 }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span className="neon-flicker" aria-hidden>
        <motion.span
          data-reveal
          className="neon-text-pool inline-block"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 + WORD.length * STEP, duration: 0.05 }}
        >
          50
        </motion.span>
      </span>
    </span>
  );
}
