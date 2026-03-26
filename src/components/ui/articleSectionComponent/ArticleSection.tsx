import type { ReactNode } from "react";
import styles from "./articleSection.module.css";

export interface ArticleSectionProps {
  heading: string;
  blocks?: ReactNode[];
  visual?: ReactNode;
  callout?: ReactNode;
  layout?: "stacked" | "split" | "split-reverse";
}

export default function ArticleSection({
  heading,
  blocks,
  visual,
  callout,
  layout = "stacked",
}: ArticleSectionProps) {
  const sectionClassName = [
    styles.section,
    layout === "split" && visual ? styles.sectionSplit : "",
    layout === "split-reverse" && visual ? styles.sectionSplitReverse : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClassName}>
      <div className={styles.copy}>
        <h2 className={styles.heading}>{heading}</h2>
        {blocks?.length ? <div className={styles.blocks}>{blocks}</div> : null}
        {callout ? <div className={styles.callout}>{callout}</div> : null}
      </div>
      {visual ? <div className={styles.visual}>{visual}</div> : null}
    </section>
  );
}
