export function soles(value: number | string | null | undefined): string {
  const n = typeof value === "string" ? Number(value) : (value ?? 0);
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);
}

export function priceRange(prices: number[]): string {
  if (prices.length === 0) return soles(0);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? soles(min) : `${soles(min)} – ${soles(max)}`;
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  en_preparacion: "En preparación",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export const ORDER_STATUSES = [
  "pendiente",
  "pagado",
  "en_preparacion",
  "enviado",
  "entregado",
  "cancelado",
] as const;
