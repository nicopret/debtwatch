import { WELFARE_INCOME_TAX_CHART_CONFIG } from "@/lib/welfareIncomeTaxChartConfig";

import styles from "./welfareIncomeTaxArticlePreviewGraphic.module.css";

export interface WelfareIncomeTaxArticlePreviewGraphicProps {
  incomeTaxPoints: number[];
  benefitsPoints: number[];
  latestIncomeTaxValue: string;
  latestBenefitsValue: string;
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

export default function WelfareIncomeTaxArticlePreviewGraphic({
  incomeTaxPoints,
  benefitsPoints,
  latestIncomeTaxValue,
  latestBenefitsValue,
  dateLabel,
}: WelfareIncomeTaxArticlePreviewGraphicProps) {
  const chartWidth = 260;
  const chartHeight = 92;
  const allValues = [...incomeTaxPoints, ...benefitsPoints];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const incomeTaxPath = buildLinePath(
    incomeTaxPoints,
    chartWidth,
    chartHeight,
    minValue,
    maxValue,
  );
  const benefitsPath = buildLinePath(
    benefitsPoints,
    chartWidth,
    chartHeight,
    minValue,
    maxValue,
  );
  const latestIncomeTaxPoint = incomeTaxPoints[incomeTaxPoints.length - 1] ?? 0;
  const latestBenefitsPoint = benefitsPoints[benefitsPoints.length - 1] ?? 0;
  const range = maxValue - minValue || 1;
  const latestIncomeTaxY = chartHeight - ((latestIncomeTaxPoint - minValue) / range) * chartHeight;
  const latestBenefitsY = chartHeight - ((latestBenefitsPoint - minValue) / range) * chartHeight;

  return (
    <div className={styles.graphic}>
      <p className={styles.eyebrow}>Income tax vs benefits</p>
      <div className={styles.valueRow}>
        <div className={styles.metricBlock}>
          <span className={styles.metricLabel}>{WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.label}</span>
          <strong className={styles.metricValue}>{latestIncomeTaxValue}</strong>
        </div>
        <div className={styles.metricBlock}>
          <span className={styles.metricLabel}>{WELFARE_INCOME_TAX_CHART_CONFIG.benefits.label}</span>
          <strong className={styles.metricValue}>{latestBenefitsValue}</strong>
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
          <path className={styles.incomeTaxLine} d={incomeTaxPath} />
          <path className={styles.benefitsLine} d={benefitsPath} />
          <circle className={styles.incomeTaxEndpoint} cx={chartWidth} cy={latestIncomeTaxY} r="4" />
          <circle className={styles.benefitsEndpoint} cx={chartWidth} cy={latestBenefitsY} r="4" />
        </svg>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.incomeTaxSwatch}`} />
          <span className={styles.legendLabel}>{WELFARE_INCOME_TAX_CHART_CONFIG.incomeTax.label}</span>
        </div>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.benefitsSwatch}`} />
          <span className={styles.legendLabel}>{WELFARE_INCOME_TAX_CHART_CONFIG.benefits.label}</span>
        </div>
      </div>
      <p className={styles.caption}>Rolling 12-month totals to {dateLabel}.</p>
    </div>
  );
}
