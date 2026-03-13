"use client";

import HeroIntroCard from "@/components/ui/heroIntroCardComponent/HeroIntroCard";
import { useAppSelector } from "@/store/hooks";
import { selectHeroIntroContent } from "@/store/selectors/siteSelectors";

export default function HeroIntroCardContainer() {
  const heroIntro = useAppSelector(selectHeroIntroContent);

  return (
    <HeroIntroCard
      headerText={heroIntro.headerText}
      bodyText={heroIntro.bodyText}
      footerText={heroIntro.footerText}
    />
  );
}
