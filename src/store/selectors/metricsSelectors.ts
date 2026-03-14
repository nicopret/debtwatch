import type { RootState } from "../index";

export type NumericMetricKey =
  | "annualInterest"
  | "monthlyDebtPayment"
  | "debtToGdp"
  | "borrowingThisYear";

export const selectCanonicalDebtToGdpMetric = (state: RootState) =>
  state.metrics.debtToGdpMetric;

export const annualInterestPaymentValue = (state: RootState) =>
  state.metrics.annualInterestPaymentMetric.formattedValue;

export const annualLendingValue = (state: RootState) =>
  state.metrics.annualLendingMetric.formattedValue;

export const annualLendingDate = (state: RootState) =>
  state.metrics.annualLendingMetric.dateValue;

export const debtToGdpValue = (state: RootState) =>
  selectCanonicalDebtToGdpMetric(state).formattedValue;

export const monthlyInterestPayableValue = (state: RootState) =>
  state.metrics.monthlyInterestPayableMetric.formattedValue;

export const selectMetrics = (state: RootState) => state.metrics;

export const selectTotalDebtMetric = (state: RootState) =>
  state.metrics.totalDebtMetric;

export const selectTotalDebtFormattedValue = (state: RootState) =>
  state.metrics.totalDebtMetric.formattedValue;

export const selectTotalDebtDateValue = (state: RootState) =>
  state.metrics.totalDebtMetric.dateValue;

export const taxpayerDebtValue = (state: RootState) =>
  state.metrics.taxpayerDebtMetric.formattedValue;

export const taxPayersValue = (state: RootState) =>
  state.metrics.monthlyInterestPayableMetric.taxpayersFormatted;

export const taxYear = (state: RootState) =>
  state.metrics.monthlyInterestPayableMetric.taxYear;

export const selectTenYearGiltYieldMetric = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric;

export const selectTenYearGiltYieldNumericValue = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.numericValue;

export const selectTenYearGiltYieldFormattedValue = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.formattedValue;

export const selectTenYearGiltYieldDateValue = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.dateValue;

export const selectTenYearGiltYieldSource = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.source;

export const selectTenYearGiltYieldHelperText = (state: RootState) =>
  `${selectTenYearGiltYieldSource(state)} | ${selectTenYearGiltYieldDateValue(state)}`;

export const selectGovernmentIncomeBreakdown = (state: RootState) =>
  state.metrics.governmentIncomeBreakdown;

export const selectGovernmentSpendingBreakdown = (state: RootState) =>
  state.metrics.governmentSpendingBreakdown;

export const selectBudgetDeficitMetric = (state: RootState) =>
  state.metrics.budgetDeficitMetric;

export const selectOtherIncomeBreakdown = (state: RootState) =>
  state.metrics.otherIncomeBreakdown;

export const selectOtherSpendingBreakdown = (state: RootState) =>
  state.metrics.otherSpendingBreakdown;

export const selectAnnualBorrowingTimeline = (state: RootState) =>
  state.metrics.annualBorrowingTimeline;

export const selectAnnualBorrowingTimelineItems = (state: RootState) =>
  state.metrics.annualBorrowingTimeline.items;

export const selectBorrowingByGovernmentSummary = (state: RootState) =>
  state.metrics.borrowingByGovernmentSummary;

export const selectBorrowingGovernmentSummaries = (state: RootState) =>
  state.metrics.borrowingByGovernmentSummary.governments;

export const selectBorrowingOverallPeak = (state: RootState) =>
  state.metrics.borrowingByGovernmentSummary.overallPeak;

export const selectGovernmentPeriods = (state: RootState) =>
  state.metrics.governmentPeriods;

function buildGovernmentBands<
  TPoint extends {
    governmentKey: string;
  },
