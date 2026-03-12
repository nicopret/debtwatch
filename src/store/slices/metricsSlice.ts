import { createSlice } from "@reduxjs/toolkit";

export interface MetricsState {
  totalDebt: number;
  annualInterest: number;
  monthlyDebtPayment: number;
  debtToGdp: number;
  borrowingThisYear: number;
}

const initialState: MetricsState = {
  totalDebt: 2815000000000,
  annualInterest: 104000000000,
  monthlyDebtPayment: 8670000000,
  debtToGdp: 0.976,
  borrowingThisYear: 127000000000,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {},
});

export const metricsReducer = metricsSlice.reducer;
