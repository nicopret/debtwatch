export function formatCurrencyCompact(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercentage(value: number, fractionDigits = 1): string {
  return new Intl.NumberFormat("en-GB", {
    style: "percent",
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatMonthYear(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(date);
}
