export function formatarPreco(preco: number | string): string {
  const valor = typeof preco === "string" ? Number(preco) : preco;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

export function ehRecemChegado(criadoEm: Date | string): boolean {
  const data = typeof criadoEm === "string" ? new Date(criadoEm) : criadoEm;
  return Date.now() - data.getTime() <= SETE_DIAS_MS;
}
