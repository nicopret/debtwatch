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
import ChartEmbedAction, {
  type ChartEmbedActionProps,
} from "@/components/ui/chartEmbedActionComponent/ChartEmbedAction";
import {
  createGovernmentBandsPlugin,
  type ChartGovernmentBand,
} from "./governmentBandsPlugin";
import styles from "./annualBorrowingLineChartCard.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export interface AnnualBorrowingPoint {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentLabel: string;
}

export type GovernmentBand = ChartGovernmentBand;

export interface AnnualBorrowingLineChartCardProps {
  title: string;
  subtitle: string;
  points: AnnualBorrowingPoint[];
  governmentBands: GovernmentBand[];
  embedAction?: ChartEmbedActionProps;
  className?: string;
}

function formatBillions(value: number): string {
  const billions = value / 1_000_000_000;
  const fractionDigits = Number.isInteger(billions) || Math.abs(billions) >= 100 ? 0 : 1;
  return `\u00A3${billions.toFixed(fractionDigits)}B`;
}

export default function AnnualBorrowingLineChartCard({
  title,
  subtitle,
  points,
  governmentBands,
  embedAction,
  className,
}: AnnualBorrowingLineChartCardProps) {
  const governmentBandPlugin = createGovernmentBandsPlugin(governmentBands);

  const chartData: ChartData<"line"> = {
    labels: points.map((point) => point.yearLabel),
    datasets: [
      {
        data: points.map((point) => point.numericValue),
        borderColor: "#1d3e77",
        backgroundColor: "rgba(29, 62, 119, 0.12)",
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
            return `Borrowing: ${point?.formattedValue ?? formatBillions(numericValue)}`;
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
          callback: (value) => formatBillions(Number(value)),
        },
        grid: {
          color: "#e6ebf2",
        },
      },
    },
  };

  const cardClassName = [styles.card, "chart-card", className].filter(Boolean).join(" ");

  return (
    <article className={cardClassName}>
      <header className={styles.header}>
        <div>
          <p className={styles.subtitle}>{subtitle}</p>
          <h3 className={`${styles.title} chart-card-title`}>{title}</h3>
        </div>
        {embedAction ? <ChartEmbedAction {...embedAction} /> : null}
      </header>

      <div className={`${styles.chartWrap} chart-card-plot`}>
        <Line
          data={chartData}
          options={chartOptions}
          plugins={[governmentBandPlugin]}
          aria-label={title}
        />
      </div>
    </article>
  );
}
