"use client";

import StructuralDebtFlowDiagram from "@/components/ui/structuralDebtFlowDiagramComponent/StructuralDebtFlowDiagram";
import { useAppSelector } from "@/store/hooks";
import { selectStructuralDebtFlow } from "@/store/selectors/metricsSelectors";

export default function StructuralDebtFlowDiagramContainer() {
  const diagram = useAppSelector(selectStructuralDebtFlow);

  return (
    <StructuralDebtFlowDiagram
      title={diagram.title}
      subtitle={diagram.subtitle}
      nodes={diagram.nodes}
    />
  );
}
