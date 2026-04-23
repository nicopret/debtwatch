import assert from "node:assert/strict";

import { getPinnedPublishedVersions, getSupportedEmbedVersions } from "./versioning.js";

assert.ok(getPinnedPublishedVersions().includes("20251215"));

assert.deepEqual(
  getSupportedEmbedVersions(new Date("2026-03-29T00:00:00.000Z")),
  ["20260329", "20251215", "latest"],
);

assert.deepEqual(
  getSupportedEmbedVersions(new Date("2025-12-15T00:00:00.000Z")),
  ["20251215", "latest"],
);

console.log("versioning.test.ts passed");
