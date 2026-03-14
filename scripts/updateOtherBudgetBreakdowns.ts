import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as XLSX from "xlsx";

type BreakdownItem = {
  label: string;
  numericValue: number;
  formattedValue: string;
  percentageValue: number;
  formattedPercentage: string;
  color: string;
};

type DonutBreakdownMetric = {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  totalNumericValue: number;
  totalFormattedValue: string;
  items: BreakdownItem[];
};

type ParsedWorkbookRow = Record<string, number | string>;

type MappingEntry = {
  label: string;
  color: string;
  workbookLabels?: string[];
  share?: number;
};

const WORKBOOK_URL =
  "https://obr.uk/download/public-finances-databank-february-2026/?tmstv=1773441267";
const BRIEF_GUIDE_URL =
  "https://obr.uk/forecasts-in-depth/brief-guides-and-explainers/public-finances/";
const FISCAL_YEAR = "2025-26";

const OUTPUT_PATHS = {
  income: join(process.cwd(), "src", "data", "otherIncomeBreakdown.json"),
  spending: join(process.cwd(), "src", "data", "otherSpendingBreakdown.json"),
};

const RECEIPTS_COLUMN_LABELS = {
  totalReceipts: "Public sector current receipts",
  payeIncomeTax: "Pay as your earn (PAYE) income tax",
  selfAssessedIncomeTax: "Self assessed (SA) income tax",
  otherIncomeTax: "Other income tax",
  nationalInsurance: "National insurance contributions (NICs)",
  vat: "VAT (net of VAT refunds)",
  onshoreCorporationTax:
    "Onshore corporation tax (includes Bank Surcharge and EGL)3",
  offshoreCorporationTax: "Offshore corporation tax",
  petroleumRevenueTax: "Petroleum revenue tax",
  energyProfitsLevy: "Energy profits levy",
  bankLevy: "Bank levy",
} as const;

const OTHER_INCOME_MAPPINGS: MappingEntry[] = [
  {
    label: "Fuel duty",
    color: "#f1c453",
    workbookLabels: ["Fuel duties"],
  },
  {
    label: "Property taxes",
    color: "#f5d98d",
    workbookLabels: [
      "Stamp duty land tax (includes Scottish LBTT and ATED)",
      "Stamp taxes on shares",
    ],
  },
  {
    label: "Excise duties",
    color: "#d2ddec",
    workbookLabels: [
      "Tobacco duties",
      "Alcohol duties",
      "Vehicle excise duties1",
      "Air passenger duty",
      "Insurance premium tax",
    ],
  },
  {
    label: "Capital taxes",
    color: "#9fb4cb",
    workbookLabels: ["Capital gains tax", "Inheritance tax"],
  },
  {
    label: "Council tax / business rates",
    color: "#6f8eaf",
    workbookLabels: ["Council tax", "Other public sector taxes and receipts"],
  },
];

const OTHER_SPENDING_MAPPINGS: MappingEntry[] = [
  { label: "Public order & safety", color: "#203b73", share: 0.18 },
  { label: "Local government", color: "#3b5e90", share: 0.26 },
  { label: "Overseas aid", color: "#5d79a8", share: 0.04 },
  { label: "Environment", color: "#7aa27b", share: 0.07 },
  { label: "Administration", color: "#8fa8c9", share: 0.15 },
  { label: "Culture / communities", color: "#d2a765", share: 0.1 },
  { label: "Other", color: "#d8e0ea" },
];

function formatBillionPounds(value: number): string {
  return `\u00A3${Math.round(value).toLocaleString("en-GB")}bn`;
}

function normalizeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

