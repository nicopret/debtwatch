import { createSlice } from "@reduxjs/toolkit";

import annualInterestPaymentData from "@/data/annualInterestPayableMetric.json";
import annualLendingData from "@/data/annualLendingMetric.json";
import debtToGdpData from "@/data/debtToGdpMetrics.json";
import monthlyInterestPayableData from "@/data/monthlyInterestPayableMetric.json";
import tenYearGiltYieldData from "@/data/tenYearGiltYieldMetric.json";
import taxpayerDebtData from "@/data/taxpayerDebt.json";
import totalDebtMetricData from "@/data/totalDebtMetrics.json";

export interface AnnualInterestPaymentState {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
}

export interface AnnualLendingtState {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
}

export interface DebtToGdpState {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
}

export interface MonthlyInterestPayableState {
  currencySymbol: string;
  dateValue: string;
  formattedValue: string;
  numericValue: number;
  taxpayers: number;
  taxpayersFormatted: string;
  source: string;
  taxYear: string;
  timestamp: string;
}

export interface TaxpayerDebtState {
  currencySymbol: string;
  dateValue: string;
  formattedValue: string;
  numericValue: number;
  taxpayers: number;
  taxpayersFormatted: string;
  source: string;
  taxYear: string;
  timestamp: string;
}

export interface TotalDebtMetricState {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
}

export interface TenYearGiltYieldMetricState {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
  source: string;
}

export interface MetricsState {
  annualInterestPaymentMetric: AnnualInterestPaymentState;
  annualLendingMetric: AnnualLendingtState;
  debtToGdpMetric: DebtToGdpState;
  monthlyInterestPayableMetric: MonthlyInterestPayableState;
  tenYearGiltYieldMetric: TenYearGiltYieldMetricState;
  taxpayerDebtMetric: TaxpayerDebtState;
  totalDebtMetric: TotalDebtMetricState;
}

const annualInterestPaymentMetric: AnnualInterestPaymentState = annualInterestPaymentData;
const annualLendingMetric: AnnualLendingtState = annualLendingData;
const debtToGdpMetric: DebtToGdpState = debtToGdpData;
const monthlyInterestPayableMetric: MonthlyInterestPayableState = monthlyInterestPayableData;
const tenYearGiltYieldMetric: TenYearGiltYieldMetricState = tenYearGiltYieldData;
const taxpayerDebtMetric: TaxpayerDebtState = taxpayerDebtData;
const totalDebtMetric: TotalDebtMetricState = totalDebtMetricData;

const initialState: MetricsState = {
  annualInterestPaymentMetric,
  annualLendingMetric,
  debtToGdpMetric,
  monthlyInterestPayableMetric,
  tenYearGiltYieldMetric,
  taxpayerDebtMetric,
  totalDebtMetric,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
});

export const metricsReducer = metricsSlice.reducer;
