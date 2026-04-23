import type { ReactNode } from "react";
import type { EmbedDefinition } from "@/data/embeds/embedRegistry";
import AnnualBorrowingTimelineEmbedContainer from "./AnnualBorrowingTimelineEmbedContainer";
import ArticleVisualEmbedContainer from "./ArticleVisualEmbedContainer";
import DebtInterestTimelineEmbedContainer from "./DebtInterestTimelineEmbedContainer";
import DebtToGdpTimelineEmbedContainer from "./DebtToGdpTimelineEmbedContainer";
import MonthlyDebtInterestEmbedContainer from "./MonthlyDebtInterestEmbedContainer";

export function renderEmbedVisual(embed: EmbedDefinition): ReactNode {
  if (embed.rendererKey === "annualBorrowingTimeline") {
    return <AnnualBorrowingTimelineEmbedContainer />;
  }

  if (embed.rendererKey === "monthlyDebtInterestMetric") {
    return <MonthlyDebtInterestEmbedContainer />;
  }

  if (embed.rendererKey === "debtInterestTimeline") {
    return <DebtInterestTimelineEmbedContainer />;
  }

  if (
    embed.rendererKey === "articleVisual" &&
    embed.articleSlug &&
    embed.articleVisualKey
  ) {
    return (
      <ArticleVisualEmbedContainer
        articleSlug={embed.articleSlug}
        visualKey={embed.articleVisualKey}
      />
    );
  }

  return <DebtToGdpTimelineEmbedContainer />;
}
