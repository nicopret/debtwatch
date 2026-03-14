export type GovernmentPeriod = {
  governmentKey: string;
  governmentLabel: string;
  shortLabel?: string;
  startYear: number;
  endYear: number | null;
  bandColor: string;
};

// This section uses the ONS annual DZLS borrowing series by calendar year.
// Each annual observation is assigned to the administration that governed for
// most of that year or held office at year-end when used as a practical tie-break.
export const GOVERNMENT_PERIODS: GovernmentPeriod[] = [
  {
    governmentKey: "labour_1997",
    governmentLabel: "Labour (1997-2010)",
    shortLabel: "Labour",
    startYear: 1997,
    endYear: 2009,
    bandColor: "rgba(215, 95, 95, 0.08)",
  },
  {
    governmentKey: "coalition_2010",
    governmentLabel: "Coalition (2010-2015)",
    shortLabel: "Coalition",
    startYear: 2010,
    endYear: 2014,
    bandColor: "rgba(100, 125, 165, 0.08)",
  },
  {
    governmentKey: "conservative_2015",
    governmentLabel: "Conservative (2015-2024)",
    shortLabel: "Conservative",
    startYear: 2015,
    endYear: 2023,
    bandColor: "rgba(32, 59, 115, 0.06)",
  },
  {
    governmentKey: "labour_2024",
    governmentLabel: "Labour (2024-)",
    shortLabel: "Labour",
    startYear: 2024,
    endYear: null,
    bandColor: "rgba(215, 95, 95, 0.05)",
  },
];

export function getGovernmentPeriodForYear(year: number): GovernmentPeriod | undefined {
  return GOVERNMENT_PERIODS.find((period) => {
    const endYear = period.endYear ?? Number.POSITIVE_INFINITY;
    return year >= period.startYear && year <= endYear;
  });
}
