import type { ArticleVisualKey } from "../articles/articleTypes";

export interface ArticleVisualEmbedDefinition {
  articleSlug: string;
  visualKey: ArticleVisualKey;
  embedSlug: string;
  title: string;
  shareText?: string;
  sourceNote: string;
}

export const articleVisualEmbedRegistry: ArticleVisualEmbedDefinition[] = [
  {
    articleSlug: "debt-interest-explained",
    visualKey: "borrowing-yield-rates",
    embedSlug: "debt-interest-hero-rates",
    title: "Yield rates",
    sourceNote: "Bank of England yield curve data via DebtWatch",
  },
  {
    articleSlug: "debt-interest-explained",
    visualKey: "debt-interest-vs-public-service-pay",
    embedSlug: "debt-interest-vs-public-service-pay",
    title: "Debt interest vs public service pay",
    sourceNote: "Public-service pay comparison via ONS and DebtWatch",
  },
  {
    articleSlug: "debt-interest-explained",
    visualKey: "debt-interest-g7-yields",
    embedSlug: "g7-borrowing-costs",
    title: "G7 borrowing costs",
    shareText: "10-year government bond yields,\n\nG7 borrowing costs",
    sourceNote: "OECD long-term interest rates via DebtWatch",
  },
  {
    articleSlug: "borrowing-over-time",
    visualKey: "borrowing-hero",
    embedSlug: "borrowing-hero-overview",
    title: "Comparing debt",
    sourceNote: "Debt overview panel via DebtWatch",
  },
  {
    articleSlug: "borrowing-over-time",
    visualKey: "borrowing-yield-rates",
    embedSlug: "borrowing-yield-rates",
    title: "Yield rates",
    sourceNote: "Bank of England yield curve data via DebtWatch",
  },
  {
    articleSlug: "borrowing-over-time",
    visualKey: "debt-ownership-breakdown",
    embedSlug: "debt-ownership-breakdown",
    title: "Who owns UK government debt",
    sourceNote: "Debt ownership breakdown via DebtWatch",
  },
  {
    articleSlug: "where-government-money-goes",
    visualKey: "budget-breakdown-hero",
    embedSlug: "budget-breakdown-hero",
    title: "Receipts vs spending",
    sourceNote: "OBR public finances totals via DebtWatch",
  },
  {
    articleSlug: "where-government-money-goes",
    visualKey: "budget-deficit-gap",
    embedSlug: "budget-deficit-gap",
    title: "Income, spending and deficit",
    sourceNote: "OBR public finances totals via DebtWatch",
  },
  {
    articleSlug: "where-government-money-goes",
    visualKey: "nhs-spending-breakdown",
    embedSlug: "nhs-spending-breakdown",
    title: "How the NHS spends its budget",
    sourceNote: "NHS spending breakdown via DebtWatch",
  },
  {
    articleSlug: "where-government-money-goes",
    visualKey: "structural-debt-flow",
    embedSlug: "structural-debt-flow",
    title: "How the debt keeps growing",
    sourceNote: "Structural debt flow framing via DebtWatch",
  },
  {
    articleSlug: "how-debt-to-gdp-works",
    visualKey: "debt-to-gdp-hero",
    embedSlug: "debt-to-gdp-hero",
    title: "Debt-to-GDP",
    sourceNote: "Debt burden framing via DebtWatch",
  },
  {
    articleSlug: "why-gilt-yields-matter",
    visualKey: "gilt-yield-hero",
    embedSlug: "gilt-yield-hero",
    title: "Yield rates",
    sourceNote: "Bank of England and OECD rate comparison via DebtWatch",
  },
  {
    articleSlug: "why-gilt-yields-matter",
    visualKey: "gilt-yield-inflation-linked-debt",
    embedSlug: "inflation-linked-debt-exposure",
    title: "Inflation-linked debt exposure",
    sourceNote: "ONS inflation and DMO debt exposure data via DebtWatch",
  },
  {
    articleSlug: "why-gilt-yields-matter",
    visualKey: "gilt-yield-peers",
    embedSlug: "gilt-yield-peers",
    title: "Gilt Yields",
    shareText: "Gilt Yields",
    sourceNote: "OECD long-term interest rates via DebtWatch",
  },
];

export function getArticleVisualEmbedDefinition(
  articleSlug: string,
  visualKey: ArticleVisualKey,
): ArticleVisualEmbedDefinition | undefined {
  return articleVisualEmbedRegistry.find(
    (definition) =>
      definition.articleSlug === articleSlug &&
      definition.visualKey === visualKey,
  );
}
