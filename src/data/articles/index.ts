import { borrowingExplainedArticle } from "./borrowingExplainedArticle";
import { debtInterestExplainedArticle } from "./debtInterestExplainedArticle";
import { debtToGdpExplainedArticle } from "./debtToGdpExplainedArticle";
import { giltYieldsExplainedArticle } from "./giltYieldsExplainedArticle";
import { governmentSpendingExplainedArticle } from "./governmentSpendingExplainedArticle";
import type { ArticleData } from "./articleTypes";
import { parseArticlePublicationMonth } from "../../lib/articlePublicationDate";

export const articles: ArticleData[] = [
  debtInterestExplainedArticle,
  debtToGdpExplainedArticle,
  governmentSpendingExplainedArticle,
  borrowingExplainedArticle,
  giltYieldsExplainedArticle,
];

export function getAllArticles(): ArticleData[] {
  return [...articles].sort((left, right) => {
    const leftDate = new Date(left.date);
    const rightDate = new Date(right.date);

    if (!Number.isNaN(leftDate.getTime()) && !Number.isNaN(rightDate.getTime())) {
      return rightDate.getTime() - leftDate.getTime();
    }

    const leftMonth = parseArticlePublicationMonth(left.date);
    const rightMonth = parseArticlePublicationMonth(right.date);

    if (!leftMonth || !rightMonth) {
      return 0;
    }

    if (leftMonth.year !== rightMonth.year) {
      return rightMonth.year - leftMonth.year;
    }

    return rightMonth.month - leftMonth.month;
  });
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
