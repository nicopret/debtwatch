import { getArticleBySlug } from "@/data/articles";
import type { ArticleVisualKey } from "@/data/articles/articleTypes";
import { renderArticleVisual } from "@/containers/articleContainers/articleVisualRegistry";

export interface ArticleVisualEmbedContainerProps {
  articleSlug: string;
  visualKey: ArticleVisualKey;
}

export default function ArticleVisualEmbedContainer({
  articleSlug,
  visualKey,
}: ArticleVisualEmbedContainerProps) {
  const article = getArticleBySlug(articleSlug);

  if (!article) {
    return null;
  }

  return renderArticleVisual(visualKey, article);
}
