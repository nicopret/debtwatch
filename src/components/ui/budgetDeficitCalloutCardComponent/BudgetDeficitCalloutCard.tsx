import styles from "./budgetDeficitCalloutCard.module.css";
import type { CSSProperties } from "react";

export interface BudgetDeficitCalloutCardProps {
  title: string;
  value: string;
  bodyText: string;
  accentColor?: string;
}

export default function BudgetDeficitCalloutCard({
  title,
  value,
  bodyText,
  accentColor,
}: BudgetDeficitCalloutCardProps) {
  const style = {
    "--deficit-accent": accentColor ?? "#c75b5b",
  } as CSSProperties;

  return (
    <article className={styles.card} style={style}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
      <p className={styles.bodyText}>{bodyText}</p>
    </article>
  );
}
