import { readFileSync } from "node:fs";
import path from "node:path";
import { getSupportedEmbedVersions, isDatedVersion } from "./versioning";

export interface ExportManifest {
  kind: "assets" | "embeds";
  generatedAt: string;
  versions: string[];
  requiredFiles: string[];
  generatedFiles: string[];
}

const repoRoot = path.resolve(process.cwd());
const assetManifestPath = path.join(repoRoot, "static", "assets", "asset-manifest.json");
const embedManifestPath = path.join(repoRoot, "static", "embeds", "embed-manifest.json");

function getBootstrapSnapshotVersion(): string | undefined {
  return process.env.DEBTWATCH_EXPORT_BOOTSTRAP_VERSION;
}

function bootstrapVersionToDate(version: string): Date {
  const year = Number(version.slice(0, 4));
  const month = Number(version.slice(4, 6));
  const day = Number(version.slice(6, 8));
  return new Date(Date.UTC(year, month - 1, day));
}

function resolveFallbackVersions(): string[] | null {
  const bootstrapSnapshotVersion = getBootstrapSnapshotVersion();
  if (bootstrapSnapshotVersion) {
    return getSupportedEmbedVersions(bootstrapVersionToDate(bootstrapSnapshotVersion));
  }

  return null;
}

function readManifest(manifestPath: string, kind: ExportManifest["kind"]): ExportManifest {
  const manifestContents = readFileSync(manifestPath, "utf8");
  const parsedManifest = JSON.parse(manifestContents) as ExportManifest;

  if (parsedManifest.kind !== kind) {
    throw new Error(
      `Expected '${manifestPath}' to contain a '${kind}' manifest, found '${parsedManifest.kind}'.`,
    );
  }

  return parsedManifest;
}

function findRequiredFiles(
  manifest: ExportManifest,
  contextSlug: string,
  fileSuffix: string,
): string[] {
  return manifest.requiredFiles.filter((relativePath) => {
    const segments = relativePath.split("/");
    return (
      segments.length >= 3 &&
      segments[0] === contextSlug &&
      relativePath.endsWith(fileSuffix)
    );
  });
}

function resolveSnapshotVersionFromPaths(paths: string[], label: string): string {
  const versions = [...new Set(paths.map((relativePath) => relativePath.split("/")[1]))].sort();

  if (!versions.includes("latest")) {
    throw new Error(`${label} is missing the required 'latest' export.`);
  }

  const datedVersions = versions.filter(isDatedVersion);

  if (datedVersions.length === 0) {
    throw new Error(
      `${label} must resolve to at least one dated version. Found: none.`,
    );
  }

  return datedVersions.sort().at(-1)!;
}

export function getAssetExportManifest(): ExportManifest {
  return readManifest(assetManifestPath, "assets");
}

export function getEmbedExportManifest(): ExportManifest {
  return readManifest(embedManifestPath, "embeds");
}

export function getPublishedAssetVersions(
  manifest?: ExportManifest,
): string[] {
  const fallbackVersions = !manifest ? resolveFallbackVersions() : null;
  if (fallbackVersions) {
    return fallbackVersions;
  }

  try {
    return [...(manifest ?? getAssetExportManifest()).versions];
  } catch {
    return getSupportedEmbedVersions();
  }
}

export function getPublishedEmbedVersions(
  manifest?: ExportManifest,
): string[] {
  const fallbackVersions = !manifest ? resolveFallbackVersions() : null;
  if (fallbackVersions) {
    return fallbackVersions;
  }

  try {
    return [...(manifest ?? getEmbedExportManifest()).versions];
  } catch {
    return getSupportedEmbedVersions();
  }
}

export function resolveAssetSnapshotVersion(
  contextSlug: string,
  assetSlug: string,
  manifest?: ExportManifest,
): string {
  const fallbackVersions = !manifest ? resolveFallbackVersions() : null;
  if (fallbackVersions) {
    return fallbackVersions.find(isDatedVersion) ?? fallbackVersions[0];
  }

  let resolvedManifest: ExportManifest;

  try {
    resolvedManifest = manifest ?? getAssetExportManifest();
  } catch {
    throw new Error(
      `Asset manifest is required to resolve '${contextSlug}/${assetSlug}'. Run 'npm run build:assets' first.`,
    );
  }

  const pngPaths = findRequiredFiles(resolvedManifest, contextSlug, `/${assetSlug}.png`);
  const svgPaths = findRequiredFiles(resolvedManifest, contextSlug, `/${assetSlug}.svg`);

  if (pngPaths.length === 0 || svgPaths.length === 0) {
    throw new Error(
      `Asset manifest is missing exports for '${contextSlug}/${assetSlug}' in both PNG and SVG formats.`,
    );
  }

  const pngVersion = resolveSnapshotVersionFromPaths(
    pngPaths,
    `Asset '${contextSlug}/${assetSlug}.png'`,
  );
  const svgVersion = resolveSnapshotVersionFromPaths(
    svgPaths,
    `Asset '${contextSlug}/${assetSlug}.svg'`,
  );

  if (pngVersion !== svgVersion) {
    throw new Error(
      `Asset manifest version mismatch for '${contextSlug}/${assetSlug}'. PNG uses '${pngVersion}' but SVG uses '${svgVersion}'.`,
    );
  }

  return pngVersion;
}

export function resolveEmbedSnapshotVersion(
  contextSlug: string,
  embedSlug: string,
  manifest?: ExportManifest,
): string {
  const fallbackVersions = !manifest ? resolveFallbackVersions() : null;
  if (fallbackVersions) {
    return fallbackVersions.find(isDatedVersion) ?? fallbackVersions[0];
  }

  let resolvedManifest: ExportManifest;

  try {
    resolvedManifest = manifest ?? getEmbedExportManifest();
  } catch {
    throw new Error(
      `Embed manifest is required to resolve '${contextSlug}/${embedSlug}'. Run 'npm run build:embeds' first.`,
    );
  }

  const embedPaths = findRequiredFiles(resolvedManifest, contextSlug, `/${embedSlug}/index.html`);

  if (embedPaths.length === 0) {
    throw new Error(
      `Embed manifest is missing exports for '${contextSlug}/${embedSlug}'.`,
    );
  }

  return resolveSnapshotVersionFromPaths(
    embedPaths,
    `Embed '${contextSlug}/${embedSlug}'`,
  );
}

export interface ResolveVisualSnapshotVersionOptions {
  contextSlug: string;
  assetSlug: string;
  embedSlug?: string;
  assetExportManifest?: ExportManifest;
  embedExportManifest?: ExportManifest;
}

export function resolveVisualSnapshotVersion({
  contextSlug,
  assetSlug,
  embedSlug = assetSlug,
  assetExportManifest,
  embedExportManifest,
}: ResolveVisualSnapshotVersionOptions): string {
  const assetVersion = resolveAssetSnapshotVersion(
    contextSlug,
    assetSlug,
    assetExportManifest,
  );
  const embedVersion = resolveEmbedSnapshotVersion(
    contextSlug,
    embedSlug,
    embedExportManifest,
  );

  if (assetVersion !== embedVersion) {
    throw new Error(
      `Published visual version mismatch for '${contextSlug}'. Asset '${assetSlug}' uses '${assetVersion}' but embed '${embedSlug}' uses '${embedVersion}'.`,
    );
  }

  return assetVersion;
}
