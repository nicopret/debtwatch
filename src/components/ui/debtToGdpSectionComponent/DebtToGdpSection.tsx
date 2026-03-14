import type { ReactNode } from "react";
import styles from "./debtToGdpSection.module.css";

export interface DebtToGdpSectionProps {
  leftCard: ReactNode;
  rightCard: ReactNode;
}

export default function DebtToGdpSection({
  leftCard,
  rightCard,
}: DebtToGdpSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>{leftCard}</div>
        <div className={styles.right}>{rightCard}</div>
      </div>
    </section>
  );
}
