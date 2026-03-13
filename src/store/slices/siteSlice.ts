import { createSlice } from "@reduxjs/toolkit";

import heroIntroContentData from "@/data/heroIntroContent.json";

type BrandTheme = "light";

export interface HeroIntroContentState {
  headerText: string;
  bodyText: string;
  footerText: string;
}

export interface SiteState {
  siteName: string;
  tagline: string;
  brandColor: string;
  theme: BrandTheme;
  heroIntroContent: HeroIntroContentState;
}

const initialState: SiteState = {
  siteName: "DebtWatch",
  tagline: "UK debt, borrowing and public finance explained.",
  brandColor: "#0f766e",
  theme: "light",
  heroIntroContent: heroIntroContentData,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {},
});

export const siteReducer = siteSlice.reducer;
