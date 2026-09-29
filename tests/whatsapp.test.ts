import { describe, expect, it } from "vitest";
import { addItem, emptyCart } from "@/lib/cart";
import type { CheckoutForm } from "@/lib/checkout";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const classico = { itemId: "classico", name: "Clássico da Chapa", unitPriceCents: 3290 };
const cart = addItem(addItem(addItem(emptyCart, classico), classico), {
  itemId: "combo-duplo-bacon",
  name: "Combo Duplo Bacon",
  unitPriceCents: 4490,
  option: "Guaraná",
});

const delivery: CheckoutForm = {
  name: "Ana",
  fulfillment: "entrega",
  address: "Rua Exemplo, 123",
  payment: "dinheiro",
  changeFor: "150",
};

describe("buildOrderMessage", () => {
  it("builds the delivery message from the spec example", () => {
    expect(buildOrderMessage(cart, delivery, 700, "Chapa 50")).toBe(
      [
        "Olá, Chapa 50! Quero fazer um pedido:",
        "",
        "2x Clássico da Chapa — R$ 65,80",
        "1x Combo Duplo Bacon (Guaraná) — R$ 44,90",
        "",
        "Subtotal: R$ 110,70",
        "Entrega: R$ 7,00",
        "Total: R$ 117,70",
        "",
        "Nome: Ana",
        "Entrega em: Rua Exemplo, 123",
        "Pagamento: Dinheiro (troco para R$ 150,00)",
      ].join("\n"),
    );
  });

  it("leaves out the fee and the address for pickup, even if an address was typed", () => {
    const message = buildOrderMessage(
      cart,
      { ...delivery, fulfillment: "retirada", payment: "pix", changeFor: "" },
      700,
      "Chapa 50",
    );
    expect(message).toContain("Retirada no balcão");
    expect(message).toContain("Total: R$ 110,70");
    expect(message).toContain("Pagamento: Pix");
    expect(message).not.toContain("Entrega");
    expect(message).not.toContain("Rua Exemplo");
  });

  it("says only Dinheiro when no change is needed", () => {
    const message = buildOrderMessage(cart, { ...delivery, changeFor: "" }, 700, "Chapa 50");
    expect(message.endsWith("Pagamento: Dinheiro")).toBe(true);
  });

  it("collapses line breaks and extra spaces in name and address", () => {
    const message = buildOrderMessage(
      cart,
      { ...delivery, name: "  Ana\n  Maria ", address: "Rua Exemplo,\n123  apto 4" },
      700,
      "Chapa 50",
    );
    expect(message).toContain("Nome: Ana Maria\n");
    expect(message).toContain("Entrega em: Rua Exemplo, 123 apto 4\n");
  });
});

describe("buildWhatsAppUrl", () => {
  it("encodes special characters so they survive the link", () => {
    const message = "Olá & tchau #1 ?x=1\n🍔";
    const url = buildWhatsAppUrl("5511900000050", message);
    expect(url.startsWith("https://wa.me/5511900000050?text=")).toBe(true);
    const text = url.slice("https://wa.me/5511900000050?text=".length);
    expect(text).not.toMatch(/[#&?\s]/);
    expect(decodeURIComponent(text)).toBe(message);
  });

  it("keeps only digits in the phone number", () => {
    expect(buildWhatsAppUrl("+55 (11) 90000-0050", "oi")).toBe("https://wa.me/5511900000050?text=oi");
  });
});
