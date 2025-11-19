export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export function formatCurrency(value: number | string) {
  const numeric = typeof value === "string" ? Number(value) : value;
  return currencyFormatter.format(numeric);
}
