import Link from "next/link";
import styles from "./articleIndexList.module.css";

export interface ArticleIndexItem {
  slug: string;
  header: string;
  tagline: string;
  description: string;
}

export interface ArticleIndexListProps {
  items: ArticleIndexItem[];
}

export default function ArticleIndexList({ items }: ArticleIndexListProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>DebtWatch library</p>
        <h1 className={styles.heading}>Articles</h1>
        <p className={styles.description}>
          Source-led explainers that connect the live dashboard to the underlying fiscal story.
        </p>
      </header>
      <div className={styles.list}>
        {items.map((item) => (
          <Link className={styles.card} href={`/articles/${item.slug}`} key={item.slug}>
            <p className={styles.tagline}>{item.tagline}</p>
            <h2 className={styles.title}>{item.header}</h2>
            <p className={styles.copy}>{item.description}</p>
            <span className={styles.link}>Read full article</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

