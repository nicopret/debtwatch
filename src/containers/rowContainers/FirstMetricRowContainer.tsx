"use client";

import MonthlyInterestPayableContainer from "../metricCardContainers/MontlyInterestPayableContainer";
import TotalDebtMetricContainer from "../metricCardContainers/TotalDebtMetricContainer";
import YearlyInterestMetricContainer from "../metricCardContainers/YearlyInterestMetricContainer";
import RowContainer from "./RowContainer";

export default function FirstMetricRowContainer() {

    return (
        <RowContainer>
            <TotalDebtMetricContainer />
            <MonthlyInterestPayableContainer />
            <YearlyInterestMetricContainer />
        </RowContainer>
    )
}
