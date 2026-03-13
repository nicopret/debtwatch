import type { RootState } from "../index";

export type NumericMetricKey =
  | "annualInterest"
  | "monthlyDebtPayment"
  | "debtToGdp"
  | "borrowingThisYear";

export const annualInterestPaymentValue = (state: RootState) => state.metrics.annualInterestPaymentMetric.formattedValue;

export const annualLendingValue = (state: RootState) => state.metrics.annualLendingMetric.formattedValue;
export const annualLendingDate = (state: RootState) => state.metrics.annualLendingMetric.dateValue;

export const debtToGdpValue = (state: RootState) => state.metrics.debtToGdpMetric.formattedValue;

export const monthlyInterestPayableValue = (state: RootState) => state.metrics.monthlyInterestPayableMetric.formattedValue;

export const selectMetrics = (state: RootState) => state.metrics;

export const selectTotalDebtMetric = (state: RootState) => state.metrics.totalDebtMetric;

export const selectTotalDebtFormattedValue = (state: RootState) =>
  state.metrics.totalDebtMetric.formattedValue;

export const selectTotalDebtDateValue = (state: RootState) =>
  state.metrics.totalDebtMetric.dateValue;

export const taxpayerDebtValue = (state: RootState) => state.metrics.taxpayerDebtMetric.formattedValue;

export const taxPayersValue = (state: RootState) => state.metrics.monthlyInterestPayableMetric.taxpayersFormatted;

export const taxYear = (state: RootState) => state.metrics.monthlyInterestPayableMetric.taxYear;
