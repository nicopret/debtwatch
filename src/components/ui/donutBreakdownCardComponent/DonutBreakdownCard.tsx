"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./donutBreakdownCard.module.css";

ChartJS.register(ArcElement, Tooltip);

export interface DonutBreakdownItem {
  label: string;
  formattedValue: string;
  formattedPercentage: string;
  percentageValue: number;
  color: string;
}

export interface DonutBreakdownCardProps {
  title: string;
  subtitle: string;
  items: DonutBreakdownItem[];
  totalValue: string;
  centerLabel?: string;
  className?: string;
}

const chartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) =>
          `${context.label}: ${context.formattedValue}%`,
      },
    },
  },
};

export default function DonutBreakdownCard({
  title,
  subtitle,
  items,
  totalValue,
  centerLabel,
  className,
}: DonutBreakdownCardProps) {
  const displayItems = [...items].sort(
    (left, right) => right.percentageValue - left.percentageValue,
  );

  const chartData: ChartData<"doughnut"> = {
    labels: displayItems.map((item) => item.label),
    datasets: [
      {
        data: displayItems.map((item) => item.percentageValue),
        backgroundColor: displayItems.map((item) => item.color),
        borderColor: "#f8fafc",
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <article className={`${styles.card}${className ? ` ${className}` : ""}`}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.body}>
        <div className={styles.chartWrap}>
          <div className={styles.chartFrame}>
            <Doughnut data={chartData} options={chartOptions} />
            <div className={styles.chartCenter} aria-hidden="true">
              {centerLabel ? <p className={styles.centerLabel}>{centerLabel}</p> : null}
              <p className={styles.centerValue}>{totalValue}</p>
            </div>
          </div>
        </div>

        <ul className={styles.legend} aria-label={`${title} breakdown`}>
          {displayItems.map((item) => (
            <li className={styles.legendItem} key={item.label}>
              <span
                className={styles.swatch}
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className={styles.legendText}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.meta}>
                  {item.formattedPercentage} | {item.formattedValue}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <p className={styles.totalLabel}>Total</p>
        <p className={styles.totalValue}>{totalValue}</p>
      </footer>
    </article>
  );
}
