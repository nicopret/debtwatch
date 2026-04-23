import assert from "node:assert/strict";

import { buildAssetUrl } from "./assetUrl.js";
import {
  type ExportManifest,
  resolveAssetSnapshotVersion,
  resolveEmbedSnapshotVersion,
  resolveVisualSnapshotVersion,
} from "./publishedVisualVersion.js";

const assetManifest20260326: ExportManifest = {
  kind: "assets",
  generatedAt: "2026-03-26T06:00:00.000Z",
  versions: ["20260326", "latest"],
  requiredFiles: [
    "how-debt-to-gdp-works/20260326/debt-to-gdp-hero.png",
    "how-debt-to-gdp-works/20260326/debt-to-gdp-hero.svg",
    "how-debt-to-gdp-works/latest/debt-to-gdp-hero.png",
    "how-debt-to-gdp-works/latest/debt-to-gdp-hero.svg",
  ],
  generatedFiles: [],
};

const embedManifest20260326: ExportManifest = {
  kind: "embeds",
  generatedAt: "2026-03-26T06:00:00.000Z",
  versions: ["20260326", "latest"],
  requiredFiles: [
    "how-debt-to-gdp-works/20260326/debt-to-gdp-hero/index.html",
    "how-debt-to-gdp-works/latest/debt-to-gdp-hero/index.html",
  ],
  generatedFiles: [],
};

assert.equal(
  resolveAssetSnapshotVersion(
    "how-debt-to-gdp-works",
    "debt-to-gdp-hero",
    assetManifest20260326,
  ),
  "20260326",
);

assert.equal(
  resolveEmbedSnapshotVersion(
    "how-debt-to-gdp-works",
    "debt-to-gdp-hero",
    embedManifest20260326,
  ),
  "20260326",
);

assert.equal(
  resolveVisualSnapshotVersion({
    contextSlug: "how-debt-to-gdp-works",
    assetSlug: "debt-to-gdp-hero",
    embedSlug: "debt-to-gdp-hero",
    assetExportManifest: assetManifest20260326,
    embedExportManifest: embedManifest20260326,
  }),
  "20260326",
);

assert.throws(
  () =>
    resolveVisualSnapshotVersion({
      contextSlug: "how-debt-to-gdp-works",
      assetSlug: "debt-to-gdp-hero",
      embedSlug: "debt-to-gdp-hero",
      assetExportManifest: assetManifest20260326,
      embedExportManifest: {
        ...embedManifest20260326,
        requiredFiles: [
          "how-debt-to-gdp-works/20260328/debt-to-gdp-hero/index.html",
          "how-debt-to-gdp-works/latest/debt-to-gdp-hero/index.html",
        ],
        versions: ["20260328", "latest"],
      },
    }),
  /version mismatch/i,
);

assert.equal(
  resolveAssetSnapshotVersion("how-debt-to-gdp-works", "debt-to-gdp-hero", {
    ...assetManifest20260326,
    requiredFiles: [
      ...assetManifest20260326.requiredFiles,
      "how-debt-to-gdp-works/20260328/debt-to-gdp-hero.png",
      "how-debt-to-gdp-works/20260328/debt-to-gdp-hero.svg",
    ],
    versions: ["20260326", "20260328", "latest"],
  }),
  "20260328",
);

const expectedImageUrl = buildAssetUrl({
  contextSlug: "how-debt-to-gdp-works",
  assetSlug: "debt-to-gdp-hero",
  version: resolveVisualSnapshotVersion({
    contextSlug: "how-debt-to-gdp-works",
    assetSlug: "debt-to-gdp-hero",
    embedSlug: "debt-to-gdp-hero",
    assetExportManifest: assetManifest20260326,
    embedExportManifest: embedManifest20260326,
  }),
});

assert.equal(
  expectedImageUrl,
  "https://assets.debtwatch.uk/how-debt-to-gdp-works/20260326/debt-to-gdp-hero.png",
);

console.log("publishedVisualVersion.test.ts passed");
