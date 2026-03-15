import { readFile } from "node:fs/promises";
import path from "node:path";

import type { AssetDefinition } from "../../src/data/assets/assetRegistry";
import { GOVERNMENT_PERIODS } from "../../src/lib/governmentPeriods";

interface TimelineItem {
  yearLabel: string;
  numericValue: number;
  governmentKey: string;
}

interface TimelineData {
  subtitle: string;
  items: TimelineItem[];
}

interface MetricData {
  formattedValue: string;
  dateValue?: string;
}

const WIDTH = 1400;
const HEIGHT = 760;
const OUTER_PADDING = 16;
const CARD_RADIUS = 18;
const PANEL_X = 16;
const PANEL_Y = 150;
const PANEL_WIDTH = WIDTH - 32;
const PANEL_HEIGHT = 590;
const PLOT_X = 82;
const PLOT_Y = 262;
const PLOT_WIDTH = 1284;
const PLOT_HEIGHT = 246;
const FOOTER_Y = 700;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sanitizeCurrency(value: string): string {
  return value.replaceAll("Â", "");
}

function formatBillions(value: number): string {
  const billions = value / 1_000_000_000;
  const fractionDigits = Number.isInteger(billions) || Math.abs(billions) >= 100 ? 0 : 1;
  return `${billions < 0 ? "-" : ""}£${Math.abs(billions).toFixed(fractionDigits)}B`;
}

function formatRatio(value: number): string {
  return `${value.toFixed(1)}%`;
}

async function readJson<T>(repoRoot: string, relativePath: string): Promise<T> {
  const filePath = path.join(repoRoot, relativePath);
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents) as T;
}

function buildBadge(version: string): string {
  const label = escapeXml(version.toUpperCase());

  return `
    <g>
      <rect x="1330" y="16" rx="16" ry="16" width="54" height="24" fill="#f8fafc" stroke="#dbe3ef" />
      <text x="1357" y="32" fill="#6b7280" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700" text-anchor="middle">${label}</text>
    </g>
  `;
}

function buildBaseSvg({
  title,
  sourceNote,
  version,
  body,
}: {
  title: string;
  sourceNote: string;
  version: string;
  body: string;
}): string {
  const safeTitle = escapeXml(title);
  const safeSourceNote = escapeXml(sourceNote);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${safeTitle}</title>
  <desc id="desc">${safeSourceNote}</desc>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#f5f7fb" />
  <text x="${OUTER_PADDING}" y="28" fill="#6b7280" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.1">DEBTWATCH CHART</text>
  <text x="${OUTER_PADDING}" y="56" fill="#17315f" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">${safeTitle}</text>
  ${buildBadge(version)}
  <rect x="${PANEL_X}" y="${PANEL_Y}" width="${PANEL_WIDTH}" height="${PANEL_HEIGHT}" rx="${CARD_RADIUS}" ry="${CARD_RADIUS}" fill="#ffffff" stroke="#e5e7eb" />
  ${body}
  <text x="${OUTER_PADDING}" y="${FOOTER_Y}" fill="#5c6778" font-family="Segoe UI, Arial, sans-serif" font-size="14">${safeSourceNote}</text>
  <text x="${WIDTH - OUTER_PADDING}" y="${FOOTER_Y}" fill="#1d4f91" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" text-anchor="end">debtwatch.uk</text>
</svg>`;
}

function buildGovernmentBands(items: TimelineItem[]): string {
  const groups: Array<{ key: string; label: string; startIndex: number; endIndex: number; color: string }> = [];

  items.forEach((item, index) => {
    const period = GOVERNMENT_PERIODS.find((candidate) => candidate.governmentKey === item.governmentKey);
    const label = period?.shortLabel ?? item.governmentKey;
    const color = period?.bandColor ?? "rgba(148, 163, 184, 0.08)";
    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.key !== item.governmentKey) {
      groups.push({
        key: item.governmentKey,
        label,
        startIndex: index,
        endIndex: index,
        color,
      });
      return;
    }

    lastGroup.endIndex = index;
  });

  return groups
    .map((group) => {
      const bandStart = PLOT_X + (group.startIndex / items.length) * PLOT_WIDTH;
      const bandWidth = ((group.endIndex - group.startIndex + 1) / items.length) * PLOT_WIDTH;
      const safeLabel = escapeXml(group.label);

      return `
        <rect x="${bandStart.toFixed(1)}" y="${PLOT_Y}" width="${bandWidth.toFixed(1)}" height="${PLOT_HEIGHT}" fill="${group.color}" />
        <text x="${(bandStart + bandWidth / 2).toFixed(1)}" y="${PLOT_Y + 20}" fill="#9aa6b5" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="600" text-anchor="middle">${safeLabel}</text>
      `;
    })
    .join("");
}

function buildYAxisGrid(minValue: number, maxValue: number, formatter: (value: number) => string): string {
  const tickCount = 6;
  const tickStep = (maxValue - minValue) / (tickCount - 1);

  return Array.from({ length: tickCount }, (_, index) => {
    const value = maxValue - tickStep * index;
    const y = PLOT_Y + (index / (tickCount - 1)) * PLOT_HEIGHT;
    const safeLabel = escapeXml(formatter(value));

    return `
      <line x1="${PLOT_X}" y1="${y.toFixed(1)}" x2="${PLOT_X + PLOT_WIDTH}" y2="${y.toFixed(1)}" stroke="#dbe3ef" stroke-width="1" />
      <text x="${PLOT_X - 12}" y="${(y + 4).toFixed(1)}" fill="#556274" font-family="Segoe UI, Arial, sans-serif" font-size="11" text-anchor="end">${safeLabel}</text>
    `;
  }).join("");
}

function buildXAxisLabels(items: TimelineItem[]): string {
  const step = Math.max(1, Math.floor(items.length / 8));

  return items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      if (index % step !== 0 && !isLast) {
        return "";
      }

      const x = PLOT_X + (index / Math.max(1, items.length - 1)) * PLOT_WIDTH;
      return `
        <text x="${x.toFixed(1)}" y="${PLOT_Y + PLOT_HEIGHT + 22}" fill="#556274" font-family="Segoe UI, Arial, sans-serif" font-size="11" text-anchor="middle">${escapeXml(item.yearLabel)}</text>
      `;
    })
    .join("");
}

function buildLinePath(items: TimelineItem[], minValue: number, maxValue: number): string {
  return items
    .map((item, index) => {
      const x = PLOT_X + (index / Math.max(1, items.length - 1)) * PLOT_WIDTH;
      const y =
        PLOT_Y +
        (1 - (item.numericValue - minValue) / Math.max(1, maxValue - minValue)) * PLOT_HEIGHT;

      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildTimelineSvg({
  title,
  sourceNote,
  version,
  subtitle,
  items,
  lineColor,
  formatter,
}: {
  title: string;
  sourceNote: string;
  version: string;
  subtitle: string;
  items: TimelineItem[];
  lineColor: string;
  formatter: (value: number) => string;
}): string {
  const rawValues = items.map((item) => item.numericValue);
  const minValue = Math.min(...rawValues, 0);
  const maxValue = Math.max(...rawValues);
  const range = Math.max(1, maxValue - minValue);
  const paddedMin = minValue - range * 0.08;
  const paddedMax = maxValue + range * 0.08;
  const pathData = buildLinePath(items, paddedMin, paddedMax);
  const safeSubtitle = escapeXml(subtitle);
  const safeTitle = escapeXml(title);

  const body = `
    <text x="32" y="190" fill="#6b7280" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1">ANNUAL UK ${safeTitle.toUpperCase().includes("GDP") ? "DEBT VS GDP" : safeTitle.toUpperCase().includes("BORROWING") ? "BORROWING" : "DEBT INTEREST"}</text>
    <text x="32" y="224" fill="#17315f" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">${safeSubtitle === safeTitle ? safeTitle : safeTitle}</text>
    ${buildGovernmentBands(items)}
    ${buildYAxisGrid(paddedMin, paddedMax, formatter)}
    <line x1="${PLOT_X}" y1="${PLOT_Y + PLOT_HEIGHT}" x2="${PLOT_X + PLOT_WIDTH}" y2="${PLOT_Y + PLOT_HEIGHT}" stroke="#cfd8e3" stroke-width="1.25" />
    ${buildXAxisLabels(items)}
    <path d="${pathData}" fill="none" stroke="${lineColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  `;

  return buildBaseSvg({ title, sourceNote, version, body });
}

