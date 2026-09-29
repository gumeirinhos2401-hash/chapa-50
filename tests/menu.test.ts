import { describe, expect, it } from "vitest";
import {
  allPhotos,
  COMBOS,
  comboParts,
  comboSavingsCents,
  getItem,
  HERO_PHOTO,
  itemsByCategory,
  ITEMS,
  TABS,
} from "@/data/menu";
import { STORE } from "@/lib/config";

describe("menu data", () => {
  it("has the agreed menu size", () => {
    expect(itemsByCategory("hamburgueres")).toHaveLength(6);
    expect(COMBOS).toHaveLength(4);
    expect(itemsByCategory("sobremesas")).toHaveLength(4);
    expect(itemsByCategory("bebidas").length).toBeGreaterThanOrEqual(3);
    expect(itemsByCategory("porcoes").length).toBeGreaterThanOrEqual(1);
  });

  it("uses positive integer prices everywhere", () => {
    for (const p of [...ITEMS, ...COMBOS]) {
      expect(Number.isInteger(p.priceCents), p.id).toBe(true);
      expect(p.priceCents, p.id).toBeGreaterThan(0);
    }
  });

  it("has unique ids across items and combos", () => {
    const ids = [...ITEMS, ...COMBOS].map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("credits every photo and only uses free Unsplash images", () => {
    for (const photo of [HERO_PHOTO, ...ITEMS.map((i) => i.photo)]) {
      expect(photo.src.startsWith("https://images.unsplash.com/photo-"), photo.src).toBe(true);
      expect(photo.author.trim(), photo.src).not.toBe("");
      expect(photo.alt.trim(), photo.src).not.toBe("");
      expect(photo.sourceUrl.startsWith("https://unsplash.com/photos/"), photo.src).toBe(true);
    }
  });

  it("points every combo at an existing burger", () => {
    for (const combo of COMBOS) {
      expect(getItem(combo.burgerId).category, combo.id).toBe("hamburgueres");
    }
  });

  it("gives every combo a positive saving computed from real prices", () => {
    for (const combo of COMBOS) {
      const { burger, fries, soda } = comboParts(combo);
      const expected = burger.priceCents + fries.priceCents + soda.priceCents - combo.priceCents;
      expect(comboSavingsCents(combo), combo.id).toBe(expected);
      expect(comboSavingsCents(combo), combo.id).toBeGreaterThan(0);
    }
  });

  it("throws on an unknown item id", () => {
    expect(() => getItem("nao-existe")).toThrow();
  });

  it("lists each photo once for credits", () => {
    const srcs = allPhotos().map((p) => p.src);
    expect(new Set(srcs).size).toBe(srcs.length);
    expect(srcs).toContain(HERO_PHOTO.src);
  });

  it("has a tab for every category plus combos", () => {
    expect(TABS.map((t) => t.value)).toEqual([
      "hamburgueres",
      "combos",
      "porcoes",
      "sobremesas",
      "bebidas",
    ]);
  });
});

describe("store config", () => {
  it("uses a R$ 7,00 delivery fee", () => {
    expect(STORE.deliveryFeeCents).toBe(700);
  });

  it("stores the WhatsApp number as digits only", () => {
    expect(STORE.whatsappNumber).toMatch(/^\d{12,13}$/);
  });
});
