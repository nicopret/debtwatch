"use client";

import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectLatestAnnualBorrowingDateValue,
  selectLatestAnnualBorrowingFormattedValue,
} from "@/store/selectors/metricsSelectors";

export default function AnnualLendingContainer() {
  const dateValue = useAppSelector(selectLatestAnnualBorrowingDateValue);
  const formattedValue = useAppSelector(selectLatestAnnualBorrowingFormattedValue);

  return (
    <MetricCard
      bodyText={formattedValue}
      footerText={`Updated ${dateValue}`}
      headerText="Annual borrowing"
    />
  );
}
