"use client";
import MetricCard from "@/components/ui/metricCardComponent/MetricCard";
import { useAppSelector } from "@/store/hooks";
import { annualInterestPaymentValue } from "@/store/selectors/metricsSelectors";

export default function YearlyInterestMetricContainer() {
    const bodyValue = useAppSelector(annualInterestPaymentValue)
    return (
        <MetricCard
            bodyText={String(bodyValue)}
            headerColor="#093967"
            headerText="Debt Interest / Year"
            footerText="Annual Debt Interest"
        />
    );

}
