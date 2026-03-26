import RelatedArticles from "@/components/ui/relatedArticlesComponent/RelatedArticles";
import { getRelatedArticles } from "@/data/articles";
import type { ArticleData } from "@/data/articles/articleTypes";
import { renderArticlePreviewGraphic } from "./articlePreviewGraphicRegistry";

export interface RelatedArticlesContainerProps {
  article: ArticleData;
}

export default function RelatedArticlesContainer({
  article,
}: RelatedArticlesContainerProps) {
  const relatedArticles = getRelatedArticles(article, 4).map((item) => ({
    slug: item.slug,
    title: item.header,
    tagline: item.tagline,
    previewGraphic: renderArticlePreviewGraphic(item.previewGraphicKey, item.date),
  }));

  return <RelatedArticles items={relatedArticles} />;
}
