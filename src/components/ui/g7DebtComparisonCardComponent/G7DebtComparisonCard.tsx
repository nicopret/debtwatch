import styles from "./g7DebtComparisonCard.module.css";

export interface G7DebtComparisonCountry {
  countryCode: string;
  countryLabel: string;
  formattedValue: string;
  rank: number;
}

export interface G7DebtComparisonCardProps {
  title: string;
  ukValue: string;
  ukRank: number;
  g7Average: string;
  differenceFromAverage: string;
  countries: G7DebtComparisonCountry[];
  comparisonYear: string;
  highestCountry: G7DebtComparisonCountry;
  className?: string;
}

export default function G7DebtComparisonCard({
  title,
  ukValue,
  ukRank,
  g7Average,
  differenceFromAverage,
  countries,
  comparisonYear,
  highestCountry,
  className,
}: G7DebtComparisonCardProps) {
  const cardClassName = [styles.card, className].filter(Boolean).join(" ");
  const differenceText = differenceFromAverage.startsWith("-")
    ? `${differenceFromAverage.slice(1)} below average`
    : `${differenceFromAverage.replace("+", "")} above average`;

  return (
    <aside className={cardClassName}>
      <header className={styles.header}>
        <p className={styles.subtitle}>IMF G7 comparison {comparisonYear}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <section className={styles.ukBlock}>
        <p className={styles.ukLabel}>United Kingdom</p>
        <p className={styles.ukValue}>{ukValue}</p>
        <p className={styles.ukMeta}>Ranked {ukRank} of {countries.length} by debt ratio</p>
      </section>

      <section className={styles.summaryRow}>
        <div className={styles.summaryStat}>
          <p className={styles.statLabel}>G7 average</p>
          <p className={styles.statValue}>{g7Average}</p>
        </div>
        <div className={styles.summaryStat}>
          <p className={styles.statLabel}>UK vs average</p>
          <p className={styles.statValue}>{differenceText}</p>
        </div>
      </section>

      <div className={styles.table}>
        {countries.map((country) => (
          <div
            className={`${styles.row}${country.countryCode === "GBR" ? ` ${styles.ukRow}` : ""}`}
            key={country.countryCode}
          >
            <p className={styles.countryLabel}>
              <span className={styles.rank}>{country.rank}</span>
              {country.countryLabel}
            </p>
            <p className={styles.countryValue}>{country.formattedValue}</p>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerLabel}>Highest ratio in the G7</p>
        <p className={styles.footerValue}>
          {highestCountry.countryLabel} | {highestCountry.formattedValue}
        </p>
      </footer>
    </aside>
  );
}
