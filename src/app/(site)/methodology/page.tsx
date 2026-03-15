export const metadata = {
  title: "Methodology | DebtWatch",
  description: "How DebtWatch structures, sources and formats its public-finance metrics.",
};

export default function MethodologyPage() {
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
            Methodology
          </h1>
        </div>
        <p style={{ color: "#24324a", lineHeight: 1.75, maxWidth: "56rem" }}>
          DebtWatch uses static data files generated from official UK and international sources.
          Update scripts in the repository fetch, transform and format the figures used across the
          site, keeping the published pages compatible with static export.
        </p>
        <p style={{ color: "#24324a", lineHeight: 1.75, maxWidth: "56rem" }}>
          Where a chart uses derived values, the transformation rules are kept in the script or
          selector layer. The site aims to show consistent headline metrics across cards, charts
          and article pages by relying on canonical metric objects where practical.
        </p>
      </section>
    </section>
  );
}

