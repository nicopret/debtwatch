import styles from "./heroIntroCard.module.css";

export interface HeroIntroCardProps {
  headerText: string;
  bodyText: string;
  footerText: string;
  backgroundColor?: string;
  headerColor?: string;
  bodyColor?: string;
  footerColor?: string;
}

export default function HeroIntroCard({
  headerText,
  bodyText,
  footerText,
  backgroundColor,
  headerColor,
  bodyColor,
  footerColor,
}: HeroIntroCardProps) {
  return (
    <article className={styles.card} style={{ background: backgroundColor }}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Editorial intro</p>
        <h2 className={styles.headerText} style={{ color: headerColor }}>
          {headerText}
        </h2>
      </header>

      <div className={styles.body}>
        <p className={styles.bodyText} style={{ color: bodyColor }}>
          {bodyText}
        </p>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText} style={{ color: footerColor }}>
          {footerText}
        </p>
      </footer>
    </article>
  );
}
