import Link from "next/link";
import styles from "./metricCard.module.css";

export type MetricCardTone = "neutral" | "teal" | "amber" | "navyblue";

export interface MetricCardProps {
  headerText?: string;
  headerColor?: string;
  bodyText?: string;
  bodyColor?: string;
  footerText?: string;
  footerColor?: string;
  moreText?: string;
  moreHref?: string;
  moreColor?: string;
  // Legacy aliases kept for compatibility while containers migrate to the
  // header/body/footer naming model.
  label?: string;
  value?: string;
  helperText?: string;
  tone?: MetricCardTone;
  href?: string;
  linkLabel?: string;
}

export default function MetricCard({
  headerText,
  bodyText,
  footerText,
  moreText,
  moreHref,
  headerColor,
  bodyColor,
  footerColor,
  moreColor,
  label,
  value,
  helperText,
  tone = "navyblue",
  href,
  linkLabel,
}: MetricCardProps) {
  const toneColor =
    tone === "navyblue" ? "#093967" :
    tone === "teal" ? "#0f766e" : 
    tone === "amber" ? "#b45309" : 
    "var(--foreground)";

  const resolvedHeaderText = headerText ?? label;
  const resolvedBodyText = bodyText ?? value;
  const resolvedFooterText = footerText ?? helperText;
  const resolvedMoreText = moreText ?? linkLabel;
  const resolvedMoreHref = moreHref ?? href;

  const resolvedHeaderColor = headerColor ?? toneColor;
  const resolvedBodyColor = bodyColor ?? "var(--foreground)";
  const resolvedFooterColor = footerColor ?? toneColor;
  const resolvedMoreColor = moreColor ?? toneColor;

  const hasFooterText = Boolean(resolvedFooterText);
  const hasMoreLink = Boolean(resolvedMoreText && resolvedMoreHref);

  const safeHeaderText = resolvedHeaderText ?? " ";
  const safeBodyText = resolvedBodyText ?? " ";
  const safeFooterText = hasFooterText ? resolvedFooterText : " ";

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <p className={styles.headerText} style={{ color: resolvedHeaderColor }}>
          {safeHeaderText}
        </p>
      </header>

      <div className={styles.body}>
        <p className={styles.bodyText} style={{ color: resolvedBodyColor }}>
          {safeBodyText}
        </p>
      </div>

      <footer
        className={`${styles.footer} ${
          hasFooterText && hasMoreLink
            ? styles.footerSplit
            : hasMoreLink
              ? styles.footerLinkOnly
              : styles.footerCentered
        }`}
      >
        {hasFooterText ? (
          <p className={styles.footerText} style={{ color: resolvedFooterColor }}>
            {safeFooterText}
          </p>
        ) : hasMoreLink ? (
          <span className={styles.footerTextPlaceholder}>{safeFooterText}</span>
        ) : (
          <p className={styles.footerText} style={{ color: resolvedFooterColor }}>
            {safeFooterText}
          </p>
        )}

        {hasMoreLink ? (
          <Link
            className={styles.moreLink}
            href={resolvedMoreHref!}
            style={{ color: resolvedMoreColor }}
          >
            {resolvedMoreText}
          </Link>
        ) : null}
      </footer>
    </article>
  );
}
