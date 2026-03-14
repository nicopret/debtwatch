import Link from "next/link";
import styles from "./relatedArticles.module.css";

export interface RelatedArticleItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
}

export interface RelatedArticlesProps {
  items: RelatedArticleItem[];
}

export default function RelatedArticles({ items }: RelatedArticlesProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Keep reading</p>
        <h2 className={styles.heading}>Related articles</h2>
      </header>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link className={styles.card} href={`/articles/${item.slug}`} key={item.slug}>
            <p className={styles.tagline}>{item.tagline}</p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <span className={styles.link}>Read article</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

