import styles from "./budgetBreakdownCard.module.css";

export interface BudgetBreakdownItem {
  label: string;
  formattedValue: string;
  formattedPercentage: string;
  percentageValue: number;
  color: string;
}

export interface BudgetBreakdownCardProps {
  title: string;
  subtitle: string;
  totalValue: string;
  items: BudgetBreakdownItem[];
  barAriaLabel: string;
}

export default function BudgetBreakdownCard({
  title,
  subtitle,
  totalValue,
  items,
  barAriaLabel,
}: BudgetBreakdownCardProps) {
  const orderedItems = [...items].sort(
    (left, right) => right.percentageValue - left.percentageValue,
  );
  const legendItems = [...orderedItems].reverse();

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.body}>
        <ul className={styles.legend} aria-label={`${title} breakdown`}>
          {legendItems.map((item) => (
            <li className={styles.legendItem} key={item.label}>
              <span
                className={styles.swatch}
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className={styles.legendText}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.meta}>
                  {item.formattedValue} | {item.formattedPercentage}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.barWrap}>
          <div className={styles.bar} aria-label={barAriaLabel} role="img">
            {orderedItems.map((item) => (
              <div
                key={item.label}
                className={styles.segment}
                style={{
                  backgroundColor: item.color,
                  flexGrow: Math.max(item.percentageValue, 1),
                }}
                title={`${item.label}: ${item.formattedValue} (${item.formattedPercentage})`}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.totalLabel}>Total</p>
        <p className={styles.totalValue}>{totalValue}</p>
      </footer>
    </article>
  );
}
