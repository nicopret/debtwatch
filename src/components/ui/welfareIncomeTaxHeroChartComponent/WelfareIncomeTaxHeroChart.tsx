"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { WELFARE_INCOME_TAX_CHART_CONFIG } from "@/lib/welfareIncomeTaxChartConfig";

import styles from "./welfareIncomeTaxHeroChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export interface WelfareIncomeTaxHeroPoint {
  dateLabel: string;
  incomeTax: number;
  benefits: number;
  gap: number;
  incomeTaxFormatted: string;
  benefitsFormatted: string;
  gapFormatted: string;
}

export interface WelfareIncomeTaxHeroChartProps {
  title: string;
  subtitle: string;
  source: string;
  dateValue: string;
  points: WelfareIncomeTaxHeroPoint[];
}

function formatBillions(value: number): string {
  return `\u00A3${Math.round(value).toLocaleString("en-GB")}bn`;
}

function endpointRadius(pointCount: number) {
  return (context: ScriptableContext<"line">) =>
    context.dataIndex === pointCount - 1 ? 4 : 0;
}

export default function WelfareIncomeTaxHeroChart({
  title,
  subtitle,
  source,
  dateValue,
  points,
}: WelfareIncomeTaxHeroChartProps) {
  const latestPoint = points.at(-1);

  const chartData: ChartData<"line"> = {
    labels: points.map((point) => point.dateLabel),
    datasets: [
      {
        label: WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.label,
        data: points.map((point) => point.incomeTax),
        borderColor: WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.color,
        backgroundColor: WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.color,
        pointBackgroundColor: WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.color,
        pointBorderColor: WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.color,
        pointRadius: endpointRadius(points.length),
        pointHoverRadius: 5,
        borderWidth: 3,
        tension: 0.24,
      },
      {
        label: WELFARE_INCOME_TAX_CHART_CONFIG.benefits.label,
        data: points.map((point) => point.benefits),
        borderColor: WELFARE_INCOME_TAX_CHART_CONFIG.benefits.color,
        backgroundColor: WELFARE_INCOME_TAX_CHART_CONFIG.benefits.color,
        pointBackgroundColor: WELFARE_INCOME_TAX_CHART_CONFIG.benefits.color,
        pointBorderColor: WELFARE_INCOME_TAX_CHART_CONFIG.benefits.color,
        pointRadius: endpointRadius(points.length),
        pointHoverRadius: 5,
        borderWidth: 3,
        tension: 0.24,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#556274",
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          title: (items) => items[0]?.label ?? "",
          label: (context) => {
            const value =
              typeof context.parsed.y === "number" ? context.parsed.y : 0;
            return `${context.dataset.label}: ${formatBillions(value)}`;
          },
          afterBody: (items) => {
            const point = points[items[0]?.dataIndex ?? 0];
            if (!point) {
              return [];
            }

            const direction = point.gap >= 0 ? "Benefits minus income tax" : "Income tax minus benefits";
            return [`${direction}: ${point.gapFormatted}`];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#556274",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          callback: (_value, index) => {
            const label = points[index]?.dateLabel ?? "";
            const [month, year] = label.split(" ");
            return month === "Feb" ? year : "";
          },
        },
      },
      y: {
        ticks: {
          color: "#556274",
          callback: (value) => formatBillions(Number(value)),
        },
        grid: {
          color: "#e6ebf2",
        },
      },
    },
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
        {latestPoint ? (
          <div className={styles.summaryRow}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Income tax</span>
              <strong className={styles.summaryValue}>{latestPoint.incomeTaxFormatted}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Benefits</span>
              <strong className={styles.summaryValue}>{latestPoint.benefitsFormatted}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Latest gap</span>
              <strong className={styles.summaryValue}>{latestPoint.gapFormatted}</strong>
            </div>
          </div>
        ) : null}
      </header>

      <div className={styles.chartWrap}>
        <Line data={chartData} options={chartOptions} aria-label={title} />
      </div>

      <p className={styles.footer}>
        Latest rolling 12 months to <strong>{dateValue}</strong>. Source: {source}.
      </p>
    </article>
  );
}
