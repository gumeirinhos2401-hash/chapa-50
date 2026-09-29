"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Send } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { subtotalCents, totalCents } from "@/lib/cart";
import {
  EMPTY_FORM,
  firstInvalidField,
  isValid,
  PAYMENT_LABELS,
  validateCheckout,
  type CheckoutField,
  type CheckoutForm,
  type Fulfillment,
  type Payment,
} from "@/lib/checkout";
import { STORE } from "@/lib/config";
import { formatBRL } from "@/lib/money";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const FIELD_IDS: Record<Exclude<CheckoutField, "cart">, string> = {
  name: "nome",
  fulfillment: "entrega",
  address: "endereco",
  payment: "pagamento-pix",
  changeFor: "troco",
};

const OPTION = "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border-2 border-ink bg-white px-3 text-sm has-[[data-state=checked]]:bg-ink has-[[data-state=checked]]:text-cream";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm font-bold text-cherry">
      {message}
    </p>
  );
}

export function CartSheet() {
  const { cart, setQty, open, setOpen } = useCart();
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<CheckoutField, boolean>>>({});
  const [popupBlocked, setPopupBlocked] = useState(false);

  const errors = useMemo(() => validateCheckout(form, cart, STORE.deliveryFeeCents), [form, cart]);
  const valid = isValid(errors);
  const showError = (field: CheckoutField) => (touched[field] ? errors[field] : undefined);
  const update = (patch: Partial<CheckoutForm>) => setForm((f) => ({ ...f, ...patch }));
  // Built from the current cart and form on every render, so the fallback link never goes stale.
  const orderUrl = valid
    ? buildWhatsAppUrl(STORE.whatsappNumber, buildOrderMessage(cart, form, STORE.deliveryFeeCents, STORE.name))
    : null;
  const touch = (field: CheckoutField) => setTouched((t) => ({ ...t, [field]: true }));

  function send() {
    const invalidField = firstInvalidField(errors);
    if (invalidField) {
      document.getElementById(FIELD_IDS[invalidField])?.focus();
      return;
    }
    if (!orderUrl) return;
    const win = window.open(orderUrl, "_blank");
    if (win) {
      win.opener = null;
      setPopupBlocked(false);
    } else {
      setPopupBlocked(true);
    }
  }

  const isDelivery = form.fulfillment === "entrega";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent aria-describedby="carrinho-descricao">
        <SheetHeader>
          <SheetTitle>Seu pedido</SheetTitle>
          <SheetDescription id="carrinho-descricao">Revise os itens e envie pelo WhatsApp.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.lines.length === 0 ? (
            <div className="flex flex-col items-start gap-4 py-8">
              <p className="text-lg">Seu carrinho está vazio.</p>
              <Button asChild onClick={() => setOpen(false)}>
                <a href="#cardapio">Ver cardápio</a>
              </Button>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-3">
                {cart.lines.map((line) => {
                  const label = `${line.name}${line.option ? ` (${line.option})` : ""}`;
                  return (
                    <li key={line.key} className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white p-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold leading-tight">{line.name}</p>
                        {line.option && <p className="text-sm text-ink/70">{line.option}</p>}
                        <p className="text-sm text-ink/70">{formatBRL(line.unitPriceCents)} cada</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="outline" aria-label={`Diminuir quantidade de ${label}`} onClick={() => setQty(line.key, line.quantity - 1)}>
                          <Minus className="h-4 w-4" aria-hidden />
                        </Button>
                        <span className="w-8 text-center font-bold" aria-live="polite">
                          {line.quantity}
                        </span>
                        <Button size="icon" variant="outline" aria-label={`Aumentar quantidade de ${label}`} onClick={() => setQty(line.key, line.quantity + 1)}>
                          <Plus className="h-4 w-4" aria-hidden />
                        </Button>
                      </div>
                      <p className="w-20 text-right font-bold">{formatBRL(line.unitPriceCents * line.quantity)}</p>
                    </li>
                  );
                })}
              </ul>

              <form
                className="mt-6 flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setTouched({ name: true, fulfillment: true, address: true, payment: true, changeFor: true });
                  send();
                }}
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update({ name: e.target.value })}
                    onBlur={() => touch("name")}
                    aria-invalid={Boolean(showError("name"))}
                    aria-describedby="erro-nome"
                  />
                  <FieldError id="erro-nome" message={showError("name")} />
                </div>

                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-sm font-bold">Como quer receber?</legend>
                  <RadioGroup
                    value={form.fulfillment}
                    onValueChange={(v) => {
                      update({ fulfillment: v as Fulfillment });
                      touch("fulfillment");
                    }}
                  >
                    <Label htmlFor="entrega" className={OPTION}>
                      <RadioGroupItem id="entrega" value="entrega" />
                      Entrega (+ {formatBRL(STORE.deliveryFeeCents)})
                    </Label>
                    <Label htmlFor="retirada" className={OPTION}>
                      <RadioGroupItem id="retirada" value="retirada" />
                      Retirada no balcão
                    </Label>
                  </RadioGroup>
                  <FieldError id="erro-recebimento" message={showError("fulfillment")} />
                </fieldset>

                {isDelivery && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="endereco">Endereço de entrega</Label>
                    <Input
                      id="endereco"
                      autoComplete="street-address"
                      placeholder="Rua, número, complemento"
                      value={form.address}
                      onChange={(e) => update({ address: e.target.value })}
                      onBlur={() => touch("address")}
                      aria-invalid={Boolean(showError("address"))}
                      aria-describedby="erro-endereco"
                    />
                    <FieldError id="erro-endereco" message={showError("address")} />
                  </div>
                )}

                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-sm font-bold">Pagamento</legend>
                  <RadioGroup
                    value={form.payment}
                    onValueChange={(v) => {
                      update({ payment: v as Payment });
                      touch("payment");
                    }}
                  >
                    {(Object.keys(PAYMENT_LABELS) as Payment[]).map((p) => (
                      <Label key={p} htmlFor={`pagamento-${p}`} className={OPTION}>
                        <RadioGroupItem id={`pagamento-${p}`} value={p} />
                        {PAYMENT_LABELS[p]}
                      </Label>
                    ))}
                  </RadioGroup>
                  <FieldError id="erro-pagamento" message={showError("payment")} />
                </fieldset>

                {form.payment === "dinheiro" && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="troco">Troco para quanto? (opcional)</Label>
                    <Input
                      id="troco"
                      inputMode="decimal"
                      placeholder="Ex.: 100,00"
                      value={form.changeFor}
                      onChange={(e) => update({ changeFor: e.target.value })}
                      onBlur={() => touch("changeFor")}
                      aria-invalid={Boolean(showError("changeFor"))}
                      aria-describedby="erro-troco"
                    />
                    <FieldError id="erro-troco" message={showError("changeFor")} />
                  </div>
                )}

                <dl className="flex flex-col gap-1 rounded-2xl border-2 border-ink bg-white p-4 text-sm">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{formatBRL(subtotalCents(cart))}</dd>
                  </div>
                  {isDelivery && (
                    <div className="flex justify-between">
                      <dt>Entrega</dt>
                      <dd>{formatBRL(STORE.deliveryFeeCents)}</dd>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between border-t-2 border-ink pt-2 text-base font-bold">
                    <dt>Total</dt>
                    <dd>{formatBRL(totalCents(cart, form.fulfillment, STORE.deliveryFeeCents))}</dd>
                  </div>
                </dl>

                <Button type="submit" size="lg" aria-disabled={!valid} className="aria-disabled:opacity-50">
                  <Send className="h-4 w-4" aria-hidden />
                  Enviar pelo WhatsApp
                </Button>
                {!valid && <p className="text-sm text-ink/70">Preencha os campos obrigatórios para enviar.</p>}
                {popupBlocked && orderUrl && (
                  <p role="alert" className="text-sm">
                    O navegador bloqueou a nova aba.{" "}
                    <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-cherry underline">
                      Toque aqui para abrir o WhatsApp
                    </a>
                    .
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
