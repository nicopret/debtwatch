export type DebtInterestVsPublicServicePayItemKey =
  | "debt_interest"
  | "health_pay"
  | "education_pay"
  | "public_order_pay"
  | "general_public_services_pay"
  | "defence_pay"
  | "social_protection_pay";

export type AnnualComparisonSourcePoint = {
  year: string;
  value: number;
  source: string;
  definition: string;
};

export type PublicServicePayCategorySourcePoint = {
  key: Exclude<DebtInterestVsPublicServicePayItemKey, "debt_interest">;
  label: string;
  value: number;
};

export type DebtInterestVsPublicServicePaySource = {
  timestamp: string;
  debtInterest: AnnualComparisonSourcePoint;
  publicServicePaySource: {
    year: string;
    source: string;
    definition: string;
    items: PublicServicePayCategorySourcePoint[];
  };
};

export type DebtInterestVsPublicServicePayItem = {
  key: DebtInterestVsPublicServicePayItemKey;
  label: string;
  value: number;
  color: "amber" | "darkNavy";
};

export type DebtInterestVsPublicServicePay = {
  title: string;
  subtitle: string;
  unit: "gbp_billions";
  basis: "calendar_year";
  dateValue: string;
  timestamp: string;
  source: string;
  debtInterestDefinition: string;
  publicServicePayDefinition: string;
  items: DebtInterestVsPublicServicePayItem[];
};

const ITEM_ORDER: DebtInterestVsPublicServicePayItemKey[] = [
  "debt_interest",
  "health_pay",
  "education_pay",
  "public_order_pay",
  "general_public_services_pay",
  "defence_pay",
  "social_protection_pay",
];

const PAY_ITEM_ORDER = ITEM_ORDER.slice(1) as Array<
  Exclude<DebtInterestVsPublicServicePayItemKey, "debt_interest">
>;

const ITEM_LABELS: Record<DebtInterestVsPublicServicePayItemKey, string> = {
  debt_interest: "Debt interest",
  health_pay: "Health pay",
  education_pay: "Education pay",
  public_order_pay: "Public order pay",
  general_public_services_pay: "Government admin pay",
  defence_pay: "Defence pay",
  social_protection_pay: "Social protection pay",
};

const ITEM_COLORS: Record<DebtInterestVsPublicServicePayItemKey, "amber" | "darkNavy"> = {
  debt_interest: "amber",
  health_pay: "darkNavy",
  education_pay: "darkNavy",
  public_order_pay: "darkNavy",
  general_public_services_pay: "darkNavy",
  defence_pay: "darkNavy",
  social_protection_pay: "darkNavy",
};

function roundToOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

function poundsToBillions(value: number): number {
  return value / 1_000_000_000;
}

export function validateDebtInterestVsPublicServicePay(
  comparison: DebtInterestVsPublicServicePay,
): DebtInterestVsPublicServicePay {
  const orderedKeys = comparison.items.map((item) => item.key);
  if (JSON.stringify(orderedKeys) !== JSON.stringify(ITEM_ORDER)) {
    throw new Error(
      "Debt-interest versus public-service-pay items are not in the required order.",
    );
  }

  for (const item of comparison.items) {
    if (!Number.isFinite(item.value) || item.value < 0) {
      throw new Error(`Comparison value for ${item.key} must be a non-negative number.`);
    }
  }

  return comparison;
}

export function buildDebtInterestVsPublicServicePay(
  source: DebtInterestVsPublicServicePaySource,
): DebtInterestVsPublicServicePay {
  if (source.debtInterest.year !== source.publicServicePaySource.year) {
    throw new Error(
      `Debt interest year ${source.debtInterest.year} does not match public service pay year ${source.publicServicePaySource.year}.`,
    );
  }

  if (!Number.isFinite(source.debtInterest.value) || source.debtInterest.value < 0) {
    throw new Error("Debt interest source value must be a non-negative number.");
  }

  const payItemsByKey = new Map(
    source.publicServicePaySource.items.map((item) => [item.key, item]),
  );

  for (const key of PAY_ITEM_ORDER) {
    const item = payItemsByKey.get(key);
    if (!item) {
      throw new Error(`Missing public-service-pay category ${key}.`);
    }
    if (!Number.isFinite(item.value) || item.value < 0) {
      throw new Error(`Public-service-pay category ${key} must be a non-negative number.`);
    }
  }

  return validateDebtInterestVsPublicServicePay({
    title: "Debt interest vs public service pay",
    subtitle:
      "Comparing the annual cost of servicing government debt with the biggest public-service pay bills",
    unit: "gbp_billions",
    basis: "calendar_year",
    dateValue: source.debtInterest.year,
    timestamp: source.timestamp,
    source: "Office for National Statistics",
    debtInterestDefinition: source.debtInterest.definition,
    publicServicePayDefinition: source.publicServicePaySource.definition,
    items: ITEM_ORDER.map((key) => {
      const value =
        key === "debt_interest"
          ? poundsToBillions(source.debtInterest.value)
          : poundsToBillions(payItemsByKey.get(key)!.value);

      return {
        key,
        label: ITEM_LABELS[key],
        value: roundToOneDecimal(value),
        color: ITEM_COLORS[key],
      };
    }),
  });
}
