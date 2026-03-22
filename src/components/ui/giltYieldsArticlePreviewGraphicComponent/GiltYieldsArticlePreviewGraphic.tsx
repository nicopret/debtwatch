import styles from "./giltYieldsArticlePreviewGraphic.module.css";

export interface GiltYieldsArticlePreviewGraphicProps {
  currentValue: string;
  comparisonValue: string;
  points: number[];
  comparisonPoints: number[];
  dateLabel: string;
}

export default function GiltYieldsArticlePreviewGraphic({
  currentValue,
  comparisonValue,
  points,
  comparisonPoints,
  dateLabel,
}: GiltYieldsArticlePreviewGraphicProps) {
  const chartWidth = 260;
  const chartHeight = 92;
  const allValues = [...points, ...comparisonPoints];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const range = maxValue - minValue || 1;

  const scalePath = (series: number[]) =>
    series
      .map((point, index) => {
        const x = (index / Math.max(series.length - 1, 1)) * chartWidth;
        const y = chartHeight - ((point - minValue) / range) * chartHeight;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");

  const ukPath = scalePath(points);
  const comparisonPath = scalePath(comparisonPoints);
  const latestValue = points[points.length - 1] ?? 0;
  const latestY = chartHeight - ((latestValue - minValue) / range) * chartHeight;

  return (
    <div className={styles.graphic}>
      <p className={styles.eyebrow}>UK vs peer yields</p>
      <div className={styles.valueRow}>
        <h3 className={styles.value}>{currentValue}</h3>
        <span className={styles.changeLabel}>{dateLabel}</span>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.ukSwatch}`} />
          <span className={styles.legendLabel}>UK 10-year</span>
          <span className={styles.legendValue}>{currentValue}</span>
        </div>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.g7Swatch}`} />
          <span className={styles.legendLabel}>G7 average</span>
          <span className={styles.legendValue}>{comparisonValue}</span>
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
          <path className={styles.g7Line} d={comparisonPath} />
          <path className={styles.ukLine} d={ukPath} />
          <circle className={styles.endpoint} cx={chartWidth} cy={latestY} r="4.5" />
        </svg>
      </div>
      <p className={styles.caption}>
        UK yields have risen above the G7 average as borrowing conditions tightened.
      </p>
    </div>
  );
}
