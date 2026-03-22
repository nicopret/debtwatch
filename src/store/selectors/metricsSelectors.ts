import type { RootState } from "../index";
import {
  parseArticlePublicationMonth,
  parseDataMonth,
  comparePublicationMonths,
} from "@/lib/articlePublicationDate";

export type NumericMetricKey =
  | "annualInterest"
  | "monthlyDebtPayment"
  | "debtToGdp"
  | "borrowingThisYear"
  | "totalDebt";

export const selectLatestDebtToGdpTimelinePoint = (state: RootState) => {
  const items = state.metrics.debtToGdpTimeline.items;
  const latestItem = items[items.length - 1];

  if (!latestItem) {
    return state.metrics.debtToGdpMetric;
  }

  return {
    dateValue: latestItem.yearLabel,
    formattedValue: latestItem.formattedValue,
    numericValue: latestItem.numericValue,
    timestamp: state.metrics.debtToGdpTimeline.timestamp,
  };
};

export const selectCanonicalDebtToGdpMetric = (state: RootState) =>
  selectLatestDebtToGdpTimelinePoint(state);

export function selectArticleDebtToGdpMetric(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectDebtToGdpTimeline(state);

  const matchingPoint =
    timeline.items
      .filter((item) => {
        if (!publicationMonth) {
          return true;
        }

        const itemMonth = parseDataMonth(item.yearLabel);
        return itemMonth
          ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
          : true;
      })
      .at(-1) ?? null;

  if (!matchingPoint) {
    return selectCanonicalDebtToGdpMetric(state);
  }

  return {
    dateValue: matchingPoint.yearLabel,
    formattedValue: matchingPoint.formattedValue,
    numericValue: matchingPoint.numericValue,
    timestamp: timeline.timestamp,
  };
}

export const selectCanonicalAnnualDebtInterestMetric = (state: RootState) =>
  state.metrics.annualInterestPaymentMetric;

export function selectArticleAnnualDebtInterestMetric(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectDebtInterestTimeline(state);

  const matchingPoint =
    timeline.items
      .filter((item) => {
        if (!publicationMonth) {
          return true;
        }

        const itemMonth = parseDataMonth(item.yearLabel);
        return itemMonth
          ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
          : true;
      })
      .at(-1) ?? null;

  if (!matchingPoint) {
    return selectCanonicalAnnualDebtInterestMetric(state);
  }

  return {
    numericValue: matchingPoint.numericValue,
    formattedValue: matchingPoint.formattedValue,
    currencySymbol: state.metrics.annualInterestPaymentMetric.currencySymbol,
    timestamp: timeline.timestamp,
    dateValue: matchingPoint.yearLabel,
  };
}

export function selectArticleMonthlyInterestPayableMetric(
  state: RootState,
  articleDate: string,
) {
  const annualMetric = selectArticleAnnualDebtInterestMetric(state, articleDate);
  const taxpayersMetric = state.metrics.monthlyInterestPayableMetric;
  const monthlyNumericValue = Number((annualMetric.numericValue / taxpayersMetric.taxpayers / 12).toFixed(0));

  return {
    ...taxpayersMetric,
    dateValue: annualMetric.dateValue,
    numericValue: annualMetric.numericValue,
    formattedValue: `\u00A3${monthlyNumericValue.toLocaleString("en-GB")}`,
  };
}

export const annualInterestPaymentValue = (state: RootState) =>
  selectCanonicalAnnualDebtInterestMetric(state).formattedValue;

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

export const selectGiltYieldTimeline = (state: RootState) =>
  state.metrics.giltYieldTimeline;

export const selectFiveYearGiltYieldMetric = (state: RootState) =>
  state.metrics.fiveYearGiltYieldMetric;

export const selectTwentyYearGiltYieldMetric = (state: RootState) =>
  state.metrics.twentyYearGiltYieldMetric;

export const selectFiveYearGiltYieldFormattedValue = (state: RootState) =>
  state.metrics.fiveYearGiltYieldMetric.formattedValue;

export const selectTenYearGiltYieldNumericValue = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.numericValue;

export const selectTenYearGiltYieldFormattedValue = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.formattedValue;

export const selectTenYearGiltYieldDateValue = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.dateValue;

export const selectTenYearGiltYieldSource = (state: RootState) =>
  state.metrics.tenYearGiltYieldMetric.source;

export const selectTwentyYearGiltYieldFormattedValue = (state: RootState) =>
  state.metrics.twentyYearGiltYieldMetric.formattedValue;

export const selectTenYearGiltYieldHelperText = (state: RootState) =>
  `${selectTenYearGiltYieldSource(state)} | ${selectTenYearGiltYieldDateValue(state)}`;

export const selectGiltYieldRatesHelperText = (state: RootState) =>
  `${selectTenYearGiltYieldSource(state)} | ${selectTenYearGiltYieldDateValue(state)}`;

