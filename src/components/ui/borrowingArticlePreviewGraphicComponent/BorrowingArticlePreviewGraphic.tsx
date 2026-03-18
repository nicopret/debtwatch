import styles from "./borrowingArticlePreviewGraphic.module.css";

export default function BorrowingArticlePreviewGraphic() {
  return (
    <div className={styles.graphic}>
      <h3 className={styles.title}>Household vs government debt</h3>
      <div className={styles.bars} aria-hidden="true">
        <div className={styles.householdBar} />
        <div className={styles.governmentBar} />
      </div>
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.householdSwatch}`} />
          <span className={styles.legendLabel}>Household debt</span>
        </div>
        <div className={styles.legendRow}>
          <span className={`${styles.swatch} ${styles.governmentSwatch}`} />
          <span className={styles.legendLabel}>Government debt</span>
        </div>
      </div>
      <p className={styles.caption}>A structural dependence on debt now shapes both households and the state.</p>
    </div>
  );
}
