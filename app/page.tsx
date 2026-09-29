import { CartSheet } from "@/components/cart-sheet";
import { ComboShowcase } from "@/components/combo-showcase";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowToOrder } from "@/components/how-to-order";
import { MenuTabs } from "@/components/menu-tabs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuTabs />
        <ComboShowcase />
        <HowToOrder />
      </main>
      <Footer />
      <CartSheet />
    </>
  );
}
