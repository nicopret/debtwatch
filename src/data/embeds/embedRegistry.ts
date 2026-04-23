import type { ArticleVisualKey } from "../articles/articleTypes";
import {
  articleVisualEmbedRegistry,
  type ArticleVisualEmbedDefinition,
} from "./articleVisualEmbedRegistry";

export type EmbedRendererKey =
  | "monthlyDebtInterestMetric"
  | "debtInterestTimeline"
  | "debtToGdpTimeline"
  | "annualBorrowingTimeline"
  | "articleVisual";

export interface EmbedDefinition {
  contextSlug: string;
  embedSlug: string;
  title: string;
  sourceNote: string;
  sourcePath: string;
  rendererKey: EmbedRendererKey;
  articleSlug?: string;
  articleVisualKey?: ArticleVisualKey;
}

function toArticleVisualEmbedDefinition(
  definition: ArticleVisualEmbedDefinition,
): EmbedDefinition {
  return {
    contextSlug: definition.articleSlug,
    embedSlug: definition.embedSlug,
    title: definition.title,
    sourceNote: definition.sourceNote,
    sourcePath: `/articles/${definition.articleSlug}`,
    rendererKey: "articleVisual",
    articleSlug: definition.articleSlug,
    articleVisualKey: definition.visualKey,
  };
}

export const embedRegistry: EmbedDefinition[] = [
  {
    contextSlug: "borrowing-over-time",
    embedSlug: "borrowing-over-time",
    title: "Borrowing over time",
    sourceNote: "Annual UK borrowing history from ONS",
    sourcePath: "/",
    rendererKey: "annualBorrowingTimeline",
  },
  {
    contextSlug: "debt-interest-explained",
    embedSlug: "monthly-debt-interest",
    title: "Monthly debt interest",
    sourceNote: "ONS public sector finances via DebtWatch",
    sourcePath: "/articles/debt-interest-explained",
    rendererKey: "monthlyDebtInterestMetric",
  },
  {
    contextSlug: "debt-interest-explained",
    embedSlug: "debt-interest-over-time",
    title: "Debt interest over time",
    sourceNote: "Annual debt-interest history from ONS",
    sourcePath: "/articles/debt-interest-explained",
    rendererKey: "debtInterestTimeline",
  },
  {
    contextSlug: "how-debt-to-gdp-works",
    embedSlug: "debt-to-gdp-over-time",
    title: "Debt vs GDP",
    sourceNote: "UK debt-to-GDP history from ONS",
    sourcePath: "/articles/how-debt-to-gdp-works",
    rendererKey: "debtToGdpTimeline",
  },
  ...articleVisualEmbedRegistry.map(toArticleVisualEmbedDefinition),
];

export function getEmbedDefinition(
  contextSlug: string,
  embedSlug: string,
): EmbedDefinition | undefined {
  return embedRegistry.find(
    (embed) => embed.contextSlug === contextSlug && embed.embedSlug === embedSlug,
  );
}
