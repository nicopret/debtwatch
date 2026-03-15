import type { ReactNode } from "react";
import ShareCardFrame from "@/components/ui/shareCardFrameComponent/ShareCardFrame";
import styles from "./assetPageTemplate.module.css";

export interface AssetPageTemplateProps {
  title: string;
  sourceNote: string;
  sourceHref: string;
  versionLabel: string;
  visual: ReactNode;
}

export default function AssetPageTemplate({
  title,
  sourceNote,
  sourceHref,
  versionLabel,
  visual,
}: AssetPageTemplateProps) {
  return (
    <ShareCardFrame
      badgeLabel="DebtWatch chart"
      title={title}
      sourceNote={sourceNote}
      sourceHref={sourceHref}
      versionLabel={versionLabel}
      visual={visual}
      className={styles.card}
      pinnedFooter
    />
  );
}
