"use client";

import G7DebtComparisonCard from "@/components/ui/g7DebtComparisonCardComponent/G7DebtComparisonCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtToGdpMetric,
  selectArticleG7DebtToGdpComparison,
  selectG7DebtToGdpComparison,
  selectHighestG7DebtToGdpCountry,
  selectG7AverageDebtToGdp,
  selectCurrentUkG7DebtToGdp,
  selectDebtToGdpDifferenceFromG7Average,
  selectG7DebtToGdpCountries,
  selectUkRankInG7,
} from "@/store/selectors/metricsSelectors";

export interface G7DebtComparisonContainerProps {
  publicationDate?: string;
}

export default function G7DebtComparisonContainer({
  publicationDate,
}: G7DebtComparisonContainerProps) {
  const articleComparison = useAppSelector((state) =>
    publicationDate ? selectArticleG7DebtToGdpComparison(state, publicationDate) : null,
  );
  const canonicalComparison = useAppSelector(selectG7DebtToGdpComparison);
  const canonicalCountries = useAppSelector(selectG7DebtToGdpCountries);
  const canonicalUk = useAppSelector(selectCurrentUkG7DebtToGdp);
  const canonicalAverage = useAppSelector(selectG7AverageDebtToGdp);
  const canonicalDifference = useAppSelector(selectDebtToGdpDifferenceFromG7Average);
  const canonicalHighestCountry = useAppSelector(selectHighestG7DebtToGdpCountry);
  const canonicalUkRank = useAppSelector(selectUkRankInG7);
  const articleDebtMetric = useAppSelector((state) =>
    publicationDate ? selectArticleDebtToGdpMetric(state, publicationDate) : null,
  );

  const comparison = articleComparison ?? canonicalComparison;
  const countries =
    articleComparison && articleDebtMetric
      ? [...articleComparison.g7]
          .map((country) =>
            country.countryCode === "GBR"
              ? {
                  ...country,
                  numericValue: articleDebtMetric.numericValue,
                  formattedValue: articleDebtMetric.formattedValue,
                }
              : country,
          )
          .sort((left, right) => right.numericValue - left.numericValue)
          .map((country, index) => ({
            ...country,
            rank: index + 1,
          }))
      : canonicalCountries;
  const uk = countries.find((country) => country.countryCode === "GBR") ?? canonicalUk;
  const ukRank = uk.rank ?? canonicalUkRank;
  const average =
    articleComparison && countries.length > 0
      ? {
          numericValue:
            countries.reduce((sum, country) => sum + country.numericValue, 0) / countries.length,
          formattedValue: `${(
            countries.reduce((sum, country) => sum + country.numericValue, 0) / countries.length
          ).toFixed(1)}%`,
        }
      : canonicalAverage;
  const difference =
    articleComparison
      ? {
          numericValue: uk.numericValue - average.numericValue,
          formattedValue: `${uk.numericValue - average.numericValue > 0 ? "+" : ""}${(
            uk.numericValue - average.numericValue
          ).toFixed(1)}pp`,
        }
      : canonicalDifference;
  const highestCountry = countries[0] ?? canonicalHighestCountry;

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
