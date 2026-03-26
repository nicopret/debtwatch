import ArticleVisualShareFrame from "@/components/ui/articleVisualShareFrameComponent/ArticleVisualShareFrame";
import ArticleHero from "@/components/ui/articleHeroComponent/ArticleHero";
import { getArticleVisualEmbedDefinition } from "@/data/embeds/articleVisualEmbedRegistry";
import type { ArticleData } from "@/data/articles/articleTypes";
import { buildArticleUrl } from "@/lib/articleVisualShare";
import { getUtcDateFolderName } from "@/lib/versioning";
import { renderArticleVisual } from "./articleVisualRegistry";

export interface ArticleHeroContainerProps {
  article: ArticleData;
}

export default function ArticleHeroContainer({ article }: ArticleHeroContainerProps) {
  const exportDefinition = getArticleVisualEmbedDefinition(article.slug, article.heroVisual);
  const snapshotDate = getUtcDateFolderName(new Date());
  const renderedVisual = renderArticleVisual(article.heroVisual, article);

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
