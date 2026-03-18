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

import styles from "./debtSustainabilityLineChartCard.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface DebtSustainabilityPoint {
  yearLabel: string;
  debtToGdpPct: number;
  nominalGdpGrowthPct: number;
  realGdpGrowthPct: number;
  borrowingCostPct: number;
}

export interface DebtSustainabilityLineChartCardProps {
  title: string;
  subtitle: string;
  points: DebtSustainabilityPoint[];
  className?: string;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export default function DebtSustainabilityLineChartCard({
  title,
  subtitle,
  points,
  className,
}: DebtSustainabilityLineChartCardProps) {
  const chartData: ChartData<"line"> = {
    labels: points.map((point) => point.yearLabel),
    datasets: [
      {
        label: "Debt to GDP",
        data: points.map((point) => point.debtToGdpPct),
        borderColor: "#17315f",
        backgroundColor: "#17315f",
        borderWidth: 3,
        yAxisID: "yDebt",
        tension: 0.22,
        pointRadius: 0,
      },
      {
        label: "Nominal GDP growth",
        data: points.map((point) => point.nominalGdpGrowthPct),
        borderColor: "#0f766e",
        backgroundColor: "#0f766e",
        borderWidth: 2.5,
        yAxisID: "yRates",
        tension: 0.22,
        pointRadius: 0,
      },
      {
        label: "Real GDP growth",
        data: points.map((point) => point.realGdpGrowthPct),
        borderColor: "#c75b5b",
        backgroundColor: "#c75b5b",
        borderWidth: 2.5,
        yAxisID: "yRates",
        tension: 0.22,
        pointRadius: 0,
      },
      {
        label: "Borrowing cost",
        data: points.map((point) => point.borrowingCostPct),
        borderColor: "#b86a1f",
        backgroundColor: "#b86a1f",
        borderWidth: 2.5,
        borderDash: [6, 4],
        yAxisID: "yRates",
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
      yDebt: {
        type: "linear",
        position: "left",
        ticks: {
          color: "#556274",
          callback: (value) => formatPercent(Number(value)),
        },
        grid: {
          color: "#e6ebf2",
        },
      },
      yRates: {
        type: "linear",
        position: "right",
        ticks: {
          color: "#556274",
          callback: (value) => formatPercent(Number(value)),
        },
        grid: {
          drawOnChartArea: false,
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
