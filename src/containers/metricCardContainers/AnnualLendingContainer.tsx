"use client";

import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import { annualLendingDate, annualLendingValue } from "@/store/selectors/metricsSelectors";

export default function AnnualLendingContainer() {
  const dateValue = useAppSelector(annualLendingDate);
  const formattedValue = useAppSelector(annualLendingValue);

  return (
    <MetricCard
      bodyText={formattedValue}
      footerText={`Updated ${dateValue}`}
      headerText="Lending the last 12 months"
    />
  );
}
