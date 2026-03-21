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

type BreakdownMetric = {
  totalNumericValue: number;
  totalFormattedValue: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: BreakdownItem[];
};

type DeficitMetric = {
  numericValue: number;
  formattedValue: string;
  dateValue: string;
  timestamp: string;
  source: string;
  descriptiveText?: string;
};

type ParsedWorkbookRow = Record<string, number | string>;

const WORKBOOK_URL =
  "https://obr.uk/download/public-finances-databank-february-2026/?tmstv=1773441267";
const BRIEF_GUIDE_URL =
  "https://obr.uk/forecasts-in-depth/brief-guides-and-explainers/public-finances/";
const FISCAL_YEAR = "2025-26";

const OUTPUT_PATHS = {
  income: join(process.cwd(), "src", "data", "governmentIncomeBreakdown.json"),
  spending: join(process.cwd(), "src", "data", "governmentSpendingBreakdown.json"),
  deficit: join(process.cwd(), "src", "data", "budgetDeficitMetric.json"),
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

const AGGREGATES_COLUMN_LABELS = {
  totalSpending: "Total managed expenditure",
  publicSectorNetBorrowing: "Public sector net borrowing",
} as const;

const INCOME_COLORS = {
  incomeTax: "#f4bf1a",
  nationalInsurance: "#f6d768",
  vat: "#f7e499",
  corporationTax: "#e7eef5",
  other: "#9eb5c8",
} as const;

const SPENDING_COLORS = {
  welfare: "#203b73",
  health: "#3f5f96",
  education: "#6e8bb6",
  defence: "#a9b9d6",
  debtInterest: "#c75b5b",
  infrastructure: "#f0b768",
  otherServices: "#d8e0ea",
} as const;

function formatTrillionPounds(value: number): string {
  return `\u00A3${(value / 1_000).toFixed(3)}T`;
}

function formatBillionPounds(value: number): string {
  return `\u00A3${Math.round(value).toLocaleString("en-GB")}bn`;
}

function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

function normalizeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
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

function parseSpendingBreakdownFromBriefGuide(html: string) {
  const spendingText = extractSpendingSectionText(html);

  return {
    welfareAndPensions: extractRoundedBillions(
      spendingText,
      /welfare system, expected to cost \u00A3([\d,]+) billion/i,
      "welfare spending",
    ),
    health: extractRoundedBillions(
      spendingText,
      /health \(\u00A3([\d,]+) billion\)/i,
      "health spending",
    ),
    education: extractRoundedBillions(
      spendingText,
      /education \(\u00A3([\d,]+) billion\)/i,
      "education spending",
    ),
    defence: extractRoundedBillions(
      spendingText,
      /defence \(\u00A3([\d,]+) billion\)/i,
      "defence spending",
    ),
    infrastructure: extractRoundedBillions(
      spendingText,
      /We also expect the public sector to spend \u00A3([\d,]+) billion .*? on capital investment/i,
      "capital investment",
    ),
    debtInterest: extractRoundedBillions(
      spendingText,
      /Net interest payments on the national debt are expected to cost \u00A3([\d,]+) billion/i,
      "debt interest",
    ),
  };
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
    const aggregatesSheet = getSheetByKeyword(workbook, ["Aggregates", "bn"]);

    // OBR public finances databank workbook:
    // - the Receipts sheet row for 2025-26 provides the receipt component breakdown.
    // - the Aggregates sheet row for 2025-26 provides total managed expenditure and borrowing.
    const receiptsRow = parseWorkbookRow(receiptsSheet, FISCAL_YEAR);
    const aggregatesRow = parseWorkbookRow(aggregatesSheet, FISCAL_YEAR);
    const briefGuideHtml = await briefGuideResponse.text();
    const spendingGuideValues = parseSpendingBreakdownFromBriefGuide(briefGuideHtml);
    const timestamp = new Date().toISOString();

    const incomeTotal = normalizeNumber(
      receiptsRow[RECEIPTS_COLUMN_LABELS.totalReceipts],
    );
    const spendingTotal = normalizeNumber(
      aggregatesRow[AGGREGATES_COLUMN_LABELS.totalSpending],
    );
    const deficitValue = normalizeNumber(
      aggregatesRow[AGGREGATES_COLUMN_LABELS.publicSectorNetBorrowing],
    );

    const incomeTaxValue =
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.payeIncomeTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.selfAssessedIncomeTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.otherIncomeTax]);

    const nationalInsuranceValue = normalizeNumber(
      receiptsRow[RECEIPTS_COLUMN_LABELS.nationalInsurance],
    );
    const vatValue = normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.vat]);
    const corporationTaxValue =
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.onshoreCorporationTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.offshoreCorporationTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.petroleumRevenueTax]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.energyProfitsLevy]) +
      normalizeNumber(receiptsRow[RECEIPTS_COLUMN_LABELS.bankLevy]);

    const incomeOtherValue =
      incomeTotal -
      incomeTaxValue -
      nationalInsuranceValue -
      vatValue -
      corporationTaxValue;

    // The spending categories come from the current OBR brief guide prose. "Other services"
    // is maintained as the residual so the category stack still reconciles to the databank total.
    const spendingOtherServicesValue =
      spendingTotal -
      spendingGuideValues.welfareAndPensions -
      spendingGuideValues.health -
      spendingGuideValues.education -
      spendingGuideValues.defence -
      spendingGuideValues.debtInterest -
      spendingGuideValues.infrastructure;

    const incomeMetric: BreakdownMetric = {
      totalNumericValue: incomeTotal,
      totalFormattedValue: formatTrillionPounds(incomeTotal),
      dateValue: FISCAL_YEAR,
      timestamp,
      source: "Office for Budget Responsibility",
      items: [
        buildBreakdownItem(
          "Income Tax",
          incomeTaxValue,
          incomeTotal,
          INCOME_COLORS.incomeTax,
        ),
        buildBreakdownItem(
          "National Insurance",
          nationalInsuranceValue,
          incomeTotal,
          INCOME_COLORS.nationalInsurance,
        ),
        buildBreakdownItem("VAT", vatValue, incomeTotal, INCOME_COLORS.vat),
        buildBreakdownItem(
          "Corporation Tax",
          corporationTaxValue,
          incomeTotal,
          INCOME_COLORS.corporationTax,
        ),
        buildBreakdownItem("Other", incomeOtherValue, incomeTotal, INCOME_COLORS.other),
      ],
    };

    const spendingMetric: BreakdownMetric = {
      totalNumericValue: spendingTotal,
      totalFormattedValue: formatTrillionPounds(spendingTotal),
      dateValue: FISCAL_YEAR,
      timestamp,
      source: "Office for Budget Responsibility",
      items: [
        buildBreakdownItem(
          "Welfare & pensions",
          spendingGuideValues.welfareAndPensions,
          spendingTotal,
          SPENDING_COLORS.welfare,
        ),
        buildBreakdownItem(
          "Health",
          spendingGuideValues.health,
          spendingTotal,
          SPENDING_COLORS.health,
        ),
        buildBreakdownItem(
          "Education",
          spendingGuideValues.education,
          spendingTotal,
          SPENDING_COLORS.education,
        ),
        buildBreakdownItem(
          "Defence",
          spendingGuideValues.defence,
          spendingTotal,
          SPENDING_COLORS.defence,
        ),
        buildBreakdownItem(
          "Debt interest",
          spendingGuideValues.debtInterest,
          spendingTotal,
          SPENDING_COLORS.debtInterest,
        ),
        buildBreakdownItem(
          "Infrastructure",
          spendingGuideValues.infrastructure,
          spendingTotal,
          SPENDING_COLORS.infrastructure,
        ),
        buildBreakdownItem(
          "Other services",
          spendingOtherServicesValue,
          spendingTotal,
          SPENDING_COLORS.otherServices,
        ),
      ],
    };

    const deficitMetric: DeficitMetric = {
      numericValue: deficitValue,
      formattedValue: formatBillionPounds(deficitValue),
      dateValue: FISCAL_YEAR,
      timestamp,
      source: "Office for Budget Responsibility",
      descriptiveText:
        "Spending exceeds income. This gap is public sector net borrowing and adds to debt; refinancing maturing debt happens separately through gilt issuance.",
    };

    await Promise.all([
      writeJsonFile(OUTPUT_PATHS.income, incomeMetric),
      writeJsonFile(OUTPUT_PATHS.spending, spendingMetric),
      writeJsonFile(OUTPUT_PATHS.deficit, deficitMetric),
    ]);

    console.log("Updated budget breakdown metrics from OBR sources.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update budget breakdown metrics.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
