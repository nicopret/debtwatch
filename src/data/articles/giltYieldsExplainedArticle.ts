import type { ArticleData } from "./articleTypes";

export const giltYieldsExplainedArticle: ArticleData = {
  slug: "why-gilt-yields-matter",
  header: "Why gilt yields matter",
  tagline: "The market price of government borrowing",
  date: "15 Mar 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/methodology/",
  description:
    "Gilt yields show the interest rate investors demand to lend to the UK government. They are a market signal, not a fiscal ratio.",
  keyTakeaway:
    "Yields do not tell you today's debt-interest bill directly, but they shape the cost of tomorrow's borrowing as debt is refinanced.",
  heroVisual: "gilt-yield-hero",
  metricStrip: [
    {
      kind: "store",
      metricKey: "tenYearGiltYield",
      label: "UK 10-year gilt",
      helperText: "Bank of England yield curve",
      tone: "neutral",
    },
    {
      kind: "store",
      metricKey: "annualInterestPayment",
      label: "Debt interest / year",
      helperText: "Fiscal cost on the budget",
      tone: "amber",
    },
    {
      kind: "store",
      metricKey: "debtToGdp",
      label: "Debt / GDP",
      helperText: "Stock relative to the economy",
      tone: "navyblue",
    },
  ],
  sections: [
    {
      id: "rates-vs-budget",
      heading: "Yields and debt interest are linked, but not identical",
      body: [
        "A gilt yield is a market rate at a point in time. Debt interest is the annual budget bill created by the whole debt stock.",
        "That means yields can move sharply today while the debt-interest bill adjusts more gradually as the debt stock rolls over.",
      ],
      visualKey: "gilt-yield-costs",
      layout: "split",
    },
    {
      id: "why-watch-yields",
      heading: "Why markets watch the 10-year point",
      body: [
        "The 10-year gilt is a simple benchmark. It captures the broad level of borrowing costs investors demand from the UK and offers a clean comparison over time.",
      ],
    },
  ],
  sources: [
    {
      label: "Bank of England yield curve data",
      note: "Used for the DebtWatch 10-year gilt metric.",
    },
  ],
  relatedArticleSlugs: [
    "debt-interest-explained",
    "how-debt-to-gdp-works",
    "borrowing-over-time",
    "where-government-money-goes",
  ],
};
