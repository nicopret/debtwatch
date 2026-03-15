import type { ReactNode } from "react";
import styles from "./embedPageTemplate.module.css";

export interface EmbedPageTemplateProps {
  title: string;
  sourceNote: string;
  sourceHref: string;
  versionLabel: string;
  visual: ReactNode;
}

export default function EmbedPageTemplate({
  title,
  sourceNote,
  sourceHref,
  versionLabel,
  visual,
}: EmbedPageTemplateProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <p className={styles.brand}>DebtWatch embed</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <span className={styles.version}>{versionLabel}</span>
      </header>

      <div className={styles.visual}>{visual}</div>

      <footer className={styles.footer}>
        <p className={styles.source}>{sourceNote}</p>
        <a
          className={styles.link}
          href={sourceHref}
          rel="noreferrer"
          target="_blank"
        >
          debtwatch.uk
        </a>
      </footer>
    </article>
  );
}
