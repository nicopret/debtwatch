const MONTH_LOOKUP: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

export type PublicationMonth = {
  year: number;
  month: number;
};

export function parseArticlePublicationMonth(value: string): PublicationMonth | null {
  const direct = /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/.exec(value.trim());
  if (direct) {
    const month = MONTH_LOOKUP[direct[2]!.toLowerCase()];
    if (month) {
      return { year: Number(direct[3]), month };
    }
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      year: parsed.getUTCFullYear(),
      month: parsed.getUTCMonth() + 1,
    };
  }

  return null;
}

export function parseDataMonth(value: string): PublicationMonth | null {
  const trimmed = value.trim();

  const fiscalYear = /^(\d{4})-(\d{2})$/.exec(trimmed);
  if (fiscalYear && Number(fiscalYear[2]) > 12) {
    return { year: 2000 + Number(fiscalYear[2]), month: 3 };
  }

  const isoMonth = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(trimmed);
  if (isoMonth) {
    return { year: Number(isoMonth[1]), month: Number(isoMonth[2]) };
  }

  const monthYear = /^([A-Za-z]{3})\s+(\d{4})$/.exec(trimmed);
  if (monthYear) {
    const month = MONTH_LOOKUP[monthYear[1]!.toLowerCase()];
    if (month) {
      return { year: Number(monthYear[2]), month };
    }
  }

  const quarter = /^Q([1-4])\s+(\d{4})$/.exec(trimmed);
  if (quarter) {
    return { year: Number(quarter[2]), month: Number(quarter[1]) * 3 };
  }

  const annualAverage = /^(\d{4})\s+annual average$/i.exec(trimmed);
  if (annualAverage) {
    return { year: Number(annualAverage[1]), month: 12 };
  }

  const yearOnly = /^(\d{4})$/.exec(trimmed);
  if (yearOnly) {
    return { year: Number(yearOnly[1]), month: 12 };
  }

  return null;
}

export function comparePublicationMonths(
  left: PublicationMonth,
  right: PublicationMonth,
): number {
  if (left.year !== right.year) {
    return left.year - right.year;
  }

  return left.month - right.month;
}

export function isOnOrBeforePublicationMonth(
  dataValue: string,
  articleDate: string,
): boolean {
  const dataMonth = parseDataMonth(dataValue);
  const publicationMonth = parseArticlePublicationMonth(articleDate);

  if (!dataMonth || !publicationMonth) {
    return true;
  }

  return comparePublicationMonths(dataMonth, publicationMonth) <= 0;
}
