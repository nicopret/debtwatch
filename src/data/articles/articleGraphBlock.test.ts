import assert from "node:assert/strict";

import type { ArticleSectionData } from "./articleTypes.js";

const section: ArticleSectionData = {
  id: "sustainability",
  heading: "Debt sustainability",
  body: ["Growth, debt and rates move together over time."],
  blocks: [
    {
      type: "graph",
      graphKey: "uk-debt-growth-borrowing-costs",
      caption: "Debt sustainability lens",
    },
  ],
};

assert.equal(section.blocks?.[0]?.type, "graph");
assert.equal(section.blocks?.[0]?.graphKey, "uk-debt-growth-borrowing-costs");

console.log("articleGraphBlock.test.ts passed");
