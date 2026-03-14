import styles from "./borrowingGovernmentSummaryCard.module.css";

export interface BorrowingGovernmentSummaryItem {
  governmentKey: string;
  governmentLabel: string;
  totalBorrowingFormattedValue: string;
  peakYear: string;
  peakYearBorrowingFormattedValue: string;
}

export interface BorrowingPeakYearSummary {
  year: string;
  formattedValue: string;
  governmentLabel: string;
}

export interface BorrowingGovernmentSummaryCardProps {
  title: string;
  governments: BorrowingGovernmentSummaryItem[];
  peakYearSummary: BorrowingPeakYearSummary;
  className?: string;
}

export default function BorrowingGovernmentSummaryCard({
  title,
  governments,
  peakYearSummary,
  className,
}: BorrowingGovernmentSummaryCardProps) {
  const cardClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <aside className={cardClassName}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Annual borrowing summary</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.list}>
        {governments.map((government) => (
          <div className={styles.row} key={government.governmentKey}>
            <div>
              <p className={styles.governmentLabel}>{government.governmentLabel}</p>
              <p className={styles.governmentMeta}>
                Peak {government.peakYear} | {government.peakYearBorrowingFormattedValue}
              </p>
            </div>
            <p className={styles.totalValue}>{government.totalBorrowingFormattedValue}</p>
          </div>
        ))}
      </div>

      <section className={styles.peakBlock}>
        <p className={styles.peakLabel}>Highest borrowing year</p>
        <p className={styles.peakYear}>{peakYearSummary.year}</p>
        <p className={styles.peakValue}>{peakYearSummary.formattedValue}</p>
        <p className={styles.peakGovernment}>{peakYearSummary.governmentLabel}</p>
      </section>
    </aside>
  );
}
