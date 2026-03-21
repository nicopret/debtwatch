import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as XLSX from "xlsx";

import {
  buildDebtInterestVsPublicServicePay,
  type DebtInterestVsPublicServicePaySource,
  type PublicServicePayCategorySourcePoint,
} from "../src/lib/debtInterestVsPublicServicePay.js";

type DebtInterestTimeline = {
  timestamp: string;
  items: Array<{
    yearLabel: string;
    numericValue: number;
  }>;
};

const ESA_TABLE_11_URL =
  "https://www.ons.gov.uk/file?uri=%2Feconomy%2Fgovernmentpublicsectorandtaxes%2Fpublicspending%2Fdatasets%2Fesatable11annualexpenditureofgeneralgovernment%2Fcurrent%2Fesatable11generalgovernment.xls";

const DEBT_INTEREST_TIMELINE_PATH = join(
  process.cwd(),
  "src",
  "data",
  "debtInterestTimeline.json",
);

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "debtInterestVsPublicServicePay.json",
);

const PAY_CATEGORY_MAP: Record<
  string,
  { key: PublicServicePayCategorySourcePoint["key"]; label: string }
> = {
  "GF07 - Health": {
    key: "health_pay",
    label: "Health pay",
  },
  "GF09 - Education": {
    key: "education_pay",
    label: "Education pay",
  },
  "GF03 - General Public Order & Safety": {
    key: "public_order_pay",
    label: "Public order pay",
  },
  "GF01 - General Public Services": {
    key: "general_public_services_pay",
    label: "Government admin pay",
  },
  "GF02 - Defence": {
    key: "defence_pay",
    label: "Defence pay",
  },
  "GF10 - Social Protection": {
    key: "social_protection_pay",
    label: "Social protection pay",
  },
};

async function fetchEsaWorkbook(): Promise<XLSX.WorkBook> {
  const response = await fetch(ESA_TABLE_11_URL);
  if (!response.ok) {
    throw new Error(`ONS ESA Table 11 request failed with status ${response.status}.`);
  }

  const workbookBuffer = Buffer.from(await response.arrayBuffer());
  return XLSX.read(workbookBuffer, { type: "buffer" });
}

function extractPayBreakdownFromWorksheet(
  worksheet: XLSX.WorkSheet,
): PublicServicePayCategorySourcePoint[] {
  const rows = XLSX.utils.sheet_to_json<Array<string | number>>(worksheet, {
    header: 1,
    defval: "",
  });

  return rows
    .map((row) => {
      const label = row[0];
      const compensation = row[2];

      if (typeof label !== "string" || typeof compensation !== "number") {
        return null;
      }

      const mapped = PAY_CATEGORY_MAP[label];
      if (!mapped) {
        return null;
      }

      // ESA Table 11 reports compensation of employees in GBP millions.
      return {
        key: mapped.key,
        label: mapped.label,
        value: compensation * 1_000_000,
      };
    })
    .filter((item): item is PublicServicePayCategorySourcePoint => item !== null);
}

async function main() {
  try {
    const [rawDebtInterestTimeline, esaWorkbook] = await Promise.all([
      readFile(DEBT_INTEREST_TIMELINE_PATH, "utf8"),
      fetchEsaWorkbook(),
    ]);

    const debtInterestTimeline = JSON.parse(rawDebtInterestTimeline) as DebtInterestTimeline;
    const debtInterestByYear = new Map(
      debtInterestTimeline.items.map((item) => [item.yearLabel, item.numericValue]),
    );

    const availableYearSheets = esaWorkbook.SheetNames.filter((name) => /^\d{4}$/.test(name));
    const commonYear = [...availableYearSheets]
      .reverse()
      .find((year) => debtInterestByYear.has(year));

    if (!commonYear) {
      throw new Error("Could not find a common completed year for debt interest and public-service pay.");
    }

    const worksheet = esaWorkbook.Sheets[commonYear];
    if (!worksheet) {
      throw new Error(`Missing ESA Table 11 worksheet for ${commonYear}.`);
    }

    const payBreakdown = extractPayBreakdownFromWorksheet(worksheet);
    if (payBreakdown.length !== Object.keys(PAY_CATEGORY_MAP).length) {
      throw new Error(`Expected ${Object.keys(PAY_CATEGORY_MAP).length} public-service pay categories but found ${payBreakdown.length}.`);
    }

    const debtInterestValue = debtInterestByYear.get(commonYear);
    if (debtInterestValue === undefined) {
      throw new Error(`Missing debt-interest value for ${commonYear}.`);
    }

    const source: DebtInterestVsPublicServicePaySource = {
      timestamp: new Date().toISOString(),
      debtInterest: {
        year: commonYear,
        value: debtInterestValue,
        source: "Office for National Statistics",
        definition:
          "Public sector debt interest payments, built from ONS NMFX monthly outturns and summed to completed calendar years.",
      },
      publicServicePaySource: {
        year: commonYear,
        source: "Office for National Statistics",
        definition:
          "General government compensation of employees from ONS ESA Table 11, using the six largest top-level COFOG functions reported in annual current-price values.",
        items: payBreakdown,
      },
    };

    const comparison = buildDebtInterestVsPublicServicePay(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(comparison, null, 2)}\n`, "utf8");

    console.log("Updated debt-interest versus public-service-pay comparison.");
    console.log(`Common year: ${comparison.dateValue}`);
    console.log(
      comparison.items.map((item) => `${item.label} ${item.value}bn`).join(" | "),
    );
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update debt-interest versus public-service-pay comparison.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
