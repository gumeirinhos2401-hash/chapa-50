import { describe, expect, it } from "vitest";
import {
  addItem,
  emptyCart,
  itemCount,
  lineKey,
  MAX_QTY,
  setQuantity,
  subtotalCents,
  totalCents,
} from "@/lib/cart";

const burger = { itemId: "classico", name: "Clássico da Chapa", unitPriceCents: 2990 };
const combo = (option: string) => ({
  itemId: "combo-classico",
  name: "Combo Clássico",
  unitPriceCents: 4390,
  option,
});

describe("lineKey", () => {
  it("uses the item id alone when there is no option", () => {
    expect(lineKey("classico")).toBe("classico");
  });

  it("joins item id and option", () => {
    expect(lineKey("combo-classico", "Guaraná")).toBe("combo-classico::Guaraná");
  });
});

describe("addItem", () => {
  it("adds a new line with quantity 1", () => {
    const cart = addItem(emptyCart, burger);
    expect(cart.lines).toEqual([
      { key: "classico", itemId: "classico", name: "Clássico da Chapa", unitPriceCents: 2990, quantity: 1 },
    ]);
  });

  it("increments the quantity when the same item is added again", () => {
    const cart = addItem(addItem(emptyCart, burger), burger);
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0].quantity).toBe(2);
  });

  it("keeps the same combo with different sodas on separate lines", () => {
    const cart = addItem(addItem(emptyCart, combo("Coca-Cola")), combo("Guaraná"));
    expect(cart.lines.map((l) => l.key)).toEqual([
      "combo-classico::Coca-Cola",
      "combo-classico::Guaraná",
    ]);
    expect(cart.lines[1].option).toBe("Guaraná");
  });

  it("does not change the previous state", () => {
    const first = addItem(emptyCart, burger);
    addItem(first, burger);
    expect(first.lines[0].quantity).toBe(1);
    expect(emptyCart.lines).toHaveLength(0);
  });

  it("stops at MAX_QTY", () => {
    let cart = emptyCart;
    for (let i = 0; i < 120; i++) cart = addItem(cart, burger);
    expect(cart.lines[0].quantity).toBe(MAX_QTY);
  });

  it("rejects non-integer or non-positive prices", () => {
    expect(() => addItem(emptyCart, { ...burger, unitPriceCents: 29.9 })).toThrow();
    expect(() => addItem(emptyCart, { ...burger, unitPriceCents: 0 })).toThrow();
  });
});

describe("setQuantity", () => {
  const cart = addItem(addItem(emptyCart, burger), combo("Sprite"));

  it("changes the quantity of an existing line", () => {
    expect(setQuantity(cart, "classico", 3).lines[0].quantity).toBe(3);
  });

  it("removes the line when the quantity is zero or negative", () => {
    expect(setQuantity(cart, "classico", 0).lines.map((l) => l.key)).toEqual(["combo-classico::Sprite"]);
    expect(setQuantity(cart, "classico", -2).lines).toHaveLength(1);
  });

  it("removes the line when the quantity is not a finite number", () => {
    expect(setQuantity(cart, "classico", Number.NaN).lines).toHaveLength(1);
  });

  it("floors fractional quantities", () => {
    expect(setQuantity(cart, "classico", 2.7).lines[0].quantity).toBe(2);
  });

  it("caps at MAX_QTY", () => {
    expect(setQuantity(cart, "classico", 500).lines[0].quantity).toBe(MAX_QTY);
  });

  it("returns the same state for an unknown key", () => {
    expect(setQuantity(cart, "nao-existe", 2)).toBe(cart);
  });
});

describe("totals", () => {
  const cart = addItem(addItem(addItem(emptyCart, burger), burger), combo("Guaraná"));

  it("counts every unit", () => {
    expect(itemCount(cart)).toBe(3);
    expect(itemCount(emptyCart)).toBe(0);
  });

  it("sums the subtotal in cents", () => {
    expect(subtotalCents(cart)).toBe(2 * 2990 + 4390);
  });

  it("adds the delivery fee only for delivery", () => {
    expect(totalCents(cart, "entrega", 700)).toBe(2 * 2990 + 4390 + 700);
    expect(totalCents(cart, "retirada", 700)).toBe(2 * 2990 + 4390);
    expect(totalCents(cart, "", 700)).toBe(2 * 2990 + 4390);
  });

  it("charges no delivery fee on an empty cart", () => {
    expect(totalCents(emptyCart, "entrega", 700)).toBe(0);
  });
});
