import styles from "./articleVisualPanel.module.css";

export interface ArticleVisualPanelItem {
  label: string;
  value: string;
  tone?: "neutral" | "accent";
}

export interface ArticleVisualPanelProps {
  eyebrow: string;
  title: string;
  value: string;
  helperText: string;
  items?: ArticleVisualPanelItem[];
  accentColor?: string;
  className?: string;
}

export default function ArticleVisualPanel({
  eyebrow,
  title,
  value,
  helperText,
  items = [],
  accentColor = "#c75b5b",
  className,
}: ArticleVisualPanelProps) {
  const panelClassName = [styles.panel, className].filter(Boolean).join(" ");

  return (
    <div className={panelClassName}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value} style={{ color: accentColor }}>
        {value}
      </p>
      <p className={styles.helper}>{helperText}</p>
      {items.length > 0 ? (
        <div className={styles.list}>
          {items.map((item) => (
            <div className={styles.row} key={`${item.label}-${item.value}`}>
              <p className={styles.rowLabel}>{item.label}</p>
              <p
                className={`${styles.rowValue} ${
                  item.tone === "accent" ? styles.rowValueAccent : ""
                }`}
                style={item.tone === "accent" ? { color: accentColor } : undefined}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

