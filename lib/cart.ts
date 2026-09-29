export type Fulfillment = "entrega" | "retirada";

export const MAX_QTY = 99;

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  option?: string;
  unitPriceCents: number;
  quantity: number;
};

export type CartState = { lines: CartLine[] };

export type AddItemInput = {
  itemId: string;
  name: string;
  unitPriceCents: number;
  option?: string;
};

export const emptyCart: CartState = { lines: [] };

export function lineKey(itemId: string, option?: string): string {
  return option ? `${itemId}::${option}` : itemId;
}

export function addItem(state: CartState, input: AddItemInput): CartState {
  if (!Number.isInteger(input.unitPriceCents) || input.unitPriceCents <= 0) {
    throw new Error(`Preço inválido para ${input.itemId}: ${input.unitPriceCents}`);
  }
  const key = lineKey(input.itemId, input.option);
  if (state.lines.some((l) => l.key === key)) {
    return {
      lines: state.lines.map((l) =>
        l.key === key ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + 1) } : l,
      ),
    };
  }
  const line: CartLine = {
    key,
    itemId: input.itemId,
    name: input.name,
    unitPriceCents: input.unitPriceCents,
    quantity: 1,
  };
  if (input.option) line.option = input.option;
  return { lines: [...state.lines, line] };
}

export function setQuantity(state: CartState, key: string, quantity: number): CartState {
  if (!state.lines.some((l) => l.key === key)) return state;
  if (!Number.isFinite(quantity) || quantity < 1) {
    return { lines: state.lines.filter((l) => l.key !== key) };
  }
  const q = Math.min(MAX_QTY, Math.floor(quantity));
  return { lines: state.lines.map((l) => (l.key === key ? { ...l, quantity: q } : l)) };
}

export function itemCount(state: CartState): number {
  return state.lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function subtotalCents(state: CartState): number {
  return state.lines.reduce((sum, l) => sum + l.unitPriceCents * l.quantity, 0);
}

export function totalCents(
  state: CartState,
  fulfillment: Fulfillment | "",
  deliveryFeeCents: number,
): number {
  const subtotal = subtotalCents(state);
  if (subtotal === 0) return 0;
  return fulfillment === "entrega" ? subtotal + deliveryFeeCents : subtotal;
}
