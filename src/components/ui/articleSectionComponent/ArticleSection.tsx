import type { ReactNode } from "react";
import styles from "./articleSection.module.css";

export interface ArticleSectionProps {
  heading: string;
  body: string[];
  visual?: ReactNode;
  callout?: ReactNode;
  layout?: "stacked" | "split";
}

export default function ArticleSection({
  heading,
  body,
  visual,
  callout,
  layout = "stacked",
}: ArticleSectionProps) {
  const sectionClassName = [
    styles.section,
    layout === "split" && visual ? styles.sectionSplit : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClassName}>
      <div className={styles.copy}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.body}>
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {callout ? <div className={styles.callout}>{callout}</div> : null}
      </div>
      {visual ? <div className={styles.visual}>{visual}</div> : null}
    </section>
  );
}

