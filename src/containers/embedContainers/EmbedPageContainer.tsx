import EmbedPageTemplate from "@/components/ui/embedPageTemplateComponent/EmbedPageTemplate";
import type { EmbedDefinition } from "@/data/embeds/embedRegistry";
import { renderEmbedVisual } from "./embedRendererRegistry";

export interface EmbedPageContainerProps {
  embed: EmbedDefinition;
  version: string;
}

export default function EmbedPageContainer({
  embed,
  version,
}: EmbedPageContainerProps) {
  return (
    <EmbedPageTemplate
      title={embed.title}
      sourceNote={embed.sourceNote}
      sourceHref={`https://www.debtwatch.uk${embed.sourcePath}`}
      versionLabel={version}
      visual={renderEmbedVisual(embed)}
    />
  );
}

