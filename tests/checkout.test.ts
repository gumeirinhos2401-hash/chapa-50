import { describe, expect, it } from "vitest";
import { addItem, emptyCart } from "@/lib/cart";
import { firstInvalidField, isValid, validateCheckout, type CheckoutForm } from "@/lib/checkout";

const cart = addItem(emptyCart, { itemId: "classico", name: "Clássico da Chapa", unitPriceCents: 2990 });
const pickup: CheckoutForm = { name: "Ana", fulfillment: "retirada", address: "", payment: "pix", changeFor: "" };
const delivery: CheckoutForm = { ...pickup, fulfillment: "entrega", address: "Rua Exemplo, 123" };

describe("validateCheckout", () => {
  it("accepts a complete pickup order", () => {
    expect(validateCheckout(pickup, cart, 700)).toEqual({});
  });

  it("accepts a complete delivery order", () => {
    expect(validateCheckout(delivery, cart, 700)).toEqual({});
  });

  it("flags an empty cart", () => {
    expect(validateCheckout(pickup, emptyCart, 700).cart).toBe("Seu carrinho está vazio.");
  });

  it("requires a name that is not only spaces", () => {
    expect(validateCheckout({ ...pickup, name: "   " }, cart, 700).name).toBe("Informe seu nome.");
  });

  it("requires delivery or pickup", () => {
    expect(validateCheckout({ ...pickup, fulfillment: "" }, cart, 700).fulfillment).toBe(
      "Escolha entrega ou retirada.",
    );
  });

  it("requires an address for delivery, ignoring whitespace", () => {
    expect(validateCheckout({ ...delivery, address: "  \n " }, cart, 700).address).toBe(
      "Informe o endereço de entrega.",
    );
  });

  it("does not require an address for pickup, even if one was typed before switching", () => {
    expect(validateCheckout({ ...delivery, fulfillment: "retirada" }, cart, 700)).toEqual({});
  });

  it("requires an address again after switching back to delivery with it cleared", () => {
    expect(validateCheckout({ ...pickup, fulfillment: "entrega" }, cart, 700).address).toBeDefined();
  });

  it("requires a payment method", () => {
    expect(validateCheckout({ ...pickup, payment: "" }, cart, 700).payment).toBe(
      "Escolha a forma de pagamento.",
    );
  });

  it("accepts cash without change", () => {
    expect(validateCheckout({ ...pickup, payment: "dinheiro" }, cart, 700)).toEqual({});
  });

  it("rejects change that cannot be read as reais", () => {
    for (const changeFor of ["cinquenta", "50 reais", "100.5"]) {
      expect(validateCheckout({ ...pickup, payment: "dinheiro", changeFor }, cart, 700).changeFor).toBe(
        "Valor de troco inválido.",
      );
    }
  });

  it("rejects change below the order total, including the delivery fee", () => {
    const form = { ...delivery, payment: "dinheiro" as const, changeFor: "30" };
    expect(validateCheckout(form, cart, 700).changeFor).toBe(
      "O troco precisa ser maior ou igual ao total.",
    );
    expect(validateCheckout({ ...form, changeFor: "36,90" }, cart, 700)).toEqual({});
  });

  it("ignores the change field when payment is not cash", () => {
    expect(validateCheckout({ ...pickup, changeFor: "abc" }, cart, 700)).toEqual({});
  });
});

describe("firstInvalidField", () => {
  it("returns the first form field with an error, in form order", () => {
    expect(firstInvalidField({ payment: "x", name: "y" })).toBe("name");
    expect(firstInvalidField({ changeFor: "x", address: "y" })).toBe("address");
  });

  it("ignores the cart-only error and returns undefined when no field is wrong", () => {
    expect(firstInvalidField({ cart: "Seu carrinho está vazio." })).toBeUndefined();
    expect(firstInvalidField({})).toBeUndefined();
  });
});

describe("isValid", () => {
  it("is true only with no errors", () => {
    expect(isValid({})).toBe(true);
    expect(isValid({ name: "Informe seu nome." })).toBe(false);
  });
});
