import AssetPageTemplate from "@/components/ui/assetPageTemplateComponent/AssetPageTemplate";
import type { AssetDefinition } from "@/data/assets/assetRegistry";
import { renderEmbedVisual } from "@/containers/embedContainers/embedRendererRegistry";

export interface AssetPageContainerProps {
  asset: AssetDefinition;
  version: string;
}

export default function AssetPageContainer({
  asset,
  version,
}: AssetPageContainerProps) {
  const normalizedSourcePath = asset.sourcePath.endsWith("/")
    ? asset.sourcePath
    : `${asset.sourcePath}/`;

  return (
    <AssetPageTemplate
      title={asset.title}
      sourceNote={asset.sourceNote}
      sourceHref={`https://debtwatch.uk${normalizedSourcePath}`}
      versionLabel={version}
      visual={renderEmbedVisual({
        contextSlug: asset.contextSlug,
        embedSlug: asset.assetSlug,
        title: asset.title,
        sourceNote: asset.sourceNote,
        sourcePath: asset.sourcePath,
        rendererKey: asset.rendererKey,
      })}
    />
  );
}
