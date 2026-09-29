import { describe, expect, it } from "vitest";
import { formatBRL, parseReais } from "@/lib/money";

describe("formatBRL", () => {
  it("formats cents as reais with comma decimals", () => {
    expect(formatBRL(3290)).toBe("R$ 32,90");
  });

  it("formats zero", () => {
    expect(formatBRL(0)).toBe("R$ 0,00");
  });

  it("pads single-digit cents", () => {
    expect(formatBRL(5)).toBe("R$ 0,05");
  });

  it("uses dots as thousands separators", () => {
    expect(formatBRL(123456)).toBe("R$ 1.234,56");
    expect(formatBRL(100000000)).toBe("R$ 1.000.000,00");
  });

  it("uses a normal space, not a non-breaking space", () => {
    expect(formatBRL(700).charCodeAt(2)).toBe(32);
  });

  it("rejects non-integer cents", () => {
    expect(() => formatBRL(32.9)).toThrow();
  });
});

describe("parseReais", () => {
  it("parses whole reais", () => {
    expect(parseReais("150")).toBe(15000);
  });

  it("parses comma decimals", () => {
    expect(parseReais("150,5")).toBe(15050);
    expect(parseReais("36,90")).toBe(3690);
  });

  it("accepts the R$ prefix, spaces and thousands dots", () => {
    expect(parseReais("R$ 1.200,50")).toBe(120050);
    expect(parseReais(" 1.200 ")).toBe(120000);
  });

  it("returns null for empty or invalid text", () => {
    expect(parseReais("")).toBeNull();
    expect(parseReais("   ")).toBeNull();
    expect(parseReais("cinquenta")).toBeNull();
    expect(parseReais("50 reais")).toBeNull();
    expect(parseReais("100.5")).toBeNull();
    expect(parseReais("12,345")).toBeNull();
    expect(parseReais("-5")).toBeNull();
  });
});
