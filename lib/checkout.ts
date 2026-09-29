import { totalCents, type CartState, type Fulfillment } from "@/lib/cart";
import { parseReais } from "@/lib/money";

export type { Fulfillment };
export type Payment = "pix" | "cartao" | "dinheiro";

export type CheckoutForm = {
  name: string;
  fulfillment: Fulfillment | "";
  address: string;
  payment: Payment | "";
  changeFor: string;
};

export type CheckoutField = "cart" | "name" | "fulfillment" | "address" | "payment" | "changeFor";
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const EMPTY_FORM: CheckoutForm = {
  name: "",
  fulfillment: "",
  address: "",
  payment: "",
  changeFor: "",
};

export const PAYMENT_LABELS: Record<Payment, string> = {
  pix: "Pix",
  cartao: "Cartão",
  dinheiro: "Dinheiro",
};

export function validateCheckout(
  form: CheckoutForm,
  cart: CartState,
  deliveryFeeCents: number,
): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (cart.lines.length === 0) errors.cart = "Seu carrinho está vazio.";
  if (form.name.trim() === "") errors.name = "Informe seu nome.";
  if (form.fulfillment === "") errors.fulfillment = "Escolha entrega ou retirada.";
  if (form.fulfillment === "entrega" && form.address.trim() === "") {
    errors.address = "Informe o endereço de entrega.";
  }
  if (form.payment === "") errors.payment = "Escolha a forma de pagamento.";
  if (form.payment === "dinheiro" && form.changeFor.trim() !== "") {
    const change = parseReais(form.changeFor);
    if (change === null) {
      errors.changeFor = "Valor de troco inválido.";
    } else if (change < totalCents(cart, form.fulfillment, deliveryFeeCents)) {
      errors.changeFor = "O troco precisa ser maior ou igual ao total.";
    }
  }
  return errors;
}

export function isValid(errors: CheckoutErrors): boolean {
  return Object.keys(errors).length === 0;
}
