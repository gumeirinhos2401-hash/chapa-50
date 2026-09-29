# Chapa 50 — Site da hamburgueria (design)

Data: 2026-09-28
Status: aguardando revisão

## 1. Objetivo

Site de uma página para a **Chapa 50**, hamburgueria fictícia em Vila Jaguara (São Paulo), feito como peça de portfólio.

O visitante vê o cardápio com fotos reais, monta um pedido no carrinho e envia o pedido pronto pelo WhatsApp.

### O que o Gustavo definiu

- Site de hamburgueria com hambúrgueres, combos (hambúrguer + batata frita + refrigerante) e sobremesas.
- Fotos reais.
- Projeto de portfólio, com hamburgueria fictícia. Fotos vêm de bancos gratuitos (Unsplash e Pexels).
- Ação principal: carrinho que monta o pedido e abre o WhatsApp.
- Estilo retrô/diner, com animações no site e animações chamativas nos lanches.
- Nome: Chapa 50.
- Cardápio médio.
- Stack: Next.js + TypeScript + Tailwind + shadcn/ui (abordagem B).

### Suposições (corrigir se estiverem erradas)

- Todo o texto do site em português do Brasil.
- Pensado primeiro para celular.
- Nomes, descrições e preços dos itens são inventados, com valores realistas para São Paulo.
- Endereço e número de WhatsApp são fictícios.

### Critérios de sucesso

1. O visitante encontra qualquer item do cardápio em no máximo dois toques.
2. O pedido enviado ao WhatsApp lista corretamente itens, quantidades, refrigerante escolhido em cada combo, total e dados do cliente.
3. O total exibido é sempre a soma exata dos itens (sem erro de arredondamento).
4. O site funciona bem em tela de 360 px de largura.
5. Com "reduzir movimento" ativado no sistema, o site não anima.
6. O site sobe na Vercel como export estático.

### Fora do escopo

- Pagamento online, login, banco de dados ou painel administrativo.
- Guardar o carrinho entre visitas. Recarregar a página zera o carrinho.
- Efeito de "hambúrguer explodido" em camadas (fica para uma versão futura).
- Integração com iFood ou outros apps de entrega.

## 2. Stack e estrutura

- **Framework:** Next.js (App Router) com TypeScript, `output: 'export'` para export estático.
- **Estilo:** Tailwind CSS.
- **Componentes:** shadcn/ui — `Tabs`, `Sheet`, `Button`, `Badge`, `Card`, e os campos de formulário necessários (`Input`, `Label`, `RadioGroup`).
- **Animações:** biblioteca `motion`.
- **Imagens:** `next/image` com `images.unoptimized: true` (exigido pelo export estático) e `remotePatterns` para `images.unsplash.com` e `images.pexels.com`.
- **Testes:** Vitest.

### Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `data/menu.ts` | Cardápio tipado: id, categoria, nome, descrição, preço em centavos, URL da foto, crédito da foto, selo opcional. |
| `lib/money.ts` | Formata centavos como `R$ 32,90`. |
| `lib/cart.ts` | Lógica pura do carrinho: adicionar, remover, alterar quantidade, calcular subtotal e total. Sem React. |
| `lib/whatsapp.ts` | Monta o texto do pedido e o link `wa.me`. Sem React. |
| `lib/config.ts` | Número de WhatsApp, endereço, horário e taxa de entrega. |
| `components/cart-provider.tsx` | Contexto React que guarda o estado do carrinho usando `lib/cart.ts`. |
| `components/neon-sign.tsx` | Letreiro "Chapa 50" com animação de neon. |
| `components/header.tsx` | Header fixo com letreiro e botão do carrinho com contador. |
| `components/hero.tsx` | Foto de destaque, frase, botão "Ver cardápio", faixa quadriculada. |
| `components/menu-tabs.tsx` | Abas de categoria e grade de produtos. |
| `components/product-card.tsx` | Card de hambúrguer, sobremesa ou bebida. |
| `components/combo-card.tsx` | Card de combo, com escolha de refrigerante e economia exibida. |
| `components/cart-sheet.tsx` | Gaveta do carrinho com itens, formulário e botão de envio. |
| `components/how-to-order.tsx` | Os três passos para pedir. |
| `components/footer.tsx` | Endereço, horário e créditos das fotos. |
| `app/page.tsx` | Junta as seções. |
| `app/layout.tsx` | Fontes, metadados e provider do carrinho. |

`lib/` não depende de React, para ser testado de forma isolada.

## 3. Cardápio

- 6 hambúrgueres
- 4 combos (hambúrguer + batata frita + refrigerante)
- 4 sobremesas
- Bebidas avulsas (refrigerantes, suco, milkshake)

Cada combo aponta para um hambúrguer do cardápio e mostra quanto o cliente economiza em relação a comprar os três itens separados. A economia é calculada a partir dos preços, nunca escrita à mão.

Refrigerantes do combo: Coca-Cola, Guaraná e Sprite. O mesmo combo com refrigerantes diferentes vira linhas diferentes no carrinho.

