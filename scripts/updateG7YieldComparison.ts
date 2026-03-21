import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildG7YieldComparison,
  type G7YieldComparisonSource,
  type G7YieldComparisonSourcePoint,
} from "../src/lib/g7YieldComparison.js";

const OECD_KEY =
  "GBR+USA+CAN+FRA+DEU+ITA+JPN.A.IRLT.PA._Z._Z._Z._Z.N";
const OECD_URL =
  `https://sdmx.oecd.org/public/rest/data/OECD.SDD.STES,DSD_STES@DF_FINMARK,4.0/${OECD_KEY}`;
const OUTPUT_PATH = join(process.cwd(), "src", "data", "g7YieldComparison.json");

type ParsedSeries = {
  countryCode: string;
  observations: Array<{
    year: string;
    value: number;
    status: string | null;
  }>;
};

function parseOecdXmlSeries(xml: string): ParsedSeries[] {
  const seriesMatches = [...xml.matchAll(/<generic:Series>([\s\S]*?)<\/generic:Series>/g)];

  return seriesMatches.map((seriesMatch) => {
    const seriesXml = seriesMatch[1] ?? "";
    const countryCodeMatch = /<generic:Value id="REF_AREA" value="([^"]+)"/.exec(seriesXml);
    if (!countryCodeMatch) {
      throw new Error("Missing OECD REF_AREA in yield comparison series.");
    }

    const observations = [...seriesXml.matchAll(
      /<generic:Obs>[\s\S]*?<generic:ObsDimension id="TIME_PERIOD" value="([^"]+)" \/>[\s\S]*?<generic:ObsValue value="([^"]+)"[\s\S]*?(?:<generic:Value id="OBS_STATUS" value="([^"]+)" \/>|<\/generic:Obs>)/g,
    )].map((match) => ({
      year: match[1]!,
      value: Number(match[2]!),
      status: match[3] ?? null,
    }));

    return {
      countryCode: countryCodeMatch[1]!,
      observations: observations.filter((item) => Number.isFinite(item.value)),
    };
  });
}

function selectPreferredSeries(series: ParsedSeries[]): ParsedSeries[] {
  const grouped = new Map<string, ParsedSeries[]>();

  for (const item of series) {
    grouped.set(item.countryCode, [...(grouped.get(item.countryCode) ?? []), item]);
  }

  return [...grouped.entries()].map(([countryCode, options]) => {
    const preferred = [...options].sort((left, right) => {
      const leftLatestYear = Math.max(...left.observations.map((item) => Number(item.year)));
      const rightLatestYear = Math.max(...right.observations.map((item) => Number(item.year)));
      if (leftLatestYear !== rightLatestYear) {
        return rightLatestYear - leftLatestYear;
      }

      const leftActualCount = left.observations.filter((item) => item.status !== "B").length;
      const rightActualCount = right.observations.filter((item) => item.status !== "B").length;

      if (leftActualCount !== rightActualCount) {
        return rightActualCount - leftActualCount;
      }

      return right.observations.length - left.observations.length;
    })[0];

    if (!preferred) {
      throw new Error(`Missing preferred OECD series for ${countryCode}.`);
    }

    return {
      countryCode,
      observations: preferred.observations.filter((item) => item.status !== "B"),
    };
  });
}

function getLatestCommonYear(series: ParsedSeries[]): string {
  const allYears = series.map((item) => new Set(item.observations.map((obs) => obs.year)));
  const candidateYears = [...allYears[0]!].sort((left, right) => Number(right) - Number(left));

  for (const year of candidateYears) {
    if (allYears.every((years) => years.has(year))) {
      return year;
    }
  }

  throw new Error("Could not find a latest common OECD annual yield year for the G7.");
}

async function main() {
  try {
    const response = await fetch(OECD_URL);
    if (!response.ok) {
      throw new Error(`OECD yield comparison request failed with status ${response.status}.`);
    }

    const xml = await response.text();
    const parsedSeries = selectPreferredSeries(parseOecdXmlSeries(xml));

    if (parsedSeries.length !== 7) {
      throw new Error(`Expected 7 OECD country series but found ${parsedSeries.length}.`);
    }

    const commonYear = getLatestCommonYear(parsedSeries);
    const items: G7YieldComparisonSourcePoint[] = parsedSeries.map((series) => {
      const observation = series.observations.find((item) => item.year === commonYear);
      if (!observation) {
        throw new Error(`Missing OECD observation for ${series.countryCode} in ${commonYear}.`);
      }

      return {
        countryCode: series.countryCode,
        year: commonYear,
        value: observation.value,
      };
    });

    const source: G7YieldComparisonSource = {
      timestamp: new Date().toISOString(),
      source: "OECD long-term interest rates",
      period: `${commonYear} annual average`,
      items,
    };

    const comparison = buildG7YieldComparison(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(comparison, null, 2)}\n`, "utf8");

    console.log("Updated G7 yield comparison.");
    console.log(`Period: ${comparison.period}`);
    console.log(
      comparison.items.map((item) => `${item.label} ${item.formattedValue}`).join(" | "),
    );
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update G7 yield comparison.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
