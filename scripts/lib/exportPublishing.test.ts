import assert from "node:assert/strict";

import {
  buildAssetRelativePath,
  buildEmbedRelativePath,
  buildS3ObjectKey,
  getExpectedAssetFiles,
  getExpectedEmbedEntryFiles,
  normalizeStoragePrefix,
} from "./exportPublishing.js";

assert.equal(
  buildEmbedRelativePath("debt-interest-explained", "latest", "debt-interest-over-time"),
  "debt-interest-explained/latest/debt-interest-over-time/index.html",
);

assert.equal(
  buildAssetRelativePath("debt-interest-explained", "latest", "debt-interest-over-time", "png"),
  "debt-interest-explained/latest/debt-interest-over-time.png",
);

assert.equal(normalizeStoragePrefix(undefined), "");
assert.equal(normalizeStoragePrefix("assets"), "assets/");
assert.equal(normalizeStoragePrefix("/embeds/"), "embeds/");
assert.equal(buildS3ObjectKey("", "a/b/index.html"), "a/b/index.html");
assert.equal(buildS3ObjectKey("embeds", "a/b/index.html"), "embeds/a/b/index.html");

const expectedEmbedFiles = getExpectedEmbedEntryFiles(["latest"]);
assert.ok(
  expectedEmbedFiles.includes(
    "debt-interest-explained/latest/debt-interest-over-time/index.html",
  ),
);

const expectedAssetFiles = getExpectedAssetFiles(["latest"]);
assert.ok(
  expectedAssetFiles.includes("debt-interest-explained/latest/debt-interest-over-time.png"),
);
assert.ok(
  expectedAssetFiles.includes("debt-interest-explained/latest/debt-interest-over-time.svg"),
);
