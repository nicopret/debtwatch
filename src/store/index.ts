import { configureStore } from "@reduxjs/toolkit";
import { metricsReducer } from "./slices/metricsSlice";
import { siteReducer } from "./slices/siteSlice";

export const makeStore = () =>
  configureStore({
    // Static slice defaults keep output deterministic for pre-rendered builds.
    reducer: {
      site: siteReducer,
      metrics: metricsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
