import { createSlice } from "@reduxjs/toolkit";

import annualInterestPaymentData from "@/data/annualInterestPayableMetric.json";
import annualBorrowingTimelineData from "@/data/annualBorrowingTimeline.json";
import annualLendingData from "@/data/annualLendingMetric.json";
import budgetDeficitData from "@/data/budgetDeficitMetric.json";
import borrowingByGovernmentSummaryData from "@/data/borrowingByGovernmentSummary.json";
import debtToGdpData from "@/data/debtToGdpMetrics.json";
import governmentIncomeBreakdownData from "@/data/governmentIncomeBreakdown.json";
import governmentSpendingBreakdownData from "@/data/governmentSpendingBreakdown.json";
import monthlyInterestPayableData from "@/data/monthlyInterestPayableMetric.json";
import otherIncomeBreakdownData from "@/data/otherIncomeBreakdown.json";
import otherSpendingBreakdownData from "@/data/otherSpendingBreakdown.json";
import tenYearGiltYieldData from "@/data/tenYearGiltYieldMetric.json";
import taxpayerDebtData from "@/data/taxpayerDebt.json";
import totalDebtMetricData from "@/data/totalDebtMetrics.json";
import { GOVERNMENT_PERIODS, type GovernmentPeriod } from "@/lib/governmentPeriods";

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

export interface AnnualBorrowingTimelineItemState {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentKey: string;
  governmentLabel: string;
}

export interface AnnualBorrowingTimelineState {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: AnnualBorrowingTimelineItemState[];
}

export interface BorrowingGovernmentSummaryEntryState {
  governmentKey: string;
  governmentLabel: string;
  startYear: number;
  endYear: number | null;
  totalBorrowingNumericValue: number;
  totalBorrowingFormattedValue: string;
  peakYear: string;
  peakYearBorrowingNumericValue: number;
  peakYearBorrowingFormattedValue: string;
}

export interface BorrowingByGovernmentSummaryState {
  timestamp: string;
  source: string;
  governments: BorrowingGovernmentSummaryEntryState[];
  overallPeak: {
    year: string;
    governmentKey: string;
    governmentLabel: string;
    numericValue: number;
    formattedValue: string;
  };
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

export interface BudgetBreakdownItemState {
  label: string;
  numericValue: number;
  formattedValue: string;
  percentageValue: number;
  formattedPercentage: string;
  color: string;
}

export interface BudgetBreakdownState {
  totalNumericValue: number;
  totalFormattedValue: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: BudgetBreakdownItemState[];
}

export interface DonutBreakdownState extends BudgetBreakdownState {
  title: string;
  subtitle: string;
}

export interface BudgetDeficitMetricState {
  numericValue: number;
  formattedValue: string;
  dateValue: string;
  timestamp: string;
  source: string;
  descriptiveText?: string;
}

export interface MetricsState {
  annualInterestPaymentMetric: AnnualInterestPaymentState;
  annualBorrowingTimeline: AnnualBorrowingTimelineState;
  annualLendingMetric: AnnualLendingtState;
  budgetDeficitMetric: BudgetDeficitMetricState;
  borrowingByGovernmentSummary: BorrowingByGovernmentSummaryState;
  debtToGdpMetric: DebtToGdpState;
  governmentPeriods: GovernmentPeriod[];
  governmentIncomeBreakdown: BudgetBreakdownState;
  governmentSpendingBreakdown: BudgetBreakdownState;
  monthlyInterestPayableMetric: MonthlyInterestPayableState;
  otherIncomeBreakdown: DonutBreakdownState;
  otherSpendingBreakdown: DonutBreakdownState;
  tenYearGiltYieldMetric: TenYearGiltYieldMetricState;
  taxpayerDebtMetric: TaxpayerDebtState;
  totalDebtMetric: TotalDebtMetricState;
}

const annualInterestPaymentMetric: AnnualInterestPaymentState = annualInterestPaymentData;
const annualBorrowingTimeline: AnnualBorrowingTimelineState = annualBorrowingTimelineData;
const annualLendingMetric: AnnualLendingtState = annualLendingData;
const budgetDeficitMetric: BudgetDeficitMetricState = budgetDeficitData;
const borrowingByGovernmentSummary: BorrowingByGovernmentSummaryState =
  borrowingByGovernmentSummaryData;
const debtToGdpMetric: DebtToGdpState = debtToGdpData;
const governmentPeriods: GovernmentPeriod[] = GOVERNMENT_PERIODS;
const governmentIncomeBreakdown: BudgetBreakdownState = governmentIncomeBreakdownData;
const governmentSpendingBreakdown: BudgetBreakdownState = governmentSpendingBreakdownData;
const monthlyInterestPayableMetric: MonthlyInterestPayableState = monthlyInterestPayableData;
const otherIncomeBreakdown: DonutBreakdownState = otherIncomeBreakdownData;
const otherSpendingBreakdown: DonutBreakdownState = otherSpendingBreakdownData;
const tenYearGiltYieldMetric: TenYearGiltYieldMetricState = tenYearGiltYieldData;
const taxpayerDebtMetric: TaxpayerDebtState = taxpayerDebtData;
const totalDebtMetric: TotalDebtMetricState = totalDebtMetricData;

const initialState: MetricsState = {
  annualInterestPaymentMetric,
  annualBorrowingTimeline,
  annualLendingMetric,
  budgetDeficitMetric,
  borrowingByGovernmentSummary,
  debtToGdpMetric,
  governmentPeriods,
  governmentIncomeBreakdown,
  governmentSpendingBreakdown,
  monthlyInterestPayableMetric,
  otherIncomeBreakdown,
  otherSpendingBreakdown,
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
