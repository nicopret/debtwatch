import ArticleHero from "@/components/ui/articleHeroComponent/ArticleHero";
import type { ArticleData } from "@/data/articles/articleTypes";
import { renderArticleVisual } from "./articleVisualRegistry";

export interface ArticleHeroContainerProps {
  article: ArticleData;
}

export default function ArticleHeroContainer({ article }: ArticleHeroContainerProps) {
  return (
    <ArticleHero
      header={article.header}
      tagline={article.tagline}
      date={article.date}
      author={article.author}
      authorBioUrl={article.authorBioUrl}
      description={article.description}
      keyTakeaway={article.keyTakeaway}
      visual={renderArticleVisual(article.heroVisual, article)}
    />
  );
}
