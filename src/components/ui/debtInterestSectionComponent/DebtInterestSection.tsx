import type { ReactNode } from "react";
import styles from "./debtInterestSection.module.css";

export interface DebtInterestSectionProps {
  leftCard: ReactNode;
  rightCard: ReactNode;
}

export default function DebtInterestSection({
  leftCard,
  rightCard,
}: DebtInterestSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>{leftCard}</div>
        <div className={styles.right}>{rightCard}</div>
      </div>
    </section>
  );
}
