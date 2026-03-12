import { createSlice } from "@reduxjs/toolkit";

type BrandTheme = "light";

export interface SiteState {
  siteName: string;
  tagline: string;
  brandColor: string;
  theme: BrandTheme;
}

const initialState: SiteState = {
  siteName: "DebtWatch",
  tagline: "UK debt, borrowing and public finance explained.",
  brandColor: "#0f766e",
  theme: "light",
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {},
});

export const siteReducer = siteSlice.reducer;
