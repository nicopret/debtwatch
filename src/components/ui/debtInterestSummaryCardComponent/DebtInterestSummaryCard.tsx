import styles from "./debtInterestSummaryCard.module.css";

export interface DebtInterestGovernmentTotal {
  governmentKey: string;
  governmentLabel: string;
  totalFormattedValue: string;
  averageAnnualFormattedValue: string;
}

export interface DebtInterestSummaryCardProps {
  title: string;
  latestValue: string;
  latestYear: string;
  peakYear: string;
  peakAmount: string;
  peakGovernment: string;
  averageValue: string;
  latestVsAverage: string;
  latestVsAveragePercent: string;
  governmentTotals: DebtInterestGovernmentTotal[];
  className?: string;
}

export default function DebtInterestSummaryCard({
  title,
  latestValue,
  latestYear,
  peakYear,
  peakAmount,
  peakGovernment,
  averageValue,
  latestVsAverage,
  latestVsAveragePercent,
  governmentTotals,
  className,
}: DebtInterestSummaryCardProps) {
  const cardClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <aside className={cardClassName}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Annual debt-interest summary</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <section className={styles.heroBlock}>
        <p className={styles.heroLabel}>Latest annual debt interest</p>
        <p className={styles.heroValue}>{latestValue}</p>
        <p className={styles.heroMeta}>{latestYear}</p>
      </section>

      <section className={styles.statsGrid}>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Peak year</p>
          <p className={styles.statValue}>{peakYear}</p>
          <p className={styles.statMeta}>{peakAmount}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Peak government</p>
          <p className={styles.statValue}>{peakGovernment}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Average annual</p>
          <p className={styles.statValue}>{averageValue}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Latest vs average</p>
          <p className={styles.statValue}>{latestVsAverage}</p>
          <p className={styles.statMeta}>{latestVsAveragePercent}</p>
        </div>
      </section>

      <div className={styles.totalsList}>
        {governmentTotals.map((government) => (
          <div className={styles.totalRow} key={government.governmentKey}>
            <div>
              <p className={styles.totalLabel}>{government.governmentLabel}</p>
              <p className={styles.totalMeta}>Avg {government.averageAnnualFormattedValue}</p>
            </div>
            <p className={styles.totalValue}>{government.totalFormattedValue}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
