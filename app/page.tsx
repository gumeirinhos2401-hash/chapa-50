import { CartSheet } from "@/components/cart-sheet";
import { ComboShowcase } from "@/components/combo-showcase";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MenuTabs } from "@/components/menu-tabs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuTabs />
        <ComboShowcase />
      </main>
      <CartSheet />
    </>
  );
}