function buildMetricSvg({
  title,
  sourceNote,
  version,
  value,
  dateValue,
}: {
  title: string;
  sourceNote: string;
  version: string;
  value: string;
  dateValue?: string;
}): string {
  const safeValue = escapeXml(sanitizeCurrency(value));
  const safeDateValue = dateValue ? escapeXml(dateValue) : "";

  const body = `
    <text x="32" y="220" fill="#6b7280" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1">MONTHLY DEBT INTEREST</text>
    <text x="32" y="320" fill="#9b4c16" font-family="Segoe UI, Arial, sans-serif" font-size="86" font-weight="700">${safeValue}</text>
    <text x="32" y="378" fill="#5c6778" font-family="Segoe UI, Arial, sans-serif" font-size="20">${escapeXml(sourceNote)}</text>
    ${safeDateValue ? `<text x="32" y="412" fill="#5c6778" font-family="Segoe UI, Arial, sans-serif" font-size="18">${safeDateValue}</text>` : ""}
  `;

  return buildBaseSvg({ title, sourceNote, version, body });
}

export async function buildAssetSvg(
  repoRoot: string,
  asset: AssetDefinition,
  version: string,
): Promise<string> {
  if (asset.rendererKey === "monthlyDebtInterestMetric") {
    const metricData = await readJson<MetricData>(
      repoRoot,
      "src/data/monthlyInterestPayableMetric.json",
    );

    return buildMetricSvg({
      title: asset.title,
      sourceNote: asset.sourceNote,
      version,
      value: metricData.formattedValue,
      dateValue: metricData.dateValue,
    });
  }

  const timelineConfig = {
    annualBorrowingTimeline: {
      relativePath: "src/data/annualBorrowingTimeline.json",
      lineColor: "#1d3e77",
      formatter: formatBillions,
    },
    debtInterestTimeline: {
      relativePath: "src/data/debtInterestTimeline.json",
      lineColor: "#c75b5b",
      formatter: formatBillions,
    },
    debtToGdpTimeline: {
      relativePath: "src/data/debtToGdpTimeline.json",
      lineColor: "#17315f",
      formatter: formatRatio,
    },
  } satisfies Record<string, { relativePath: string; lineColor: string; formatter: (value: number) => string }>;

  const config = timelineConfig[asset.rendererKey];
  if (!config) {
    throw new Error(`No SVG renderer configured for asset renderer key '${asset.rendererKey}'.`);
  }

  const timelineData = await readJson<TimelineData>(repoRoot, config.relativePath);

  return buildTimelineSvg({
    title: asset.title,
    sourceNote: asset.sourceNote,
    version,
    subtitle: timelineData.subtitle,
    items: timelineData.items,
    lineColor: config.lineColor,
    formatter: config.formatter,
  });
}
