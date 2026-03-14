import ArticleIndexList from "@/components/ui/articleIndexListComponent/ArticleIndexList";
import { getAllArticles } from "@/data/articles";

export default function ArticleIndexContainer() {
  const items = getAllArticles().map((article) => ({
    slug: article.slug,
    header: article.header,
    tagline: article.tagline,
    description: article.description,
  }));

  return <ArticleIndexList items={items} />;
}

