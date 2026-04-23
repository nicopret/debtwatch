export const metadata = {
  title: "Sources | DebtWatch",
  description: "The official data sources used across DebtWatch.",
};

const sources = [
  {
    label: "Office for National Statistics",
    url: "https://www.ons.gov.uk/",
    note: "Used across the articles for public sector finances, debt-to-GDP, inflation, GDP, labour-market context, national accounts and broader macroeconomic series.",
  },
  {
    label: "Office for Budget Responsibility",
    url: "https://obr.uk/",
    note: "Used for public-finance databank totals, fiscal outlook context, spending and receipts breakdowns, borrowing projections and debt-interest context.",
  },
  {
    label: "Bank of England",
    url: "https://www.bankofengland.co.uk/",
    note: "Used for gilt yields, yield-curve data, Bank Rate, consumer credit and household lending context.",
  },
  {
    label: "International Monetary Fund",
    url: "https://www.imf.org/",
    note: "Used for cross-country debt-to-GDP comparisons and macroeconomic context in the debt sustainability work.",
  },
  {
    label: "Organisation for Economic Co-operation and Development",
    url: "https://www.oecd.org/",
    note: "Used for G7 long-term interest rate comparisons, peer yield analysis and cross-country borrowing-cost context.",
  },
  {
    label: "UK Debt Management Office",
    url: "https://www.dmo.gov.uk/",
    note: "Used for gilt issuance, maturity profile, refinancing, debt ownership and index-linked debt structure.",
  },
  {
    label: "HM Treasury",
    url: "https://www.gov.uk/government/organisations/hm-treasury",
    note: "Used for public spending statistics, spending composition context and wider budget structure analysis.",
  },
  {
    label: "NHS England",
    url: "https://www.england.nhs.uk/",
    note: "Used for NHS spending category breakdowns and annual report/account context.",
  },
  {
    label: "Department of Health and Social Care",
    url: "https://www.gov.uk/government/organisations/department-of-health-and-social-care",
    note: "Used alongside NHS sources for health-budget and spending breakdown context.",
  },
  {
    label: "Department for Work and Pensions",
    url: "https://www.gov.uk/government/organisations/department-for-work-pensions",
    note: "Used for pension expenditure context and long-term fiscal pressure analysis.",
  },
  {
    label: "HM Revenue & Customs",
    url: "https://www.gov.uk/government/organisations/hm-revenue-customs",
    note: "Used for National Insurance and revenue-system context in pension and public-finance analysis.",
  },
];

export default function SourcesPage() {
  return (
    <section className="site-container metrics-section">
      <section
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          padding: "1.5rem",
          display: "grid",
          gap: "1rem",
        }}
      >
        <div style={{ display: "grid", gap: "0.45rem" }}>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            DebtWatch notes
          </p>
          <h1 style={{ color: "#17315f", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1 }}>
            Sources
          </h1>
        </div>
        <div style={{ display: "grid", gap: "0.9rem" }}>
          {sources.map((source) => (
            <article
              key={source.label}
              style={{ paddingTop: "0.9rem", borderTop: "1px solid #e9eef5" }}
            >
              <p style={{ color: "#17315f", fontWeight: 700 }}>
                <a
                  href={source.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {source.label}
                </a>
              </p>
              <p style={{ color: "#475467", lineHeight: 1.65, marginTop: "0.35rem" }}>
                {source.note}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
