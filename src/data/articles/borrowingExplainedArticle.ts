import type { ArticleData } from "./articleTypes";

export const borrowingExplainedArticle: ArticleData = {
  slug: "borrowing-over-time",
  header: "Borrowing over time",
  tagline: "Why annual borrowing spikes in shocks and falls back later",
  description:
    "Borrowing is the yearly gap between what the government spends and what it raises. It rises in recessions, crises and when policy choices widen the budget gap.",
  keyTakeaway:
    "Borrowing is a flow. Debt is a stock. Repeated years of borrowing add to debt.",
  heroVisual: "borrowing-hero",
  metricStrip: [
    {
      kind: "store",
      metricKey: "annualBorrowing",
      label: "Annual borrowing",
      helperText: "Current site metric",
      tone: "amber",
    },
    {
      kind: "static",
      label: "Pandemic peak",
      value: "2020",
      helperText: "Largest annual borrowing shock",
      tone: "navyblue",
    },
    {
      kind: "static",
      label: "Budget logic",
      value: "Spending - receipts",
      helperText: "How the flow is formed",
      tone: "teal",
    },
  ],
  sections: [
    {
      id: "flow-vs-stock",
      heading: "Borrowing is the yearly flow into debt",
      body: [
        "When spending exceeds receipts, the difference has to be financed. That financing need is borrowing.",
        "A single high-borrowing year does not define the whole debt path, but repeated large deficits can change it quickly.",
      ],
      visualKey: "borrowing-shocks",
      layout: "split",
    },
    {
      id: "governments-and-cycles",
      heading: "Politics matters, but so do economic shocks",
      body: [
        "The annual borrowing line reflects both policy choices and the business cycle. Recessions, financial crises and energy shocks can dominate the path for years.",
      ],
    },
  ],
  sources: [
    {
      label: "ONS public sector net borrowing series",
      note: "Used for the historical borrowing timeline and government summaries.",
    },
  ],
  relatedArticleSlugs: [
    "where-government-money-goes",
    "debt-interest-explained",
    "how-debt-to-gdp-works",
    "why-gilt-yields-matter",
  ],
};

