import FirstMetricRowContainer from "@/containers/rowContainers/FirstMetricRowContainer";
import SecondMetricRowContainer from "@/containers/rowContainers/SecondMetricRowContainer";

export default function Home() {
  return (
    <section className="site-container metrics-section">
      <div className="metrics-section-header">
        <h1>DebtWatch snapshot</h1>
        <p>Static baseline metrics wired through container components and Redux.</p>
      </div>
      <div className="metrics-rows">
        <FirstMetricRowContainer />
        <SecondMetricRowContainer />
      </div>
    </section>
  );
}
