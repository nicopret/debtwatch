import RowContainer from "@/containers/rowContainers/RowContainer";
import TotalDebtMetricContainer from "@/containers/metricCardContainers/TotalDebtMetricContainer";
import YearlyInterestMetricContainer from "@/containers/metricCardContainers/YearlyInterestMetricContainer";
import MonthlyInterestPayableContainer from "@/containers/metricCardContainers/MontlyInterestPayableContainer";

export default function Home() {
  return (
    <section className="site-container metrics-section">
      <div className="metrics-section-header">
        <h1>DebtWatch snapshot</h1>
        <p>Static baseline metrics wired through container components and Redux.</p>
      </div>
      <div className="metrics-rows">
        <RowContainer>
          <TotalDebtMetricContainer />
          <MonthlyInterestPayableContainer />
          <YearlyInterestMetricContainer />
        </RowContainer>
      </div>
    </section>
  );
}
