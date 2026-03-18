import ArticleIndexList from "@/components/ui/articleIndexListComponent/ArticleIndexList";
import { getAllArticles } from "@/data/articles";
import { renderArticlePreviewGraphic } from "./articlePreviewGraphicRegistry";

export default function ArticleIndexContainer() {
  const items = getAllArticles().map((article) => ({
    slug: article.slug,
    header: article.header,
    tagline: article.tagline,
    description: article.description,
    previewGraphic: renderArticlePreviewGraphic(article.previewGraphicKey),
  }));

  return <ArticleIndexList items={items} />;
}
