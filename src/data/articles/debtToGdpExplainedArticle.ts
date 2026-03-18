import type { ArticleData } from "./articleTypes";

export const debtToGdpExplainedArticle: ArticleData = {
  slug: "how-debt-to-gdp-works",
  header: "How debt-to-GDP works",
  tagline: "The ratio that tries to put debt in context",
  date: "15 Mar 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/methodology/",
  description:
    "Debt-to-GDP compares the size of public debt with the size of the economy. It is widely used because it shows the burden of debt relative to national income.",
  keyTakeaway:
    "A country can carry more debt if its economy is larger, richer and trusted by investors. The ratio matters more than the debt number on its own.",
  heroVisual: "debt-to-gdp-hero",
  featuredGraphicKey: "debtToGdpSection",
  metricStrip: [
    {
      kind: "store",
      metricKey: "debtToGdp",
      label: "UK debt / GDP",
      helperText: "Canonical site metric",
      tone: "navyblue",
    },
    {
      kind: "static",
      label: "Why analysts use it",
      value: "Scale",
      helperText: "Debt viewed against economic output",
      tone: "teal",
    },
    {
      kind: "store",
      metricKey: "tenYearGiltYield",
      label: "Investor lens",
      helperText: "Yield still matters as well",
      tone: "neutral",
    },
  ],
  sections: [
    {
      id: "ratio-not-cash",
      heading: "A ratio, not a cash bill",
      body: [
        "Debt-to-GDP does not tell you this year's financing cost. It tells you how large the debt stock is relative to the economy.",
        "That is why DebtWatch shows it alongside debt interest and gilt yields rather than instead of them.",
      ],
      visualKey: "debt-to-gdp-g7",
      layout: "split",
    },
    {
      id: "why-country-comparisons",
      heading: "Why G7 comparisons help",
      body: [],
      entities: [
        {
          type: "text",
          body: [
            "Comparing the UK with the G7 puts the number in a peer-group context. Advanced economies have more similar debt markets, institutions and fiscal capacity than a global catch-all league table.",
            "A longer-run sustainability view comes from comparing the debt ratio with the economy's nominal growth rate and the government's borrowing cost. When growth runs ahead of borrowing costs, debt dynamics are usually easier to stabilise.",
          ],
        },
        {
          type: "text",
          body: [
            "The chart works best as a relationship check rather than a single-rule model. If debt is high while borrowing costs rise above nominal growth for a long stretch, the path is usually harder to stabilise than in periods when growth stays comfortably ahead.",
          ],
        },
      ],
    },
  ],
  sources: [
    {
      label: "ONS public sector net debt as a percentage of GDP",
      note: "Used for the UK historical line on DebtWatch.",
    },
    {
      label: "IMF World Economic Outlook",
      note: "Used for the current G7 comparison panel.",
    },
  ],
  relatedArticleSlugs: [
    "debt-interest-explained",
    "why-gilt-yields-matter",
    "borrowing-over-time",
    "where-government-money-goes",
  ],
};
