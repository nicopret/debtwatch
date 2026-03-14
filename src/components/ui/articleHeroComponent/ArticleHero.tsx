import type { ReactNode } from "react";
import styles from "./articleHero.module.css";

export interface ArticleHeroProps {
  header: string;
  tagline: string;
  description: string;
  keyTakeaway: string;
  visual: ReactNode;
}

export default function ArticleHero({
  header,
  tagline,
  description,
  keyTakeaway,
  visual,
}: ArticleHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.textColumn}>
        <p className={styles.tagline}>{tagline}</p>
        <h1 className={styles.header}>{header}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.takeaway}>
          <p className={styles.takeawayLabel}>Key takeaway</p>
          <p className={styles.takeawayText}>{keyTakeaway}</p>
        </div>
      </div>
      <div className={styles.visualColumn}>{visual}</div>
    </section>
  );
}

