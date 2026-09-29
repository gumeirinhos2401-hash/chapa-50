export type Photo = { src: string; alt: string; author: string; sourceUrl: string };
export type ItemCategory = "hamburgueres" | "porcoes" | "sobremesas" | "bebidas";
export type TabValue = ItemCategory | "combos";
export type Badge = "mais-pedido" | "novo";

export type MenuItem = {
  id: string;
  category: ItemCategory;
  name: string;
  description: string;
  priceCents: number;
  photo: Photo;
  badge?: Badge;
  needsSoda?: boolean;
};

export type Combo = {
  id: string;
  name: string;
  description: string;
  burgerId: string;
  priceCents: number;
  badge?: Badge;
};

function unsplash(id: string, slug: string, alt: string, author: string): Photo {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`,
    alt,
    author,
    sourceUrl: `https://unsplash.com/photos/${slug}`,
  };
}

export const FRIES_ID = "batata-frita";
export const SODA_ID = "refrigerante";

export const HERO_PHOTO = unsplash(
  "1633424234673-c8cd0f4df77b",
  "a-hamburger-flying-through-the-air-with-a-lot-of-toppings-on-it-oljL3vFlV2g",
  "Hambúrguer com os ingredientes voando no ar",
  "Andy Chilton",
);

export const ITEMS: MenuItem[] = [
  {
    id: "classico",
    category: "hamburgueres",
    name: "Clássico da Chapa",
    description: "Blend de 160 g, queijo prato, alface, tomate e molho da casa no pão brioche.",
    priceCents: 2990,
    badge: "mais-pedido",
    photo: unsplash(
      "1568901346375-23c9450c58cd",
      "burger-with-lettuce-and-tomatoes-sc5sTPMrVfk",
      "Hambúrguer com alface e tomate",
      "amirali mirhashemian",
    ),
  },
  {
    id: "duplo-cheddar",
    category: "hamburgueres",
    name: "Duplo Cheddar",
    description: "Dois smash de 90 g, cheddar em dobro e cebola caramelizada.",
    priceCents: 3690,
    photo: unsplash(
      "1572802419224-296b0aeee0d9",
      "double-patty-cheeseburger-jh5XyK4Rr3Y",
      "Cheeseburger duplo",
      "amirali mirhashemian",
    ),
  },
  {
    id: "smash-50",
    category: "hamburgueres",
    name: "Smash 50",
    description: "Dois smash prensados na chapa, queijo americano, picles, cebola roxa e mostarda.",
    priceCents: 3290,
    badge: "novo",
    photo: unsplash(
      "1607013251379-e6eecfffe234",
      "double-cheeseburger-with-pickles-pu6b4yIlQF4",
      "Cheeseburger duplo com picles",
      "Eiliv Aceron",
    ),
  },
  {
    id: "chapa-salada",
    category: "hamburgueres",
    name: "Chapa Salada",
    description: "Blend de 160 g, queijo, alface, tomate e cebola roxa.",
    priceCents: 3090,
    photo: unsplash(
      "1550547660-d9450f859349",
      "burger-with-vegetable-on-brown-wooden-tray-I7A_pHLcQK8",
      "Hambúrguer com salada numa bandeja de madeira",
      "Mae Mu",
    ),
  },
  {
    id: "bacon-rock",
    category: "hamburgueres",
    name: "Bacon Rock",
    description: "Blend de 160 g, bacon crocante, cheddar e barbecue defumado.",
    priceCents: 3590,
    photo: unsplash(
      "1586190848861-99aa4a171e90",
      "burger-with-lettuce-and-tomato-E94j3rMcxlw",
      "Hambúrguer alto com alface e tomate",
      "David Foodphototasty",
    ),
  },
  {
    id: "jukebox",
    category: "hamburgueres",
    name: "Jukebox",
    description: "Blend de 180 g, queijo, cebola roxa, tomate e maionese verde da casa.",
    priceCents: 3790,
    photo: unsplash(
      "1571091718767-18b5b1457add",
      "cheeseburger-with-fresh-vegetables-_qxbJUr9RqI",
      "Cheeseburger com alface, tomate e cebola",
      "Ilya Mashkov",
    ),
  },
  {
    id: FRIES_ID,
    category: "porcoes",
    name: "Batata frita",
    description: "Porção média de batata crocante com sal e páprica.",
    priceCents: 1490,
    photo: unsplash(
      "1576107232684-1279f390859f",
      "fries-in-tray-U4vWk_DXOT4",
      "Batata frita numa bandeja",
      "henry perks",
    ),
  },
  {
    id: "brownie",
    category: "sobremesas",
    name: "Brownie com calda",
    description: "Brownie de chocolate meio amargo com calda quente.",
    priceCents: 1690,
    photo: unsplash(
      "1606313564200-e75d5e30476c",
      "chocolate-brownies-with-pouring-sauce-2UeBOL7UD34",
      "Calda de chocolate caindo sobre brownies",
      "Pushpak Dsilva",
    ),
  },
  {
    id: "petit-gateau",
    category: "sobremesas",
    name: "Petit gâteau",
    description: "Bolinho de chocolate com recheio cremoso e sorvete de creme.",
    priceCents: 2190,
    photo: unsplash(
      "1606884285898-277317a7bf12",
      "chocolate-cake-with-white-ice-cream-on-white-ceramic-plate-Wq0tcKzIa0M",
      "Bolo de chocolate com sorvete",
      "Junel Mujar",
    ),
  },
  {
    id: "sundae",
    category: "sobremesas",
    name: "Sundae da Chapa",
    description: "Sorvete de creme na taça com calda e farofa crocante.",
    priceCents: 1890,
    photo: unsplash(
      "1594488506255-a8bbfdeedbaf",
      "ice-cream-in-clear-glass-cup-NWTPcPE1nJI",
      "Sorvete numa taça de vidro",
      "Eiliv Aceron",
    ),
  },
  {
    id: "cookie-sorvete",
    category: "sobremesas",
    name: "Cookie com sorvete",
    description: "Cookie quentinho com uma bola de sorvete de creme por cima.",
    priceCents: 1790,
    photo: unsplash(
      "1551024506-0bccd828d307",
      "white-ice-cream-on-brown-cookie-idTwDKt2j2o",
      "Sorvete sobre um cookie",
      "Kobby Mendez",
    ),
  },
  {
    id: SODA_ID,
    category: "bebidas",
    name: "Refrigerante lata",
    description: "Lata de 350 ml gelada. Escolha o sabor.",
    priceCents: 700,
    needsSoda: true,
    photo: unsplash(
      "1629654613528-5d0a2e4166de",
      "clear-drinking-glass-with-ice-and-black-liquid-i597Mg_WSPw",
      "Copo de refrigerante com gelo",
      "Qasim Malick",
    ),
  },
  {
    id: "suco-laranja",
    category: "bebidas",
    name: "Suco de laranja",
    description: "Laranja espremida na hora, 400 ml.",
    priceCents: 990,
    photo: unsplash(
      "1600271886742-f049cd451bba",
      "orange-juice-in-clear-drinking-glass-kkrXVKK-jhg",
      "Copo de suco de laranja",
      "ABHISHEK HAJARE",
    ),
  },
  {
    id: "milkshake-chocolate",
    category: "bebidas",
    name: "Milkshake de chocolate",
    description: "Sorvete batido com chocolate e chantilly, 400 ml.",
    priceCents: 1990,
    photo: unsplash(
      "1572490122747-3968b75cc699",
      "chocolate-cookie-frappe-4FujjkcI40g",
      "Milkshake de chocolate com cookie",
      "Victor Rutka",
    ),
  },
  {
    id: "milkshake-morango",
    category: "bebidas",
    name: "Milkshake de morango",
    description: "Sorvete batido com morango e chantilly, 400 ml.",
    priceCents: 1990,
    photo: unsplash(
      "1579954115545-a95591f28bfc",
      "strawberry-shake-in-clear-drinking-glass-rwBJaJdesGg",
      "Milkshake de morango num copo de vidro",
      "Sebastian Coman Photography",
    ),
  },
];

