"use client";

import AnnualLendingContainer from "../metricCardContainers/AnnualLendingContainer";
import DebtToGdpContainer from "../metricCardContainers/DebtToGDPContainer";
import TaxPayerDebtContainer from "../metricCardContainers/TaxpayerDebtContainer";
import RowContainer from "./RowContainer";

export default function SecondMetricRowContainer() {

    return (
        <RowContainer>
            <DebtToGdpContainer />
            <TaxPayerDebtContainer />
            <AnnualLendingContainer />
        </RowContainer>
    )
}
