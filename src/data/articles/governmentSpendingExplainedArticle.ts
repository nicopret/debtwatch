import type { ArticleData } from "./articleTypes";

export const governmentSpendingExplainedArticle: ArticleData = {
  slug: "where-government-money-goes",
  header: "Where government money goes",
  tagline: "The spending side of the budget in one view",
  description:
    "Public spending is concentrated in a few very large areas: welfare, health, education and the wider day-to-day running of the state.",
  keyTakeaway:
    "Small percentage shifts in big budgets can move the headline deficit a long way.",
  heroVisual: "budget-breakdown-hero",
  metricStrip: [
    {
      kind: "static",
      label: "Receipts",
      value: "£1.232T",
      helperText: "OBR 2025-26 forecast",
      tone: "teal",
    },
    {
      kind: "static",
      label: "Spending",
      value: "£1.370T",
      helperText: "OBR 2025-26 forecast",
      tone: "navyblue",
    },
    {
      kind: "static",
      label: "Deficit",
      value: "£138bn",
      helperText: "Gap financed by borrowing",
      tone: "amber",
    },
  ],
  sections: [
    {
      id: "big-budget-blocks",
      heading: "Most spending sits in a few giant blocks",
      body: [
        "Welfare and pensions dominate the spending side of the state. Health is the next very large block, followed by education, defence and debt interest.",
        "That is why spending debates often sound broad but end up hinging on a relatively small number of budgets.",
      ],
      visualKey: "budget-deficit-gap",
      layout: "split",
    },
    {
      id: "why-other-matters",
      heading: "Why the 'other' category still matters",
      body: [
        "Even after the biggest areas are broken out, a long tail of smaller services still adds up. Local government, public order, aid and administration remain material once combined.",
      ],
    },
  ],
  sources: [
    {
      label: "OBR public finances databank",
      note: "Used for total receipts, spending and deficit updates.",
    },
    {
      label: "OBR brief guide to the public finances",
      note: "Used for headline category explanations and cross-checks.",
    },
  ],
  relatedArticleSlugs: [
    "debt-interest-explained",
    "borrowing-over-time",
    "how-debt-to-gdp-works",
    "why-gilt-yields-matter",
  ],
};

