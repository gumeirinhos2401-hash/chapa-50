import { Button } from "@/components/ui/button";
import { NeonSign } from "@/components/neon-sign";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { HERO_PHOTO } from "@/data/menu";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <Reveal immediate>
          <p className="font-display text-sm tracking-widest text-mustard">SMASH NA CHAPA · VILA JAGUARA</p>
          <h1 className="mt-4">
            <NeonSign size="lg" />
          </h1>
          <p className="mt-6 max-w-md text-lg text-cream/90">
            Hambúrguer prensado na chapa quente, batata crocante e milkshake de verdade. Monte seu pedido e
            mande direto no WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#cardapio">Ver cardápio</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-ink">
              <a href="#combos">Ver combos</a>
            </Button>
          </div>
        </Reveal>
        <Reveal immediate>
          <div className="float relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border-8 border-mustard shadow-[0_0_60px_rgba(214,40,40,0.6)]">
            <SafeImage photo={HERO_PHOTO} label="Chapa 50" priority sizes="(min-width: 768px) 28rem, 90vw" />
          </div>
        </Reveal>
      </div>
      <div className="checker checker-scroll h-8" aria-hidden />
    </section>
  );
}
