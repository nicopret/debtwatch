import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePageContainer from "@/containers/articleContainers/ArticlePageContainer";
import { getAllArticles, getArticleBySlug } from "@/data/articles";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | DebtWatch",
    };
  }

  return {
    title: `${article.header} | DebtWatch`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="site-container metrics-section">
      <ArticlePageContainer article={article} />
    </section>
  );
}
