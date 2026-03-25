import styles from "./governmentSpendingArticlePreviewGraphic.module.css";

export interface GovernmentSpendingArticlePreviewGraphicProps {
  receiptsPoints: number[];
  spendingPoints: number[];
  latestGap: string;
  dateLabel: string;
}

function buildLinePath(points: number[], width: number, height: number, min: number, max: number) {
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function GovernmentSpendingArticlePreviewGraphic({
  receiptsPoints,
  spendingPoints,
  latestGap,
  dateLabel,
}: GovernmentSpendingArticlePreviewGraphicProps) {
  const chartWidth = 260;
  const chartHeight = 92;
  const allValues = [...receiptsPoints, ...spendingPoints];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const receiptsPath = buildLinePath(receiptsPoints, chartWidth, chartHeight, minValue, maxValue);
  const spendingPath = buildLinePath(spendingPoints, chartWidth, chartHeight, minValue, maxValue);
  const latestSpendingValue = spendingPoints[spendingPoints.length - 1] ?? 0;
  const latestY =
    chartHeight - ((latestSpendingValue - minValue) / (maxValue - minValue || 1)) * chartHeight;

  return (
    <div className={styles.graphic}>
      <p className={styles.eyebrow}>Receipts vs spending</p>
      <div className={styles.valueRow}>
        <h3 className={styles.value}>{latestGap}</h3>
        <span className={styles.changeLabel}>{dateLabel}</span>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.receiptsSwatch}`} />
          <span className={styles.legendLabel}>Receipts</span>
        </div>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.spendingSwatch}`} />
          <span className={styles.legendLabel}>Spending</span>
        </div>
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
          <path className={styles.receiptsLine} d={receiptsPath} />
          <path className={styles.spendingLine} d={spendingPath} />
          <circle className={styles.endpoint} cx={chartWidth} cy={latestY} r="4.5" />
        </svg>
      </div>
      <p className={styles.caption}>
        Spending has stayed above receipts, leaving a borrowing gap to fund.
      </p>
    </div>
  );
}
