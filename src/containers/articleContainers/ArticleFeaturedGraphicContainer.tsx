import ArticleVisualShareFrame from "@/components/ui/articleVisualShareFrameComponent/ArticleVisualShareFrame";
import ArticleFeaturedGraphicSection from "@/components/ui/articleFeaturedGraphicSectionComponent/ArticleFeaturedGraphicSection";
import type { ArticleData } from "@/data/articles/articleTypes";
import { getArticleVisualEmbedDefinition } from "@/data/embeds/articleVisualEmbedRegistry";
import { buildArticleUrl, resolveArticleVisualSocialUrl } from "@/lib/articleVisualShare";
import { resolveVisualSnapshotVersion } from "@/lib/publishedVisualVersion";
import { articleFeaturedGraphicRegistry } from "./articleFeaturedGraphicRegistry";

export interface ArticleFeaturedGraphicContainerProps {
  article: ArticleData;
}

export default function ArticleFeaturedGraphicContainer({
  article,
}: ArticleFeaturedGraphicContainerProps) {
  if (!article.featuredGraphicKey) {
    return null;
  }

  const graphic = articleFeaturedGraphicRegistry[article.featuredGraphicKey];
  if (!graphic) {
    return null;
  }

  const exportDefinition = graphic.articleVisualKey
    ? getArticleVisualEmbedDefinition(article.slug, graphic.articleVisualKey)
    : undefined;
  const snapshotDate =
    article.publishedSnapshotVersion ??
    (exportDefinition?.articleSlug && exportDefinition.embedSlug
      ? resolveVisualSnapshotVersion({
          contextSlug: exportDefinition.articleSlug,
          assetSlug: exportDefinition.embedSlug,
          embedSlug: exportDefinition.embedSlug,
        })
      : undefined);
  const renderedGraphic = graphic.render(article);

  return (
    <ArticleFeaturedGraphicSection
      heading={graphic.heading}
      subheading={graphic.subheading}
    >
      {exportDefinition ? (
        <ArticleVisualShareFrame
          shareAction={{
            chartTitle: exportDefinition.title,
            articleUrl: buildArticleUrl(article.slug),
            socialUrl: resolveArticleVisualSocialUrl({
              articleSlug: article.slug,
              contextSlug: exportDefinition.articleSlug,
              assetSlug: exportDefinition.embedSlug,
              snapshotDate,
            }),
            shareText: exportDefinition.shareText ?? article.shareText ?? exportDefinition.title,
            contextSlug: exportDefinition.articleSlug,
            embedSlug: exportDefinition.embedSlug,
            assetSlug: exportDefinition.embedSlug,
            snapshotDate,
          }}
        >
          {renderedGraphic}
        </ArticleVisualShareFrame>
      ) : renderedGraphic}
    </ArticleFeaturedGraphicSection>
  );
}
