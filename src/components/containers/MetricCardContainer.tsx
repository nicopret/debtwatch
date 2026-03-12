"use client";

import MetricCard, { type MetricCardTone } from "@/components/ui/MetricCard";
import { formatCurrencyCompact, formatPercentage } from "@/lib/format";
import { useAppSelector } from "@/store/hooks";
import {
  type MetricKey,
  selectMetricByKey,
} from "@/store/selectors/metricsSelectors";

interface MetricCardContainerProps {
  metricKey: MetricKey;
}

type MetricPresentation = {
  label: string;
  helperText: string;
  tone: MetricCardTone;
  href?: string;
  linkLabel?: string;
  formatValue: (value: number) => string;
};

const METRIC_PRESENTATION: Record<MetricKey, MetricPresentation> = {
  totalDebt: {
    label: "Total UK public sector debt",
    helperText: "Rolling central government debt total.",
    tone: "teal",
    href: "/methodology",
    linkLabel: "How this is measured",
    formatValue: formatCurrencyCompact,
  },
  annualInterest: {
    label: "Annual debt interest",
    helperText: "Estimated yearly interest cost from debt servicing.",
    tone: "amber",
    href: "/articles",
    linkLabel: "Read analysis",
    formatValue: formatCurrencyCompact,
  },
  monthlyDebtPayment: {
    label: "Monthly debt payment",
    helperText: "Average monthly debt interest outflow.",
    tone: "neutral",
    formatValue: formatCurrencyCompact,
  },
  debtToGdp: {
    label: "Debt to GDP ratio",
    helperText: "Public debt as a share of annual output.",
    tone: "neutral",
    formatValue: (value) => formatPercentage(value, 1),
  },
  borrowingThisYear: {
    label: "Borrowing this financial year",
    helperText: "Net borrowing based on current static baseline.",
    tone: "teal",
    formatValue: formatCurrencyCompact,
  },
};

export default function MetricCardContainer({
  metricKey,
}: MetricCardContainerProps) {
  const metricValue = useAppSelector((state) => selectMetricByKey(state, metricKey));
  const presentation = METRIC_PRESENTATION[metricKey];

  // Container owns data selection + formatting so the UI card stays Redux-free.
  return (
    <MetricCard
      label={presentation.label}
      value={presentation.formatValue(metricValue)}
      helperText={presentation.helperText}
      tone={presentation.tone}
      href={presentation.href}
      linkLabel={presentation.linkLabel}
    />
  );
}
