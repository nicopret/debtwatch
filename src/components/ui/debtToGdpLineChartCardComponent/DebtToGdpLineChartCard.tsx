"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  createGovernmentBandsPlugin,
  type ChartGovernmentBand,
} from "../annualBorrowingLineChartCardComponent/governmentBandsPlugin";
import styles from "./debtToGdpLineChartCard.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export interface DebtToGdpPoint {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentLabel: string;
}

export type GovernmentBand = ChartGovernmentBand;

export interface DebtToGdpLineChartCardProps {
  title: string;
  subtitle: string;
  points: DebtToGdpPoint[];
  governmentBands: GovernmentBand[];
  className?: string;
}

function formatRatio(value: number): string {
  return `${value.toFixed(1)}%`;
}

export default function DebtToGdpLineChartCard({
  title,
  subtitle,
  points,
  governmentBands,
  className,
}: DebtToGdpLineChartCardProps) {
  const chartData: ChartData<"line"> = {
    labels: points.map((point) => point.yearLabel),
    datasets: [
      {
        data: points.map((point) => point.numericValue),
        borderColor: "#17315f",
        backgroundColor: "rgba(23, 49, 95, 0.12)",
        borderWidth: 3,
        tension: 0.22,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: false,
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
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (items) => items[0]?.label ?? "",
          label: (context) => {
            const point = points[context.dataIndex];
            const numericValue =
              typeof context.parsed.y === "number" ? context.parsed.y : 0;
            return `Debt / GDP: ${point?.formattedValue ?? formatRatio(numericValue)}`;
          },
          afterLabel: (context) => {
            const point = points[context.dataIndex];
            return point ? `Government: ${point.governmentLabel}` : "";
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
          callback: (value) => formatRatio(Number(value)),
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
        <Line
          data={chartData}
          options={chartOptions}
          plugins={[createGovernmentBandsPlugin(governmentBands)]}
          aria-label={title}
        />
      </div>
    </article>
  );
}
