import type { ReactNode } from "react";
import styles from "./articleFeaturedGraphicSection.module.css";

export interface ArticleFeaturedGraphicSectionProps {
  heading?: string;
  subheading?: string;
  children: ReactNode;
}

export default function ArticleFeaturedGraphicSection({
  heading,
  subheading,
  children,
}: ArticleFeaturedGraphicSectionProps) {
  return (
    <section className={styles.section}>
      {(heading || subheading) && (
        <header className={styles.header}>
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {subheading ? <p className={styles.subheading}>{subheading}</p> : null}
        </header>
      )}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
