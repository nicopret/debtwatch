import styles from "./circularMetric.module.css";

export interface CircularMetricProps {
  mainValueText: string;
  labelText?: string;
  helperText?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function CircularMetric({
  mainValueText,
  labelText,
  helperText,
  backgroundColor,
  textColor,
  borderColor,
}: CircularMetricProps) {
  return (
    <section className={styles.panel}>
      <div
        className={styles.circle}
        style={{
          background: backgroundColor,
          color: textColor,
          borderColor,
        }}
      >
        {labelText ? <p className={styles.labelText}>{labelText}</p> : null}
        <p className={styles.mainValueText}>{mainValueText}</p>
        {helperText ? <p className={styles.helperText}>{helperText}</p> : null}
      </div>
    </section>
  );
}
