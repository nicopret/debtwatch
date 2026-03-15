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
  const normalizedSourcePath = embed.sourcePath.endsWith("/")
    ? embed.sourcePath
    : `${embed.sourcePath}/`;
  return (
    <EmbedPageTemplate
      title={embed.title}
      sourceNote={embed.sourceNote}
      sourceHref={`https://debtwatch.uk${normalizedSourcePath}`}
      versionLabel={version}
      visual={renderEmbedVisual(embed)}
    />
  );
}
