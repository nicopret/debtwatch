import type { ReactNode } from "react";
import styles from "./shareCardFrame.module.css";

export interface ShareCardFrameProps {
  badgeLabel: string;
  title: string;
  sourceNote: string;
  sourceHref: string;
  versionLabel: string;
  visual: ReactNode;
  className?: string;
  pinnedFooter?: boolean;
}

export default function ShareCardFrame({
  badgeLabel,
  title,
  sourceNote,
  sourceHref,
  versionLabel,
  visual,
  className,
  pinnedFooter = false,
}: ShareCardFrameProps) {
  return (
    <article
      className={[
        styles.card,
        pinnedFooter ? styles.cardPinnedFooter : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.badge}>{badgeLabel}</p>
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
          <svg
            aria-hidden="true"
            className={styles.linkIcon}
            viewBox="0 0 108 108"
          >
            <rect x="0" y="0" width="108" height="108" rx="12" fill="#ffffff" />
            <circle cx="27" cy="54" r="10" fill="#ffffff" stroke="#000000" strokeWidth="6" />
            <circle cx="81" cy="23" r="10" fill="#ffffff" stroke="#000000" strokeWidth="6" />
            <circle cx="81" cy="85" r="10" fill="#ffffff" stroke="#000000" strokeWidth="6" />
            <line x1="35" y1="49" x2="73" y2="28" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
            <line x1="35" y1="59" x2="73" y2="80" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          </svg>
          debtwatch.uk
        </a>
      </footer>
    </article>
  );
}
