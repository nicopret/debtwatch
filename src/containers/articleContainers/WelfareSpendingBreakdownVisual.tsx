import styles from "./welfareSpendingBreakdownVisual.module.css";
import { WELFARE_SPENDING_BREAKDOWN_BARS } from "@/lib/welfareSpendingBreakdownData";

function formatBillions(value: number): string {
  return `\u00A3${value}bn`;
}

export default function WelfareSpendingBreakdownVisual() {
  const sortedBars = [...WELFARE_SPENDING_BREAKDOWN_BARS].sort(
    (left, right) => right.amount - left.amount,
  );
  const total = sortedBars.reduce((sum, bar) => sum + bar.amount, 0);
  const maxValue = sortedBars[0]?.amount ?? 0;
  const scaleMarks = [0, 20, 40, 60, 80, 100, 120];

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>What makes up the UK's welfare bill?</h3>
      <p className={styles.subtitle}>
        Total benefits spending (including State Pension) in the year to March 2024
      </p>

      <div
        className={styles.chart}
        aria-label="Horizontal bar chart showing the placeholder composition of UK benefits spending"
        role="img"
      >
        {sortedBars.map((bar) => {
          const percentage = Math.round((bar.amount / total) * 100);
          const width = maxValue > 0 ? (bar.amount / maxValue) * 100 : 0;
          const isPrimary = bar.key === "state-pension";

          return (
            <div className={styles.row} key={bar.key}>
              <div className={styles.plotArea}>
                <div className={styles.grid} aria-hidden="true" />
                <div className={styles.barLine}>
                  <div
                    className={`${styles.bar} ${isPrimary ? styles.barPrimary : ""}`}
                    style={{
                      width: `${width}%`,
                      background: bar.color,
                    }}
                    title={`${bar.label}: ${formatBillions(bar.amount)} (${percentage}%)`}
                  >
                    <span className={`${styles.barLabel} ${isPrimary ? styles.barLabelPrimary : styles.barLabelSecondary}`}>
                      {bar.label}
                    </span>
                    {isPrimary ? (
                      <span className={styles.barValueInside}>
                        {formatBillions(bar.amount)} ({percentage}%)
                      </span>
                    ) : null}
                  </div>
                  {!isPrimary ? (
                    <span className={styles.barValueOutside}>
                      {formatBillions(bar.amount)} ({percentage}%)
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}

        <div className={styles.axisRow}>
          <div className={styles.axisWrap}>
            <div className={styles.axisLine} />
            <div className={styles.scale}>
              {scaleMarks.map((mark) => (
                <span className={styles.scaleMark} key={mark}>
                  {mark}
                </span>
              ))}
            </div>
            <p className={styles.axisLabel}>Spending (£ billions)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