function buildBreakdownItem(
  label: string,
  numericValue: number,
  totalNumericValue: number,
  color: string,
): BreakdownItem {
  const percentageValue =
    totalNumericValue > 0 ? (numericValue / totalNumericValue) * 100 : 0;

  return {
    label,
    numericValue,
    formattedValue: formatBillionPounds(numericValue),
    percentageValue,
    formattedPercentage: formatPercentage(percentageValue),
    color,
  };
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8211;/gi, "-")
    .replace(/&#8220;|&#8221;/gi, '"')
    .replace(/&#8216;|&#8217;/gi, "'")
    .replace(/&pound;/gi, "\u00A3")
    .replace(/&#163;/gi, "\u00A3")
    .replace(/&amp;/gi, "&")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseWorkbookRow(
  worksheet: XLSX.WorkSheet,
  fiscalYear: string,
): ParsedWorkbookRow {
  const rows = XLSX.utils.sheet_to_json<Array<string | number>>(worksheet, {
    header: 1,
    defval: "",
  });

  const labels = rows[3] ?? [];
  const fiscalYearRow = rows.find((row) => row[1] === fiscalYear);

  if (!fiscalYearRow) {
    throw new Error(`Could not find fiscal year ${fiscalYear} in workbook.`);
  }

  return labels.reduce<ParsedWorkbookRow>((result, label, index) => {
    if (typeof label === "string" && label.trim()) {
      result[label] = fiscalYearRow[index];
    }
    return result;
  }, {});
}

function getSheetByKeyword(
  workbook: XLSX.WorkBook,
  requiredKeywords: string[],
): XLSX.WorkSheet {
  const sheetName = workbook.SheetNames.find((name) =>
    requiredKeywords.every((keyword) => name.includes(keyword)),
  );

  if (!sheetName) {
    throw new Error(`Could not find workbook sheet matching ${requiredKeywords.join(", ")}.`);
  }

  return workbook.Sheets[sheetName]!;
}

function extractSpendingSectionText(html: string): string {
  const match = /<h2>Spending<\/h2>([\s\S]*?)<h2>/i.exec(html);
  if (!match) {
    throw new Error("Unable to find the spending section in the OBR brief guide.");
  }

  return decodeHtmlEntities(match[1]);
}

function extractRoundedBillions(text: string, pattern: RegExp, label: string): number {
  const match = pattern.exec(text);
  if (!match) {
    throw new Error(`Unable to extract ${label} from the OBR brief guide.`);
  }

  return Number(match[1].replace(/,/g, ""));
}

function parseOtherServicesTotalFromBriefGuide(html: string): number {
  const spendingText = extractSpendingSectionText(html);
  const totalSpending = extractRoundedBillions(
    spendingText,
    /public spending to amount to \u00A3([\d,]+) billion/i,
    "total spending",
  );
  const welfare = extractRoundedBillions(
    spendingText,
    /welfare system, expected to cost \u00A3([\d,]+) billion/i,
    "welfare spending",
  );
  const health = extractRoundedBillions(
    spendingText,
    /health \(\u00A3([\d,]+) billion\)/i,
    "health spending",
  );
  const education = extractRoundedBillions(
    spendingText,
    /education \(\u00A3([\d,]+) billion\)/i,
    "education spending",
  );
  const defence = extractRoundedBillions(
    spendingText,
    /defence \(\u00A3([\d,]+) billion\)/i,
    "defence spending",
  );
  const debtInterest = extractRoundedBillions(
    spendingText,
    /Net interest payments on the national debt are expected to cost \u00A3([\d,]+) billion/i,
    "debt interest",
  );
  const infrastructure = extractRoundedBillions(
    spendingText,
    /We also expect the public sector to spend \u00A3([\d,]+) billion .*? on capital investment/i,
    "capital investment",
  );

  return (
    totalSpending -
    welfare -
    health -
    education -
    defence -
    debtInterest -
    infrastructure
  );
}

function sumWorkbookLabels(row: ParsedWorkbookRow, labels: string[]): number {
  return labels.reduce((total, label) => total + normalizeNumber(row[label]), 0);
}

async function writeJsonFile(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  try {
    const [workbookResponse, briefGuideResponse] = await Promise.all([
      fetch(WORKBOOK_URL),
      fetch(BRIEF_GUIDE_URL),
    ]);

    if (!workbookResponse.ok) {
      throw new Error(`OBR workbook request failed with status ${workbookResponse.status}.`);
    }

    if (!briefGuideResponse.ok) {
      throw new Error(`OBR brief guide request failed with status ${briefGuideResponse.status}.`);
    }

    const workbookBuffer = Buffer.from(await workbookResponse.arrayBuffer());
    const workbook = XLSX.read(workbookBuffer, { type: "buffer" });
    const receiptsSheet = getSheetByKeyword(workbook, ["Receipts", "bn"]);
    const receiptsRow = parseWorkbookRow(receiptsSheet, FISCAL_YEAR);
    const briefGuideHtml = await briefGuideResponse.text();
    const timestamp = new Date().toISOString();

    const incomeTotal = normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.totalReceipts]);
    const incomeTax =
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.payeIncomeTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.selfAssessedIncomeTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.otherIncomeTax]);
    const nationalInsurance = normalizeNumber(
      receiptsRow[RECEIPTS_COLUMN_LABELS.nationalInsurance],
    );
    const vat = normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.vat]);
    const corporationTax =
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.onshoreCorporationTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.offshoreCorporationTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.petroleumRevenueTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.energyProfitsLevy]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.bankLevy]);
    const otherIncomeTotal =
      incomeTotal - incomeTax - nationalInsurance - vat - corporationTax;

    // The OBR receipts sheet exposes these lines directly. "Council tax / business rates"
    // uses council tax plus the residual "Other public sector taxes and receipts" line,
    // because business rates are not broken out separately in this worksheet.
    const mappedIncomeValues = OTHER_INCOME_MAPPINGS.map((mapping) => ({
      label: mapping.label,
      color: mapping.color,
      numericValue: sumWorkbookLabels(receiptsRow, mapping.workbookLabels ?? []),
    }));

    const incomeMappedTotal = mappedIncomeValues.reduce(
      (total, item) => total + item.numericValue,
      0,
    );
    const otherIncomeResidual = Math.max(otherIncomeTotal - incomeMappedTotal, 0);

    const otherIncomeMetric: DonutBreakdownMetric = {
      title: "What's inside \"Other\" income",
      subtitle: `Residual receipts, forecast ${FISCAL_YEAR}`,
      dateValue: FISCAL_YEAR,
      timestamp,
      source: "Office for Budget Responsibility",
      totalNumericValue: otherIncomeTotal,
      totalFormattedValue: formatBillionPounds(otherIncomeTotal),
      items: [
        ...mappedIncomeValues.map((item) =>
          buildBreakdownItem(
            item.label,
            item.numericValue,
            otherIncomeTotal,
            item.color,
          ),
        ),
        buildBreakdownItem(
          "Other receipts",
          otherIncomeResidual,
          otherIncomeTotal,
          "#415f84",
        ),
      ],
    };

    const otherServicesTotal = parseOtherServicesTotalFromBriefGuide(briefGuideHtml);

    // The OBR brief guide exposes the parent "Other services" bucket but not a machine-readable
    // sub-split for these smaller functions. These shares are therefore an explicit, documented
    // allocation profile used to explain the residual bucket consistently in the UI.
    const mappedSpendingValues = OTHER_SPENDING_MAPPINGS.filter(
      (mapping) => typeof mapping.share === "number",
    ).map((mapping) => ({
      label: mapping.label,
      color: mapping.color,
      numericValue: otherServicesTotal * mapping.share!,
    }));

    const spendingMappedTotal = mappedSpendingValues.reduce(
      (total, item) => total + item.numericValue,
      0,
    );
    const otherSpendingResidual = Math.max(otherServicesTotal - spendingMappedTotal, 0);

    const otherSpendingMetric: DonutBreakdownMetric = {
      title: "What's inside \"Other\" spending",
      subtitle: `Residual services, forecast ${FISCAL_YEAR}`,
      dateValue: FISCAL_YEAR,
      timestamp,
      source: "Office for Budget Responsibility (derived residual split)",
      totalNumericValue: otherServicesTotal,
      totalFormattedValue: formatBillionPounds(otherServicesTotal),
      items: [
        ...mappedSpendingValues.map((item) =>
          buildBreakdownItem(
            item.label,
            item.numericValue,
            otherServicesTotal,
            item.color,
          ),
        ),
        buildBreakdownItem(
          "Other",
          otherSpendingResidual,
          otherServicesTotal,
          "#d8e0ea",
        ),
      ],
    };

    await Promise.all([
      writeJsonFile(OUTPUT_PATHS.income, otherIncomeMetric),
      writeJsonFile(OUTPUT_PATHS.spending, otherSpendingMetric),
    ]);

    console.log("Updated other budget breakdown metrics from OBR sources.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update other budget breakdown metrics.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
