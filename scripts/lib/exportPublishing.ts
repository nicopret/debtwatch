import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { assetRegistry } from "../../src/data/assets/assetRegistry.js";
import { embedRegistry } from "../../src/data/embeds/embedRegistry.js";
import { getSupportedEmbedVersions } from "../../src/lib/versioning.js";

const DEFAULT_EMBED_S3_PREFIX = "embeds";
const DEFAULT_ASSET_S3_PREFIX = "assets";

export const EMBED_S3_PREFIX = normalizeStoragePrefix(
  process.env.EMBED_S3_PREFIX ?? DEFAULT_EMBED_S3_PREFIX,
);
export const ASSET_S3_PREFIX = normalizeStoragePrefix(
  process.env.ASSET_S3_PREFIX ?? DEFAULT_ASSET_S3_PREFIX,
);

export interface ExportManifest {
  kind: "embeds" | "assets";
  generatedAt: string;
  versions: string[];
  requiredFiles: string[];
  generatedFiles: string[];
}

export function normalizeRelativePath(value: string): string {
  return value.replace(/\\/g, "/").replace(/^\/+/, "").replace(/\/+$/, "");
}

export function normalizeStoragePrefix(value: string | undefined): string {
  if (!value) {
    return "";
  }

  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed.length > 0 ? `${trimmed}/` : "";
}

export function buildS3ObjectKey(prefix: string, relativePath: string): string {
  return `${normalizeStoragePrefix(prefix)}${normalizeRelativePath(relativePath)}`;
}

export function buildEmbedRelativePath(
  contextSlug: string,
  version: string,
  embedSlug: string,
): string {
  return `${contextSlug}/${version}/${embedSlug}/index.html`;
}

export function buildAssetRelativePath(
  contextSlug: string,
  version: string,
  assetSlug: string,
  format: "png" | "svg",
): string {
  return `${contextSlug}/${version}/${assetSlug}.${format}`;
}

export function getExpectedEmbedEntryFiles(versions = getSupportedEmbedVersions()): string[] {
  return embedRegistry.flatMap((embed) =>
    versions.map((version) =>
      buildEmbedRelativePath(embed.contextSlug, version, embed.embedSlug),
    ),
  );
}

export function getExpectedAssetFiles(versions = getSupportedEmbedVersions()): string[] {
  return assetRegistry.flatMap((asset) =>
    versions.flatMap((version) => [
      buildAssetRelativePath(asset.contextSlug, version, asset.assetSlug, "png"),
      buildAssetRelativePath(asset.contextSlug, version, asset.assetSlug, "svg"),
    ]),
  );
}

export async function collectRelativeFiles(rootDirectory: string): Promise<string[]> {
  const entries = await readdir(rootDirectory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = path.join(rootDirectory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectRelativeFiles(fullPath);
      files.push(...nestedFiles.map((nestedFile) => `${entry.name}/${nestedFile}`));
      continue;
    }

    if (entry.isFile()) {
      files.push(entry.name);
    }
  }

  return files.map(normalizeRelativePath).sort();
}

export async function ensureRequiredFilesExist(
  rootDirectory: string,
  requiredFiles: string[],
  label: string,
): Promise<void> {
  const missingFiles: string[] = [];

  for (const relativeFile of requiredFiles) {
    const fullPath = path.join(rootDirectory, relativeFile);

    try {
      const fileStats = await stat(fullPath);
      if (!fileStats.isFile()) {
        missingFiles.push(relativeFile);
      }
    } catch {
      missingFiles.push(relativeFile);
    }
  }

  if (missingFiles.length > 0) {
    const sample = missingFiles.slice(0, 10).join(", ");
    throw new Error(
      `${label} missing ${missingFiles.length} required file(s). Sample: ${sample}`,
    );
  }
}

export async function writeExportManifest(
  rootDirectory: string,
  fileName: string,
  manifest: ExportManifest,
): Promise<string> {
  const manifestPath = path.join(rootDirectory, fileName);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifestPath;
}
