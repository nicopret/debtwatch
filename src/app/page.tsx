import MetricCardContainer from "@/containers/metricCardContainers/MetricCardContainer";
import RowContainer from "@/containers/rowContainers/RowContainer";

export default function Home() {
  return (
    <section className="site-container metrics-section">
      <div className="metrics-section-header">
        <h1>DebtWatch snapshot</h1>
        <p>Static baseline metrics wired through container components and Redux.</p>
      </div>
      <RowContainer variant="metrics">
        <MetricCardContainer metricKey="totalDebt" />
        <MetricCardContainer metricKey="annualInterest" />
        <MetricCardContainer metricKey="debtToGdp" />
        <MetricCardContainer metricKey="borrowingThisYear" />
      </RowContainer>
    </section>
  );
}
