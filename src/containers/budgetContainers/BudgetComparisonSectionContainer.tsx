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
      subheading="The UK's budget is shaped by where money comes from, where it goes, and the gap that has to be borrowed."
      leftCard={<GovernmentIncomeBreakdownContainer />}
      rightCard={<GovernmentSpendingBreakdownContainer />}
      centerCard={<BudgetDeficitCalloutContainer />}
      lowerLeftCard={<OtherIncomeBreakdownContainer />}
      lowerRightCard={<OtherSpendingBreakdownContainer />}
    />
  );
}
