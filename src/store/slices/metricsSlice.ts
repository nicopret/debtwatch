import { createSlice } from "@reduxjs/toolkit";

import annualInterestPaymentData from "@/data/annualInterestPayableMetric.json";
import annualBorrowingTimelineData from "@/data/annualBorrowingTimeline.json";
import annualLendingData from "@/data/annualLendingMetric.json";
import budgetDeficitData from "@/data/budgetDeficitMetric.json";
import borrowingByGovernmentSummaryData from "@/data/borrowingByGovernmentSummary.json";
import debtInterestSummaryData from "@/data/debtInterestSummary.json";
import debtInterestTimelineData from "@/data/debtInterestTimeline.json";
import debtInterestVsPublicServicePayData from "@/data/debtInterestVsPublicServicePay.json";
import debtSustainabilityTimelineData from "@/data/debtSustainabilityTimeline.json";
import debtToGdpTimelineData from "@/data/debtToGdpTimeline.json";
import debtToGdpData from "@/data/debtToGdpMetrics.json";
import fiveYearGiltYieldData from "@/data/fiveYearGiltYieldMetric.json";
import g7DebtToGdpComparisonData from "@/data/g7DebtToGdpComparison.json";
import g7YieldRateTimelineData from "@/data/g7YieldRateTimeline.json";
import giltYieldTimelineData from "@/data/giltYieldTimeline.json";
import giltYieldPeerTimelineData from "@/data/giltYieldPeerTimeline.json";
import governmentIncomeBreakdownData from "@/data/governmentIncomeBreakdown.json";
import governmentSpendingBreakdownData from "@/data/governmentSpendingBreakdown.json";
import g7YieldComparisonData from "@/data/g7YieldComparison.json";
import inflationLinkedDebtExposureData from "@/data/inflationLinkedDebtExposure.json";
import monthlyInterestPayableData from "@/data/monthlyInterestPayableMetric.json";
import otherIncomeBreakdownData from "@/data/otherIncomeBreakdown.json";
import otherSpendingBreakdownData from "@/data/otherSpendingBreakdown.json";
import tenYearGiltYieldData from "@/data/tenYearGiltYieldMetric.json";
import taxpayerDebtData from "@/data/taxpayerDebt.json";
import totalDebtMetricData from "@/data/totalDebtMetrics.json";
import twentyYearGiltYieldData from "@/data/twentyYearGiltYieldMetric.json";
import ukDebtOwnershipBreakdownData from "@/data/ukDebtOwnershipBreakdown.json";
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

export interface DebtInterestTimelineItemState {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentKey: string;
  governmentLabel: string;
}

export interface DebtInterestTimelineState {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtInterestTimelineItemState[];
}

export interface DebtSustainabilityTimelineItemState {
  yearLabel: string;
  debtToGdpPct: number;
  nominalGdpGrowthPct: number;
  realGdpGrowthPct: number;
  borrowingCostPct: number;
}

export interface DebtSustainabilityTimelineState {
  title: string;
  subtitle: string;
  unit: string;
  xKey: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtSustainabilityTimelineItemState[];
}

export interface DebtInterestSummaryGovernmentTotalState {
  governmentKey: string;
  governmentLabel: string;
  startYear: number;
  endYear: number | null;
  totalNumericValue: number;
  totalFormattedValue: string;
  averageAnnualNumericValue: number;
  averageAnnualFormattedValue: string;
}

export interface DebtInterestSummaryState {
  timestamp: string;
  dateValue: string;
  source: string;
  latestAnnualInterest: {
    year: string;
    numericValue: number;
    formattedValue: string;
  };
  peakYear: string;
  peakYearAmount: {
    numericValue: number;
    formattedValue: string;
  };
  peakGovernment: {
    governmentKey: string;
    governmentLabel: string;
  };
  averageAnnualInterest: {
    numericValue: number;
    formattedValue: string;
  };
  latestVsAverage: {
    numericDifference: number;
    formattedDifference: string;
    percentageDifference: number;
    formattedPercentageDifference: string;
  };
  governmentTotals: DebtInterestSummaryGovernmentTotalState[];
}

export interface DebtInterestVsPublicServicePayItemState {
  key:
    | "debt_interest"
    | "health_pay"
    | "education_pay"
    | "public_order_pay"
    | "general_public_services_pay"
    | "defence_pay"
    | "social_protection_pay";
  label: string;
  value: number;
  color: "amber" | "darkNavy";
}

export interface DebtInterestVsPublicServicePayState {
  title: string;
  subtitle: string;
  unit: "gbp_billions";
  basis: "calendar_year";
  dateValue: string;
  timestamp: string;
  source: string;
  debtInterestDefinition: string;
  publicServicePayDefinition: string;
  items: DebtInterestVsPublicServicePayItemState[];
}
export interface DebtToGdpState {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
}

export interface DebtToGdpTimelineItemState {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentKey: string;
  governmentLabel: string;
}

