import { borrowingExplainedArticle } from "./borrowingExplainedArticle";
import { debtInterestExplainedArticle } from "./debtInterestExplainedArticle";
import { debtToGdpExplainedArticle } from "./debtToGdpExplainedArticle";
import { giltYieldsExplainedArticle } from "./giltYieldsExplainedArticle";
import { governmentSpendingExplainedArticle } from "./governmentSpendingExplainedArticle";
import type { ArticleData } from "./articleTypes";

export const articles: ArticleData[] = [
  debtInterestExplainedArticle,
  debtToGdpExplainedArticle,
  governmentSpendingExplainedArticle,
  borrowingExplainedArticle,
  giltYieldsExplainedArticle,
];

export function getAllArticles(): ArticleData[] {
  return articles;
}

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: ArticleData, limit = 5): ArticleData[] {
  const preferred = article.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is ArticleData => item !== undefined)
    .filter((item) => item.slug !== article.slug);

  const fill = articles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      !preferred.some((preferredArticle) => preferredArticle.slug === candidate.slug),
  );

  return [...preferred, ...fill].slice(0, limit);
}
