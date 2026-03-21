"use client";

import ArticleMetricStrip from "@/components/ui/articleMetricStripComponent/ArticleMetricStrip";
import type { ArticleMetricStripItem } from "@/components/ui/articleMetricStripComponent/ArticleMetricStrip";
import type { ArticleData, ArticleMetricReference } from "@/data/articles/articleTypes";
import { useAppSelector } from "@/store/hooks";
import {
  annualInterestPaymentValue,
  debtToGdpValue,
  monthlyInterestPayableValue,
  selectLatestAnnualBorrowingFormattedValue,
  selectTotalDebtFormattedValue,
  selectTenYearGiltYieldFormattedValue,
} from "@/store/selectors/metricsSelectors";

export interface ArticleMetricStripContainerProps {
  article: ArticleData;
}

function resolveMetricValue(
  metric: ArticleMetricReference,
  metricValues: Record<
    | "annualInterestPayment"
    | "monthlyInterestPayable"
    | "annualBorrowing"
    | "debtToGdp"
    | "totalDebt"
    | "tenYearGiltYield",
    string
  >,
): ArticleMetricStripItem {
  if (metric.kind === "static") {
    return {
      label: metric.label,
      value: metric.value,
      helperText: metric.helperText,
      tone: metric.tone,
      moreText: metric.moreText,
      moreHref: metric.moreHref,
    };
  }

  const value =
    metric.metricKey === "annualInterestPayment" ? metricValues.annualInterestPayment :
    metric.metricKey === "monthlyInterestPayable" ? metricValues.monthlyInterestPayable :
    metric.metricKey === "annualBorrowing" ? metricValues.annualBorrowing :
    metric.metricKey === "debtToGdp" ? metricValues.debtToGdp :
    metric.metricKey === "totalDebt" ? metricValues.totalDebt :
    metricValues.tenYearGiltYield;

  return {
    label: metric.label,
    value,
    helperText: metric.helperText,
    tone: metric.tone,
    moreText: metric.moreText,
    moreHref: metric.moreHref,
  };
}

export default function ArticleMetricStripContainer({
  article,
}: ArticleMetricStripContainerProps) {
  const metricValues = {
    annualInterestPayment: useAppSelector(annualInterestPaymentValue),
    monthlyInterestPayable: useAppSelector(monthlyInterestPayableValue),
    annualBorrowing: useAppSelector(selectLatestAnnualBorrowingFormattedValue),
    debtToGdp: useAppSelector(debtToGdpValue),
    totalDebt: useAppSelector(selectTotalDebtFormattedValue),
    tenYearGiltYield: useAppSelector(selectTenYearGiltYieldFormattedValue),
  };
  const metrics = article.metricStrip.map((metric) => resolveMetricValue(metric, metricValues));

  return <ArticleMetricStrip metrics={metrics} />;
}
