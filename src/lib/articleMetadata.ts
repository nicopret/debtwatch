import type { Metadata } from "next";
import type { ArticleData } from "@/data/articles/articleTypes";
import { getArticleVisualEmbedDefinition } from "@/data/embeds/articleVisualEmbedRegistry";
import { buildAssetUrl } from "@/lib/assetUrl";
import { buildArticleUrl } from "@/lib/articleVisualShare";
import { resolveVisualSnapshotVersion } from "@/lib/publishedVisualVersion";

const SITE_URL = "https://debtwatch.uk";
const DEFAULT_IMAGE_URL = `${SITE_URL}/icon.png`;

export function buildArticleMetadata(article: ArticleData): Metadata {
  const canonicalUrl = buildArticleUrl(article.slug);
  const heroExportDefinition = getArticleVisualEmbedDefinition(article.slug, article.heroVisual);
  const imageUrl =
    heroExportDefinition?.articleSlug && heroExportDefinition.embedSlug
      ? buildAssetUrl({
          contextSlug: heroExportDefinition.articleSlug,
          assetSlug: heroExportDefinition.embedSlug,
          version:
            article.publishedSnapshotVersion ??
            resolveVisualSnapshotVersion({
              contextSlug: heroExportDefinition.articleSlug,
              assetSlug: heroExportDefinition.embedSlug,
              embedSlug: heroExportDefinition.embedSlug,
            }),
          format: "png",
        })
      : DEFAULT_IMAGE_URL;

  return {
    title: `${article.header} | DebtWatch`,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.header,
      description: article.description,
      images: [
        {
          url: imageUrl,
          width: 1400,
          height: 760,
          alt: article.header,
        },
      ],
      siteName: "DebtWatch",
    },
    twitter: {
      card: "summary_large_image",
      title: article.header,
      description: article.description,
      images: [imageUrl],
    },
  };
}
