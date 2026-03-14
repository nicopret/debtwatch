import ArticleSources from "@/components/ui/articleSourcesComponent/ArticleSources";
import type { ArticleData } from "@/data/articles/articleTypes";

export interface ArticleSourcesContainerProps {
  article: ArticleData;
}

export default function ArticleSourcesContainer({
  article,
}: ArticleSourcesContainerProps) {
  return <ArticleSources items={article.sources} />;
}

