export type InflationLinkedDebtExposureItemKey =
  | "cpi"
  | "rpi"
  | "index_linked_debt"
  | "extra_debt_from_rpi_linkage";

export type InflationLinkedDebtExposureSource = {
  title: string;
  subtitle: string;
  period: string;
  timestamp: string;
  source: string;
  sources: {
    cpi: {
      label: string;
      series: string;
      description: string;
      url: string;
      period: string;
      value: number;
    };
    rpi: {
      label: string;
      series: string;
      description: string;
      url: string;
      period: string;
      value: number;
    };
    indexLinkedDebtStock: {
      label: string;
      description: string;
      url: string;
      period: string;
      value: number;
    };
  };
};

export type InflationLinkedDebtExposureItem = {
  key: InflationLinkedDebtExposureItemKey;
  label: string;
  value: number;
  unit: "percent" | "gbp_billions";
  color: "neutral" | "amber";
  highlight: boolean;
};

export type InflationLinkedDebtExposure = {
  title: string;
  subtitle: string;
  period: string;
  timestamp: string;
  source: string;
  inflationDefinition: string;
  debtDefinition: string;
  calculationNote: string;
  items: InflationLinkedDebtExposureItem[];
};

const ITEM_ORDER: InflationLinkedDebtExposureItemKey[] = [
  "cpi",
  "rpi",
  "index_linked_debt",
  "extra_debt_from_rpi_linkage",
];

const ITEM_LABELS: Record<InflationLinkedDebtExposureItemKey, string> = {
  cpi: "CPI",
  rpi: "RPI",
  index_linked_debt: "Index-linked debt",
  extra_debt_from_rpi_linkage: "Extra debt from RPI linkage",
};

const ITEM_UNITS: Record<
  InflationLinkedDebtExposureItemKey,
  "percent" | "gbp_billions"
> = {
  cpi: "percent",
  rpi: "percent",
  index_linked_debt: "gbp_billions",
  extra_debt_from_rpi_linkage: "gbp_billions",
};

const ITEM_COLORS: Record<InflationLinkedDebtExposureItemKey, "neutral" | "amber"> = {
  cpi: "neutral",
  rpi: "neutral",
  index_linked_debt: "amber",
  extra_debt_from_rpi_linkage: "amber",
};

function roundToOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

function parseMonthYear(period: string): { year: number; month: number } | null {
  const match = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/.exec(
    period,
  );

  if (!match) {
    return null;
  }

  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(match[1]);

  return { year: Number(match[2]), month: monthIndex + 1 };
}

export function validateInflationLinkedDebtExposure(
  exposure: InflationLinkedDebtExposure,
): InflationLinkedDebtExposure {
  const orderedKeys = exposure.items.map((item) => item.key);
  if (JSON.stringify(orderedKeys) !== JSON.stringify(ITEM_ORDER)) {
    throw new Error("Inflation-linked debt exposure items are not in the required order.");
  }

  const period = parseMonthYear(exposure.period);
  if (!period) {
    throw new Error(`Exposure period "${exposure.period}" is not a valid month-year label.`);
  }

  if (period.year > 2025 || (period.year === 2025 && period.month > 12)) {
    throw new Error("Inflation-linked debt exposure must not use data later than December 2025.");
  }

  for (const item of exposure.items) {
    if (!Number.isFinite(item.value) || item.value < 0) {
      throw new Error(`Exposure value for ${item.key} must be a non-negative number.`);
    }
  }

  return exposure;
}

export function buildInflationLinkedDebtExposure(
  source: InflationLinkedDebtExposureSource,
): InflationLinkedDebtExposure {
  const cpiPeriod = source.sources.cpi.period;
  const rpiPeriod = source.sources.rpi.period;
  const debtPeriod = source.sources.indexLinkedDebtStock.period;

  if (cpiPeriod !== source.period || rpiPeriod !== source.period || debtPeriod !== source.period) {
    throw new Error("All source periods must match the exposure period.");
  }

  const cpi = source.sources.cpi.value;
  const rpi = source.sources.rpi.value;
  const indexLinkedDebt = source.sources.indexLinkedDebtStock.value;

  if (!Number.isFinite(cpi) || !Number.isFinite(rpi) || !Number.isFinite(indexLinkedDebt)) {
    throw new Error("Inflation-linked debt exposure source values must be numeric.");
  }

  if (cpi < 0 || rpi < 0 || indexLinkedDebt < 0) {
    throw new Error("Inflation-linked debt exposure source values must be non-negative.");
  }

  // The extra burden is an editorial estimate, not a published series:
  // index-linked debt stock * (RPI annual rate - CPI annual rate), with the
  // percentage-point gap converted into decimal form before applying it.
  const extraDebtFromRpiLinkage = indexLinkedDebt * ((rpi - cpi) / 100);

  return validateInflationLinkedDebtExposure({
    title: source.title,
    subtitle: source.subtitle,
    period: source.period,
    timestamp: source.timestamp,
    source: source.source,
    inflationDefinition:
      "Office for National Statistics December 2025 annual inflation rates: CPI all-items (D7G7) and RPI all-items (CZBH).",
    debtDefinition:
      "UK Debt Management Office stock of index-linked debt at end-December 2025, as reported in the Debt and Reserves Management Report 2026-27.",
    calculationNote:
      "Extra debt from RPI linkage = index-linked debt stock x (RPI - CPI), using the December 2025 annual inflation-rate gap expressed as a decimal.",
    items: ITEM_ORDER.map((key) => {
      const value =
        key === "cpi"
          ? cpi
          : key === "rpi"
            ? rpi
            : key === "index_linked_debt"
              ? indexLinkedDebt
              : extraDebtFromRpiLinkage;

      return {
        key,
        label: ITEM_LABELS[key],
        value: roundToOneDecimal(value),
        unit: ITEM_UNITS[key],
        color: ITEM_COLORS[key],
        highlight:
          key === "index_linked_debt" || key === "extra_debt_from_rpi_linkage",
      };
    }),
  });
}
