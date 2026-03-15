export const metadata = {
  title: "Sources | DebtWatch",
  description: "The official data sources used across DebtWatch.",
};

const sources = [
  {
    label: "Office for National Statistics",
    note: "Public sector finance series for debt, borrowing, debt interest and debt-to-GDP.",
  },
  {
    label: "Office for Budget Responsibility",
    note: "Budget breakdowns and fiscal aggregates used in the income versus spending section.",
  },
  {
    label: "Bank of England",
    note: "Yield curve data for the UK 10-year gilt metric.",
  },
  {
    label: "International Monetary Fund",
    note: "G7 cross-country debt-to-GDP comparison data.",
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
              <p style={{ color: "#17315f", fontWeight: 700 }}>{source.label}</p>
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

