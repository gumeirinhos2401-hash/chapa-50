"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  addItem,
  emptyCart,
  itemCount,
  setQuantity,
  type AddItemInput,
  type CartState,
} from "@/lib/cart";

type Flight = { id: number; src: string; fromX: number; fromY: number; toX: number; toY: number };

type CartContextValue = {
  cart: CartState;
  count: number;
  bump: number;
  add: (input: AddItemInput, fly?: { src: string; el: HTMLElement | null }) => void;
  setQty: (key: string, quantity: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
};

const CartContext = createContext<CartContextValue | null>(null);
const FLIGHT_SIZE = 96;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>(emptyCart);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [flights, setFlights] = useState<Flight[]>([]);
  const cartIconRef = useRef<HTMLButtonElement | null>(null);
  const nextFlightId = useRef(0);

  const add = useCallback((input: AddItemInput, fly?: { src: string; el: HTMLElement | null }) => {
    setCart((current) => addItem(current, input));
    setBump((b) => b + 1);

    const target = cartIconRef.current;
    if (!fly?.el || !target || prefersReducedMotion()) return;
    const from = fly.el.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const flight: Flight = {
      id: nextFlightId.current++,
      src: fly.src,
      fromX: from.left + from.width / 2 - FLIGHT_SIZE / 2,
      fromY: from.top + from.height / 2 - FLIGHT_SIZE / 2,
      toX: to.left + to.width / 2 - FLIGHT_SIZE / 2,
      toY: to.top + to.height / 2 - FLIGHT_SIZE / 2,
    };
    setFlights((f) => [...f, flight]);
  }, []);

  const setQty = useCallback((key: string, quantity: number) => {
    setCart((current) => setQuantity(current, key, quantity));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({ cart, count: itemCount(cart), bump, add, setQty, open, setOpen, cartIconRef }),
    [cart, bump, add, setQty, open],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {flights.map((f) => (
          <motion.img
            key={f.id}
            src={f.src}
            alt=""
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border-4 border-mustard object-cover shadow-xl"
            style={{ width: FLIGHT_SIZE, height: FLIGHT_SIZE }}
            initial={{ x: f.fromX, y: f.fromY, scale: 1, opacity: 1 }}
            animate={{ x: f.toX, y: f.toY, scale: 0.25, opacity: 0.7 }}
            transition={{ duration: 0.7, ease: [0.5, 0, 0.75, 0] }}
            onAnimationComplete={() => setFlights((all) => all.filter((x) => x.id !== f.id))}
          />
        ))}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
