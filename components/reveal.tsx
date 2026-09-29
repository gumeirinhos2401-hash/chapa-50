"use client";

import { motion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Above-the-fold content: render in place, with no entrance animation. */
  immediate?: boolean;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={immediate ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
