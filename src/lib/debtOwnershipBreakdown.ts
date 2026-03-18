export type DebtOwnershipOutputKey =
  | "international_investors"
  | "local_investors"
  | "governments"
  | "central_bank";

export type DebtOwnershipSourceItem = {
  label: string;
  value: number;
};

export type DebtOwnershipSource = {
  title: string;
  unit: string;
  dateValue: string;
  timestamp: string;
  source: string;
  sourceUrl: string;
  items: DebtOwnershipSourceItem[];
};

export type DebtOwnershipBreakdownItem = {
  key: DebtOwnershipOutputKey;
  label: string;
  value: number;
};

export type DebtOwnershipBreakdown = {
  title: string;
  unit: "percent";
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtOwnershipBreakdownItem[];
};

const ITEM_ORDER: DebtOwnershipOutputKey[] = [
  "international_investors",
  "local_investors",
  "governments",
  "central_bank",
];

const LABELS: Record<DebtOwnershipOutputKey, string> = {
  international_investors: "International investors",
  local_investors: "Local investors",
  governments: "Governments",
  central_bank: "Central bank",
};

function normalizeCategoryLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function mapSourceCategoryToBucket(label: string): DebtOwnershipOutputKey {
  const normalizedLabel = normalizeCategoryLabel(label);

  if (normalizedLabel.includes("bank of england")) {
    return "central_bank";
  }

  if (normalizedLabel.includes("overseas")) {
    return "international_investors";
  }

  // Public-sector holders outside the Bank of England stay in the governments bucket.
  if (
    normalizedLabel.includes("local authorities") ||
    normalizedLabel.includes("public corporations") ||
    normalizedLabel.includes("government")
  ) {
    return "governments";
  }

  // Remaining DMO / ONS domestic holder categories are grouped as local investors:
  // pension and insurance funds, banks, households, investment funds, and other
  // domestic private-sector institutions.
  return "local_investors";
}

function roundPercentagesToHundred(values: number[]): number[] {
  const rounded = values.map((value) => Number(value.toFixed(1)));
  const total = rounded.reduce((sum, value) => sum + value, 0);
  const adjustment = Number((100 - total).toFixed(1));

  rounded[rounded.length - 1] = Number((rounded[rounded.length - 1]! + adjustment).toFixed(1));
  return rounded;
}

export function validateDebtOwnershipBreakdown(
  breakdown: DebtOwnershipBreakdown,
): DebtOwnershipBreakdown {
  const orderedKeys = breakdown.items.map((item) => item.key);
  if (JSON.stringify(orderedKeys) !== JSON.stringify(ITEM_ORDER)) {
    throw new Error("Debt ownership items are not in the required output order.");
  }

  const total = breakdown.items.reduce((sum, item) => sum + item.value, 0);
  if (Number(total.toFixed(1)) !== 100) {
    throw new Error(`Debt ownership percentages must sum to 100. Received ${total.toFixed(1)}.`);
  }

  for (const item of breakdown.items) {
    if (!Number.isFinite(item.value) || item.value < 0) {
      throw new Error(`Debt ownership percentage for ${item.key} must be a non-negative number.`);
    }
  }

  return breakdown;
}

export function buildDebtOwnershipBreakdown(
  source: DebtOwnershipSource,
): DebtOwnershipBreakdown {
  const totalsByBucket = new Map<DebtOwnershipOutputKey, number>(
    ITEM_ORDER.map((key) => [key, 0]),
  );

  for (const item of source.items) {
    if (!Number.isFinite(item.value) || item.value < 0) {
      throw new Error(`Invalid debt ownership source value for ${item.label}.`);
    }

    const bucket = mapSourceCategoryToBucket(item.label);
    totalsByBucket.set(bucket, (totalsByBucket.get(bucket) ?? 0) + item.value);
  }

  const totalValue = [...totalsByBucket.values()].reduce((sum, value) => sum + value, 0);
  if (totalValue <= 0) {
    throw new Error("Debt ownership source total must be greater than zero.");
  }

  const exactPercentages = ITEM_ORDER.map(
    (key) => ((totalsByBucket.get(key) ?? 0) / totalValue) * 100,
  );
  const roundedPercentages = roundPercentagesToHundred(exactPercentages);

  return validateDebtOwnershipBreakdown({
    title: "Who owns UK government debt?",
    unit: "percent",
    dateValue: source.dateValue,
    timestamp: source.timestamp,
    source: source.source,
    items: ITEM_ORDER.map((key, index) => ({
      key,
      label: LABELS[key],
      value: roundedPercentages[index]!,
    })),
  });
}
