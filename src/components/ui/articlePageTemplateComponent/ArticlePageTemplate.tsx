import type { ReactNode } from "react";
import styles from "./articlePageTemplate.module.css";

export interface ArticlePageTemplateProps {
  hero: ReactNode;
  metricStrip: ReactNode;
  sections: ReactNode;
  sources: ReactNode;
  relatedArticles: ReactNode;
}

export default function ArticlePageTemplate({
  hero,
  metricStrip,
  sections,
  sources,
  relatedArticles,
}: ArticlePageTemplateProps) {
  return (
    <article className={styles.page}>
      {hero}
      {metricStrip}
      <div className={styles.sections}>{sections}</div>
      {sources}
      {relatedArticles}
    </article>
  );
}

