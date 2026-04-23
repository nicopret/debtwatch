import path from "node:path";
import { fileURLToPath } from "node:url";

import { getAllArticles } from "../src/data/articles/index.js";
import { getArticleVisualEmbedDefinition } from "../src/data/embeds/articleVisualEmbedRegistry.js";
import {
  getAssetExportManifest,
  getEmbedExportManifest,
  resolveAssetSnapshotVersion,
  resolveEmbedSnapshotVersion,
  resolveVisualSnapshotVersion,
} from "../src/lib/publishedVisualVersion.js";
import {
  buildAssetRelativePath,
  buildEmbedRelativePath,
  ensureRequiredFilesExist,
} from "./lib/exportPublishing.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const assetOutputDir = path.join(repoRoot, "static", "assets");
const embedOutputDir = path.join(repoRoot, "static", "embeds");

async function main() {
  const assetManifest = getAssetExportManifest();
  const embedManifest = getEmbedExportManifest();

  await ensureRequiredFilesExist(
    assetOutputDir,
    assetManifest.requiredFiles,
    "Asset manifest validation",
  );
  await ensureRequiredFilesExist(
    embedOutputDir,
    embedManifest.requiredFiles,
    "Embed manifest validation",
  );

  const articles = getAllArticles();
  let validatedVisualCount = 0;

  const assertManifestContainsPublishedVisual = ({
    articleSlug,
    visualKey,
    contextSlug,
    assetSlug,
    embedSlug,
    version,
  }: {
    articleSlug: string;
    visualKey: string;
    contextSlug: string;
    assetSlug: string;
    embedSlug: string;
    version: string;
  }) => {
    const requiredAssetPng = buildAssetRelativePath(contextSlug, version, assetSlug, "png");
    const requiredAssetSvg = buildAssetRelativePath(contextSlug, version, assetSlug, "svg");
    const requiredEmbed = buildEmbedRelativePath(contextSlug, version, embedSlug);

    if (!assetManifest.requiredFiles.includes(requiredAssetPng)) {
      throw new Error(
        `Publishing validation is missing asset '${requiredAssetPng}' for '${articleSlug}:${visualKey}'.`,
      );
    }

    if (!assetManifest.requiredFiles.includes(requiredAssetSvg)) {
      throw new Error(
        `Publishing validation is missing asset '${requiredAssetSvg}' for '${articleSlug}:${visualKey}'.`,
      );
    }

    if (!embedManifest.requiredFiles.includes(requiredEmbed)) {
      throw new Error(
        `Publishing validation is missing embed '${requiredEmbed}' for '${articleSlug}:${visualKey}'.`,
      );
    }
  };

  for (const article of articles) {
    const heroDefinition = getArticleVisualEmbedDefinition(article.slug, article.heroVisual);
    if (heroDefinition) {
      const latestVersion = resolveVisualSnapshotVersion({
        contextSlug: heroDefinition.articleSlug,
        assetSlug: heroDefinition.embedSlug,
        embedSlug: heroDefinition.embedSlug,
      });

      assertManifestContainsPublishedVisual({
        articleSlug: article.slug,
        visualKey: article.heroVisual,
        contextSlug: heroDefinition.articleSlug,
        assetSlug: heroDefinition.embedSlug,
        embedSlug: heroDefinition.embedSlug,
        version: article.publishedSnapshotVersion ?? latestVersion,
      });

      validatedVisualCount += 1;
    }

    for (const section of article.sections) {
      if (!section.visualKey) {
        continue;
      }

      const visualKey = section.visualKey;
      const definition = getArticleVisualEmbedDefinition(article.slug, visualKey);
      if (!definition) {
        continue;
      }

      const latestVersion = resolveVisualSnapshotVersion({
        contextSlug: definition.articleSlug,
        assetSlug: definition.embedSlug,
        embedSlug: definition.embedSlug,
      });

      const assetVersion = resolveAssetSnapshotVersion(
        definition.articleSlug,
        definition.embedSlug,
      );
      const embedVersion = resolveEmbedSnapshotVersion(
        definition.articleSlug,
        definition.embedSlug,
      );

      if (latestVersion !== assetVersion || latestVersion !== embedVersion) {
        throw new Error(
          `Publishing validation mismatch for '${article.slug}:${visualKey}'. Asset resolves to '${assetVersion}', embed resolves to '${embedVersion}', canonical visual version resolves to '${latestVersion}'.`,
        );
      }

      assertManifestContainsPublishedVisual({
        articleSlug: article.slug,
        visualKey,
        contextSlug: definition.articleSlug,
        assetSlug: definition.embedSlug,
        embedSlug: definition.embedSlug,
        version: section.shareSnapshotDate ?? article.publishedSnapshotVersion ?? latestVersion,
      });

      validatedVisualCount += 1;
    }
  }

  console.log(
    `Validated publishing manifests: ${assetManifest.requiredFiles.length} asset files, ${embedManifest.requiredFiles.length} embed entry files, ${validatedVisualCount} article visual references.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
