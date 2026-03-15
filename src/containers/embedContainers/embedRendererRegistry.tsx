import type { ReactNode } from "react";
import type { EmbedDefinition } from "@/data/embeds/embedRegistry";
import DebtInterestTimelineEmbedContainer from "./DebtInterestTimelineEmbedContainer";
import DebtToGdpTimelineEmbedContainer from "./DebtToGdpTimelineEmbedContainer";
import MonthlyDebtInterestEmbedContainer from "./MonthlyDebtInterestEmbedContainer";

export function renderEmbedVisual(embed: EmbedDefinition): ReactNode {
  if (embed.rendererKey === "monthlyDebtInterestMetric") {
    return <MonthlyDebtInterestEmbedContainer />;
  }

  if (embed.rendererKey === "debtInterestTimeline") {
    return <DebtInterestTimelineEmbedContainer />;
  }

  return <DebtToGdpTimelineEmbedContainer />;
}

