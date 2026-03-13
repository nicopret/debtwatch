"use client";

import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import { monthlyInterestPayableValue, taxPayersValue, taxYear } from "@/store/selectors/metricsSelectors";

export default function MonthlyInterestPayableContainer() {
    const bodyValue = useAppSelector(monthlyInterestPayableValue);
    const taxPayers = useAppSelector(taxPayersValue);
    const year = useAppSelector(taxYear);

    const footerText = `Based on ${taxPayers} taxpayers in ${year}`
    return (
        <MetricCard
            bodyColor="#b42b09"
            bodyText={bodyValue}
            headerText="Your monthly debt payment"
            footerText={footerText}
        />
    )
}