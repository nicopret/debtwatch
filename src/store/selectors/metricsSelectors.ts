import type { RootState } from "../index";

export type NumericMetricKey =
  | "annualInterest"
  | "monthlyDebtPayment"
  | "debtToGdp"
  | "borrowingThisYear";

export const annualInterestPaymentValue = (state: RootState) =>
  state.metrics.annualInterestPaymentMetric.formattedValue;

export const annualLendingValue = (state: RootState) =>
  state.metrics.annualLendingMetric.formattedValue;

export const annualLendingDate = (state: RootState) =>
  state.metrics.annualLendingMetric.dateValue;

export const debtToGdpValue = (state: RootState) =>
  state.metrics.debtToGdpMetric.formattedValue;

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

export const selectAnnualBorrowingTimelinePoints = (state: RootState) =>
  selectAnnualBorrowingTimelineItems(state).map((item) => ({
    yearLabel: item.yearLabel,
    numericValue: item.numericValue,
    formattedValue: item.formattedValue,
    governmentLabel: item.governmentLabel,
  }));

export const selectBorrowingGovernmentBands = (state: RootState) => {
  const points = selectAnnualBorrowingTimelineItems(state);

  return selectGovernmentPeriods(state)
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
};
