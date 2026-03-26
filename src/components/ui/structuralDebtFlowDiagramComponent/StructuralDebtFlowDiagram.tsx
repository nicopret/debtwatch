import styles from "./structuralDebtFlowDiagram.module.css";

export interface StructuralDebtFlowNode {
  key: string;
  label: string;
  subtitle: string;
  value?: string;
  tone: "default" | "muted" | "emphasis";
}

export interface StructuralDebtFlowDiagramProps {
  title: string;
  subtitle: string;
  nodes: StructuralDebtFlowNode[];
  className?: string;
}

export default function StructuralDebtFlowDiagram({
  title,
  subtitle,
  nodes,
  className,
}: StructuralDebtFlowDiagramProps) {
  const cardClassName = [styles.card, className].filter(Boolean).join(" ");
  const getNode = (key: string) => nodes.find((node) => node.key === key)!;

  const debtRollover = getNode("debt_rollover");
  const newBorrowing = getNode("new_borrowing");
  const inflationLinkedUplift = getNode("inflation_linked_uplift");
  const interestPayments = getNode("interest_payments");
  const totalDebt = getNode("total_debt");

  return (
    <article className={cardClassName}>
      <header className={styles.header}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.diagram}>
        <div className={styles.inputs}>
          {[debtRollover, newBorrowing, inflationLinkedUplift].map((node) => (
            <div className={styles.inputRow} key={node.key}>
              <div className={styles.arrow} aria-hidden="true">→</div>
              <div className={styles.node} data-tone={node.tone}>
                <p className={styles.nodeLabel}>{node.label}</p>
                <p className={styles.nodeSubtitle}>{node.subtitle}</p>
                {node.value ? <p className={styles.nodeValue}>{node.value}</p> : null}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalWrap}>
          <div className={`${styles.node} ${styles.totalNode}`} data-tone={totalDebt.tone}>
            <p className={styles.nodeLabel}>{totalDebt.label}</p>
            <p className={styles.nodeSubtitle}>{totalDebt.subtitle}</p>
          </div>
        </div>

        <div className={styles.outflow}>
          <div className={`${styles.node} ${styles.outflowNode}`} data-tone={interestPayments.tone}>
            <p className={styles.nodeLabel}>{interestPayments.label}</p>
            <p className={styles.nodeSubtitle}>{interestPayments.subtitle}</p>
            {interestPayments.value ? (
              <p className={styles.nodeValue}>{interestPayments.value}</p>
            ) : null}
          </div>
          <p className={styles.outflowArrow} aria-hidden="true">↘</p>
          <p className={styles.outflowNote}>Outflow, not added to debt</p>
        </div>
      </div>
    </article>
  );
}
