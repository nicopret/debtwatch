import type { CSSProperties, ReactNode } from "react";
import styles from "./row.module.css";

export interface RowProps {
  children: ReactNode;
  columns?: number;
  gap?: number | string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  className?: string;
}

type RowStyle = CSSProperties & {
  "--row-gap"?: string;
  "--row-columns"?: string;
};

export default function Row({
  children,
  columns,
  gap = "1rem",
  align = "stretch",
  justify = "flex-start",
  wrap = true,
  className,
}: RowProps) {
  const rowClassName = [
    styles.row,
    typeof columns === "number" ? styles.withColumns : styles.autoColumns,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: RowStyle = {
    "--row-gap": typeof gap === "number" ? `${gap}px` : gap,
    "--row-columns": columns ? String(Math.max(1, columns)) : undefined,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : "nowrap",
  };

  return (
    <div className={rowClassName} style={style}>
      {children}
    </div>
  );
}
