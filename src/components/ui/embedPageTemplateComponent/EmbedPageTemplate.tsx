import type { ReactNode } from "react";
import ShareCardFrame from "@/components/ui/shareCardFrameComponent/ShareCardFrame";

export interface EmbedPageTemplateProps {
  title: string;
  sourceNote: string;
  sourceHref: string;
  versionLabel: string;
  visual: ReactNode;
}

export default function EmbedPageTemplate({
  title,
  sourceNote,
  sourceHref,
  versionLabel,
  visual,
}: EmbedPageTemplateProps) {
  return (
    <ShareCardFrame
      badgeLabel="DebtWatch embed"
      title={title}
      sourceNote={sourceNote}
      sourceHref={sourceHref}
      versionLabel={versionLabel}
      visual={visual}
    />
  );
}
