import DebtToGdpSectionContainer from "@/containers/debtToGdpContainers/DebtToGdpSectionContainer";
import DebtInterestSectionContainer from "@/containers/debtInterestContainers/DebtInterestSectionContainer";
import BorrowingTimelineSectionContainer from "@/containers/borrowingContainers/BorrowingTimelineSectionContainer";
import BudgetComparisonSectionContainer from "@/containers/budgetContainers/BudgetComparisonSectionContainer";
import HeroIntroCardContainer from "@/containers/heroContainers/HeroIntroCardContainer";
import TenYearGiltYieldCircleContainer from "@/containers/heroContainers/TenYearGiltYieldCircleContainer";
import FirstMetricRowContainer from "@/containers/rowContainers/FirstMetricRowContainer";
import RowContainer from "@/containers/rowContainers/RowContainer";
import SecondMetricRowContainer from "@/containers/rowContainers/SecondMetricRowContainer";

export default function Home() {
  return (
    <section className="site-container metrics-section">
      <div className="hero-section">
        <RowContainer
          gap="0.5rem"
          align="stretch"
          className="hero-row"
        >
          <HeroIntroCardContainer />
          <TenYearGiltYieldCircleContainer />
        </RowContainer>
      </div>
      <div className="metrics-rows">
        <FirstMetricRowContainer />
        <SecondMetricRowContainer />
      </div>
      <BudgetComparisonSectionContainer />
      <BorrowingTimelineSectionContainer />
      <DebtToGdpSectionContainer />
      <DebtInterestSectionContainer />
    </section>
  );
}
