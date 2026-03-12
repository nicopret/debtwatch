import { createSlice } from "@reduxjs/toolkit";
import totalDebtMetricData from "@/data/totalDebtMetrics.json";
import annualInterestPaymentData from "@/data/annualInterestPayableMetric.json"

export interface AnnualInterestPaymentState {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
}

export interface TotalDebtMetricState {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
}

export interface MetricsState {
  annualInterestPaymentMetric: AnnualInterestPaymentState;
  totalDebtMetric: TotalDebtMetricState;
  annualInterest: number;
  monthlyDebtPayment: number;
  debtToGdp: number;
  borrowingThisYear: number;
}

const annualInterestPaymentMetric: AnnualInterestPaymentState = annualInterestPaymentData;
const totalDebtMetric: TotalDebtMetricState = totalDebtMetricData;

const initialState: MetricsState = {
  annualInterestPaymentMetric,
  totalDebtMetric,
  annualInterest: 104000000000,
  monthlyDebtPayment: 8670000000,
  debtToGdp: 0.976,
  borrowingThisYear: 127000000000,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
});

export const metricsReducer = metricsSlice.reducer;
