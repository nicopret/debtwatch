"use client";

import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectTotalDebtDateValue,
  selectTotalDebtFormattedValue,
} from "@/store/selectors/metricsSelectors";

export default function TotalDebtMetricContainer() {
  const formattedValue = useAppSelector(selectTotalDebtFormattedValue);
  const dateValue = useAppSelector(selectTotalDebtDateValue);

  return (
    <MetricCard
      headerText="Total UK Debt"
      bodyText={formattedValue}
      footerText={`Updated ${dateValue}`}
    />
  );
}
