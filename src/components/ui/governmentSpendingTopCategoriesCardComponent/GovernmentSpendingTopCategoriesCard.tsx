import styles from "./governmentSpendingTopCategoriesCard.module.css";

export interface GovernmentSpendingTopCategoriesCardItem {
  key: string;
  label: string;
  formattedValue: string;
  numericValue: number;
  color: "navy" | "red";
}

export interface GovernmentSpendingTopCategoriesCardProps {
  title: string;
  subtitle: string;
  items: GovernmentSpendingTopCategoriesCardItem[];
  className?: string;
}

export default function GovernmentSpendingTopCategoriesCard({
  title,
  subtitle,
  items,
  className,
}: GovernmentSpendingTopCategoriesCardProps) {
  const maxValue = Math.max(...items.map((item) => item.numericValue), 1);
  const cardClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <article className={cardClassName}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.columns}>
        {items.map((item) => (
          <div className={styles.column} key={item.key}>
            <p className={styles.value}>{item.formattedValue}</p>
            <div className={styles.barTrack} aria-hidden="true">
              <div
                className={`${styles.bar} ${item.color === "red" ? styles.redBar : styles.navyBar}`}
                style={{ height: `${(item.numericValue / maxValue) * 100}%` }}
              />
            </div>
            <p className={styles.label}>{item.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
