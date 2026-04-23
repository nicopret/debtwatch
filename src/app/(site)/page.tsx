import DebtToGdpSectionContainer from "@/containers/debtToGdpContainers/DebtToGdpSectionContainer";
import DebtInterestSectionContainer from "@/containers/debtInterestContainers/DebtInterestSectionContainer";
import BorrowingTimelineSectionContainer from "@/containers/borrowingContainers/BorrowingTimelineSectionContainer";
import BudgetComparisonSectionContainer from "@/containers/budgetContainers/BudgetComparisonSectionContainer";
import HeroIntroCardContainer from "@/containers/heroContainers/HeroIntroCardContainer";
import TenYearGiltYieldCircleContainer from "@/containers/heroContainers/TenYearGiltYieldCircleContainer";
import FirstMetricRowContainer from "@/containers/rowContainers/FirstMetricRowContainer";
import RowContainer from "@/containers/rowContainers/RowContainer";
import SecondMetricRowContainer from "@/containers/rowContainers/SecondMetricRowContainer";
import { resolveVisualSnapshotVersion } from "@/lib/publishedVisualVersion";

export default function Home() {
  const borrowingSnapshotDate = resolveVisualSnapshotVersion({
    contextSlug: "borrowing-over-time",
    assetSlug: "borrowing-over-time",
  });
  const debtToGdpSnapshotDate = resolveVisualSnapshotVersion({
    contextSlug: "how-debt-to-gdp-works",
    assetSlug: "debt-to-gdp-over-time",
  });
  const debtInterestSnapshotDate = resolveVisualSnapshotVersion({
    contextSlug: "debt-interest-explained",
    assetSlug: "debt-interest-over-time",
  });

  return (
    <section className="site-container metrics-section home-dashboard">
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
      <BorrowingTimelineSectionContainer snapshotDate={borrowingSnapshotDate} />
      <DebtToGdpSectionContainer snapshotDate={debtToGdpSnapshotDate} />
      <DebtInterestSectionContainer snapshotDate={debtInterestSnapshotDate} />
    </section>
  );
}
