"use client";

import CircularMetric from "@/components/ui/circularMetricComponent/CircularMetric";
import { useAppSelector } from "@/store/hooks";
import {
  selectTenYearGiltYieldFormattedValue,
  selectTenYearGiltYieldHelperText,
} from "@/store/selectors/metricsSelectors";

export default function TenYearGiltYieldCircleContainer() {
  const mainValueText = useAppSelector(selectTenYearGiltYieldFormattedValue);
  const helperText = useAppSelector(selectTenYearGiltYieldHelperText);

  return (
    <CircularMetric
      mainValueText={mainValueText}
      labelText="UK 10-year gilt"
      helperText={helperText}
    />
  );
}
