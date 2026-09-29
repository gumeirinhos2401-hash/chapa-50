export const STORE = {
  name: "Chapa 50",
  // Número fictício: o site é um projeto de portfólio.
  whatsappNumber: "5511900000050",
  address: "Rua dos Lanches, 50 — Vila Jaguara, São Paulo",
  hours: "Terça a domingo, das 18h às 23h30",
  deliveryFeeCents: 700,
} as const;

export const SODAS = ["Coca-Cola", "Guaraná", "Sprite"] as const;
export type Soda = (typeof SODAS)[number];
