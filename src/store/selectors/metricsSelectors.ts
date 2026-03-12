import type { RootState } from "../index";

export type NumericMetricKey =
  | "annualInterest"
  | "monthlyDebtPayment"
  | "debtToGdp"
  | "borrowingThisYear";

export const selectMetrics = (state: RootState) => state.metrics;

export const selectMetricByKey = (state: RootState, metricKey: NumericMetricKey) =>
  state.metrics[metricKey];

export const selectTotalDebtMetric = (state: RootState) => state.metrics.totalDebtMetric;

export const selectTotalDebtFormattedValue = (state: RootState) =>
  state.metrics.totalDebtMetric.formattedValue;

export const selectTotalDebtDateValue = (state: RootState) =>
  state.metrics.totalDebtMetric.dateValue;
