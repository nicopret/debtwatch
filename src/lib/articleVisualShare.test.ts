import assert from "node:assert/strict";

import type { ArticleData, ArticleSectionData } from "../data/articles/articleTypes.js";
import { getArticleVisualEmbedDefinition } from "../data/embeds/articleVisualEmbedRegistry.js";
import {
  buildArticleVisualShareConfig,
  buildSocialShareLinks,
  resolveArticleVisualShareText,
} from "./articleVisualShare.js";

const article: ArticleData = {
  slug: "example-article",
  header: "Example article",
  tagline: "Example tagline",
  date: "26 Mar 2026",
  author: "DebtWatch",
  authorBioUrl: "https://debtwatch.uk/methodology/",
  description: "Example description",
  shareText: "Article-level share copy",
  keyTakeaway: "Example takeaway",
  heroVisual: "debt-interest-hero",
  metricStrip: [],
  sections: [],
  sources: [],
  relatedArticleSlugs: [],
};

const sectionWithVisualText: ArticleSectionData = {
  id: "section-1",
  heading: "Section heading",
  body: ["Body copy"],
  visualKey: "borrowing-yield-rates",
  visualShareTitle: "Section visual title",
  visualShareText: "Visual-specific share copy",
};

const sectionWithoutVisualText: ArticleSectionData = {
  id: "section-2",
  heading: "Fallback heading",
  body: ["Body copy"],
  visualKey: "gilt-yield-costs",
};

const sectionWithoutVisual: ArticleSectionData = {
  id: "section-3",
  heading: "No visual",
  body: ["Body copy"],
};

assert.equal(
  resolveArticleVisualShareText(article, sectionWithVisualText),
  "Visual-specific share copy",
);
assert.equal(
  resolveArticleVisualShareText(article, sectionWithoutVisualText),
  "Article-level share copy",
);

const config = buildArticleVisualShareConfig(article, sectionWithVisualText);
assert.ok(config);
assert.equal(config?.articleUrl, "https://debtwatch.uk/articles/example-article");
assert.equal(config?.shareTitle, "Section visual title");
assert.equal(config?.shareText, "Visual-specific share copy");
assert.equal(buildArticleVisualShareConfig(article, sectionWithoutVisual), null);

const links = buildSocialShareLinks({
  articleUrl: config!.articleUrl,
  shareText: config!.shareText,
});

const exportDefinition = getArticleVisualEmbedDefinition(
  "debt-interest-explained",
  "debt-interest-g7-yields",
);
const heroExportDefinition = getArticleVisualEmbedDefinition(
  "how-debt-to-gdp-works",
  "debt-to-gdp-hero",
);

assert.ok(exportDefinition);
assert.equal(exportDefinition?.embedSlug, "g7-borrowing-costs");
assert.equal(exportDefinition?.articleSlug, "debt-interest-explained");
assert.ok(heroExportDefinition);
assert.equal(heroExportDefinition?.embedSlug, "debt-to-gdp-hero");
assert.equal(heroExportDefinition?.articleSlug, "how-debt-to-gdp-works");

assert.match(links.x, /twitter\.com\/intent\/tweet/);
assert.match(links.x, /Visual-specific%20share%20copy/);
assert.match(links.x, /https%3A%2F%2Fdebtwatch\.uk%2Farticles%2Fexample-article/);
assert.match(links.facebook, /facebook\.com\/sharer/);
assert.match(links.linkedin, /linkedin\.com\/sharing\/share-offsite/);
assert.match(links.facebook, /https%3A%2F%2Fdebtwatch\.uk%2Farticles%2Fexample-article/);
assert.match(links.linkedin, /https%3A%2F%2Fdebtwatch\.uk%2Farticles%2Fexample-article/);

console.log("articleVisualShare.test.ts passed");
