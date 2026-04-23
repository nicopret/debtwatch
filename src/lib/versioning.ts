import { getAllArticles } from "../data/articles";

export function getUtcDateFolderName(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function isDatedVersion(value: string): boolean {
  return /^\d{8}$/.test(value);
}

export function getPinnedPublishedVersions(): string[] {
  const versions = new Set<string>();

  for (const article of getAllArticles()) {
    if (!article.publishedSnapshotVersion) {
      continue;
    }

    if (!isDatedVersion(article.publishedSnapshotVersion)) {
      throw new Error(
        `Article '${article.slug}' has invalid published snapshot version '${article.publishedSnapshotVersion}'. Expected YYYYMMDD.`,
      );
    }

    versions.add(article.publishedSnapshotVersion);
  }

  return [...versions].sort((left, right) => right.localeCompare(left));
}

export function getSupportedEmbedVersions(date = new Date()): string[] {
  const currentVersion = getUtcDateFolderName(date);
  const pinnedVersions = getPinnedPublishedVersions()
    .filter((version) => version !== currentVersion);

  return [currentVersion, ...pinnedVersions, "latest"];
}
