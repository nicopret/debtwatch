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
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./budgetReceiptsSpendingHeroChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export interface BudgetReceiptsSpendingHeroPoint {
  yearLabel: string;
  receipts: number;
  spending: number;
  gap: number;
  receiptsFormatted: string;
  spendingFormatted: string;
  gapFormatted: string;
}

export interface BudgetReceiptsSpendingHeroChartProps {
  title: string;
  subtitle: string;
  points: BudgetReceiptsSpendingHeroPoint[];
}

function formatBillions(value: number): string {
  return `£${Math.round(value).toLocaleString("en-GB")}bn`;
}

export default function BudgetReceiptsSpendingHeroChart({
  title,
  subtitle,
  points,
}: BudgetReceiptsSpendingHeroChartProps) {
  const chartData: ChartData<"line"> = {
    labels: points.map((point) => point.yearLabel),
    datasets: [
      {
        label: "Receipts",
        data: points.map((point) => point.receipts),
        borderColor: "#17315f",
        backgroundColor: "#17315f",
        pointBackgroundColor: "#17315f",
        pointBorderColor: "#17315f",
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 3,
        tension: 0.28,
      },
      {
        label: "Spending",
        data: points.map((point) => point.spending),
        borderColor: "#8fa8c9",
        backgroundColor: "#8fa8c9",
        pointBackgroundColor: "#8fa8c9",
        pointBorderColor: "#8fa8c9",
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 3,
        tension: 0.28,
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
            return point ? [`Gap: ${point.gapFormatted}`] : [];
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

  const latestPoint = points.at(-1);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.chartWrap}>
        <Line data={chartData} options={chartOptions} aria-label={title} />
      </div>

      {latestPoint ? (
        <p className={styles.footer}>
          Latest gap {latestPoint.yearLabel}: <strong>{latestPoint.gapFormatted}</strong>
        </p>
      ) : null}
    </article>
  );
}
