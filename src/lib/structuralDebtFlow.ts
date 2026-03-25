export interface StructuralDebtFlowSource {
  dateValue: string;
  timestamp: string;
  source: string;
  values: {
    debt_rollover: string;
    new_borrowing: string;
    inflation_linked_uplift: string;
    interest_payments: string;
    total_debt: string;
  };
}

export interface StructuralDebtFlowNode {
  key:
    | "debt_rollover"
    | "new_borrowing"
    | "inflation_linked_uplift"
    | "interest_payments"
    | "total_debt";
  label: string;
  subtitle: string;
  value?: string;
  tone: "default" | "muted" | "emphasis";
}

export interface StructuralDebtFlowEdge {
  from:
    | "debt_rollover"
    | "new_borrowing"
    | "inflation_linked_uplift"
    | "interest_payments";
  to: "total_debt" | "outflow";
}

export interface StructuralDebtFlowState {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  nodes: StructuralDebtFlowNode[];
  edges: StructuralDebtFlowEdge[];
}

export function buildStructuralDebtFlow(
  source: StructuralDebtFlowSource,
): StructuralDebtFlowState {
  return {
    title: "How the debt keeps growing",
    subtitle: "Debt status over the last 12 months",
    dateValue: source.dateValue,
    timestamp: source.timestamp,
    source: source.source,
    nodes: [
      {
        key: "debt_rollover",
        label: "Debt rolled over",
        subtitle: "Maturing gilts refinanced",
        value: source.values.debt_rollover,
        tone: "default",
      },
      {
        key: "new_borrowing",
        label: "New borrowing",
        subtitle: "Spending exceeds tax",
        value: source.values.new_borrowing,
        tone: "default",
      },
      {
        key: "inflation_linked_uplift",
        label: "Inflation-linked uplift",
        subtitle: "Index-linked debt increases principal",
        value: source.values.inflation_linked_uplift,
        tone: "default",
      },
      {
        key: "interest_payments",
        label: "Interest payments",
        subtitle: "Paid from tax revenue",
        value: source.values.interest_payments,
        tone: "muted",
      },
      {
        key: "total_debt",
        label: "Total debt increases",
        subtitle: source.values.total_debt,
        tone: "emphasis",
      },
    ],
    edges: [
      { from: "debt_rollover", to: "total_debt" },
      { from: "new_borrowing", to: "total_debt" },
      { from: "inflation_linked_uplift", to: "total_debt" },
      { from: "interest_payments", to: "outflow" },
    ],
  };
}
