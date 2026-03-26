import styles from "./articleVisualPanel.module.css";

export interface ArticleVisualPanelItem {
  kind?: "row" | "heading" | "spacer";
  label: string;
  value?: string;
  tone?: "neutral" | "accent";
  labelTone?: "neutral" | "accent" | "amber" | "green" | "navy";
  valueTone?: "neutral" | "accent" | "amber" | "green" | "navy";
  preserveCase?: boolean;
}

export interface ArticleVisualPanelProps {
  eyebrow: string;
  title?: string;
  value: string;
  helperText: string;
  items?: ArticleVisualPanelItem[];
  accentColor?: string;
  valueColor?: string;
  className?: string;
}

export default function ArticleVisualPanel({
  eyebrow,
  title,
  value,
  helperText,
  items = [],
  accentColor = "#c75b5b",
  valueColor = accentColor,
  className,
}: ArticleVisualPanelProps) {
  const panelClassName = [styles.panel, className].filter(Boolean).join(" ");

  return (
    <div className={panelClassName}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <p className={styles.value} style={{ color: valueColor }}>
        {value}
      </p>
      <p className={styles.helper}>{helperText}</p>
      {items.length > 0 ? (
        <div className={styles.list}>
          {items.map((item) => (
            item.kind === "spacer" ? (
              <div className={styles.spacer} key={`${item.label}-spacer`} aria-hidden="true" />
            ) : item.kind === "heading" ? (
              <p className={styles.inlineHeading} key={`${item.label}-heading`}>
                {item.label}
              </p>
            ) : (
              <div className={styles.row} key={`${item.label}-${item.value ?? ""}`}>
                <p
                  className={`${styles.rowLabel} ${
                    item.preserveCase ? styles.rowTextCase :
                    ""
                  } ${
                    item.labelTone === "accent" ? styles.rowLabelAccent :
                    item.labelTone === "amber" ? styles.rowLabelAmber :
                    item.labelTone === "green" ? styles.rowLabelGreen :
                    item.labelTone === "navy" ? styles.rowLabelNavy :
                    ""
                  }`}
                  style={item.labelTone === "accent" ? { color: accentColor } : undefined}
                >
                  {item.label}
                </p>
                <p
                  className={`${styles.rowValue} ${
                    item.preserveCase ? styles.rowTextCase :
                    ""
                  } ${
                    item.valueTone === "accent" || item.tone === "accent" ? styles.rowValueAccent :
                    item.valueTone === "amber" ? styles.rowValueAmber :
                    item.valueTone === "green" ? styles.rowValueGreen :
                    item.valueTone === "navy" ? styles.rowValueNavy :
                    ""
                  }`}
                  style={item.valueTone === "accent" || item.tone === "accent" ? { color: accentColor } : undefined}
                >
                  {item.value}
                </p>
              </div>
            )
          ))}
        </div>
      ) : null}
    </div>
  );
}
