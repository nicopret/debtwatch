import type { ArticlePreviewGraphicKey } from "@/data/articles/articleTypes";
import BorrowingArticlePreviewGraphic from "@/components/ui/borrowingArticlePreviewGraphicComponent/BorrowingArticlePreviewGraphic";
import DebtInterestArticlePreviewGraphic from "@/components/ui/debtInterestArticlePreviewGraphicComponent/DebtInterestArticlePreviewGraphic";
import giltYieldTimelineData from "@/data/giltYieldTimeline.json";
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
    default:
      return null;
  }
}
