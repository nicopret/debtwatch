"use client";

import BudgetComparisonSection from "@/components/ui/budgetComparisonSectionComponent/BudgetComparisonSection";
import BudgetDeficitCalloutContainer from "./BudgetDeficitCalloutContainer";
import GovernmentIncomeBreakdownContainer from "./GovernmentIncomeBreakdownContainer";
import GovernmentSpendingBreakdownContainer from "./GovernmentSpendingBreakdownContainer";
import OtherIncomeBreakdownContainer from "./OtherIncomeBreakdownContainer";
import OtherSpendingBreakdownContainer from "./OtherSpendingBreakdownContainer";

export default function BudgetComparisonSectionContainer() {
  return (
    <BudgetComparisonSection
      heading="Government income vs spending"
      subheading="Two stacked bars tell the budget story at a glance."
      leftCard={<GovernmentIncomeBreakdownContainer />}
      centerCard={<BudgetDeficitCalloutContainer />}
      lowerLeftCard={<OtherIncomeBreakdownContainer />}
      lowerRightCard={<OtherSpendingBreakdownContainer />}
      rightCard={<GovernmentSpendingBreakdownContainer />}
    />
  );
}
