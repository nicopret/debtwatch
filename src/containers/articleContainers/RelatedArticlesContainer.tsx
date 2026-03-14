import RelatedArticles from "@/components/ui/relatedArticlesComponent/RelatedArticles";
import { getRelatedArticles } from "@/data/articles";
import type { ArticleData } from "@/data/articles/articleTypes";

export interface RelatedArticlesContainerProps {
  article: ArticleData;
}

export default function RelatedArticlesContainer({
  article,
}: RelatedArticlesContainerProps) {
  const relatedArticles = getRelatedArticles(article).map((item) => ({
    slug: item.slug,
    title: item.header,
    tagline: item.tagline,
    description: item.description,
  }));

  return <RelatedArticles items={relatedArticles} />;
}

