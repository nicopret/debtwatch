const ASSET_HOST = "https://assets.debtwatch.uk";

export type AssetFormat = "png" | "svg";

export interface AssetUrlOptions {
  contextSlug: string;
  assetSlug: string;
  version: string;
  format?: AssetFormat;
}

export function buildAssetUrl({
  contextSlug,
  assetSlug,
  version,
  format = "png",
}: AssetUrlOptions): string {
  return `${ASSET_HOST}/${contextSlug}/${version}/${assetSlug}.${format}`;
}
