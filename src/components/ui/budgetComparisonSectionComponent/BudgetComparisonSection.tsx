import type { ReactNode } from "react";
import styles from "./budgetComparisonSection.module.css";

export interface BudgetComparisonSectionProps {
  heading: string;
  subheading: string;
  leftCard: ReactNode;
  centerCard: ReactNode;
  lowerLeftCard?: ReactNode;
  lowerRightCard?: ReactNode;
  rightCard: ReactNode;
}

export default function BudgetComparisonSection({
  heading,
  subheading,
  leftCard,
  centerCard,
  lowerLeftCard,
  lowerRightCard,
  rightCard,
}: BudgetComparisonSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </header>

      <div className={styles.topRow}>
        <div>{leftCard}</div>
        <div>{rightCard}</div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.center}>{centerCard}</div>
      </div>

      {(lowerLeftCard || lowerRightCard) && (
        <div className={styles.detailRow}>
          <div>{lowerLeftCard}</div>
          <div>{lowerRightCard}</div>
        </div>
      )}
    </section>
  );
}
