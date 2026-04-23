import ArticleVisualShareFrame from "@/components/ui/articleVisualShareFrameComponent/ArticleVisualShareFrame";
import ArticleHero from "@/components/ui/articleHeroComponent/ArticleHero";
import { getArticleVisualEmbedDefinition } from "@/data/embeds/articleVisualEmbedRegistry";
import type { ArticleData } from "@/data/articles/articleTypes";
import { buildArticleUrl, resolveArticleVisualSocialUrl } from "@/lib/articleVisualShare";
import { resolveVisualSnapshotVersion } from "@/lib/publishedVisualVersion";
import { renderArticleVisual } from "./articleVisualRegistry";

export interface ArticleHeroContainerProps {
  article: ArticleData;
}

export default function ArticleHeroContainer({ article }: ArticleHeroContainerProps) {
  const exportDefinition = getArticleVisualEmbedDefinition(article.slug, article.heroVisual);
  const renderedVisual = renderArticleVisual(article.heroVisual, article);
  const snapshotDate =
    article.publishedSnapshotVersion ??
    (exportDefinition?.articleSlug && exportDefinition.embedSlug
      ? resolveVisualSnapshotVersion({
          contextSlug: exportDefinition.articleSlug,
          assetSlug: exportDefinition.embedSlug,
          embedSlug: exportDefinition.embedSlug,
        })
      : undefined);

  return (
    <ArticleHero
      header={article.header}
      tagline={article.tagline}
      date={article.date}
      author={article.author}
      authorBioUrl={article.authorBioUrl}
      description={article.description}
      keyTakeaway={article.keyTakeaway}
      visual={
        <ArticleVisualShareFrame
          shareAction={{
            chartTitle: exportDefinition?.title ?? article.header,
            articleUrl: buildArticleUrl(article.slug),
            socialUrl: resolveArticleVisualSocialUrl({
              articleSlug: article.slug,
              contextSlug: exportDefinition?.articleSlug,
              assetSlug: exportDefinition?.embedSlug,
              snapshotDate,
            }),
            shareText: exportDefinition?.shareText ?? article.shareText ?? article.header,
            contextSlug: exportDefinition?.articleSlug,
            embedSlug: exportDefinition?.embedSlug,
            assetSlug: exportDefinition?.embedSlug,
            snapshotDate,
          }}
        >
          {renderedVisual}
        </ArticleVisualShareFrame>
      }
    />
  );
}
