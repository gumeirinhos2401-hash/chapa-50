import { ComboCard } from "@/components/combo-card";
import { Reveal } from "@/components/reveal";
import { COMBOS } from "@/data/menu";

export function ComboShowcase() {
  return (
    <section id="combos" className="scroll-mt-20 bg-cherry py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-display text-4xl text-cream sm:text-5xl">Combos da Chapa</h2>
          <p className="mt-2 max-w-xl text-cream/90">Hambúrguer, batata frita e refri. Mais barato que pedir separado.</p>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.id} combo={combo} large />
          ))}
        </div>
      </div>
    </section>
  );
}
