"use client";

import StructuralDebtFlowDiagram from "@/components/ui/structuralDebtFlowDiagramComponent/StructuralDebtFlowDiagram";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleStructuralDebtFlow,
  selectStructuralDebtFlow,
} from "@/store/selectors/metricsSelectors";

export interface StructuralDebtFlowDiagramContainerProps {
  publicationDate?: string;
}

export default function StructuralDebtFlowDiagramContainer({
  publicationDate,
}: StructuralDebtFlowDiagramContainerProps) {
  const diagram = useAppSelector((state) =>
    publicationDate
      ? selectArticleStructuralDebtFlow(state, publicationDate)
      : selectStructuralDebtFlow(state),
  );

  if (!diagram) {
    return null;
  }

  return (
    <StructuralDebtFlowDiagram
      title={diagram.title}
      subtitle={diagram.subtitle}
      nodes={diagram.nodes}
    />
  );
}
