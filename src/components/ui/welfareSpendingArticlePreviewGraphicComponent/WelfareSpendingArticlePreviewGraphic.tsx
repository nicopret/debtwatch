import { WELFARE_SPENDING_BREAKDOWN_BARS } from "@/lib/welfareSpendingBreakdownData";

import styles from "./welfareSpendingArticlePreviewGraphic.module.css";

export default function WelfareSpendingArticlePreviewGraphic() {
  const bars = [...WELFARE_SPENDING_BREAKDOWN_BARS].sort((left, right) => right.amount - left.amount);
  const maxValue = bars[0]?.amount ?? 0;

  return (
    <div className={styles.graphic}>
      <p className={styles.eyebrow}>Benefits breakdown</p>
      <div className={styles.headingBlock}>
        <h3 className={styles.title}>What makes up the UK's welfare bill?</h3>
        <p className={styles.subtitle}>Same spending mix as the article chart.</p>
      </div>
      <div className={styles.chart} aria-hidden="true">
        {bars.map((bar) => {
          const width = maxValue > 0 ? (bar.amount / maxValue) * 100 : 0;
          const isPrimary = bar.key === "state-pension";

          return (
            <div className={styles.row} key={bar.key}>
              <div
                className={`${styles.bar} ${isPrimary ? styles.barPrimary : ""}`}
                style={{
                  width: `${width}%`,
                  background: bar.color,
                }}
              >
                <span
                  className={`${styles.label} ${isPrimary ? styles.labelPrimary : styles.labelSecondary}`}
                >
                  {bar.shortLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className={styles.caption}>
        A compact preview of the welfare breakdown chart used inside the article.
      </p>
    </div>
  );
}
