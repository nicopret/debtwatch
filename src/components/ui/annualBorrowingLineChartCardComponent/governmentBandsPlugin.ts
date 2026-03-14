import type { Chart, Plugin } from "chart.js";

import type { GovernmentBand } from "./AnnualBorrowingLineChartCard";

function getBandStartPixel(chart: Chart<"line">, startIndex: number): number {
  if (startIndex <= 0) {
    return chart.chartArea.left;
  }

  const current = chart.scales.x.getPixelForValue(startIndex);
  const previous = chart.scales.x.getPixelForValue(startIndex - 1);
  return previous + (current - previous) / 2;
}

function getBandEndPixel(chart: Chart<"line">, endIndex: number, totalPoints: number): number {
  if (endIndex >= totalPoints - 1) {
    return chart.chartArea.right;
  }

  const current = chart.scales.x.getPixelForValue(endIndex);
  const next = chart.scales.x.getPixelForValue(endIndex + 1);
  return current + (next - current) / 2;
}

function drawBandLabel(
  chart: Chart<"line">,
  label: string,
  startX: number,
  endX: number,
) {
  const { ctx, chartArea } = chart;
  const bandWidth = endX - startX;

  if (bandWidth < 72) {
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(23, 49, 95, 0.32)";
  ctx.font = "600 11px var(--font-geist-sans), Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(label, startX + bandWidth / 2, chartArea.top + 10);
  ctx.restore();
}

// Translate government periods into clipped chart-area bands so the tint sits
// behind gridlines and the borrowing line, while remaining aligned to year labels.
export function createGovernmentBandsPlugin(
  governmentBands: GovernmentBand[],
): Plugin<"line"> {
  return {
    id: "governmentBandPlugin",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea || governmentBands.length === 0) {
        return;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top,
      );
      ctx.clip();

      for (const band of governmentBands) {
        const startX = getBandStartPixel(chart, band.startIndex);
        const endX = getBandEndPixel(chart, band.endIndex, chart.data.labels?.length ?? 0);

        ctx.fillStyle = band.color;
        ctx.fillRect(startX, chartArea.top, endX - startX, chartArea.bottom - chartArea.top);
        drawBandLabel(chart, band.label, startX, endX);
      }

      ctx.restore();
    },
  };
}
