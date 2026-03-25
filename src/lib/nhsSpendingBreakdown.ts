export interface NhsSpendingSourceItem {
  key:
    | "nhs_payroll"
    | "agency_staff"
    | "clinical_procurement"
    | "medicines_and_pharmacy"
    | "primary_care_contracts"
    | "capital_and_estates"
    | "clinical_negligence_and_legal"
    | "other_operating_costs";
  label: string;
  value: number;
}

export interface NhsSpendingBreakdownSource {
  dateValue: string;
  timestamp: string;
  source: string;
  items: NhsSpendingSourceItem[];
}

type NhsBucketKey =
  | "staff_costs"
  | "procurement"
  | "medicine"
  | "primary_care"
  | "infrastructure"
  | "legal_costs"
  | "other";

interface NhsBucketConfig {
  label: string;
  color: string;
  sourceKeys: NhsSpendingSourceItem["key"][];
}

const NHS_BUCKETS: Array<{ key: NhsBucketKey } & NhsBucketConfig> = [
  {
    key: "staff_costs",
    label: "Staff costs",
    color: "#203b73",
    // Agency staff is folded into staff costs so the workforce bill is shown as one bucket.
    sourceKeys: ["nhs_payroll", "agency_staff"],
  },
  {
    key: "procurement",
    label: "Procurement",
    color: "#3b5e90",
    sourceKeys: ["clinical_procurement"],
  },
  {
    key: "medicine",
    label: "Medicine",
    color: "#5d79a8",
    sourceKeys: ["medicines_and_pharmacy"],
  },
  {
    key: "primary_care",
    label: "Primary care",
    color: "#8fa8c9",
    sourceKeys: ["primary_care_contracts"],
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    color: "#d2a765",
    // Capital and estates are combined into one infrastructure bucket.
    sourceKeys: ["capital_and_estates"],
  },
  {
    key: "legal_costs",
    label: "Legal costs",
    color: "#c75b5b",
    // Clinical negligence and legal claims are grouped together here.
    sourceKeys: ["clinical_negligence_and_legal"],
  },
  {
    key: "other",
    label: "Other",
    color: "#d8e0ea",
    sourceKeys: ["other_operating_costs"],
  },
];

function formatBillions(value: number): string {
  return `\u00A3${Math.round(value).toLocaleString("en-GB")}bn`;
}

function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function buildNhsSpendingBreakdown(source: NhsSpendingBreakdownSource) {
  const values = new Map(source.items.map((item) => [item.key, item.value]));
  const totalNumericValue = source.items.reduce((sum, item) => sum + item.value, 0);

  const items = NHS_BUCKETS.map((bucket) => {
    const numericValue = bucket.sourceKeys.reduce(
      (sum, key) => sum + (values.get(key) ?? 0),
      0,
    );
    const percentageValue =
      totalNumericValue > 0 ? (numericValue / totalNumericValue) * 100 : 0;

    return {
      label: bucket.label,
      numericValue,
      formattedValue: formatBillions(numericValue),
      percentageValue,
      formattedPercentage: formatPercentage(percentageValue),
      color: bucket.color,
    };
  });

  return {
    title: "How the NHS spends its budget",
    subtitle: "Major NHS spending categories | latest full-year mix available by Feb 2026",
    dateValue: source.dateValue,
    timestamp: source.timestamp,
    source: source.source,
    totalNumericValue,
    totalFormattedValue: formatBillions(totalNumericValue),
    items,
  };
}
