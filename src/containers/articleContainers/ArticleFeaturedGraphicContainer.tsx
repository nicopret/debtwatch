import ArticleFeaturedGraphicSection from "@/components/ui/articleFeaturedGraphicSectionComponent/ArticleFeaturedGraphicSection";
import type { ArticleData } from "@/data/articles/articleTypes";
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

  return (
    <ArticleFeaturedGraphicSection
      heading={graphic.heading}
      subheading={graphic.subheading}
    >
      {graphic.render()}
    </ArticleFeaturedGraphicSection>
  );
}
