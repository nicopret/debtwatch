import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import type { MetricCardTone } from "@/components/ui/metricCardComponent/MetricCard";
import styles from "./articleMetricStrip.module.css";

export interface ArticleMetricStripItem {
  label: string;
  value: string;
  helperText: string;
  tone?: MetricCardTone;
  moreText?: string;
  moreHref?: string;
}

export interface ArticleMetricStripProps {
  metrics: ArticleMetricStripItem[];
}

export default function ArticleMetricStrip({ metrics }: ArticleMetricStripProps) {
  return (
    <section className={styles.strip}>
      {metrics.map((metric) => (
        <MetricCard
          key={`${metric.label}-${metric.value}`}
          headerText={metric.label}
          bodyText={metric.value}
          footerText={metric.helperText}
          moreText={metric.moreText}
          moreHref={metric.moreHref}
          tone={metric.tone}
        />
      ))}
    </section>
  );
}

