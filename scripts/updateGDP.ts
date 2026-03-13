import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type OnsObservation = {
  date?: string;
  year?: string;
  quarter?: string;
  value?: string;
};

type OnsResponse = {
  quarters?: OnsObservation[];
  observations?: OnsObservation[];
  description?: {
    unit?: string;
  };
};

type GdpMetric = {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
};

const ONS_ENDPOINTS = [
  "https://api.ons.gov.uk/timeseries/YBHA/dataset/qna/data",
  "https://www.ons.gov.uk/economy/grossdomesticproductgdp/timeseries/ybha/qna/data",
];

const OUTPUT_PATH = join(process.cwd(), "src", "data", "gdpMetric.json");

function parseQuarter(observation: OnsObservation): { year: number; quarter: number } | null {
  const directYear = Number(observation.year);
  const directQuarter = observation.quarter?.toUpperCase();

  if (
    Number.isFinite(directYear) &&
    directYear > 0 &&
    directQuarter &&
    /^Q[1-4]$/.test(directQuarter)
  ) {
    return { year: directYear, quarter: Number(directQuarter.slice(1)) };
  }

  const dateLabel = observation.date?.trim();
  if (!dateLabel) return null;

  const match = /^(\d{4})\s+Q([1-4])$/i.exec(dateLabel);
  if (!match) return null;

  return { year: Number(match[1]), quarter: Number(match[2]) };
}

function toNumber(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function convertToPounds(value: number, unit: string | undefined): number {
  const normalizedUnit = (unit ?? "").toLowerCase();

  if (normalizedUnit.includes("bn")) return Math.round(value * 1_000_000_000);
  if (normalizedUnit.includes("m")) return Math.round(value * 1_000_000);
  if (normalizedUnit.includes("k")) return Math.round(value * 1_000);

  // Requirement assumption: GDP observations are provided in £ million.
  return Math.round(value * 1_000_000);
}

function formatCurrency(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000_000) {
    return `${sign}\u00A3${(abs / 1_000_000_000_000).toFixed(1)}T`;
  }

  if (abs >= 1_000_000_000) {
    return `${sign}\u00A3${(abs / 1_000_000_000).toFixed(1)}B`;
  }

  return `${sign}\u00A3${abs.toLocaleString("en-GB")}`;
}

async function fetchOnsData(): Promise<OnsResponse> {
  let lastError = "Unknown fetch error";

  for (const endpoint of ONS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        lastError = `Request failed (${response.status}) for ${endpoint}`;
        continue;
      }

      return (await response.json()) as OnsResponse;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Unknown request error";
    }
  }

  throw new Error(lastError);
}

function getLatestFourQuarterlyValues(data: OnsResponse): Array<{
  year: number;
  quarter: number;
  value: number;
}> {
  const observations = data.quarters ?? data.observations;

  if (!Array.isArray(observations) || observations.length === 0) {
    throw new Error("ONS response does not include a quarterly observations array.");
  }

  const parsed = observations
    .map((observation) => {
      const quarterInfo = parseQuarter(observation);
      const value = toNumber(observation.value);

      if (!quarterInfo || value === null) return null;

      return {
        year: quarterInfo.year,
        quarter: quarterInfo.quarter,
        value,
      };
    })
    .filter((item): item is { year: number; quarter: number; value: number } => item !== null)
    .sort((a, b) => a.year - b.year || a.quarter - b.quarter);

  if (parsed.length < 4) {
    throw new Error(`Expected at least 4 quarterly observations but found ${parsed.length}.`);
  }

  return parsed.slice(-4);
}

async function main() {
  try {
    const data = await fetchOnsData();
    const latestFour = getLatestFourQuarterlyValues(data);

    const totalQuarterlyValue = latestFour.reduce((sum, current) => sum + current.value, 0);
    const numericValue = convertToPounds(totalQuarterlyValue, data.description?.unit);

    const latest = latestFour[latestFour.length - 1];
    const metric: GdpMetric = {
      numericValue,
      formattedValue: formatCurrency(numericValue),
      currencySymbol: "\u00A3",
      timestamp: new Date().toISOString(),
      dateValue: `Q${latest.quarter} ${latest.year}`,
    };

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(metric, null, 2)}\n`, "utf8");

    console.log("Updated GDP metric");
    console.log(`Latest quarter: ${metric.dateValue}`);
    console.log(`Annual GDP: ${metric.formattedValue}`);
    console.log("Saved to src/data/gdpMetric.json");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update GDP metric.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
