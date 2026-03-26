import styles from "./articleSources.module.css";

export interface ArticleSourcesItem {
  label: string;
  url?: string;
  note?: string;
}

export interface ArticleSourcesProps {
  items: ArticleSourcesItem[];
}

export default function ArticleSources({ items }: ArticleSourcesProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Documentation</p>
        <h2 className={styles.heading}>Sources</h2>
      </header>
      <div className={styles.list}>
        {items.map((item) => (
          <article className={styles.item} key={`${item.label}-${item.url ?? item.note ?? ""}`}>
            <p className={styles.label}>{item.label}</p>
            {item.url ? (
              <a
                className={styles.link}
                href={item.url}
                rel="noreferrer"
                target="_blank"
              >
                {item.url}
              </a>
            ) : null}
            {item.note ? <p className={styles.note}>{item.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

