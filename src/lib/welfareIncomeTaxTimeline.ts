export interface WelfareIncomeTaxTimelinePointSource {
  dateLabel: string;
  incomeTax: number;
  benefits: number;
}

export interface WelfareIncomeTaxTimelineSource {
  dateValue: string;
  timestamp: string;
  source: string;
  items: WelfareIncomeTaxTimelinePointSource[];
}

export interface WelfareIncomeTaxTimelinePoint {
  dateLabel: string;
  incomeTax: number;
  benefits: number;
  gap: number;
  incomeTaxFormatted: string;
  benefitsFormatted: string;
  gapFormatted: string;
}

export interface WelfareIncomeTaxTimelineState {
  title: string;
  subtitle: string;
  unit: "gbp_billions";
  basis: "rolling_12_month";
  dateValue: string;
  timestamp: string;
  source: string;
  items: WelfareIncomeTaxTimelinePoint[];
}

function formatBillions(value: number): string {
  return `\u00A3${value.toFixed(value >= 100 ? 0 : 1)}bn`;
}

export function buildWelfareIncomeTaxTimeline(
  source: WelfareIncomeTaxTimelineSource,
): WelfareIncomeTaxTimelineState {
  const items = source.items.map((item) => ({
    dateLabel: item.dateLabel,
    incomeTax: item.incomeTax,
    benefits: item.benefits,
    gap: item.benefits - item.incomeTax,
    incomeTaxFormatted: formatBillions(item.incomeTax),
    benefitsFormatted: formatBillions(item.benefits),
    gapFormatted: formatBillions(Math.abs(item.benefits - item.incomeTax)),
  }));

  return {
    title: "Income tax receipts vs benefits spending",
    subtitle: "Rolling 12-month totals, \u00A3 billions",
    unit: "gbp_billions",
    basis: "rolling_12_month",
    dateValue: source.dateValue,
    timestamp: source.timestamp,
    source: source.source,
    items,
  };
}
