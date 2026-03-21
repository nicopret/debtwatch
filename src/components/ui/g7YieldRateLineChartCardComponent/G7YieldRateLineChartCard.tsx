"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./g7YieldRateLineChartCard.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface G7YieldRatePoint {
  dateLabel: string;
  uk10yGiltYieldPct: number;
  g7Average10yYieldPct: number;
  bankRatePct: number;
}

export interface G7YieldRateLineChartCardProps {
  title: string;
  subtitle: string;
  points: G7YieldRatePoint[];
  className?: string;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export default function G7YieldRateLineChartCard({
  title,
  subtitle,
  points,
  className,
}: G7YieldRateLineChartCardProps) {
  const chartData: ChartData<"line"> = {
    labels: points.map((point) => point.dateLabel),
    datasets: [
      {
        label: "UK 10-year gilt",
        data: points.map((point) => point.uk10yGiltYieldPct),
        borderColor: "#b86a1f",
        backgroundColor: "#b86a1f",
        borderWidth: 3,
        tension: 0.22,
        pointRadius: 0,
      },
      {
        label: "G7 average 10-year yield",
        data: points.map((point) => point.g7Average10yYieldPct),
        borderColor: "#17315f",
        backgroundColor: "#17315f",
        borderWidth: 2.5,
        tension: 0.22,
        pointRadius: 0,
      },
      {
        label: "Bank Rate",
        data: points.map((point) => point.bankRatePct),
        borderColor: "#0f766e",
        backgroundColor: "#0f766e",
        borderWidth: 2.5,
        borderDash: [6, 4],
        tension: 0.22,
        pointRadius: 0,
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
            return `${context.dataset.label}: ${formatPercent(value)}`;
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
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
          color: "#556274",
        },
      },
      y: {
        ticks: {
          color: "#556274",
          callback: (value) => formatPercent(Number(value)),
        },
        grid: {
          color: "#e6ebf2",
        },
      },
    },
  };

  const cardClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <article className={cardClassName}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.chartWrap}>
        <Line data={chartData} options={chartOptions} aria-label={title} />
      </div>
    </article>
  );
}
