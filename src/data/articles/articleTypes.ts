export type ArticleTone = "neutral" | "teal" | "amber" | "navyblue";

export type ArticleVisualKey =
  | "debt-interest-hero"
  | "debt-interest-history"
  | "debt-interest-budget-share"
  | "debt-to-gdp-hero"
  | "debt-to-gdp-g7"
  | "budget-breakdown-hero"
  | "budget-deficit-gap"
  | "borrowing-hero"
  | "borrowing-shocks"
  | "borrowing-yield-rates"
  | "debt-ownership-breakdown"
  | "gilt-yield-hero"
  | "gilt-yield-costs";

export type ArticleGraphKey = "uk-debt-growth-borrowing-costs";

export type ArticlePreviewGraphicKey = "borrowing-debt-overview";

export interface ArticleGraphBlock {
  type: "graph";
  graphKey: ArticleGraphKey;
  caption?: string;
}

export interface ArticleTextBlock {
  type: "text";
  body: string[];
}

export type ArticleContentBlock = ArticleTextBlock | ArticleGraphBlock;

export type ArticleFeaturedGraphicKey =
  | "borrowingTimeline"
  | "debtToGdpSection"
  | "debtInterestTimeline"
  | "budgetComparison";

export type ArticleMetricReference =
  | {
      kind: "store";
      metricKey:
        | "annualInterestPayment"
        | "monthlyInterestPayable"
        | "tenYearGiltYield"
        | "debtToGdp"
        | "annualBorrowing"
        | "totalDebt";
      label: string;
      helperText: string;
      tone?: ArticleTone;
      moreText?: string;
      moreHref?: string;
    }
  | {
      kind: "static";
      label: string;
      value: string;
      helperText: string;
      tone?: ArticleTone;
      moreText?: string;
      moreHref?: string;
    };

export interface ArticleSource {
  label: string;
  url?: string;
  note?: string;
}

export interface ArticleCallout {
  label: string;
  text: string;
}

export interface ArticleSectionData {
  id: string;
  heading: string;
  entities?: ArticleContentBlock[];
  body: string[];
  visualKey?: ArticleVisualKey;
  blocks?: ArticleContentBlock[];
  callout?: ArticleCallout;
  layout?: "stacked" | "split" | "split-reverse";
}

export interface ArticleData {
  slug: string;
  header: string;
  tagline: string;
  date: string;
  author: string;
  authorBioUrl: string;
  description: string;
  keyTakeaway: string;
  heroVisual: ArticleVisualKey;
  previewGraphicKey?: ArticlePreviewGraphicKey;
  metricStrip: ArticleMetricReference[];
  featuredGraphicKey?: ArticleFeaturedGraphicKey;
  sections: ArticleSectionData[];
  sources: ArticleSource[];
  relatedArticleSlugs: string[];
}
