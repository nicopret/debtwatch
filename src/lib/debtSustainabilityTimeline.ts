export type DebtSustainabilityTimelineItem = {
  yearLabel: string;
  debtToGdpPct: number;
  nominalGdpGrowthPct: number;
  realGdpGrowthPct: number;
  borrowingCostPct: number;
};

export type DebtSustainabilityTimeline = {
  title: string;
  subtitle: string;
  unit: "percent";
  xKey: "year";
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtSustainabilityTimelineItem[];
};

function roundPercent(value: number): number {
  return Number(value.toFixed(1));
}

export function buildDebtSustainabilityTimeline(params: {
  debtToGdpByYear: Map<number, number>;
  nominalGdpByYear: Map<number, number>;
  realGdpGrowthByYear: Map<number, number>;
  borrowingCostByYear: Map<number, number>;
  timestamp: string;
  source: string;
}): DebtSustainabilityTimeline {
  const nominalGdpGrowthByYear = new Map<number, number>();
  const gdpYears = [...params.nominalGdpByYear.keys()].sort((left, right) => left - right);

  for (let index = 1; index < gdpYears.length; index += 1) {
    const year = gdpYears[index]!;
    const previousYear = gdpYears[index - 1]!;
    const currentValue = params.nominalGdpByYear.get(year)!;
    const previousValue = params.nominalGdpByYear.get(previousYear)!;

    if (previousValue <= 0) {
      continue;
    }

    nominalGdpGrowthByYear.set(year, ((currentValue - previousValue) / previousValue) * 100);
  }

  const alignedYears = [...params.debtToGdpByYear.keys()]
    .filter((year) =>
      nominalGdpGrowthByYear.has(year) &&
      params.realGdpGrowthByYear.has(year) &&
      params.borrowingCostByYear.has(year),
    )
    .sort((left, right) => left - right);

  if (alignedYears.length < 20) {
    throw new Error(
      `Expected at least 20 aligned annual debt-sustainability points, found ${alignedYears.length}.`,
    );
  }

  const items = alignedYears.map((year) => {
    const debtToGdpPct = params.debtToGdpByYear.get(year);
    const nominalGdpGrowthPct = nominalGdpGrowthByYear.get(year);
    const realGdpGrowthPct = params.realGdpGrowthByYear.get(year);
    const borrowingCostPct = params.borrowingCostByYear.get(year);

    if (
      debtToGdpPct === undefined ||
      nominalGdpGrowthPct === undefined ||
      realGdpGrowthPct === undefined ||
      borrowingCostPct === undefined
    ) {
      throw new Error(`Missing aligned debt-sustainability values for ${year}.`);
    }

    return {
      yearLabel: String(year),
      debtToGdpPct: roundPercent(debtToGdpPct),
      nominalGdpGrowthPct: roundPercent(nominalGdpGrowthPct),
      realGdpGrowthPct: roundPercent(realGdpGrowthPct),
      borrowingCostPct: roundPercent(borrowingCostPct),
    } satisfies DebtSustainabilityTimelineItem;
  });

  return {
    title: "UK debt, growth and borrowing costs over time",
    subtitle:
      "Debt is compared with nominal growth because debt is measured in pounds, while real growth shows inflation-adjusted economic output.",
    unit: "percent",
    xKey: "year",
    dateValue: items[items.length - 1]!.yearLabel,
    timestamp: params.timestamp,
    source: params.source,
    items,
  };
}
