import ArticlePageTemplate from "@/components/ui/articlePageTemplateComponent/ArticlePageTemplate";
import type { ArticleData } from "@/data/articles/articleTypes";
import ArticleHeroContainer from "./ArticleHeroContainer";
import ArticleMetricStripContainer from "./ArticleMetricStripContainer";
import ArticleSectionsContainer from "./ArticleSectionsContainer";
import ArticleSourcesContainer from "./ArticleSourcesContainer";
import RelatedArticlesContainer from "./RelatedArticlesContainer";

export interface ArticlePageContainerProps {
  article: ArticleData;
}

export default function ArticlePageContainer({ article }: ArticlePageContainerProps) {
  return (
    <ArticlePageTemplate
      hero={<ArticleHeroContainer article={article} />}
      metricStrip={<ArticleMetricStripContainer article={article} />}
      sections={<ArticleSectionsContainer article={article} />}
      sources={<ArticleSourcesContainer article={article} />}
      relatedArticles={<RelatedArticlesContainer article={article} />}
    />
  );
}