export interface DebtToGdpTimelineState {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtToGdpTimelineItemState[];
}

export interface G7DebtToGdpCountryState {
  countryCode: string;
  countryLabel: string;
  numericValue: number;
  formattedValue: string;
  rank: number;
}

export interface G7DebtToGdpComparisonState {
  timestamp: string;
  dateValue: string;
  source: string;
  uk: G7DebtToGdpCountryState;
  g7: G7DebtToGdpCountryState[];
  ukRankInG7: number;
  g7AverageNumericValue: number;
  g7AverageFormattedValue: string;
  differenceFromG7AverageNumericValue: number;
  differenceFromG7AverageFormattedValue: string;
  highestCountry: G7DebtToGdpCountryState;
  lowestCountry: G7DebtToGdpCountryState;
}

export interface G7YieldComparisonItemState {
  key:
    | "united_kingdom"
    | "united_states"
    | "canada"
    | "france"
    | "germany"
    | "italy"
    | "japan";
  countryCode: string;
  label: string;
  value: number;
  formattedValue: string;
  color: "amber" | "neutral";
  highlight: boolean;
  rank: number;
}

export interface G7YieldComparisonState {
  title: string;
  subtitle: string;
  unit: "percent";
  dateValue: string;
  period: string;
  timestamp: string;
  source: string;
  items: G7YieldComparisonItemState[];
}

export interface G7YieldRateTimelineItemState {
  dateLabel: string;
  uk10yGiltYieldPct: number;
  g7Average10yYieldPct: number;
  bankRatePct: number;
}

export interface G7YieldRateTimelineState {
  title: string;
  subtitle: string;
  unit: "percent";
  xKey: "date";
  dateValue: string;
  timestamp: string;
  source: string;
  items: G7YieldRateTimelineItemState[];
}

export interface InflationLinkedDebtExposureItemState {
  key:
    | "cpi"
    | "rpi"
    | "index_linked_debt"
    | "extra_debt_from_rpi_linkage";
  label: string;
  value: number;
  unit: "percent" | "gbp_billions";
  color: "neutral" | "amber";
  highlight: boolean;
}

