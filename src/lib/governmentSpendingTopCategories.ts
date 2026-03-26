type BreakdownItem = {
  label: string;
  numericValue: number;
};

type BreakdownMetric = {
  dateValue: string;
  timestamp: string;
  source: string;
  items: BreakdownItem[];
};

export interface GovernmentSpendingTopCategoryItem {
  key: string;
  label: string;
  numericValue: number;
  formattedValue: string;
  color: "navy" | "red";
}

export interface GovernmentSpendingTopCategoriesState {
  title: string;
  subtitle: string;
  unit: "gbp_billions";
  dateValue: string;
  timestamp: string;
  source: string;
  items: GovernmentSpendingTopCategoryItem[];
}

export interface GovernmentSpendingTopCategoriesSource {
  headlineSpending: BreakdownMetric;
  residualSpending: BreakdownMetric;
}

const ALWAYS_AGGREGATE_LABELS = new Set(["Other services", "Other"]);

function toKey(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatBillions(value: number): string {
  return `\u00A3${Math.round(value).toLocaleString("en-GB")}bn`;
}

export function buildGovernmentSpendingTopCategories(
  source: GovernmentSpendingTopCategoriesSource,
): GovernmentSpendingTopCategoriesState {
  const candidateItems = [
    ...source.headlineSpending.items.filter(
      (item) => !ALWAYS_AGGREGATE_LABELS.has(item.label),
    ),
    ...source.residualSpending.items,
  ];

  if (candidateItems.length < 10) {
    throw new Error("Expected at least 10 spending categories to build the ranked chart.");
  }

  const rankedItems = candidateItems
    .filter((item) => !ALWAYS_AGGREGATE_LABELS.has(item.label))
    .sort((left, right) => right.numericValue - left.numericValue);

  const topItems = rankedItems.slice(0, 10);
  const topLabels = new Set(topItems.map((item) => item.label));

  const otherNumericValue = candidateItems
    .filter((item) => !topLabels.has(item.label))
    .reduce((sum, item) => sum + item.numericValue, 0);

  const items: GovernmentSpendingTopCategoryItem[] = [
    ...topItems.map((item) => ({
      key: toKey(item.label),
      label: item.label,
      numericValue: item.numericValue,
      formattedValue: formatBillions(item.numericValue),
      color: item.label === "Debt interest" ? ("red" as const) : ("navy" as const),
    })),
    {
      key: "other",
      label: "Other",
      numericValue: otherNumericValue,
      formattedValue: formatBillions(otherNumericValue),
      color: "navy",
    },
  ];

  return {
    title: "Where government money goes",
    subtitle: "Top expenditure categories | OBR February 2026 forecast",
    unit: "gbp_billions",
    dateValue: "Feb 2026",
    timestamp: source.headlineSpending.timestamp,
    source: `${source.headlineSpending.source} / ${source.residualSpending.source}`,
    items,
  };
}
