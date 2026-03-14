import type { ArticleData } from "./articleTypes";

export const debtInterestExplainedArticle: ArticleData = {
  slug: "debt-interest-explained",
  header: "Debt interest explained",
  tagline: "Why servicing the national debt suddenly costs much more",
  description:
    "Debt interest is the annual cost of servicing the government's debt stock. It rises when inflation-linked bonds reprice and when new borrowing happens at higher market rates.",
  keyTakeaway:
    "Debt interest does not measure the size of debt itself. It measures the yearly bill created by that debt, and that bill can jump quickly when rates move.",
  heroVisual: "debt-interest-hero",
  metricStrip: [
    {
      kind: "store",
      metricKey: "annualInterestPayment",
      label: "Debt interest / year",
      helperText: "Latest annual cost",
      tone: "navyblue",
    },
    {
      kind: "store",
      metricKey: "monthlyInterestPayable",
      label: "Debt interest / month",
      helperText: "Recent monthly bill",
      tone: "amber",
    },
    {
      kind: "store",
      metricKey: "tenYearGiltYield",
      label: "10-year gilt yield",
      helperText: "Market borrowing rate",
      tone: "neutral",
    },
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What debt interest actually measures",
      body: [
        "The government borrows by issuing debt. Debt interest is the cost of paying investors who hold that debt.",
        "Some of that cost is fixed in advance. Some of it changes with inflation or with the rate the government pays on new bonds as old ones mature.",
      ],
      visualKey: "debt-interest-history",
      layout: "split",
      callout: {
        label: "Why it matters",
        text: "High debt interest squeezes room for tax cuts, public services or lower borrowing elsewhere in the budget.",
      },
    },
    {
      id: "why-it-jumped",
      heading: "Why the bill jumped after the inflation surge",
      body: [
        "The UK has a large stock of index-linked gilts. When inflation rose sharply, the uplift on those bonds fed through into higher interest costs.",
        "At the same time, higher gilt yields meant new borrowing became more expensive than it had been in the era of ultra-low rates.",
      ],
      visualKey: "debt-interest-budget-share",
      layout: "split",
    },
    {
      id: "what-to-watch",
      heading: "What to watch next",
      body: [
        "Debt interest usually falls more slowly than it rises. Older bonds mature gradually, so it takes time for cheaper or more expensive market rates to work through the debt stock.",
        "That means gilt yields, inflation and the maturity profile of government debt all matter when thinking about the future path of interest costs.",
      ],
      callout: {
        label: "DebtWatch rule of thumb",
        text: "Think of debt interest as the annual cash pressure created by debt, not as a synonym for debt itself.",
      },
    },
  ],
  sources: [
    {
      label: "ONS public sector finances",
      note: "Used for debt-interest time series and annual metric updates.",
    },
    {
      label: "Debt Management Office remit and gilt data",
      note: "Useful context for how the debt stock is financed and refinanced.",
    },
    {
      label: "Bank of England yield curve data",
      note: "Used elsewhere on the site for the market borrowing-rate view.",
    },
  ],
  relatedArticleSlugs: [
    "why-gilt-yields-matter",
    "how-debt-to-gdp-works",
    "where-government-money-goes",
    "borrowing-over-time",
  ],
};