>(points: TPoint[], periods: RootState["metrics"]["governmentPeriods"]) {
  return periods
    .map((period) => {
      const startIndex = points.findIndex(
        (point) => point.governmentKey === period.governmentKey,
      );
      const reverseIndex = [...points]
        .reverse()
        .findIndex((point) => point.governmentKey === period.governmentKey);

      if (startIndex === -1 || reverseIndex === -1) {
        return null;
      }

      return {
        governmentKey: period.governmentKey,
        label: period.shortLabel ?? period.governmentLabel,
        color: period.bandColor,
        startIndex,
        endIndex: points.length - 1 - reverseIndex,
      };
    })
    .filter((band): band is NonNullable<typeof band> => band !== null);
}

export const selectAnnualBorrowingTimelinePoints = (state: RootState) =>
  selectAnnualBorrowingTimelineItems(state).map((item) => ({
    yearLabel: item.yearLabel,
    numericValue: item.numericValue,
    formattedValue: item.formattedValue,
    governmentLabel: item.governmentLabel,
  }));

export const selectBorrowingGovernmentBands = (state: RootState) => {
  const points = selectAnnualBorrowingTimelineItems(state);
  return buildGovernmentBands(points, selectGovernmentPeriods(state));
};

export const selectDebtToGdpTimeline = (state: RootState) =>
  state.metrics.debtToGdpTimeline;

export const selectDebtToGdpTimelineItems = (state: RootState) =>
  state.metrics.debtToGdpTimeline.items;

export const selectDebtToGdpTimelinePoints = (state: RootState) =>
  selectDebtToGdpTimelineItems(state).map((item) => ({
    yearLabel: item.yearLabel,
    numericValue: item.numericValue,
    formattedValue: item.formattedValue,
    governmentLabel: item.governmentLabel,
  }));

export const selectDebtToGdpGovernmentBands = (state: RootState) =>
  buildGovernmentBands(selectDebtToGdpTimelineItems(state), selectGovernmentPeriods(state));

export const selectG7DebtToGdpComparison = (state: RootState) =>
  state.metrics.g7DebtToGdpComparison;

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatDifference(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toFixed(1)}pp`;
}

export const selectCanonicalUkG7DebtToGdp = (state: RootState) => {
  const metric = selectCanonicalDebtToGdpMetric(state);

  return {
    countryCode: "GBR",
    countryLabel: "United Kingdom",
    numericValue: metric.numericValue,
    formattedValue: metric.formattedValue,
    rank: 0,
  };
};

export const selectG7DebtToGdpCountries = (state: RootState) => {
  const comparison = selectG7DebtToGdpComparison(state);
  const uk = selectCanonicalUkG7DebtToGdp(state);
  const nonUkCountries = comparison.g7.filter((country) => country.countryCode !== "GBR");

  // The displayed UK figure intentionally comes from the canonical ONS debt-to-GDP
  // metric so the headline card and the G7 panel always show the same number.
  return [...nonUkCountries, uk]
    .sort((left, right) => right.numericValue - left.numericValue)
    .map((country, index) => ({
      ...country,
      rank: index + 1,
    }));
};

export const selectCurrentUkG7DebtToGdp = (state: RootState) =>
  selectG7DebtToGdpCountries(state).find((country) => country.countryCode === "GBR")!;

export const selectUkRankInG7 = (state: RootState) =>
  selectCurrentUkG7DebtToGdp(state).rank;

export const selectG7AverageDebtToGdp = (state: RootState) => {
  const countries = selectG7DebtToGdpCountries(state);
  const numericValue =
    countries.reduce((sum, country) => sum + country.numericValue, 0) / countries.length;

  return {
    numericValue,
    formattedValue: formatPercentage(numericValue),
  };
};

export const selectDebtToGdpDifferenceFromG7Average = (state: RootState) => {
  const uk = selectCurrentUkG7DebtToGdp(state);
  const average = selectG7AverageDebtToGdp(state);
  const numericValue = uk.numericValue - average.numericValue;

  return {
    numericValue,
    formattedValue: formatDifference(numericValue),
  };
};

export const selectHighestG7DebtToGdpCountry = (state: RootState) =>
  selectG7DebtToGdpCountries(state)[0]!;

export const selectLowestG7DebtToGdpCountry = (state: RootState) => {
  const countries = selectG7DebtToGdpCountries(state);
  return countries[countries.length - 1]!;
};