export interface InflationLinkedDebtExposureState {
  title: string;
  subtitle: string;
  period: string;
  timestamp: string;
  source: string;
  inflationDefinition: string;
  debtDefinition: string;
  calculationNote: string;
  items: InflationLinkedDebtExposureItemState[];
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

export interface GiltYieldMetricState {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
  source: string;
}

export interface GiltYieldTimelineItemState {
  dateLabel: string;
  fiveYearGiltYieldPct: number;
  tenYearGiltYieldPct: number;
  twentyYearGiltYieldPct: number;
}

export interface GiltYieldTimelineState {
  title: string;
  unit: "percent";
  xKey: "date";
  dateValue: string;
  timestamp: string;
  source: string;
  items: GiltYieldTimelineItemState[];
}

export interface GiltYieldPeerTimelineItemState {
  dateLabel: string;
  uk10yGiltYieldPct: number;
  g7Average10yYieldPct: number;
}

export interface GiltYieldPeerTimelineState {
  title: string;
  subtitle: string;
  unit: "percent";
  xKey: "date";
  dateValue: string;
  timestamp: string;
  source: string;
  items: GiltYieldPeerTimelineItemState[];
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

export interface DebtOwnershipBreakdownItemState {
  key:
    | "international_investors"
    | "local_investors"
    | "governments"
    | "central_bank";
  label: string;
  value: number;
}

export interface DebtOwnershipBreakdownState {
  title: string;
  unit: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtOwnershipBreakdownItemState[];
}

export interface MetricsState {
  annualInterestPaymentMetric: AnnualInterestPaymentState;
  annualBorrowingTimeline: AnnualBorrowingTimelineState;
  annualLendingMetric: AnnualLendingtState;
  budgetDeficitMetric: BudgetDeficitMetricState;
  borrowingByGovernmentSummary: BorrowingByGovernmentSummaryState;
  debtInterestSummary: DebtInterestSummaryState;
  debtInterestTimeline: DebtInterestTimelineState;
  debtInterestVsPublicServicePay: DebtInterestVsPublicServicePayState;
  debtSustainabilityTimeline: DebtSustainabilityTimelineState;
  debtOwnershipBreakdown: DebtOwnershipBreakdownState;
  debtToGdpMetric: DebtToGdpState;
  debtToGdpTimeline: DebtToGdpTimelineState;
  fiveYearGiltYieldMetric: GiltYieldMetricState;
  g7DebtToGdpComparison: G7DebtToGdpComparisonState;
  g7YieldComparison: G7YieldComparisonState;
  g7YieldRateTimeline: G7YieldRateTimelineState;
  giltYieldTimeline: GiltYieldTimelineState;
  giltYieldPeerTimeline: GiltYieldPeerTimelineState;
  inflationLinkedDebtExposure: InflationLinkedDebtExposureState;
  governmentPeriods: GovernmentPeriod[];
  governmentIncomeBreakdown: BudgetBreakdownState;
  governmentSpendingBreakdown: BudgetBreakdownState;
  monthlyInterestPayableMetric: MonthlyInterestPayableState;
  otherIncomeBreakdown: DonutBreakdownState;
  otherSpendingBreakdown: DonutBreakdownState;
  tenYearGiltYieldMetric: GiltYieldMetricState;
  taxpayerDebtMetric: TaxpayerDebtState;
  totalDebtMetric: TotalDebtMetricState;
  twentyYearGiltYieldMetric: GiltYieldMetricState;
}

const annualInterestPaymentMetric: AnnualInterestPaymentState = annualInterestPaymentData;
const annualBorrowingTimeline: AnnualBorrowingTimelineState = annualBorrowingTimelineData;
const annualLendingMetric: AnnualLendingtState = annualLendingData;
const budgetDeficitMetric: BudgetDeficitMetricState = budgetDeficitData;
const borrowingByGovernmentSummary: BorrowingByGovernmentSummaryState =
  borrowingByGovernmentSummaryData;
const debtInterestSummary: DebtInterestSummaryState = debtInterestSummaryData;
const debtInterestTimeline: DebtInterestTimelineState = debtInterestTimelineData;
const debtInterestVsPublicServicePay: DebtInterestVsPublicServicePayState =
  debtInterestVsPublicServicePayData as DebtInterestVsPublicServicePayState;
const debtSustainabilityTimeline: DebtSustainabilityTimelineState =
  debtSustainabilityTimelineData;
const debtOwnershipBreakdown =
  ukDebtOwnershipBreakdownData as DebtOwnershipBreakdownState;
const debtToGdpMetric: DebtToGdpState = debtToGdpData;
const debtToGdpTimeline: DebtToGdpTimelineState = debtToGdpTimelineData;
const fiveYearGiltYieldMetric: GiltYieldMetricState = fiveYearGiltYieldData;
const g7DebtToGdpComparison: G7DebtToGdpComparisonState = g7DebtToGdpComparisonData;
const g7YieldComparison: G7YieldComparisonState =
  g7YieldComparisonData as G7YieldComparisonState;
const g7YieldRateTimeline: G7YieldRateTimelineState =
  g7YieldRateTimelineData as G7YieldRateTimelineState;
const giltYieldTimeline: GiltYieldTimelineState =
  giltYieldTimelineData as GiltYieldTimelineState;
const giltYieldPeerTimeline: GiltYieldPeerTimelineState =
  giltYieldPeerTimelineData as GiltYieldPeerTimelineState;
const inflationLinkedDebtExposure: InflationLinkedDebtExposureState =
  inflationLinkedDebtExposureData as InflationLinkedDebtExposureState;
const governmentPeriods: GovernmentPeriod[] = GOVERNMENT_PERIODS;
const governmentIncomeBreakdown: BudgetBreakdownState = governmentIncomeBreakdownData;
const governmentSpendingBreakdown: BudgetBreakdownState = governmentSpendingBreakdownData;
const monthlyInterestPayableMetric: MonthlyInterestPayableState = monthlyInterestPayableData;
const otherIncomeBreakdown: DonutBreakdownState = otherIncomeBreakdownData;
const otherSpendingBreakdown: DonutBreakdownState = otherSpendingBreakdownData;
const tenYearGiltYieldMetric: GiltYieldMetricState = tenYearGiltYieldData;
const taxpayerDebtMetric: TaxpayerDebtState = taxpayerDebtData;
const totalDebtMetric: TotalDebtMetricState = totalDebtMetricData;
const twentyYearGiltYieldMetric: GiltYieldMetricState = twentyYearGiltYieldData;

const initialState: MetricsState = {
  annualInterestPaymentMetric,
  annualBorrowingTimeline,
  annualLendingMetric,
  budgetDeficitMetric,
  borrowingByGovernmentSummary,
  debtInterestSummary,
  debtInterestTimeline,
  debtInterestVsPublicServicePay,
  debtSustainabilityTimeline,
  debtOwnershipBreakdown,
  debtToGdpMetric,
  debtToGdpTimeline,
  fiveYearGiltYieldMetric,
  g7DebtToGdpComparison,
  g7YieldComparison,
  g7YieldRateTimeline,
  giltYieldTimeline,
  giltYieldPeerTimeline,
  inflationLinkedDebtExposure,
  governmentPeriods,
  governmentIncomeBreakdown,
  governmentSpendingBreakdown,
  monthlyInterestPayableMetric,
  otherIncomeBreakdown,
  otherSpendingBreakdown,
  tenYearGiltYieldMetric,
  taxpayerDebtMetric,
  totalDebtMetric,
  twentyYearGiltYieldMetric,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
});

export const metricsReducer = metricsSlice.reducer;