export const COMBOS: Combo[] = [
  {
    id: "combo-classico",
    name: "Combo Clássico",
    description: "Clássico da Chapa + batata frita + refrigerante.",
    burgerId: "classico",
    priceCents: 4390,
    badge: "mais-pedido",
  },
  {
    id: "combo-duplo-cheddar",
    name: "Combo Duplo Cheddar",
    description: "Duplo Cheddar + batata frita + refrigerante.",
    burgerId: "duplo-cheddar",
    priceCents: 4990,
  },
  {
    id: "combo-smash-50",
    name: "Combo Smash 50",
    description: "Smash 50 + batata frita + refrigerante.",
    burgerId: "smash-50",
    priceCents: 4690,
    badge: "novo",
  },
  {
    id: "combo-bacon-rock",
    name: "Combo Bacon Rock",
    description: "Bacon Rock + batata frita + refrigerante.",
    burgerId: "bacon-rock",
    priceCents: 4990,
  },
];

export const TABS: { value: TabValue; label: string }[] = [
  { value: "hamburgueres", label: "Hambúrgueres" },
  { value: "combos", label: "Combos" },
  { value: "porcoes", label: "Porções" },
  { value: "sobremesas", label: "Sobremesas" },
  { value: "bebidas", label: "Bebidas" },
];

export function getItem(id: string): MenuItem {
  const item = ITEMS.find((i) => i.id === id);
  if (!item) throw new Error(`Item do cardápio não encontrado: ${id}`);
  return item;
}

export function itemsByCategory(category: ItemCategory): MenuItem[] {
  return ITEMS.filter((i) => i.category === category);
}

export function comboParts(combo: Combo): { burger: MenuItem; fries: MenuItem; soda: MenuItem } {
  return { burger: getItem(combo.burgerId), fries: getItem(FRIES_ID), soda: getItem(SODA_ID) };
}

export function comboSavingsCents(combo: Combo): number {
  const { burger, fries, soda } = comboParts(combo);
  return burger.priceCents + fries.priceCents + soda.priceCents - combo.priceCents;
}

export function allPhotos(): Photo[] {
  const seen = new Set<string>();
  const result: Photo[] = [];
  for (const photo of [HERO_PHOTO, ...ITEMS.map((i) => i.photo)]) {
    if (seen.has(photo.src)) continue;
    seen.add(photo.src);
    result.push(photo);
  }
  return result;
}
