import type { ReactNode } from "react";
import styles from "./borrowingTimelineSection.module.css";

export interface BorrowingTimelineSectionProps {
  leftCard: ReactNode;
  rightCard: ReactNode;
}

export default function BorrowingTimelineSection({
  leftCard,
  rightCard,
}: BorrowingTimelineSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>{leftCard}</div>
        <div className={styles.right}>{rightCard}</div>
      </div>
    </section>
  );
}
