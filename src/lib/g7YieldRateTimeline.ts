export type G7YieldRateTimelineItem = {
  dateLabel: string;
  uk10yGiltYieldPct: number;
  g7Average10yYieldPct: number;
  bankRatePct: number;
};

export type G7YieldRateTimeline = {
  title: string;
  subtitle: string;
  unit: "percent";
  xKey: "date";
  dateValue: string;
  timestamp: string;
  source: string;
  items: G7YieldRateTimelineItem[];
};

export type G7YieldRateTimelineSource = {
  timestamp: string;
  source: string;
  uk10yByPeriod: Map<string, number>;
  g7AverageByPeriod: Map<string, number>;
  bankRateByPeriod: Map<string, number>;
};

const MONTH_SPAN = 360;

function roundToOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

function isMonthlyPeriod(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}

export function validateG7YieldRateTimeline(
  timeline: G7YieldRateTimeline,
): G7YieldRateTimeline {
  if (timeline.items.length < 24) {
    throw new Error("Expected at least 24 aligned monthly points in the G7 yield-rate timeline.");
  }

  for (const item of timeline.items) {
    if (!isMonthlyPeriod(item.dateLabel)) {
      throw new Error(`Timeline period ${item.dateLabel} must be in YYYY-MM format.`);
    }

    const values = [
      item.uk10yGiltYieldPct,
      item.g7Average10yYieldPct,
      item.bankRatePct,
    ];

    for (const value of values) {
      if (!Number.isFinite(value) || value < 0 || value > 100) {
        throw new Error(`Timeline value for ${item.dateLabel} must be a percentage.`);
      }
    }
  }

  return timeline;
}

export function buildG7YieldRateTimeline(
  source: G7YieldRateTimelineSource,
): G7YieldRateTimeline {
  const alignedPeriods = [...source.uk10yByPeriod.keys()]
    .filter(
      (period) =>
        source.g7AverageByPeriod.has(period) && source.bankRateByPeriod.has(period),
    )
    .sort((left, right) => left.localeCompare(right));

  if (alignedPeriods.length === 0) {
    throw new Error("No aligned periods found for UK yield, G7 average, and Bank Rate.");
  }

  const periodsToUse = alignedPeriods.slice(-MONTH_SPAN);

  return validateG7YieldRateTimeline({
    title: "UK gilt yields, G7 average and Bank Rate",
    subtitle:
      "Comparing long-term borrowing costs with the Bank of England's policy rate over the past 30 years",
    unit: "percent",
    xKey: "date",
    dateValue: periodsToUse[periodsToUse.length - 1]!,
    timestamp: source.timestamp,
    source: source.source,
    items: periodsToUse.map((period) => ({
      dateLabel: period,
      uk10yGiltYieldPct: roundToOneDecimal(source.uk10yByPeriod.get(period)!),
      g7Average10yYieldPct: roundToOneDecimal(source.g7AverageByPeriod.get(period)!),
      bankRatePct: roundToOneDecimal(source.bankRateByPeriod.get(period)!),
    })),
  });
}
