export type WelfareSpendingBreakdownBar = {
  key: string;
  label: string;
  shortLabel: string;
  amount: number;
  color: string;
};

// Temporary placeholder values for layout and editorial scaffolding only.
// Replace with sourced article-safe values before publication.
export const WELFARE_SPENDING_BREAKDOWN_BARS: WelfareSpendingBreakdownBar[] = [
  {
    key: "state-pension",
    label: "State pension",
    shortLabel: "State pension",
    amount: 115,
    color: "#11386f",
  },
  {
    key: "disability-benefits",
    label: "Disability benefits",
    shortLabel: "Disability",
    amount: 62,
    color: "#2f80d1",
  },
  {
    key: "income-support",
    label: "Income support",
    shortLabel: "Income support",
    amount: 43,
    color: "#1fa4a6",
  },
  {
    key: "housing-support",
    label: "Housing support",
    shortLabel: "Housing",
    amount: 36,
    color: "#7765aa",
  },
  {
    key: "family-benefits",
    label: "Family benefits",
    shortLabel: "Family",
    amount: 24,
    color: "#ff8a21",
  },
  {
    key: "other-benefits",
    label: "Other benefits",
    shortLabel: "Other",
    amount: 16,
    color: "#7d858f",
  },
];
