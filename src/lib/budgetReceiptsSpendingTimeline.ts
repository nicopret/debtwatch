export interface BudgetReceiptsSpendingPointSource {
  yearLabel: string;
  receipts: number;
  spending: number;
}

export interface BudgetReceiptsSpendingTimelineSource {
  dateValue?: string;
  timestamp: string;
  source: string;
  items: BudgetReceiptsSpendingPointSource[];
}

export interface BudgetReceiptsSpendingTimelinePoint {
  yearLabel: string;
  receipts: number;
  spending: number;
  gap: number;
  receiptsFormatted: string;
  spendingFormatted: string;
  gapFormatted: string;
}

export interface BudgetReceiptsSpendingTimelineState {
  title: string;
  subtitle: string;
  unit: "gbp_billions";
  basis: "fiscal_year";
  dateValue: string;
  timestamp: string;
  source: string;
  items: BudgetReceiptsSpendingTimelinePoint[];
}

function formatBillions(value: number): string {
  return `\u00A3${Math.round(value).toLocaleString("en-GB")}bn`;
}

export function buildBudgetReceiptsSpendingTimeline(
  source: BudgetReceiptsSpendingTimelineSource,
): BudgetReceiptsSpendingTimelineState {
  const items = source.items.map((item) => ({
    yearLabel: item.yearLabel,
    receipts: item.receipts,
    spending: item.spending,
    gap: item.spending - item.receipts,
    receiptsFormatted: formatBillions(item.receipts),
    spendingFormatted: formatBillions(item.spending),
    gapFormatted: formatBillions(item.spending - item.receipts),
  }));

  return {
    title: "Receipts vs spending",
    subtitle: "The gap is funded by borrowing",
    unit: "gbp_billions",
    basis: "fiscal_year",
    dateValue: source.dateValue ?? items.at(-1)?.yearLabel ?? "",
    timestamp: source.timestamp,
    source: source.source,
    items,
  };
}
