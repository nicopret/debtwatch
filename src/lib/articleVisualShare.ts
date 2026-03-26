import type { ArticleData, ArticleSectionData } from "@/data/articles/articleTypes";

const SITE_HOST = "https://debtwatch.uk";

export interface ArticleVisualShareConfig {
  articleUrl: string;
  shareTitle: string;
  shareText: string;
  contextSlug?: string;
  embedSlug?: string;
  assetSlug?: string;
  snapshotDate?: string;
}

export interface SocialShareLinks {
  x: string;
  facebook: string;
  linkedin: string;
}

export function buildArticleUrl(slug: string): string {
  return `${SITE_HOST}/articles/${slug}`;
}

export function resolveArticleVisualShareText(
  article: ArticleData,
  section: ArticleSectionData,
): string {
  return (
    section.visualShareText ??
    article.shareText ??
    article.header ??
    section.visualShareTitle ??
    section.heading
  );
}

export function resolveArticleVisualShareTitle(
  article: ArticleData,
  section: ArticleSectionData,
): string {
  return section.visualShareTitle ?? section.heading ?? article.header;
}

export function buildArticleVisualShareConfig(
  article: ArticleData,
  section: ArticleSectionData,
): ArticleVisualShareConfig | null {
  if (!section.visualKey) {
    return null;
  }

  return {
    articleUrl: buildArticleUrl(article.slug),
    shareTitle: resolveArticleVisualShareTitle(article, section),
    shareText: resolveArticleVisualShareText(article, section),
    contextSlug: section.shareContextSlug,
    embedSlug: section.shareEmbedSlug,
    assetSlug: section.shareAssetSlug,
    snapshotDate: section.shareSnapshotDate,
  };
}

export function buildSocialShareLinks({
  articleUrl,
  shareText,
}: Pick<ArticleVisualShareConfig, "articleUrl" | "shareText">): SocialShareLinks {
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedText = encodeURIComponent(shareText);

  return {
    x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
}
