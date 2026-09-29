export function formatBRL(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error(`formatBRL espera centavos inteiros, recebeu ${cents}`);
  }
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const reais = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const centavos = (abs % 100).toString().padStart(2, "0");
  return `${sign}R$ ${reais},${centavos}`;
}

const WITH_THOUSANDS = /^\d{1,3}(\.\d{3})+(,\d{1,2})?$/;
const PLAIN = /^\d+(,\d{1,2})?$/;

export function parseReais(input: string): number | null {
  const cleaned = input.replace(/R\$/gi, "").replace(/\s/g, "");
  if (cleaned === "") return null;
  if (!WITH_THOUSANDS.test(cleaned) && !PLAIN.test(cleaned)) return null;
  const [intPart, decPart = ""] = cleaned.replace(/\./g, "").split(",");
  return Number(intPart) * 100 + Number(decPart.padEnd(2, "0"));
}
