"use client";

import ArticleMetricStrip from "@/components/ui/articleMetricStripComponent/ArticleMetricStrip";
import type { ArticleMetricStripItem } from "@/components/ui/articleMetricStripComponent/ArticleMetricStrip";
import type { ArticleData, ArticleMetricReference } from "@/data/articles/articleTypes";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleAnnualDebtInterestMetric,
  selectArticleAnnualBorrowingMetric,
  selectArticleDebtToGdpMetric,
  selectArticleMonthlyInterestPayableMetric,
  selectArticleGiltYieldRates,
  selectArticleTotalDebtMetric,
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
  // Article strips intentionally use article-safe selectors. Landing-page cards can use the
  // latest canonical store metrics, but article metrics must stay capped to what was
  // available on or before the article publication date.
  const articleAnnualInterestMetric = useAppSelector((state) =>
    selectArticleAnnualDebtInterestMetric(state, article.date),
  );
  const articleAnnualBorrowingMetric = useAppSelector((state) =>
    selectArticleAnnualBorrowingMetric(state, article.date),
  );
  const articleMonthlyInterestMetric = useAppSelector((state) =>
    selectArticleMonthlyInterestPayableMetric(state, article.date),
  );
  const articleDebtToGdpMetric = useAppSelector((state) =>
    selectArticleDebtToGdpMetric(state, article.date),
  );
  const articleTotalDebtMetric = useAppSelector((state) =>
    selectArticleTotalDebtMetric(state, article.date),
  );
  const articleGiltRates = useAppSelector((state) =>
    selectArticleGiltYieldRates(state, article.date),
  );
  const metricValues = {
    annualInterestPayment: articleAnnualInterestMetric.formattedValue,
    monthlyInterestPayable: articleMonthlyInterestMetric.formattedValue,
    annualBorrowing: articleAnnualBorrowingMetric.formattedValue,
    debtToGdp: articleDebtToGdpMetric.formattedValue,
    totalDebt: articleTotalDebtMetric.formattedValue,
    tenYearGiltYield: articleGiltRates.tenYearFormattedValue,
  };
  const metrics = article.metricStrip.map((metric) => resolveMetricValue(metric, metricValues));

  return <ArticleMetricStrip metrics={metrics} />;
}
