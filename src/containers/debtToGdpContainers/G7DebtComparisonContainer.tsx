"use client";

import G7DebtComparisonCard from "@/components/ui/g7DebtComparisonCardComponent/G7DebtComparisonCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectCurrentUkG7DebtToGdp,
  selectDebtToGdpDifferenceFromG7Average,
  selectG7AverageDebtToGdp,
  selectG7DebtToGdpComparison,
  selectG7DebtToGdpCountries,
  selectHighestG7DebtToGdpCountry,
  selectUkRankInG7,
} from "@/store/selectors/metricsSelectors";

export default function G7DebtComparisonContainer() {
  const comparison = useAppSelector(selectG7DebtToGdpComparison);
  const uk = useAppSelector(selectCurrentUkG7DebtToGdp);
  const countries = useAppSelector(selectG7DebtToGdpCountries);
  const ukRank = useAppSelector(selectUkRankInG7);
  const average = useAppSelector(selectG7AverageDebtToGdp);
  const difference = useAppSelector(selectDebtToGdpDifferenceFromG7Average);
  const highestCountry = useAppSelector(selectHighestG7DebtToGdpCountry);

  return (
    <G7DebtComparisonCard
      title="UK vs the G7"
      ukValue={uk.formattedValue}
      ukRank={ukRank}
      g7Average={average.formattedValue}
      differenceFromAverage={difference.formattedValue}
      countries={countries}
      comparisonYear={comparison.dateValue}
      highestCountry={highestCountry}
    />
  );
}
