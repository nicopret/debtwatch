import styles from "./debtToGdpArticlePreviewGraphic.module.css";

export interface DebtToGdpArticlePreviewGraphicProps {
  currentValue: string;
  points: number[];
  dateLabel: string;
}

function buildPath(points: number[], width: number, height: number) {
  const minValue = Math.min(...points);
  const maxValue = Math.max(...points);
  const range = maxValue - minValue || 1;

  return points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((point - minValue) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function DebtToGdpArticlePreviewGraphic({
  currentValue,
  points,
  dateLabel,
}: DebtToGdpArticlePreviewGraphicProps) {
  const chartWidth = 260;
  const chartHeight = 92;
  const path = buildPath(points, chartWidth, chartHeight);
  const minValue = Math.min(...points);
  const maxValue = Math.max(...points);
  const latestValue = points[points.length - 1] ?? 0;
  const latestY = chartHeight - ((latestValue - minValue) / (maxValue - minValue || 1)) * chartHeight;

  return (
    <div className={styles.graphic}>
      <p className={styles.eyebrow}>Debt-to-GDP</p>
      <div className={styles.valueRow}>
        <h3 className={styles.value}>{currentValue}</h3>
        <span className={styles.changeLabel}>{dateLabel}</span>
      </div>
      <div className={styles.chartWrap} aria-hidden="true">
        <svg className={styles.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          <path
            className={styles.gridLine}
            d={`M 0 ${chartHeight - 1} L ${chartWidth} ${chartHeight - 1}`}
          />
          <path
            className={styles.gridLine}
            d={`M 0 ${chartHeight * 0.55} L ${chartWidth} ${chartHeight * 0.55}`}
          />
          <path className={styles.line} d={path} />
          <circle className={styles.endpoint} cx={chartWidth} cy={latestY} r="4.5" />
        </svg>
      </div>
      <p className={styles.caption}>Share of debt relative to the economy.</p>
    </div>
  );
}
