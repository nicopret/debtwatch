"use client";

import type { ReactNode } from "react";
import ChartEmbedAction, {
  type ChartEmbedActionProps,
} from "@/components/ui/chartEmbedActionComponent/ChartEmbedAction";
import styles from "./articleVisualShareFrame.module.css";

export interface ArticleVisualShareFrameProps {
  children: ReactNode;
  shareAction?: ChartEmbedActionProps | null;
}

export default function ArticleVisualShareFrame({
  children,
  shareAction,
}: ArticleVisualShareFrameProps) {
  return (
    <div className={styles.frame}>
      {shareAction ? (
        <div className={styles.actionRow}>
          <ChartEmbedAction {...shareAction} />
        </div>
      ) : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
