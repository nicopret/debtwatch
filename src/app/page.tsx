import MetricCardContainer from "@/containers/metricCardContainers/MetricCardContainer";

export default function Home() {
  return (
    <section className="site-container metrics-section">
      <div className="metrics-section-header">
        <h1>DebtWatch snapshot</h1>
        <p>Static baseline metrics wired through container components and Redux.</p>
      </div>
      <div className="metrics-grid">
        <MetricCardContainer metricKey="totalDebt" />
        <MetricCardContainer metricKey="annualInterest" />
        <MetricCardContainer metricKey="debtToGdp" />
        <MetricCardContainer metricKey="borrowingThisYear" />
      </div>
    </section>
  );
}