export function selectArticleGiltYieldRates(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectGiltYieldTimeline(state);

  const matchingPoint =
    timeline.items
      .filter((item) => {
        if (!publicationMonth) {
          return true;
        }

        const itemMonth = parseDataMonth(item.dateLabel);
        return itemMonth
          ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
          : true;
      })
      .at(-1) ?? null;

  if (!matchingPoint) {
    return {
      fiveYearFormattedValue: state.metrics.fiveYearGiltYieldMetric.formattedValue,
      tenYearFormattedValue: state.metrics.tenYearGiltYieldMetric.formattedValue,
      twentyYearFormattedValue: state.metrics.twentyYearGiltYieldMetric.formattedValue,
      helperText: selectGiltYieldRatesHelperText(state),
    };
  }

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return {
    fiveYearFormattedValue: formatPercent(matchingPoint.fiveYearGiltYieldPct),
    tenYearFormattedValue: formatPercent(matchingPoint.tenYearGiltYieldPct),
    twentyYearFormattedValue: formatPercent(matchingPoint.twentyYearGiltYieldPct),
    helperText: `${timeline.source} | ${matchingPoint.dateLabel}`,
  };
}

export function selectArticleGiltYieldComparisonRates(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectG7YieldRateTimeline(state);

  const matchingPoint =
    timeline.items
      .filter((item) => {
        if (!publicationMonth) {
          return true;
        }

        const itemMonth = parseDataMonth(item.dateLabel);
        return itemMonth
          ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
          : true;
      })
      .at(-1) ?? null;

  if (!matchingPoint) {
    return {
      ukFormattedValue: "—",
      g7FormattedValue: "—",
      bankRateFormattedValue: "—",
      helperText: "Latest data: unavailable",
    };
  }

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  const formattedDate = (() => {
    const parsed = parseDataMonth(matchingPoint.dateLabel);
    if (!parsed) {
      return matchingPoint.dateLabel;
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${monthNames[parsed.month - 1]} ${parsed.year}`;
  })();

  return {
    ukFormattedValue: formatPercent(matchingPoint.uk10yGiltYieldPct),
    g7FormattedValue: formatPercent(matchingPoint.g7Average10yYieldPct),
    bankRateFormattedValue: formatPercent(matchingPoint.bankRatePct),
    helperText: `Latest data: ${formattedDate}`,
  };
}

export function selectArticleG7YieldRateTimeline(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectG7YieldRateTimeline(state);

  const filteredItems = timeline.items.filter((item) => {
    if (!publicationMonth) {
      return true;
    }

    const itemMonth = parseDataMonth(item.dateLabel);
    return itemMonth
      ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
      : true;
  });

  return {
    ...timeline,
    dateValue: filteredItems.at(-1)?.dateLabel ?? timeline.dateValue,
    items: filteredItems,
  };
}

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

export const selectLatestAnnualBorrowingTimelineItem = (state: RootState) => {
  const items = selectAnnualBorrowingTimelineItems(state);
  return items[items.length - 1] ?? null;
};

export const selectLatestAnnualBorrowingFormattedValue = (state: RootState) =>
  selectLatestAnnualBorrowingTimelineItem(state)?.formattedValue ??
  state.metrics.annualLendingMetric.formattedValue;

export const selectLatestAnnualBorrowingDateValue = (state: RootState) =>
  selectLatestAnnualBorrowingTimelineItem(state)?.yearLabel ??
  state.metrics.annualLendingMetric.dateValue;

export function selectArticleAnnualBorrowingMetric(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectAnnualBorrowingTimeline(state);

  const matchingPoint =
    timeline.items
      .filter((item) => {
        if (!publicationMonth) {
          return true;
        }

        const itemMonth = parseDataMonth(item.yearLabel);
        return itemMonth
          ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
          : true;
      })
      .at(-1) ?? null;

  if (!matchingPoint) {
    const latest = selectLatestAnnualBorrowingTimelineItem(state);

    return {
      dateValue: latest?.yearLabel ?? state.metrics.annualLendingMetric.dateValue,
      formattedValue:
        latest?.formattedValue ?? state.metrics.annualLendingMetric.formattedValue,
      numericValue:
        latest?.numericValue ?? state.metrics.annualLendingMetric.numericValue,
      timestamp: timeline.timestamp,
    };
  }

  return {
    dateValue: matchingPoint.yearLabel,
    formattedValue: matchingPoint.formattedValue,
    numericValue: matchingPoint.numericValue,
    timestamp: timeline.timestamp,
  };
}

export function selectArticleTotalDebtMetric(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const metric = selectTotalDebtMetric(state);

  if (!publicationMonth) {
    return metric;
  }

  const metricMonth = parseDataMonth(metric.dateValue);
  if (!metricMonth || comparePublicationMonths(metricMonth, publicationMonth) <= 0) {
    return metric;
  }

  const debtToGdpMetric = selectArticleDebtToGdpMetric(state, articleDate);
  const annualBorrowingMetric = selectArticleAnnualBorrowingMetric(state, articleDate);
  const fallbackNumericValue = Math.max(
    metric.numericValue - annualBorrowingMetric.numericValue,
    0,
  );

  const formattedValue =
    fallbackNumericValue >= 1_000_000_000_000
      ? `\u00A3${(fallbackNumericValue / 1_000_000_000_000).toFixed(1)}T`
      : `\u00A3${(fallbackNumericValue / 1_000_000_000).toFixed(0)}B`;

  return {
    ...metric,
    numericValue: fallbackNumericValue,
    formattedValue,
    dateValue: debtToGdpMetric.dateValue,
  };
}

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

export const selectDebtInterestTimeline = (state: RootState) =>
  state.metrics.debtInterestTimeline;

export const selectDebtInterestTimelineItems = (state: RootState) =>
  state.metrics.debtInterestTimeline.items;

export const selectDebtSustainabilityTimeline = (state: RootState) =>
  state.metrics.debtSustainabilityTimeline;

export const selectDebtSustainabilityTimelineItems = (state: RootState) =>
  state.metrics.debtSustainabilityTimeline.items;

export function selectArticleDebtSustainabilityTimeline(
  state: RootState,
  articleDate: string,
) {
  const publicationMonth = parseArticlePublicationMonth(articleDate);
  const timeline = selectDebtSustainabilityTimeline(state);

  const filteredItems = timeline.items.filter((item) => {
    if (!publicationMonth) {
      return true;
    }

    const itemMonth = parseDataMonth(item.yearLabel);
    return itemMonth
      ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
      : true;
  });

  return {
    ...timeline,
    dateValue: filteredItems.at(-1)?.yearLabel ?? timeline.dateValue,
    items: filteredItems,
  };
}

export const selectDebtInterestTimelinePoints = (state: RootState) =>
  selectDebtInterestTimelineItems(state).map((item) => ({
    yearLabel: item.yearLabel,
    numericValue: item.numericValue,
    formattedValue: item.formattedValue,
    governmentLabel: item.governmentLabel,
  }));

export const selectDebtInterestGovernmentBands = (state: RootState) =>
  buildGovernmentBands(selectDebtInterestTimelineItems(state), selectGovernmentPeriods(state));

export const selectDebtInterestSummary = (state: RootState) =>
  state.metrics.debtInterestSummary;

export const selectDebtInterestVsPublicServicePay = (state: RootState) =>
  state.metrics.debtInterestVsPublicServicePay;

export const selectDebtOwnershipBreakdown = (state: RootState) =>
  state.metrics.debtOwnershipBreakdown;

export const selectDebtOwnershipBreakdownItems = (state: RootState) =>
  state.metrics.debtOwnershipBreakdown.items;

export const selectLatestAnnualDebtInterest = (state: RootState) => {
  const metric = selectCanonicalAnnualDebtInterestMetric(state);

  return {
    year: metric.dateValue,
    numericValue: metric.numericValue,
    formattedValue: metric.formattedValue,
  };
};

export const selectDebtInterestPeakYear = (state: RootState) =>
  state.metrics.debtInterestSummary.peakYear;

export const selectDebtInterestPeakAmount = (state: RootState) =>
  state.metrics.debtInterestSummary.peakYearAmount;

export const selectDebtInterestPeakGovernment = (state: RootState) =>
  state.metrics.debtInterestSummary.peakGovernment;

export const selectAverageAnnualDebtInterest = (state: RootState) =>
  state.metrics.debtInterestSummary.averageAnnualInterest;

export const selectDebtInterestLatestVsAverage = (state: RootState) => {
  const latest = selectLatestAnnualDebtInterest(state);
  const average = selectAverageAnnualDebtInterest(state);
  const numericDifference = latest.numericValue - average.numericValue;
  const percentageDifference =
    average.numericValue === 0 ? 0 : (numericDifference / average.numericValue) * 100;
  const sign = numericDifference > 0 ? "+" : numericDifference < 0 ? "-" : "";

  return {
    numericDifference,
    formattedDifference: `${sign}\u00A3${(
      Math.abs(numericDifference) / 1_000_000_000
    ).toFixed(Math.abs(numericDifference) >= 100_000_000_000 ? 0 : 1)}B`,
    percentageDifference,
    formattedPercentageDifference: `${sign}${Math.abs(percentageDifference).toFixed(1)}%`,
  };
};

export const selectDebtInterestGovernmentTotals = (state: RootState) =>
  state.metrics.debtInterestSummary.governmentTotals;

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

export const selectG7YieldComparison = (state: RootState) =>
  state.metrics.g7YieldComparison;

export const selectG7YieldRateTimeline = (state: RootState) =>
  state.metrics.g7YieldRateTimeline;

export const selectGiltYieldPeerTimeline = (state: RootState) =>
  state.metrics.giltYieldPeerTimeline;

export const selectInflationLinkedDebtExposure = (state: RootState) =>
  state.metrics.inflationLinkedDebtExposure;

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
