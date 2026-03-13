"use client";

import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import { debtToGdpValue } from "@/store/selectors/metricsSelectors";

export default function DebtToGDPContainer() {
  const formattedValue = useAppSelector(debtToGdpValue);

  return (
    <MetricCard
      bodyText={formattedValue}
      footerText="Share of UK GDP"
      headerText="Debt to GDP ratio"
    />
  );
}
