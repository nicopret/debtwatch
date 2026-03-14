import ArticleSection from "@/components/ui/articleSectionComponent/ArticleSection";
import type { ArticleData } from "@/data/articles/articleTypes";
import { renderArticleCallout, renderArticleVisual } from "./articleVisualRegistry";

export interface ArticleSectionsContainerProps {
  article: ArticleData;
}

export default function ArticleSectionsContainer({
  article,
}: ArticleSectionsContainerProps) {
  return (
    <>
      {article.sections.map((section) => (
        <ArticleSection
          key={section.id}
          heading={section.heading}
          body={section.body}
          layout={section.layout}
          visual={section.visualKey ? renderArticleVisual(section.visualKey) : undefined}
          callout={section.callout ? renderArticleCallout(section.callout) : undefined}
        />
      ))}
    </>
  );
}

