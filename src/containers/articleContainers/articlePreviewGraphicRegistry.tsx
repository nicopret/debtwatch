import type { ArticlePreviewGraphicKey } from "@/data/articles/articleTypes";
import BorrowingArticlePreviewGraphic from "@/components/ui/borrowingArticlePreviewGraphicComponent/BorrowingArticlePreviewGraphic";
import DebtInterestArticlePreviewGraphic from "@/components/ui/debtInterestArticlePreviewGraphicComponent/DebtInterestArticlePreviewGraphic";
import GiltYieldsArticlePreviewGraphic from "@/components/ui/giltYieldsArticlePreviewGraphicComponent/GiltYieldsArticlePreviewGraphic";
import giltYieldTimelineData from "@/data/giltYieldTimeline.json";
import giltYieldPeerTimelineData from "@/data/giltYieldPeerTimeline.json";
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
    default:
      return null;
  }
}
