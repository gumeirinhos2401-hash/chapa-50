import { subtotalCents, totalCents, type CartState } from "@/lib/cart";
import { PAYMENT_LABELS, type CheckoutForm } from "@/lib/checkout";
import { formatBRL, parseReais } from "@/lib/money";

function oneLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function buildOrderMessage(
  cart: CartState,
  form: CheckoutForm,
  deliveryFeeCents: number,
  storeName: string,
): string {
  const isDelivery = form.fulfillment === "entrega";
  const lines: string[] = [`Olá, ${storeName}! Quero fazer um pedido:`, ""];

  for (const line of cart.lines) {
    const option = line.option ? ` (${line.option})` : "";
    lines.push(`${line.quantity}x ${line.name}${option} — ${formatBRL(line.unitPriceCents * line.quantity)}`);
  }

  lines.push("", `Subtotal: ${formatBRL(subtotalCents(cart))}`);
  if (isDelivery) lines.push(`Entrega: ${formatBRL(deliveryFeeCents)}`);
  lines.push(`Total: ${formatBRL(totalCents(cart, form.fulfillment, deliveryFeeCents))}`, "");

  lines.push(`Nome: ${oneLine(form.name)}`);
  lines.push(isDelivery ? `Entrega em: ${oneLine(form.address)}` : "Retirada no balcão");

  if (form.payment === "dinheiro") {
    const change = parseReais(form.changeFor);
    lines.push(change === null ? "Pagamento: Dinheiro" : `Pagamento: Dinheiro (troco para ${formatBRL(change)})`);
  } else if (form.payment !== "") {
    lines.push(`Pagamento: ${PAYMENT_LABELS[form.payment]}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
