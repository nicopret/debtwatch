export type G7YieldComparisonItemKey =
  | "united_kingdom"
  | "united_states"
  | "canada"
  | "france"
  | "germany"
  | "italy"
  | "japan";

export type G7YieldComparisonSourcePoint = {
  countryCode: string;
  year: string;
  value: number;
};

export type G7YieldComparisonSource = {
  timestamp: string;
  source: string;
  period: string;
  items: G7YieldComparisonSourcePoint[];
};

export type G7YieldComparisonItem = {
  key: G7YieldComparisonItemKey;
  countryCode: string;
  label: string;
  value: number;
  formattedValue: string;
  color: "amber" | "neutral";
  highlight: boolean;
  rank: number;
};

export type G7YieldComparison = {
  title: string;
  subtitle: string;
  unit: "percent";
  dateValue: string;
  period: string;
  timestamp: string;
  source: string;
  items: G7YieldComparisonItem[];
};

const COUNTRY_CONFIG = [
  {
    key: "united_kingdom",
    countryCode: "GBR",
    label: "United Kingdom",
    color: "amber",
    highlight: true,
  },
  {
    key: "united_states",
    countryCode: "USA",
    label: "United States",
    color: "neutral",
    highlight: false,
  },
  {
    key: "canada",
    countryCode: "CAN",
    label: "Canada",
    color: "neutral",
    highlight: false,
  },
  {
    key: "france",
    countryCode: "FRA",
    label: "France",
    color: "neutral",
    highlight: false,
  },
  {
    key: "germany",
    countryCode: "DEU",
    label: "Germany",
    color: "neutral",
    highlight: false,
  },
  {
    key: "italy",
    countryCode: "ITA",
    label: "Italy",
    color: "neutral",
    highlight: false,
  },
  {
    key: "japan",
    countryCode: "JPN",
    label: "Japan",
    color: "neutral",
    highlight: false,
  },
] as const;

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

function roundToOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

export function validateG7YieldComparison(
  comparison: G7YieldComparison,
): G7YieldComparison {
  if (comparison.items.length !== COUNTRY_CONFIG.length) {
    throw new Error(`Expected ${COUNTRY_CONFIG.length} G7 countries but found ${comparison.items.length}.`);
  }

  const presentCodes = new Set(comparison.items.map((item) => item.countryCode));
  for (const country of COUNTRY_CONFIG) {
    if (!presentCodes.has(country.countryCode)) {
      throw new Error(`Missing G7 yield comparison country ${country.countryCode}.`);
    }
  }

  const highlightedItems = comparison.items.filter((item) => item.highlight);
  if (highlightedItems.length !== 1 || highlightedItems[0]?.countryCode !== "GBR") {
    throw new Error("The United Kingdom must be the only highlighted country.");
  }

  for (const item of comparison.items) {
    if (!Number.isFinite(item.value) || item.value < 0) {
      throw new Error(`Yield value for ${item.countryCode} must be a non-negative number.`);
    }
  }

  return comparison;
}

export function buildG7YieldComparison(
  source: G7YieldComparisonSource,
): G7YieldComparison {
  const sourceByCountry = new Map(source.items.map((item) => [item.countryCode, item]));

  const orderedItems = COUNTRY_CONFIG.map((country) => {
    const item = sourceByCountry.get(country.countryCode);
    if (!item) {
      throw new Error(`Missing source point for ${country.countryCode}.`);
    }

    return {
      key: country.key,
      countryCode: country.countryCode,
      label: country.label,
      value: roundToOneDecimal(item.value),
      formattedValue: formatPercentage(item.value),
      color: country.color,
      highlight: country.highlight,
      rank: 0,
    } satisfies G7YieldComparisonItem;
  })
    .sort((left, right) => right.value - left.value)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  return validateG7YieldComparison({
    title: "G7 borrowing costs",
    subtitle: "10-year government bond yields",
    unit: "percent",
    dateValue: source.period,
    period: source.period,
    timestamp: source.timestamp,
    source: source.source,
    items: orderedItems,
  });
}
