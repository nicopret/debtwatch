"use client";

import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import { monthlyInterestPayableValue } from "@/store/selectors/metricsSelectors";

export default function MonthlyDebtInterestEmbedContainer() {
  const value = useAppSelector(monthlyInterestPayableValue);

  return (
    <MetricCard
      headerText="Monthly debt interest"
      bodyText={value}
      footerText="ONS public sector finances"
      tone="amber"
    />
  );
}

