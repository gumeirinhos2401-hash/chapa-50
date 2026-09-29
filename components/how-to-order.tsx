import { ClipboardCheck, MessageCircle, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/reveal";

const STEPS = [
  { icon: UtensilsCrossed, title: "Escolha", text: "Monte seu pedido no cardápio. Nos combos, escolha o refri." },
  { icon: ClipboardCheck, title: "Revise", text: "Abra o carrinho, ajuste quantidades e diga se é entrega ou retirada." },
  { icon: MessageCircle, title: "Envie", text: "Toque em enviar e o pedido chega pronto no nosso WhatsApp." },
];

export function HowToOrder() {
  return (
    <section id="como-pedir" className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-display text-4xl text-cherry sm:text-5xl">Como pedir</h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.12} className="h-full rounded-3xl border-4 border-ink bg-white p-6 shadow-[6px_6px_0_var(--color-ink)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mustard font-display text-xl text-ink">
                    {i + 1}
                  </span>
                  <step.icon className="h-6 w-6 text-cherry" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-ink/80">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
