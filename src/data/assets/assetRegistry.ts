import {
  embedRegistry,
  type EmbedDefinition,
  type EmbedRendererKey,
} from "../embeds/embedRegistry";

export interface AssetDefinition {
  contextSlug: string;
  assetSlug: string;
  title: string;
  sourceNote: string;
  sourcePath: string;
  rendererKey: EmbedRendererKey;
}

function toAssetDefinition(embed: EmbedDefinition): AssetDefinition {
  return {
    contextSlug: embed.contextSlug,
    assetSlug: embed.embedSlug,
    title: embed.title,
    sourceNote: embed.sourceNote,
    sourcePath: embed.sourcePath,
    rendererKey: embed.rendererKey,
  };
}

export const assetRegistry: AssetDefinition[] = embedRegistry.map(toAssetDefinition);

export function getAssetDefinition(
  contextSlug: string,
  assetSlug: string,
): AssetDefinition | undefined {
  return assetRegistry.find(
    (asset) => asset.contextSlug === contextSlug && asset.assetSlug === assetSlug,
  );
}
