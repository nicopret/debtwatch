import type { RootState } from "../index";

export const selectSite = (state: RootState) => state.site;

export const selectHeroIntroContent = (state: RootState) =>
  state.site.heroIntroContent;