Cada foto tem crédito (autor e site) listado no rodapé.

## 4. Layout da página

Ordem das seções, pensada para celular:

1. **Header fixo** — letreiro neon e botão do carrinho com contador.
2. **Hero** — foto grande de um smash burger, frase curta, botão "Ver cardápio", faixa quadriculada preta e branca.
3. **Cardápio** — abas Hambúrgueres, Combos, Sobremesas e Bebidas. Grade de 1 coluna no celular, 2 no tablet e 3 no desktop.
4. **Destaque dos combos** — cards maiores com hambúrguer, batata e refrigerante e a economia.
5. **Como pedir** — escolha, revise, envie pelo WhatsApp.
6. **Rodapé** — endereço fictício em Vila Jaguara, horário e créditos das fotos.

## 5. Fluxo do carrinho

1. O cliente toca em "Adicionar". Nos combos, escolhe o refrigerante antes.
2. A miniatura do item voa até o ícone do carrinho e o contador pula.
3. O cliente abre o carrinho e ajusta quantidades com + e −. Com quantidade zero, o item sai do carrinho.
4. O cliente preenche:
   - nome (obrigatório);
   - entrega ou retirada (obrigatório);
   - endereço (obrigatório só para entrega);
   - forma de pagamento: Pix, cartão na entrega ou dinheiro (obrigatório);
   - troco para quanto (opcional, só para dinheiro).
5. O cliente toca em "Enviar pelo WhatsApp". O site abre `https://wa.me/<número>?text=<pedido>` em nova aba.

### Regras

- O botão de envio fica desativado com carrinho vazio ou campo obrigatório em branco.
- Todos os valores ficam em centavos (inteiros). A formatação para reais acontece só na exibição.
- Taxa de entrega fixa de R$ 7,00, definida em `lib/config.ts`, somada só quando o cliente escolhe entrega.
- O texto do pedido é codificado com `encodeURIComponent`.

### Formato da mensagem

```
Olá, Chapa 50! Quero fazer um pedido:

2x Clássico da Chapa — R$ 65,80
1x Combo Duplo Bacon (Guaraná) — R$ 44,90

Subtotal: R$ 110,70
Entrega: R$ 7,00
Total: R$ 117,70

Nome: Ana
Entrega em: Rua Exemplo, 123
Pagamento: Dinheiro (troco para R$ 150,00)
```

## 6. Identidade visual

### Cores

| Uso | Cor |
|---|---|
| Destaque e botões | Vermelho cereja `#D62828` |
| Fundo principal | Creme `#FFF3D6` |
| Texto e quadriculado | Preto `#1A1A1A` |
| Preços e selos | Amarelo mostarda `#F4B400` |
| Detalhe do neon | Azul-piscina `#4FC3C8` |

O contraste de texto segue WCAG AA. Onde o amarelo não tiver contraste suficiente sobre o creme, o preço usa fundo preto ou texto preto sobre selo amarelo.

### Fontes

- `Bungee` para o letreiro e os títulos.
- `Inter` para o texto corrido.

## 7. Animações

### Site

- Letreiro neon liga letra por letra ao carregar e pisca de leve de tempos em tempos.
- Seções entram deslizando conforme o scroll.
- Faixa quadriculada rola devagar no hero.
- Contador do carrinho pula a cada item adicionado.

### Lanches

- **Hover ou toque:** o lanche salta, gira um pouco e ganha sombra.
- **Combo montando:** ao entrar na tela, hambúrguer, batata e refrigerante aparecem um de cada vez e se juntam no card.
- **Adicionar:** a miniatura voa até o ícone do carrinho.
- **Selos:** "Mais pedido" e "Novo" balançam de leve.

### Reduzir movimento

Com `prefers-reduced-motion: reduce`, todas as animações são desligadas e o conteúdo aparece direto na posição final.

## 8. Tratamento de erros

- **Foto que não carrega:** o card mostra um fundo quadriculado com o nome do item, sem quebrar o layout.
- **Formulário incompleto:** o campo obrigatório vazio fica marcado e o botão de envio continua desativado.
- **WhatsApp bloqueado pelo navegador:** se a nova aba não abrir, o carrinho mostra o link para o cliente tocar manualmente.

## 9. Testes

Vitest, escritos antes do código (TDD), para:

- `lib/cart.ts`: adicionar item novo, somar quantidade de item repetido, separar combos com refrigerantes diferentes, remover com quantidade zero, subtotal, total com e sem taxa de entrega.
- `lib/whatsapp.ts`: texto com vários itens, combo com refrigerante, entrega e retirada, troco, codificação do link.
- `lib/money.ts`: formatação de valores, incluindo zero e valores acima de R$ 1.000,00.
- `data/menu.ts`: todo item tem preço positivo, foto e crédito; todo combo aponta para um hambúrguer existente; a economia de todo combo é maior que zero.

Verificação manual antes de entregar: build estático sem erro, página em 360 px, envio de um pedido de teste e navegação com "reduzir movimento" ativado.
