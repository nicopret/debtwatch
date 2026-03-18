import type { ArticlePreviewGraphicKey } from "@/data/articles/articleTypes";
import BorrowingArticlePreviewGraphic from "@/components/ui/borrowingArticlePreviewGraphicComponent/BorrowingArticlePreviewGraphic";

export function renderArticlePreviewGraphic(
  previewGraphicKey?: ArticlePreviewGraphicKey,
) {
  switch (previewGraphicKey) {
    case "borrowing-debt-overview":
      return <BorrowingArticlePreviewGraphic />;
    default:
      return null;
  }
}
