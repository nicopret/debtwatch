export type GiltYieldPeerTimelineItem = {
  dateLabel: string;
  uk10yGiltYieldPct: number;
  g7Average10yYieldPct: number;
};

export type GiltYieldPeerTimeline = {
  title: string;
  subtitle: string;
  unit: "percent";
  xKey: "date";
  dateValue: string;
  timestamp: string;
  source: string;
  items: GiltYieldPeerTimelineItem[];
};

export type GiltYieldPeerTimelineSource = {
  timestamp: string;
  source: string;
  items: Array<{
    dateLabel: string;
    uk10yGiltYieldPct: number;
    g7Average10yYieldPct: number;
  }>;
};

const CUTOFF_PERIOD = "2025-12";
const MONTH_SPAN = 312;

function isMonthlyPeriod(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}

function roundToOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

export function validateGiltYieldPeerTimeline(
  timeline: GiltYieldPeerTimeline,
): GiltYieldPeerTimeline {
  if (timeline.items.length < 24) {
    throw new Error("Expected at least 24 monthly points in the gilt-yield peer timeline.");
  }

  if (timeline.dateValue > CUTOFF_PERIOD) {
    throw new Error("Featured gilt-yield peer timeline must not use data after December 2025.");
  }

  for (const item of timeline.items) {
    if (!isMonthlyPeriod(item.dateLabel)) {
      throw new Error(`Timeline period ${item.dateLabel} must use YYYY-MM format.`);
    }

    if (item.dateLabel > CUTOFF_PERIOD) {
      throw new Error(`Timeline period ${item.dateLabel} exceeds the December 2025 cutoff.`);
    }

    for (const value of [item.uk10yGiltYieldPct, item.g7Average10yYieldPct]) {
      if (!Number.isFinite(value) || value < 0 || value > 100) {
        throw new Error(`Timeline value for ${item.dateLabel} must be a percentage.`);
      }
    }
  }

  return timeline;
}

export function buildGiltYieldPeerTimeline(
  source: GiltYieldPeerTimelineSource,
): GiltYieldPeerTimeline {
  const items = source.items
    .filter((item) => item.dateLabel <= CUTOFF_PERIOD)
    .sort((left, right) => left.dateLabel.localeCompare(right.dateLabel))
    .slice(-MONTH_SPAN)
    .map((item) => ({
      dateLabel: item.dateLabel,
      uk10yGiltYieldPct: roundToOneDecimal(item.uk10yGiltYieldPct),
      g7Average10yYieldPct: roundToOneDecimal(item.g7Average10yYieldPct),
    }));

  if (items.length === 0) {
    throw new Error("No peer-yield points remain after applying the December 2025 cutoff.");
  }

  return validateGiltYieldPeerTimeline({
    title: "UK gilt yields versus peers",
    subtitle: "10-year government bond yields through December 2025",
    unit: "percent",
    xKey: "date",
    dateValue: items[items.length - 1]!.dateLabel,
    timestamp: source.timestamp,
    source: source.source,
    items,
  });
}
