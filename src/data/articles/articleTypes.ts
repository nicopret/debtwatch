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
  | "gilt-yield-hero"
  | "gilt-yield-costs";

export type ArticleMetricReference =
  | {
      kind: "store";
      metricKey:
        | "annualInterestPayment"
        | "monthlyInterestPayable"
        | "tenYearGiltYield"
        | "debtToGdp"
        | "annualBorrowing";
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
  body: string[];
  visualKey?: ArticleVisualKey;
  callout?: ArticleCallout;
  layout?: "stacked" | "split";
}

export interface ArticleData {
  slug: string;
  header: string;
  tagline: string;
  description: string;
  keyTakeaway: string;
  heroVisual: ArticleVisualKey;
  metricStrip: ArticleMetricReference[];
  sections: ArticleSectionData[];
  sources: ArticleSource[];
  relatedArticleSlugs: string[];
}

