import type { ArticlePreviewGraphicKey } from "@/data/articles/articleTypes";
import BorrowingArticlePreviewGraphic from "@/components/ui/borrowingArticlePreviewGraphicComponent/BorrowingArticlePreviewGraphic";
import DebtInterestArticlePreviewGraphic from "@/components/ui/debtInterestArticlePreviewGraphicComponent/DebtInterestArticlePreviewGraphic";
import DebtToGdpArticlePreviewGraphic from "@/components/ui/debtToGdpArticlePreviewGraphicComponent/DebtToGdpArticlePreviewGraphic";
import GiltYieldsArticlePreviewGraphic from "@/components/ui/giltYieldsArticlePreviewGraphicComponent/GiltYieldsArticlePreviewGraphic";
import GovernmentSpendingArticlePreviewGraphic from "@/components/ui/governmentSpendingArticlePreviewGraphicComponent/GovernmentSpendingArticlePreviewGraphic";
import WelfareIncomeTaxArticlePreviewGraphic from "@/components/ui/welfareIncomeTaxArticlePreviewGraphicComponent/WelfareIncomeTaxArticlePreviewGraphic";
import WelfareSpendingArticlePreviewGraphic from "@/components/ui/welfareSpendingArticlePreviewGraphicComponent/WelfareSpendingArticlePreviewGraphic";
import debtToGdpMetricsData from "@/data/debtToGdpMetrics.json";
import debtToGdpTimelineData from "@/data/debtToGdpTimeline.json";
import giltYieldTimelineData from "@/data/giltYieldTimeline.json";
import giltYieldPeerTimelineData from "@/data/giltYieldPeerTimeline.json";
import budgetReceiptsSpendingTimelineData from "@/data/budgetReceiptsSpendingTimeline.json";
import welfareIncomeTaxTimelineData from "@/data/welfareIncomeTaxTimeline.json";
import { isOnOrBeforePublicationMonth } from "@/lib/articlePublicationDate";

export function renderArticlePreviewGraphic(
  previewGraphicKey?: ArticlePreviewGraphicKey,
  articleDate?: string,
) {
  switch (previewGraphicKey) {
    case "borrowing-debt-overview":
      return <BorrowingArticlePreviewGraphic />;
    case "debt-interest-yield-trend": {
      const cappedItems = giltYieldTimelineData.items.filter((item) =>
        articleDate ? isOnOrBeforePublicationMonth(item.dateLabel, articleDate) : true,
      );
      const sourceItems = cappedItems.length > 0 ? cappedItems : giltYieldTimelineData.items;
      const recentPoints = sourceItems
        .slice(-36)
        .map((item) => item.tenYearGiltYieldPct);
      const latestPoint = sourceItems[sourceItems.length - 1];

      if (!latestPoint) {
        return null;
      }

      return (
        <DebtInterestArticlePreviewGraphic
          currentValue={`${latestPoint.tenYearGiltYieldPct.toFixed(1)}%`}
          points={recentPoints}
        />
      );
    }
    case "gilt-yield-peer-trend": {
      const cappedItems = giltYieldPeerTimelineData.items.filter((item) =>
        articleDate ? isOnOrBeforePublicationMonth(item.dateLabel, articleDate) : true,
      );
      const sourceItems = cappedItems.length > 0 ? cappedItems : giltYieldPeerTimelineData.items;
      const recentPoints = sourceItems.slice(-36);
      const latestPoint = sourceItems[sourceItems.length - 1];

      if (!latestPoint) {
        return null;
      }

      const formatDate = (value: string) => {
        const [year, month] = value.split("-");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${monthNames[Number(month) - 1]} ${year}`;
      };

      return (
        <GiltYieldsArticlePreviewGraphic
          currentValue={`${latestPoint.uk10yGiltYieldPct.toFixed(1)}%`}
          comparisonValue={`${latestPoint.g7Average10yYieldPct.toFixed(1)}%`}
          points={recentPoints.map((item) => item.uk10yGiltYieldPct)}
          comparisonPoints={recentPoints.map((item) => item.g7Average10yYieldPct)}
          dateLabel={formatDate(latestPoint.dateLabel)}
        />
      );
    }
    case "budget-gap-trend": {
      const sourceItems = budgetReceiptsSpendingTimelineData.items.filter(() =>
        articleDate ? isOnOrBeforePublicationMonth(budgetReceiptsSpendingTimelineData.dateValue, articleDate) : true,
      );
      const previewItems =
        sourceItems.length > 0 ? sourceItems : budgetReceiptsSpendingTimelineData.items;
      const latestPoint = previewItems[previewItems.length - 1];

      if (!latestPoint) {
        return null;
      }

      return (
        <GovernmentSpendingArticlePreviewGraphic
          latestGap={latestPoint.gapFormatted}
          dateLabel={latestPoint.yearLabel}
          receiptsPoints={previewItems.map((item) => item.receipts)}
          spendingPoints={previewItems.map((item) => item.spending)}
        />
      );
    }
    case "debt-to-gdp-ratio": {
      const cappedItems = debtToGdpTimelineData.items.filter((item) =>
        articleDate ? isOnOrBeforePublicationMonth(item.yearLabel, articleDate) : true,
      );
      const sourceItems = cappedItems.length > 0 ? cappedItems : debtToGdpTimelineData.items;
      const recentPoints = sourceItems.slice(-12).map((item) => item.numericValue);
      const latestPoint = sourceItems[sourceItems.length - 1];

      if (!latestPoint) {
        return null;
      }

      return (
        <DebtToGdpArticlePreviewGraphic
          currentValue={latestPoint.formattedValue ?? debtToGdpMetricsData.formattedValue}
          points={recentPoints}
          dateLabel={latestPoint.yearLabel}
        />
      );
    }
    case "welfare-spending-breakdown-preview":
      return <WelfareSpendingArticlePreviewGraphic />;
    case "welfare-income-tax-trend": {
      const cappedItems = welfareIncomeTaxTimelineData.items.filter((item) =>
        articleDate ? isOnOrBeforePublicationMonth(item.dateLabel, articleDate) : true,
      );
      const sourceItems = cappedItems.length > 0 ? cappedItems : welfareIncomeTaxTimelineData.items;
      const previewItems = sourceItems.slice(-48);
      const latestPoint = sourceItems[sourceItems.length - 1];

      if (!latestPoint) {
        return null;
      }

      return (
        <WelfareIncomeTaxArticlePreviewGraphic
          incomeTaxPoints={previewItems.map((item) => item.incomeTax)}
          benefitsPoints={previewItems.map((item) => item.benefits)}
          latestIncomeTaxValue={latestPoint.incomeTaxFormatted}
          latestBenefitsValue={latestPoint.benefitsFormatted}
          dateLabel={latestPoint.dateLabel}
        />
      );
    }
    default:
      return null;
  }
}
