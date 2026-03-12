import type { MetricsState } from "../slices/metricsSlice";
import type { RootState } from "../index";

export type MetricKey = keyof MetricsState;

export const selectMetrics = (state: RootState) => state.metrics;

export const selectMetricByKey = (state: RootState, metricKey: MetricKey) =>
  state.metrics[metricKey];
