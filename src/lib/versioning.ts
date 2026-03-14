export function getUtcDateFolderName(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function isDatedVersion(value: string): boolean {
  return /^\d{8}$/.test(value);
}

export function getSupportedEmbedVersions(date = new Date()): string[] {
  return [getUtcDateFolderName(date), "latest"];
}

