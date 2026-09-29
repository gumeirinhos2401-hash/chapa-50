"use client";

import { ComboCard } from "@/components/combo-card";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COMBOS, itemsByCategory, TABS } from "@/data/menu";

const GRID = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

export function MenuTabs() {
  return (
    <section id="cardapio" className="scroll-mt-20 bg-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-display text-4xl text-cherry sm:text-5xl">Cardápio</h2>
          <p className="mt-2 max-w-xl text-ink/80">Tudo feito na hora, na chapa bem quente. Escolha uma categoria.</p>
        </Reveal>
        <Tabs defaultValue="hamburgueres" className="mt-8">
          <TabsList aria-label="Categorias do cardápio">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className={GRID}>
                {tab.value === "combos"
                  ? COMBOS.map((combo) => <ComboCard key={combo.id} combo={combo} />)
                  : itemsByCategory(tab.value).map((item) => <ProductCard key={item.id} item={item} />)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
